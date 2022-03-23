// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Package talos implements the connector that can pull data from the Talos controller runtime.
package talos

import (
	"context"
	"fmt"
	"io"
	"sort"
	"strings"
	"sync"

	cosiresource "github.com/cosi-project/runtime/pkg/resource"
	"github.com/cosi-project/runtime/pkg/state"
	"github.com/talos-systems/talos/pkg/machinery/api/resource"
	"github.com/talos-systems/talos/pkg/machinery/client"
	clientconfig "github.com/talos-systems/talos/pkg/machinery/client/config"
	"go.uber.org/zap"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	"github.com/siderolabs/theila/api/common"
	"github.com/siderolabs/theila/api/socket/message"
	"github.com/siderolabs/theila/internal/backend/logging"
	"github.com/siderolabs/theila/internal/backend/runtime"
)

// Name talos runtime string id.
var Name = common.Runtime_Talos.String()

// Runtime implements runtime.Runtime for Talos resources.
type Runtime struct {
	clients   map[string]*client.Client
	config    *clientconfig.Config
	logger    *zap.Logger
	configMu  sync.Mutex
	clientsMu sync.RWMutex
}

// New creates a new Talos runtime.
func New() *Runtime {
	return &Runtime{
		clients: map[string]*client.Client{},
		logger:  logging.With(logging.Component("talosRuntime")),
	}
}

// Watch implements runtime.Runtime.
func (r *Runtime) Watch(ctx context.Context, request *message.WatchSpec, events chan runtime.Event) error {
	var (
		err         error
		contextName string
		cluster     *common.Cluster
	)

	if request.Context != nil {
		contextName = request.Context.Name

		cluster = request.Context.Cluster

		ctx = withNodes(ctx, request.Context.Nodes)
	}

	c, err := r.getClient(ctx, contextName, cluster)
	if err != nil {
		return err
	}

	ctx, cancel := context.WithCancel(ctx)

	w := &Watch{
		resource: request.Resource,
		events:   events,
		ctx:      ctx,
		cancel:   cancel,
		client:   c,
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

	ctx = withNodes(ctx, opts.Nodes)

	c, err := r.getClient(ctx, opts.Context, opts.Cluster)
	if err != nil {
		return nil, err
	}

	resources, err := c.Resources.Get(ctx, opts.Namespace, opts.Resource, opts.Name)
	if err != nil {
		return nil, err
	}

	for _, r := range resources {
		if r.Resource == nil {
			continue
		}

		return runtime.NewResource(r.Metadata, r.Resource)
	}

	return nil, nil
}

// List implements runtime.Runtime.
func (r *Runtime) List(ctx context.Context, setters ...runtime.QueryOption) ([]interface{}, error) {
	opts := runtime.NewQueryOptions(setters...)

	ctx = withNodes(ctx, opts.Nodes)

	c, err := r.getClient(ctx, opts.Context, opts.Cluster)
	if err != nil {
		return nil, err
	}

	listClient, err := c.Resources.List(ctx, opts.Namespace, opts.Resource)
	if err != nil {
		return nil, err
	}

	res := []interface{}{}

	for {
		info, err := listClient.Recv()
		if err != nil {
			if err == io.EOF || status.Code(err) == codes.Canceled { //nolint:errorlint
				break
			}

			return nil, fmt.Errorf("error streaming results: %w", err)
		}

		if info.Metadata == nil || info.Resource == nil {
			continue
		}

		if info.Metadata.Error != "" {
			return nil, fmt.Errorf(info.Metadata.Error)
		}

		r, err := runtime.NewResource(info.Metadata, info.Resource)
		if err != nil {
			return nil, err
		}

		res = append(res, r)
	}

	return res, nil
}

// Create implements runtime.Runtime.
func (r *Runtime) Create(ctx context.Context, resource cosiresource.Resource, setters ...runtime.QueryOption) error {
	return fmt.Errorf("not implemented")
}

// Update implements runtime.Runtime.
func (r *Runtime) Update(ctx context.Context, resource cosiresource.Resource, setters ...runtime.QueryOption) error {
	return fmt.Errorf("not implemented")
}

// Delete implements runtime.Runtime.
func (r *Runtime) Delete(ctx context.Context, setters ...runtime.QueryOption) error {
	return fmt.Errorf("not implemented")
}

// AddContext implements runtime.Runtime.
func (r *Runtime) AddContext(id string, data []byte) error {
	r.configMu.Lock()
	defer r.configMu.Unlock()

	c, err := clientconfig.FromBytes(data)
	if err != nil {
		return err
	}

	config, err := r.getConfig()
	if err != nil {
		return err
	}

	config.Merge(c)

	return nil
}

// GetContext implements runtime.Runtime.
func (r *Runtime) GetContext(ctx context.Context, context *common.Context, cluster *common.Cluster) ([]byte, error) {
	sourceCtxName := runtime.DefaultClient
	if context != nil {
		sourceCtxName = context.Name
	}

	err := r.fetchTalosconfig(ctx, sourceCtxName, cluster)
	if err != nil {
		return nil, err
	}

	config, err := r.getConfig()
	if err != nil {
		return nil, err
	}

	contextName := cluster.Uid

	// extract only specified context into a separate config.
	res := config.Contexts[contextName]

	config = &clientconfig.Config{
		Context: contextName,
		Contexts: map[string]*clientconfig.Context{
			contextName: res,
		},
	}

	return config.Bytes()
}

// GetClient returns talos client for the context name or CAPI cluster.
func (r *Runtime) GetClient(ctx context.Context, context *common.Context) (*client.Client, error) {
	if context == nil {
		return r.getClient(ctx, runtime.DefaultClient, nil)
	}

	return r.getClient(ctx, context.Name, context.Cluster)
}

func (r *Runtime) getClient(ctx context.Context, name string, cluster *common.Cluster) (*client.Client, error) {
	contextName := runtime.DefaultClient

	switch {
	case cluster != nil:
		contextName = cluster.Uid
	case name != "":
		contextName = name

		// strip <username>@ prefix if any
		parts := strings.Split(contextName, "@")
		contextName = parts[len(parts)-1]
	}

	r.clientsMu.RLock()
	c, ok := r.clients[contextName]
	r.clientsMu.RUnlock()

	if ok {
		return c, nil
	}

	config, err := r.getConfig()
	if err != nil {
		return nil, err
	}

	opts := []client.OptionFunc{
		client.WithConfig(config),
	}

	if cluster != nil {
		err = r.fetchTalosconfig(ctx, name, cluster)
		if err != nil {
			return nil, fmt.Errorf("failed to fetch talosconfig: %w", err)
		}
	}

	if contextName != runtime.DefaultClient {
		opts = append(opts, client.WithContextName(contextName))

		if len(config.Contexts) == 0 || config.Contexts[contextName] == nil {
			return nil, fmt.Errorf("no config for cluster %#v found in ~/.talos/config", contextName)
		}
	}

	r.configMu.Lock()
	defer r.configMu.Unlock()

	c, err = client.New(ctx, opts...)
	if err != nil {
		return nil, err
	}

	r.clientsMu.Lock()
	r.clients[contextName] = c
	r.clientsMu.Unlock()

	return c, nil
}

func (r *Runtime) getConfig() (*clientconfig.Config, error) {
	if r.config == nil {
		var path string

		path, err := clientconfig.GetDefaultPath()
		if err != nil {
			return nil, err
		}

		r.config, err = clientconfig.Open(path)
		if err != nil {
			return nil, err
		}
	}

	return r.config, nil
}

func withNodes(ctx context.Context, nodes []string) context.Context {
	if len(nodes) > 0 {
		return client.WithNodes(ctx, nodes...)
	}

	return ctx
}

// WithNodes returns context with nodes if they are defined.
func WithNodes(ctx context.Context, context *common.Context) context.Context {
	if context == nil {
		return ctx
	}

	return withNodes(ctx, context.Nodes)
}

// Watch watches Talos resources.
type Watch struct {
	cancel   context.CancelFunc
	ctx      context.Context
	events   chan runtime.Event
	resource *resource.WatchRequest
	client   *client.Client
	logger   *zap.Logger
	items    []*runtime.Resource
}

//nolint:gocognit
func (w *Watch) run(ctx context.Context) error {
	watchClient, err := w.client.Resources.WatchRequest(ctx, w.resource)
	if err != nil {
		return err
	}

	go func() {
		for {
			msg, err := watchClient.Recv()
			if err != nil {
				if err == io.EOF || status.Code(err) == codes.Canceled { //nolint:errorlint
					return
				}

				w.events <- runtime.Event{
					Kind: message.Kind_EventError,
					Spec: msg.Metadata.GetError(),
				}

				return
			}

			if msg.Metadata.GetError() != "" {
				w.events <- runtime.Event{
					Kind: message.Kind_EventError,
					Spec: msg.Metadata.GetError(),
				}

				continue
			}

			if msg.Resource == nil {
				continue
			}

			r, err := runtime.NewResource(msg.Metadata, msg.Resource)
			if err != nil {
				w.logger.Error("failed to create resource", zap.Error(err))

				continue
			}

			created := func() {
				w.items = append(w.items, r)
				w.events <- runtime.Event{
					Kind: message.Kind_EventItemAdd,
					Spec: r,
				}
			}

			switch msg.EventType {
			case state.Created:
				created()
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
						created()
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
		}
	}()

	return nil
}
