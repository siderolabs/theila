// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Package kubernetes implements the connector that can pull data from the Kubernetes control plane.
package kubernetes

import (
	"context"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"sync"

	cosiresource "github.com/cosi-project/runtime/pkg/resource"
	"github.com/cosi-project/runtime/pkg/state/impl/inmem"
	"github.com/gertd/go-pluralize"
	"github.com/talos-systems/talos/pkg/machinery/api/resource"
	v1 "k8s.io/api/core/v1"
	"k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
	"k8s.io/client-go/dynamic"
	"k8s.io/client-go/dynamic/dynamicinformer"
	"k8s.io/client-go/rest"
	toolscache "k8s.io/client-go/tools/cache"
	"k8s.io/client-go/tools/clientcmd"
	"sigs.k8s.io/controller-runtime/pkg/client/config"

	"github.com/talos-systems/theila/api/common"
	"github.com/talos-systems/theila/api/rpc"
	"github.com/talos-systems/theila/api/socket/message"
	"github.com/talos-systems/theila/internal/backend/runtime"
	"github.com/talos-systems/theila/internal/backend/runtime/kubernetes/capi"
	"github.com/talos-systems/theila/internal/backend/runtime/theila/resources"
)

// Name kubernetes runtime string id.
var Name = common.Runtime_Kubernetes.String()

// New creates new Runtime.
func New() (*Runtime, error) {
	return &Runtime{
		configs:   map[string]*rest.Config{},
		clients:   map[string]*client{},
		pluralize: pluralize.NewClient(),
	}, nil
}

// Runtime implements runtime.Runtime.
type Runtime struct {
	pluralize *pluralize.Client
	configs   map[string]*rest.Config
	clients   map[string]*client
	configsMu sync.RWMutex
	clientsMu sync.RWMutex
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
		cfg, err = r.GetKubeconfig(ctx, request.Context)
		if err != nil {
			cancel()

			return err
		}
	}

	w := &Watch{
		resource: request.Resource,
		selector: request.Selector,
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
func (r *Runtime) Get(ctx context.Context, setters ...runtime.QueryOption) (interface{}, error) {
	opts := runtime.NewQueryOptions(setters...)

	client, err := r.getOrCreateClient(ctx, opts)
	if err != nil {
		return nil, err
	}

	res, err := client.Get(ctx, opts.Resource, opts.Name, opts.Namespace, metav1.GetOptions{})
	if err != nil {
		return nil, wrapError(err, opts)
	}

	return res, nil
}

// List implements runtime.Runtime.
func (r *Runtime) List(ctx context.Context, setters ...runtime.QueryOption) ([]interface{}, error) {
	opts := runtime.NewQueryOptions(setters...)

	client, err := r.getOrCreateClient(ctx, opts)
	if err != nil {
		return nil, err
	}

	listOpts := metav1.ListOptions{
		LabelSelector: opts.LabelSelector,
		FieldSelector: opts.FieldSelector,
	}

	list, err := client.List(ctx, opts.Resource, opts.Namespace, listOpts)
	if err != nil {
		return nil, wrapError(err, opts)
	}

	res := make([]interface{}, 0, len(list.Items))

	for _, obj := range list.Items {
		obj := obj
		res = append(res, &obj)
	}

	return res, nil
}

// Create implements runtime.Runtime.
func (r *Runtime) Create(ctx context.Context, resource cosiresource.Resource, setters ...runtime.QueryOption) error {
	opts := runtime.NewQueryOptions(setters...)

	client, err := r.getOrCreateClient(ctx, opts)
	if err != nil {
		return err
	}

	obj, err := createObjectFromCosiResource(resource)
	if err != nil {
		return err
	}

	_, err = client.Create(ctx, obj, metav1.CreateOptions{})

	return wrapError(err, opts)
}

// Update implements runtime.Runtime.
func (r *Runtime) Update(ctx context.Context, resource cosiresource.Resource, setters ...runtime.QueryOption) error {
	opts := runtime.NewQueryOptions(setters...)

	client, err := r.getOrCreateClient(ctx, opts)
	if err != nil {
		return err
	}

	obj, err := createObjectFromCosiResource(resource)
	if err != nil {
		return err
	}

	_, err = client.Update(ctx, obj, metav1.UpdateOptions{})

	return wrapError(err, opts)
}

// Delete implements runtime.Runtime.
func (r *Runtime) Delete(ctx context.Context, setters ...runtime.QueryOption) error {
	opts := runtime.NewQueryOptions(setters...)

	client, err := r.getOrCreateClient(ctx, opts)
	if err != nil {
		return err
	}

	return wrapError(client.Delete(ctx, opts.Resource, opts.Name, opts.Namespace, metav1.DeleteOptions{}), opts)
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

// GetContext implements runtime.Runtime.
func (r *Runtime) GetContext(ctx context.Context, context *common.Context, cluster *common.Cluster) ([]byte, error) {
	opts := []runtime.QueryOption{
		runtime.WithName(
			fmt.Sprintf("%s-kubeconfig", cluster.Name),
		),
		runtime.WithResource("secret.v1"),
	}

	if context != nil {
		opts = append(opts, runtime.WithContext(context.Name))
	}

	if cluster.Namespace != "" {
		opts = append(opts, runtime.WithNamespace(cluster.Namespace))
	}

	secret, err := r.Get(
		ctx,
		opts...,
	)
	if err != nil {
		return nil, err
	}

	raw, ok, err := unstructured.NestedString(secret.(*unstructured.Unstructured).Object, "data", "value")
	if err != nil {
		return nil, err
	}

	if !ok {
		return nil, fmt.Errorf("failed to get kubeconfig secret data")
	}

	return base64.StdEncoding.DecodeString(raw)
}

// GetCapiProxy returns capi proxy object.
func (r *Runtime) GetCapiProxy(ctx context.Context, context *common.Context) (*capi.Proxy, error) {
	cfg, err := r.getKubeconfig(context.Name)
	if err != nil {
		return nil, err
	}

	return capi.NewProxy(cfg), nil
}

// GetKubeconfig returns kubeconfig.
func (r *Runtime) GetKubeconfig(ctx context.Context, context *common.Context) (*rest.Config, error) {
	if context == nil || context.Cluster == nil {
		return nil, fmt.Errorf("kubeconfig cluster must specified")
	}

	cluster := context.Cluster

	id := cluster.Uid

	res := func() *rest.Config {
		r.configsMu.RLock()
		defer r.configsMu.RUnlock()

		return r.configs[id]
	}()

	if res != nil {
		return res, nil
	}

	raw, err := r.GetContext(ctx, context, cluster)
	if err != nil {
		return nil, err
	}

	if err = r.AddContext(id, raw); err != nil {
		return nil, err
	}

	r.configsMu.RLock()
	defer r.configsMu.RUnlock()

	return r.configs[id], nil
}

func (r *Runtime) getOrCreateClient(ctx context.Context, opts *runtime.QueryOptions) (*client, error) {
	client, err := r.getClient(opts.Context)
	if err != nil {
		return nil, err
	}

	// initialize the client if it's not initialized and we have Cluster information
	if opts.Cluster != nil {
		_, err = r.GetKubeconfig(ctx, &common.Context{
			Name:    opts.Context,
			Cluster: opts.Cluster,
		})
		if err != nil {
			return nil, err
		}

		client, err = r.getClient(opts.Cluster.Uid)
		if err != nil {
			return nil, err
		}
	}

	return client, nil
}

func (r *Runtime) getClient(id string) (*client, error) {
	if id == "" {
		id = runtime.DefaultClient
	}

	client := func() *client {
		r.clientsMu.Lock()
		defer r.clientsMu.Unlock()

		return r.clients[id]
	}()

	if client != nil {
		return client, nil
	}

	var err error

	defer func() {
		if err == nil {
			r.clientsMu.Lock()
			r.clients[id] = client
			r.clientsMu.Unlock()
		}
	}()

	cfg, err := r.getKubeconfig(id)
	if err != nil {
		return nil, err
	}

	client, err = newClient(cfg)
	if err != nil {
		return nil, err
	}

	return client, nil
}

func (r *Runtime) getKubeconfig(id string) (*rest.Config, error) {
	r.configsMu.RLock()
	defer r.configsMu.RUnlock()

	if r.configs[id] != nil {
		return r.configs[id], nil
	}

	ctxID := id
	if id == runtime.DefaultClient {
		ctxID = ""
	}

	// then fall back to the local kubeconfig
	cfg, err := config.GetConfigWithContext(ctxID)
	if err != nil {
		return nil, err
	}

	return cfg, nil
}

// Watch watches kubernetes resources.
type Watch struct {
	cancel   context.CancelFunc
	ctx      context.Context
	config   *rest.Config
	events   chan runtime.Event
	resource *resource.WatchRequest
	selector string
}

func (w *Watch) run(ctx context.Context) error {
	dc, err := dynamic.NewForConfig(w.config)
	if err != nil {
		return err
	}

	namespace := v1.NamespaceAll
	if w.resource.Namespace != "" {
		namespace = w.resource.Namespace
	}

	var filter dynamicinformer.TweakListOptionsFunc
	if w.selector != "" {
		filter = func(options *metav1.ListOptions) {
			options.LabelSelector = w.selector
		}
	}

	dynamicInformer := dynamicinformer.NewFilteredDynamicSharedInformerFactory(dc, 0, namespace, filter)

	gvr, err := getGVR(w.resource.Type)
	if err != nil {
		return err
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
	}()

	dynamicInformer.WaitForCacheSync(ctx.Done())

	return nil
}

func wrapError(err error, opts *runtime.QueryOptions) error {
	md := cosiresource.NewMetadata(opts.Namespace, opts.Resource, opts.Name, cosiresource.VersionUndefined)

	switch {
	case errors.IsConflict(err):
		fallthrough
	case errors.IsAlreadyExists(err):
		return inmem.ErrAlreadyExists(md)
	case errors.IsNotFound(err):
		return inmem.ErrNotFound(md)
	}

	return err
}

func createObjectFromCosiResource(resource cosiresource.Resource) (*unstructured.Unstructured, error) {
	var data string

	if resource.Metadata().Type() != resources.KubernetesResourceType {
		return nil, fmt.Errorf("kubernetes runtime accepts only %s type as an input, got %s", resources.KubernetesResourceType, resource.Metadata().Type())
	}

	var (
		res *rpc.KubernetesResourceSpec
		ok  bool
	)

	if res, ok = resource.Spec().(*rpc.KubernetesResourceSpec); !ok {
		return nil, fmt.Errorf("failed to convert spec to KubernetesResourceSpec")
	}

	data = res.Spec

	obj := &unstructured.Unstructured{}
	if err := json.Unmarshal([]byte(data), &obj.Object); err != nil {
		return nil, err
	}

	return obj, nil
}
