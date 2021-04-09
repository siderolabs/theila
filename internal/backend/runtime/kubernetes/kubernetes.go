// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Package kubernetes implements the connector that can pull data from the Kubernetes control plane.
package kubernetes

import (
	"context"
	"fmt"
	"strings"

	v1 "k8s.io/api/core/v1"
	"k8s.io/apimachinery/pkg/runtime/schema"
	"k8s.io/client-go/dynamic"
	"k8s.io/client-go/dynamic/dynamicinformer"
	"k8s.io/client-go/rest"
	toolscache "k8s.io/client-go/tools/cache"
	"sigs.k8s.io/controller-runtime/pkg/client/config"

	"github.com/talos-systems/theila/internal/backend/runtime"
)

// Name kubernetes runtime string id.
const Name = "kubernetes"

// New creates new Runtime.
func New() *Runtime {
	return &Runtime{}
}

// Runtime implements runtime.Runtime.
type Runtime struct{}

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
	events   chan runtime.Event
	resource string
}

func (w *Watch) run(ctx context.Context) error {
	dc, err := dynamic.NewForConfig(w.config)
	if err != nil {
		return err
	}

	dynamicInformer := dynamicinformer.NewFilteredDynamicSharedInformerFactory(dc, 0, v1.NamespaceAll, nil)

	var gvr *schema.GroupVersionResource

	parts := strings.Split(w.resource, ".")

	if len(parts) == 2 {
		gvr = &schema.GroupVersionResource{
			Resource: parts[0],
			Version:  parts[1],
		}
	} else {
		gvr, _ = schema.ParseResourceArg(w.resource)
	}

	if gvr == nil {
		return fmt.Errorf("couldn't parse resource name")
	}

	informer := dynamicInformer.ForResource(*gvr)

	if err := informer.Informer().SetWatchErrorHandler(func(reflector *toolscache.Reflector, e error) {
		w.events <- runtime.Event{
			Kind: runtime.EventError,
			Spec: e.Error(),
		}
	}); err != nil {
		return err
	}

	informer.Informer().AddEventHandler(toolscache.ResourceEventHandlerFuncs{
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

	go func() {
		dynamicInformer.Start(ctx.Done())

		<-ctx.Done()
	}()

	return nil
}
