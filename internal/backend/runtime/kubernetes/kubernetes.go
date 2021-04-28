// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Package kubernetes implements the connector that can pull data from the Kubernetes control plane.
package kubernetes

import (
	"context"
	"fmt"
	"strings"
	"sync"

	v1 "k8s.io/api/core/v1"
	"k8s.io/apimachinery/pkg/labels"
	k8sruntime "k8s.io/apimachinery/pkg/runtime"
	"k8s.io/apimachinery/pkg/runtime/schema"
	"k8s.io/apimachinery/pkg/types"
	"k8s.io/client-go/dynamic"
	"k8s.io/client-go/dynamic/dynamicinformer"
	"k8s.io/client-go/rest"
	toolscache "k8s.io/client-go/tools/cache"
	"k8s.io/client-go/tools/clientcmd"
	runtimeclient "sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/client/config"

	"github.com/talos-systems/theila/api/socket/message"
	"github.com/talos-systems/theila/internal/backend/runtime"
)

// Name kubernetes runtime string id.
var Name = message.Source_Kubernetes.String()

// New creates new Runtime.
func New() *Runtime {
	return &Runtime{
		configs: map[string]*rest.Config{},
	}
}

// Runtime implements runtime.Runtime.
type Runtime struct {
	configs   map[string]*rest.Config
	configsMu sync.RWMutex
}

// Watch creates new kubernetes watch.
func (r *Runtime) Watch(ctx context.Context, request *message.WatchSpec, events chan runtime.Event) error {
	var (
		cfg         *rest.Config
		err         error
		contextName string
	)

	if request.Context != nil {
		contextName = request.Context.Name
	}

	cfg, err = config.GetConfigWithContext(contextName)
	if err != nil {
		return err
	}

	ctx, cancel := context.WithCancel(ctx)

	if request.Context != nil && request.Context.Cluster != nil {
		cfg, err = r.getKubeconfig(ctx, request.Context.Cluster)
		if err != nil {
			cancel()

			return err
		}
	}

	w := &Watch{
		resource: request.Resource,
		events:   events,
		config:   cfg,
		ctx:      ctx,
		cancel:   cancel,
	}

	if err := w.run(ctx); err != nil {
		cancel()

		return err
	}

	return nil
}

// Get implements runtime.Runtime.
func (r *Runtime) Get(ctx context.Context, dest interface{}, setters ...runtime.QueryOption) error {
	opts := runtime.NewQueryOptions(setters...)

	client, err := r.getClient(opts.Context)
	if err != nil {
		// initialize the client if it's not initialized and we have Cluster information
		if opts.Cluster != nil {
			_, err = r.getKubeconfig(ctx, opts.Cluster)
			if err != nil {
				return err
			}

			client, err = r.getClient(opts.Context)
			if err != nil {
				return err
			}
		} else {
			return err
		}
	}

	object, ok := dest.(k8sruntime.Object)
	if !ok {
		return fmt.Errorf("dest must be Kubernetes runtime.Object")
	}

	if opts.Name != "" {
		err = client.Get(ctx, types.NamespacedName{
			Namespace: opts.Namespace,
			Name:      opts.Name,
		}, object)
	} else {
		selector := labels.NewSelector()

		if opts.LabelSelector != "" {
			selector, err = labels.Parse(opts.LabelSelector)
			if err != nil {
				return err
			}
		}

		err = client.List(ctx, object, runtimeclient.MatchingLabelsSelector{
			Selector: selector,
		})
	}

	if err != nil {
		return err
	}

	return nil
}

// AddContext implements runtime.Runtime.
func (r *Runtime) AddContext(id string, data []byte) error {
	c, err := clientcmd.RESTConfigFromKubeConfig(data)
	if err != nil {
		return err
	}

	r.configsMu.Lock()
	r.configs[id] = c
	r.configsMu.Unlock()

	return nil
}

func (r *Runtime) getKubeconfig(ctx context.Context, cluster *message.Cluster) (*rest.Config, error) {
	id := cluster.Uid

	res := func() *rest.Config {
		r.configsMu.RLock()
		defer r.configsMu.RUnlock()

		return r.configs[id]
	}()

	if res != nil {
		return res, nil
	}

	var err error

	secret := &v1.Secret{}

	opts := []runtime.QueryOption{
		runtime.WithName(
			fmt.Sprintf("%s-kubeconfig", cluster.Name),
		),
	}

	if cluster.Namespace != "" {
		opts = append(opts, runtime.WithNamespace(cluster.Namespace))
	}

	err = r.Get(
		ctx,
		secret,
		opts...,
	)
	if err != nil {
		return nil, err
	}

	raw, ok := secret.Data["value"]
	if !ok {
		return nil, fmt.Errorf("expected kubeconfig to be placed under 'value' in secret, but nothing was found")
	}

	if err = r.AddContext(id, raw); err != nil {
		return nil, err
	}

	r.configsMu.RLock()
	defer r.configsMu.RUnlock()

	return r.configs[id], nil
}

func (r *Runtime) getClient(id string) (runtimeclient.Client, error) {
	// first try cached kubeconfigs for discovered clusters.
	if r.configs[id] != nil {
		return getClient(r.configs[id])
	}

	// then fall back to the local kubeconfig
	cfg, err := config.GetConfigWithContext(id)
	if err != nil {
		return nil, err
	}

	return getClient(cfg)
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
			Kind: message.Kind_EventError,
			Spec: e.Error(),
		}
	}); err != nil {
		return err
	}

	informer.Informer().AddEventHandler(toolscache.ResourceEventHandlerFuncs{
		AddFunc: func(obj interface{}) {
			w.events <- runtime.Event{
				Kind: message.Kind_EventItemAdd,
				Spec: obj,
			}
		},
		UpdateFunc: func(oldObj, newObj interface{}) {
			w.events <- runtime.Event{
				Kind: message.Kind_EventItemUpdate,
				Spec: &runtime.EventUpdate{
					Old: oldObj,
					New: newObj,
				},
			}
		},
		DeleteFunc: func(obj interface{}) {
			w.events <- runtime.Event{
				Kind: message.Kind_EventItemDelete,
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
