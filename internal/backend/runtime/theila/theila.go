// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Package theila implements the internal service runtime.
package theila

import (
	"context"
	"fmt"
	"log"
	"sort"

	"github.com/cosi-project/runtime/pkg/controller"
	cosiruntime "github.com/cosi-project/runtime/pkg/controller/runtime"
	cosiresource "github.com/cosi-project/runtime/pkg/resource"
	"github.com/cosi-project/runtime/pkg/resource/protobuf"
	"github.com/cosi-project/runtime/pkg/state"
	"github.com/cosi-project/runtime/pkg/state/impl/inmem"
	"github.com/cosi-project/runtime/pkg/state/impl/namespaced"
	"github.com/talos-systems/talos/pkg/machinery/api/resource"
	"go.uber.org/zap"
	"golang.org/x/sync/errgroup"

	"github.com/talos-systems/theila/api/common"
	"github.com/talos-systems/theila/api/socket/message"
	"github.com/talos-systems/theila/internal/backend/logging"
	"github.com/talos-systems/theila/internal/backend/runtime"
	"github.com/talos-systems/theila/internal/backend/runtime/theila/controllers"
	"github.com/talos-systems/theila/internal/backend/runtime/theila/resources"
)

// Name is the runtime time.
var Name = common.Runtime_Theila.String()

// Runtime implements Theila internal runtime.
type Runtime struct {
	controllerRuntime *cosiruntime.Runtime
	state             state.State
	logger            *zap.Logger
	ctx               context.Context
	cancel            context.CancelFunc
	eg                errgroup.Group
}

// New creates a new Theila runtime.
func New() (*Runtime, error) {
	logger := logging.With(
		logging.Component("theilaRuntime"),
	)

	inmemState := state.WrapCore(namespaced.NewState(inmem.Build))

	controllerRuntime, err := cosiruntime.NewRuntime(inmemState, logger)
	if err != nil {
		return nil, err
	}

	controllers := []controller.Controller{
		controllers.NewUpgradeController(),
	}

	for _, c := range controllers {
		if err = controllerRuntime.RegisterController(c); err != nil {
			return nil, err
		}
	}

	return &Runtime{
		controllerRuntime: controllerRuntime,
		state:             inmemState,
		logger:            logger,
	}, nil
}

// Run starts underlying COSI controller runtime.
func (r *Runtime) Run(ctx context.Context) {
	r.ctx, r.cancel = context.WithCancel(ctx)

	r.eg.Go(func() error {
		return r.controllerRuntime.Run(ctx)
	})
}

// Shutdown stops the controller runtime.
func (r *Runtime) Shutdown() error {
	if r.cancel == nil {
		return nil
	}

	r.cancel()

	return r.eg.Wait()
}

// Watch implements runtime.Runtime.
func (r *Runtime) Watch(ctx context.Context, request *message.WatchSpec, events chan runtime.Event) error {
	ctx, cancel := context.WithCancel(ctx)

	w := &Watch{
		resource: request.Resource,
		events:   events,
		ctx:      ctx,
		cancel:   cancel,
		state:    r.state,
		logger: r.logger.With(
			zap.String("resource", request.Resource.Type),
			zap.String("namespace", request.Resource.Namespace),
			zap.String("name", request.Resource.Id),
		),
		items: []*runtime.Resource{},
	}

	if err := w.run(ctx); err != nil {
		cancel()

		return err
	}

	return nil
}

// Get implements runtime.Runtime.
func (r *Runtime) Get(ctx context.Context, setters ...runtime.QueryOption) (interface{}, error) {
	opts := runtime.NewQueryOptions(setters...)

	res, err := r.state.Get(ctx, cosiresource.NewMetadata(opts.Namespace, opts.Resource, opts.Name, cosiresource.VersionUndefined))
	if err != nil {
		return nil, err
	}

	return runtime.NewResource(nil, res)
}

// List implements runtime.Runtime.
func (r *Runtime) List(ctx context.Context, setters ...runtime.QueryOption) (interface{}, error) {
	opts := runtime.NewQueryOptions(setters...)

	list, err := r.state.List(ctx, cosiresource.NewMetadata(opts.Namespace, opts.Resource, "", cosiresource.VersionUndefined))
	if err != nil {
		return nil, err
	}

	response := runtime.NewResourceList()

	for _, item := range list.Items {
		r, err := runtime.NewResource(nil, item)
		if err != nil {
			return nil, err
		}

		response.Items = append(response.Items, r)
	}

	return response, nil
}

// Create implements runtime.Runtime.
func (r *Runtime) Create(ctx context.Context, resource cosiresource.Resource, setters ...runtime.QueryOption) error {
	return r.state.Create(ctx, resource)
}

// Update implements runtime.Runtime.
func (r *Runtime) Update(ctx context.Context, resource cosiresource.Resource, setters ...runtime.QueryOption) error {
	current, err := r.state.Get(ctx, resource.Metadata())
	if err != nil {
		return err
	}

	return r.state.Update(ctx, current.Metadata().Version(), resource)
}

// Delete implements runtime.Runtime.
func (r *Runtime) Delete(ctx context.Context, setters ...runtime.QueryOption) error {
	opts := runtime.NewQueryOptions(setters...)

	return r.state.Destroy(ctx, cosiresource.NewMetadata(opts.Namespace, opts.Resource, opts.Name, cosiresource.VersionUndefined))
}

// AddContext implements runtime.Runtime.
func (r *Runtime) AddContext(id string, data []byte) error {
	return nil
}

// GetContext implements runtime.Runtime.
func (r *Runtime) GetContext(ctx context.Context, context *common.Context, cluster *common.Cluster) ([]byte, error) {
	return nil, fmt.Errorf("not supported")
}

// Watch watches Theila resources.
type Watch struct {
	cancel   context.CancelFunc
	ctx      context.Context
	events   chan runtime.Event
	resource *resource.WatchRequest
	state    state.State
	logger   *zap.Logger
	items    []*runtime.Resource
}

//nolint:gocognit
func (w *Watch) run(ctx context.Context) error {
	events := make(chan state.Event)

	opts := []state.WatchOption{}
	if w.resource.TailEvents != 0 {
		opts = append(opts, state.WithTailEvents(int(w.resource.TailEvents)))
	}

	err := w.state.Watch(ctx, cosiresource.NewMetadata(w.resource.Namespace, w.resource.Type, w.resource.Id, cosiresource.VersionUndefined), events, opts...)
	if err != nil {
		return err
	}

	created := func(r *runtime.Resource) {
		w.items = append(w.items, r)
		w.events <- runtime.Event{
			Kind: message.Kind_EventItemAdd,
			Spec: r,
		}
	}

	go func() {
		for {
			select {
			case msg := <-events:
				r, err := runtime.NewResource(nil, msg.Resource)
				if err != nil {
					w.logger.Error("failed to create resource", zap.Error(err))

					continue
				}

				switch msg.Type {
				case state.Created:
					created(r)
				case state.Updated:
					index := sort.Search(len(w.items), func(i int) bool {
						return w.items[i].ID == r.ID
					})

					if index == len(w.items) {
						// when tail events is specified we should never get Created event
						// so the first update should be treated as updated
						if w.resource.TailEvents == 0 {
							w.logger.Error("failed to find an old item in the items cache")
						} else {
							created(r)
						}

						continue
					}

					old := w.items[index]

					w.events <- runtime.Event{
						Kind: message.Kind_EventItemUpdate,
						Spec: &runtime.EventUpdate{
							Old: old,
							New: r,
						},
					}

					w.items[index] = r
				case state.Destroyed:
					index := sort.Search(len(w.items), func(i int) bool {
						return w.items[i].ID == r.ID
					})

					if index == len(w.items) {
						w.logger.Error("failed to find an old item in the items cache")

						continue
					}

					w.events <- runtime.Event{
						Kind: message.Kind_EventItemDelete,
						Spec: r,
					}

					w.items = append(w.items[:index], w.items[index+1:]...)
				}
			case <-ctx.Done():
				return
			}
		}
	}()

	return nil
}

func init() {
	resources := map[cosiresource.Type]protobuf.ResourceUnmarshaler{
		resources.UpgradeK8sTaskType: &resources.UpgradeK8sTask{},
		resources.TaskLogType:        &resources.TaskLog{},
		resources.TaskStatusType:     &resources.TaskStatus{},
	}

	for t, res := range resources {
		if err := protobuf.RegisterResource(t, res); err != nil {
			log.Printf("failed to register resource %s", err)
		}
	}
}
