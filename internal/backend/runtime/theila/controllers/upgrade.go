// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

package controllers

import (
	"context"
	"fmt"
	"sync"

	"github.com/cosi-project/runtime/pkg/controller"
	"github.com/cosi-project/runtime/pkg/resource"
	"github.com/talos-systems/talos/pkg/cluster"
	k8s "github.com/talos-systems/talos/pkg/cluster/kubernetes"
	"github.com/talos-systems/talos/pkg/machinery/client"
	"go.uber.org/zap"

	"github.com/talos-systems/theila/api/common"
	"github.com/talos-systems/theila/api/rpc"
	"github.com/talos-systems/theila/internal/backend/runtime"
	"github.com/talos-systems/theila/internal/backend/runtime/talos"
	"github.com/talos-systems/theila/internal/backend/runtime/theila/resources"
)

const (
	// Namespace operated by the controller.
	Namespace = "default"
	// Name of the controller.
	Name = "UpgradeController"
)

type taskLog struct {
	id   resource.ID
	line string
}

type taskError struct {
	err error
	id  resource.ID
}

type taskProgress struct {
	id    resource.ID
	value float32
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
			Type: resources.TaskStatusType,
			Kind: controller.OutputExclusive,
		},
		{
			Type: resources.TaskLogType,
			Kind: controller.OutputExclusive,
		},
	}
}

// Run implements controller.Controller interface.
func (ctrl *UpgradeController) Run(ctx context.Context, r controller.Runtime, logger *zap.Logger) error {
	for {
		select {
		case <-ctx.Done():
			return nil
		case <-r.EventCh():
			if err := ctrl.reconcileTasks(ctx, r, logger); err != nil {
				return err
			}
		case log := <-ctrl.logs:
			taskLog := resources.NewTaskLog(Namespace, log.id, "")

			if err := r.Modify(ctx, taskLog, func(res resource.Resource) error {
				res.(*resources.TaskLog).Update(log.line)

				return nil
			}); err != nil {
				return err
			}
		case progress := <-ctrl.progress:
			status := resources.NewTaskStatus(Namespace, progress.id)

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
			status := resources.NewTaskStatus(Namespace, e.id)

			if err := r.Modify(ctx, status, func(res resource.Resource) error {
				res.(*resources.TaskStatus).SetError(e.err)

				return nil
			}); err != nil {
				return err
			}
		}
	}
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
			if err = ctrl.abortTask(ctx, id, r); err != nil {
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

		if err := ctrl.abortTask(ctx, id, r); err != nil {
			return err
		}
	}

	ctrl.tasks[id] = &upgradeTask{
		task: task,
	}

	return ctrl.tasks[id].start(ctx, task, ctrl, logger)
}

func (ctrl *UpgradeController) abortTask(ctx context.Context, id resource.ID, r controller.Runtime) error {
	ctrl.tasks[id].stop()

	defer delete(ctrl.tasks, id)

	if err := r.Destroy(ctx, resource.NewMetadata(Namespace, resources.TaskStatusType, id, resource.VersionUndefined)); err != nil {
		return err
	}

	return r.Destroy(ctx, resource.NewMetadata(Namespace, resources.TaskLogType, id, resource.VersionUndefined))
}

type upgradeTask struct {
	cancel context.CancelFunc
	task   *resources.UpgradeK8sTask

	wg sync.WaitGroup
}

func (t *upgradeTask) start(ctx context.Context, task *resources.UpgradeK8sTask, ctrl *UpgradeController, logger *zap.Logger) error {
	ctx, t.cancel = context.WithCancel(ctx)

	var upgradeOptions k8s.UpgradeOptions

	spec, ok := task.Spec().(*rpc.UpgradeK8SSpec)
	if !ok {
		return fmt.Errorf("failed to parse the upgrade spec")
	}

	if spec.Context == nil {
		return fmt.Errorf("upgrade task is missing talos context")
	}

	id := task.Metadata().ID()

	upgradeOptions.FromVersion = spec.FromVersion
	upgradeOptions.ToVersion = spec.ToVersion
	upgradeOptions.LogOutput = &runtimeLogger{
		ctrl: ctrl,
		id:   id,
		ctx:  ctx,
		zap:  logger,
	}

	tr, err := runtime.Get(talos.Name)
	if err != nil {
		return err
	}

	var clusterOptions *common.Cluster

	contextName := spec.Context.Name

	clusterOptions = spec.Context.Cluster

	if len(spec.Context.Nodes) != 0 {
		ctx = client.WithNodes(ctx, spec.Context.Nodes...)
	}

	c, err := tr.(*talos.Runtime).GetClient(ctx, contextName, clusterOptions)
	if err != nil {
		return err
	}

	t.wg.Add(1)

	go func() {
		defer t.wg.Done()

		state := struct {
			cluster.ClientProvider
			cluster.K8sProvider
		}{
			ClientProvider: &clientProvider{c},
			K8sProvider: &cluster.KubernetesClient{
				ClientProvider: &clientProvider{c},
			},
		}

		upgrade := func() error {
			endpoints := c.GetEndpoints()

			selfHosted, err := k8s.IsSelfHostedControlPlane(ctx, &state, endpoints[0])
			if err != nil {
				return err
			}

			if selfHosted {
				return fmt.Errorf("upgrading self hosted control plane is not supported")
			}

			return k8s.UpgradeTalosManaged(ctx, &state, upgradeOptions)
		}

		ctrl.progress <- taskProgress{
			id:    id,
			value: 0.0,
		}

		if err := upgrade(); err != nil {
			ctrl.errors <- taskError{
				id:  id,
				err: err,
			}
		}

		ctrl.progress <- taskProgress{
			id:    id,
			value: 1.0,
		}
	}()

	return nil
}

func (t *upgradeTask) stop() {
	t.cancel()

	t.wg.Wait()
}

type clientProvider struct {
	client *client.Client
}

func (cp *clientProvider) Client(endpoints ...string) (*client.Client, error) {
	return cp.client, nil
}

func (cp *clientProvider) Close() error {
	return nil
}

type runtimeLogger struct {
	ctrl *UpgradeController
	zap  *zap.Logger
	ctx  context.Context
	id   resource.ID
}

// Write implements io.Writer.
func (l *runtimeLogger) Write(line []byte) (int, error) {
	l.zap.Debug(string(line))

	l.ctrl.logs <- taskLog{
		id:   l.id,
		line: string(line),
	}

	return len(line), nil
}
