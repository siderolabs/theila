// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Package kubernetes implements the connector that can pull data from the Kubernetes control plane.
package kubernetes

import (
	"context"
	"fmt"

	"golang.org/x/sync/errgroup"
	k8sruntime "k8s.io/apimachinery/pkg/runtime"
	"k8s.io/client-go/rest"
	toolscache "k8s.io/client-go/tools/cache"
	"sigs.k8s.io/controller-runtime/pkg/cache"
	"sigs.k8s.io/controller-runtime/pkg/client/config"

	"github.com/talos-systems/theila/internal/backend/runtime"
)

// Name kubernetes runtime string id.
const Name = "kubernetes"

// New creates new Runtime.
func New() *Runtime {
	return &Runtime{
		scheme: getScheme(),
	}
}

// Runtime implements runtime.Runtime.
type Runtime struct {
	scheme *k8sruntime.Scheme
}

// Watch creates new kubernetes watch.
func (p *Runtime) Watch(ctx context.Context, resource string, events chan runtime.Event) error {
	config, err := config.GetConfig()
	if err != nil {
		return err
	}

	ctx, cancel := context.WithCancel(ctx)

	w := &Watch{
		resource: resource,
		events:   events,
		config:   config,
		scheme:   p.scheme,
		ctx:      ctx,
		cancel:   cancel,
	}

	if err := w.run(ctx); err != nil {
		cancel()

		return err
	}

	return nil
}

// Watch watches kubernetes resources.
type Watch struct {
	cancel   context.CancelFunc
	ctx      context.Context
	config   *rest.Config
	scheme   *k8sruntime.Scheme
	events   chan runtime.Event
	resource string
}

func (w *Watch) run(ctx context.Context) error {
	obj, ok := Types[w.resource]
	if !ok {
		return fmt.Errorf("unknown resource type %s", w.resource)
	}

	cache, err := cache.New(w.config, cache.Options{Scheme: w.scheme})
	if err != nil {
		return err
	}

	informer, err := cache.GetInformer(ctx, obj)
	if err != nil {
		return err
	}

	informer.AddEventHandler(toolscache.ResourceEventHandlerFuncs{
		AddFunc: func(obj interface{}) {
			w.events <- runtime.Event{
				Kind: runtime.EventItemAdd,
				Spec: obj,
			}
		},
		UpdateFunc: func(oldObj, newObj interface{}) {
			w.events <- runtime.Event{
				Kind: runtime.EventItemUpdate,
				Spec: &runtime.EventUpdate{
					Old: oldObj,
					New: newObj,
				},
			}
		},
		DeleteFunc: func(obj interface{}) {
			w.events <- runtime.Event{
				Kind: runtime.EventItemDelete,
				Spec: obj,
			}
		},
	})

	var eg errgroup.Group

	eg.Go(func() error {
		return cache.Start(ctx)
	})

	if ok := cache.WaitForCacheSync(ctx); !ok {
		w.cancel()

		return fmt.Errorf("failed to sync cache")
	}

	return eg.Wait()
}
