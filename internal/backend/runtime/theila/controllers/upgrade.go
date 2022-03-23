// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

package controllers

import (
	"context"
	"errors"
	"fmt"
	"strings"
	"sync"
	"time"

	"github.com/cosi-project/runtime/pkg/controller"
	"github.com/cosi-project/runtime/pkg/resource"
	"github.com/google/go-github/v35/github"
	"github.com/talos-systems/talos/pkg/cluster"
	k8s "github.com/talos-systems/talos/pkg/cluster/kubernetes"
	"go.uber.org/zap"

	"github.com/siderolabs/theila/api/rpc"
	"github.com/siderolabs/theila/internal/backend/constants"
	"github.com/siderolabs/theila/internal/backend/management"
	"github.com/siderolabs/theila/internal/backend/runtime/talos"
	"github.com/siderolabs/theila/internal/backend/runtime/theila/resources"
)

const (
	// Namespace operated by the controller.
	Namespace = "default"
	// Name of the controller.
	Name = "UpgradeController"
)

type taskLog struct {
	id        resource.ID
	namespace resource.Namespace
	line      string
}

type taskError struct {
	err       error
	namespace resource.Namespace
	id        resource.ID
}

type taskProgress struct {
	id        resource.ID
	namespace resource.Namespace
	value     float32
}

// NewUpgradeController creates new UpgradeController.
func NewUpgradeController() *UpgradeController {
	return &UpgradeController{
		Namespace: Namespace,

		tasks: map[resource.ID]*upgradeTask{},

		logs:     make(chan taskLog),
		errors:   make(chan taskError),
		progress: make(chan taskProgress),
	}
}

// UpgradeController calculates sum of IntResources into new IntResource.
type UpgradeController struct {
	tasks    map[resource.ID]*upgradeTask
	logs     chan taskLog
	errors   chan taskError
	progress chan taskProgress

	kubernetesVersionsRefreshTime time.Time

	Namespace resource.Namespace
}

// Name implements controller.Controller interface.
func (ctrl *UpgradeController) Name() string {
	return Name
}

// Inputs implements controller.Controller interface.
func (ctrl *UpgradeController) Inputs() []controller.Input {
	return []controller.Input{
		{
			Namespace: Namespace,
			Type:      resources.UpgradeK8sTaskType,
			Kind:      controller.InputWeak,
		},
	}
}

// Outputs implements controller.Controller interface.
func (ctrl *UpgradeController) Outputs() []controller.Output {
	return []controller.Output{
		{
			Type: resources.TaskStateType,
			Kind: controller.OutputExclusive,
		},
		{
			Type: resources.TaskStatusType,
			Kind: controller.OutputExclusive,
		},
		{
			Type: resources.TaskLogType,
			Kind: controller.OutputExclusive,
		},
		{
			Type: resources.KubernetesVersionType,
			Kind: controller.OutputExclusive,
		},
	}
}

// Run implements controller.Controller interface.
func (ctrl *UpgradeController) Run(ctx context.Context, r controller.Runtime, logger *zap.Logger) error {
	kubernetesVersionsReconcile := time.NewTicker(time.Minute * 10)
	defer kubernetesVersionsReconcile.Stop()

	if err := ctrl.reconcileKubernetesVersions(ctx, r, logger); err != nil {
		return err
	}

	for {
		select {
		case <-ctx.Done():
			return nil
		case <-r.EventCh():
			if err := ctrl.reconcileTasks(ctx, r, logger); err != nil {
				return err
			}
		case <-kubernetesVersionsReconcile.C:
			if err := ctrl.reconcileKubernetesVersions(ctx, r, logger); err != nil {
				return err
			}
		case log := <-ctrl.logs:
			taskLog := resources.NewTaskLog(log.namespace, log.id, "")

			if err := r.Modify(ctx, taskLog, func(res resource.Resource) error {
				res.(*resources.TaskLog).Update(log.line)

				return nil
			}); err != nil {
				return err
			}
		case progress := <-ctrl.progress:
			status := resources.NewTaskStatus(progress.namespace, progress.id)

			if err := r.Modify(ctx, status, func(res resource.Resource) error {
				s := res.(*resources.TaskStatus) //nolint:forcetypeassert,errcheck

				s.SetProgress(progress.value)
				if progress.value == 1.0 {
					s.SetPhase(rpc.TaskStatusSpec_COMPLETE)
				}

				return nil
			}); err != nil {
				return err
			}
		case e := <-ctrl.errors:
			status := resources.NewTaskStatus(e.namespace, e.id)

			if err := r.Modify(ctx, status, func(res resource.Resource) error {
				res.(*resources.TaskStatus).SetError(e.err)
				res.(*resources.TaskStatus).SetPhase(rpc.TaskStatusSpec_FAILED)

				return nil
			}); err != nil {
				return err
			}
		}
	}
}

func (ctrl *UpgradeController) reconcileKubernetesVersions(ctx context.Context, r controller.Runtime, logger *zap.Logger) error {
	if time.Now().Before(ctrl.kubernetesVersionsRefreshTime) {
		logger.Sugar().Infof("controller hit Github rate limit, skipping refreshes until %s", ctrl.kubernetesVersionsRefreshTime.String())

		return nil
	}

	versions, err := management.K8sUpgradeCandidates(ctx, constants.KubernetesRepoURL)
	if err != nil {
		var rateLimitError *github.RateLimitError

		if errors.As(err, &rateLimitError) {
			ctrl.kubernetesVersionsRefreshTime = rateLimitError.Rate.Reset.Time
		}

		return err
	}

	for _, version := range versions {
		version = strings.TrimLeft(version, "v")
		kubernetesVersion := resources.NewKubernetesVersion(Namespace, version, version)

		version := version

		if err = r.Modify(ctx, kubernetesVersion, func(res resource.Resource) error {
			res.(*resources.KubernetesVersion).SetVersion(version)

			return nil
		}); err != nil {
			return err
		}
	}

	logger.Info("reconciled available Kubernetes releases")

	return nil
}

func (ctrl *UpgradeController) reconcileTasks(ctx context.Context, r controller.Runtime, logger *zap.Logger) error {
	sourceMd := resource.NewMetadata(ctrl.Namespace, resources.UpgradeK8sTaskType, "", resource.VersionUndefined)

	tasks, err := r.List(ctx, sourceMd)
	if err != nil {
		return fmt.Errorf("error listing objects: %w", err)
	}

	touchedIDs := map[resource.ID]struct{}{}

	for _, task := range tasks.Items {
		touchedIDs[task.Metadata().ID()] = struct{}{}

		if err = ctrl.handleTask(ctx, task.(*resources.UpgradeK8sTask), r, logger); err != nil {
			return err
		}
	}

	for id := range ctrl.tasks {
		if _, exists := touchedIDs[id]; !exists {
			if err = ctrl.abortTask(ctx, id, r, logger); err != nil {
				return err
			}
		}
	}

	return nil
}

func (ctrl *UpgradeController) handleTask(ctx context.Context, task *resources.UpgradeK8sTask, r controller.Runtime, logger *zap.Logger) error {
	id := task.Metadata().ID()
	if ctrl.tasks[id] != nil {
		if task.Metadata().Version().Equal(ctrl.tasks[id].task.Metadata().Version()) {
			return nil
		}

		if err := ctrl.abortTask(ctx, id, r, logger); err != nil {
			return err
		}
	}

	ctrl.tasks[id] = &upgradeTask{
		task: task,
	}

	return ctrl.tasks[id].start(ctx, task, ctrl, r, logger)
}

func (ctrl *UpgradeController) abortTask(ctx context.Context, id resource.ID, r controller.Runtime, logger *zap.Logger) error {
	ctrl.tasks[id].stop()

	defer delete(ctrl.tasks, id)

	res, err := r.Get(ctx, resource.NewMetadata(Namespace, resources.TaskStateType, id, resource.VersionUndefined))
	if err != nil {
		return err
	}

	statusID := res.(*resources.TaskState).TypedSpec().StatusId
	if err = r.Modify(ctx, resources.NewTaskStatus(id, statusID), func(res resource.Resource) error {
		s := res.(*resources.TaskStatus) //nolint:errcheck,forcetypeassert
		if s.TypedSpec().Phase == rpc.TaskStatusSpec_COMPLETE {
			return nil
		}

		s.SetPhase(rpc.TaskStatusSpec_FAILED)
		s.SetError(fmt.Errorf("the task was aborted"))

		return nil
	}); err != nil {
		return err
	}

	logger.Info("task was aborted", zap.String("task", id))

	return nil
}

type upgradeTask struct {
	cancel context.CancelFunc
	task   *resources.UpgradeK8sTask

	wg sync.WaitGroup
}

func (t *upgradeTask) start(ctx context.Context, task *resources.UpgradeK8sTask, ctrl *UpgradeController, r controller.Runtime, logger *zap.Logger) error {
	ctx, t.cancel = context.WithCancel(ctx)

	var upgradeOptions k8s.UpgradeOptions

	spec, ok := task.Spec().(*rpc.UpgradeK8SSpec)
	if !ok {
		return fmt.Errorf("failed to parse the upgrade spec")
	}

	if spec.Context == nil {
		return fmt.Errorf("upgrade task is missing talos context")
	}

	id := fmt.Sprintf("%s-%d", task.Metadata().ID(), time.Now().Unix())
	namespace := task.Metadata().ID()

	upgradeOptions.FromVersion = spec.FromVersion
	upgradeOptions.ToVersion = spec.ToVersion
	upgradeOptions.LogOutput = &runtimeLogger{
		ctrl:      ctrl,
		id:        id,
		namespace: namespace,
		ctx:       ctx,
		zap:       logger,
	}

	ctx = talos.WithNodes(ctx, spec.Context)

	clientProvider, err := management.NewUpgradeClientProvider(ctx, spec.Context)
	if err != nil {
		return err
	}

	s := struct {
		cluster.ClientProvider
		cluster.K8sProvider
	}{
		ClientProvider: clientProvider,
		K8sProvider: &cluster.KubernetesClient{
			ClientProvider: clientProvider,
		},
	}

	if upgradeOptions.FromVersion == "" {
		upgradeOptions.FromVersion, err = k8s.DetectLowestVersion(ctx, &s, upgradeOptions)
		if err != nil {
			return err
		}
	}

	if err := r.Modify(ctx, resources.NewTaskState(Namespace, task.Metadata().ID(), id), func(res resource.Resource) error {
		res.(*resources.TaskState).TypedSpec().StatusId = id

		return nil
	}); err != nil {
		return err
	}

	if err := r.Modify(ctx, resources.NewTaskStatus(namespace, id), func(res resource.Resource) error {
		res.(*resources.TaskStatus).SetVersions(upgradeOptions.FromVersion, upgradeOptions.ToVersion)
		res.(*resources.TaskStatus).SetPhase(rpc.TaskStatusSpec_RUNNING)

		return nil
	}); err != nil {
		return err
	}

	t.wg.Add(1)

	go func() {
		defer t.wg.Done()

		upgrade := func() error {
			return k8s.UpgradeTalosManaged(ctx, &s, upgradeOptions)
		}

		ctrl.progress <- taskProgress{
			id:        id,
			value:     0.0,
			namespace: namespace,
		}

		if err := upgrade(); err != nil {
			taskErr := taskError{
				id:        id,
				err:       err,
				namespace: namespace,
			}

			select {
			case <-ctx.Done():
				return
			case ctrl.errors <- taskErr:
			}

			return
		}

		// TODO: this task progress should be enhanced to show detailed information
		// - currently upgraded node
		// - pods updates progress
		ctrl.progress <- taskProgress{
			id:        id,
			value:     1.0,
			namespace: namespace,
		}

		upgradeOptions.Log("upgrade complete")
	}()

	return nil
}

func (t *upgradeTask) stop() {
	t.cancel()

	t.wg.Wait()
}

type runtimeLogger struct {
	ctrl      *UpgradeController
	zap       *zap.Logger
	ctx       context.Context
	id        resource.ID
	namespace resource.Namespace
}

// Write implements io.Writer.
func (l *runtimeLogger) Write(line []byte) (int, error) {
	l.zap.Debug(string(line))

	l.ctrl.logs <- taskLog{
		id:        l.id,
		line:      string(line),
		namespace: l.namespace,
	}

	return len(line), nil
}
