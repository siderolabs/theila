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
	"sync"

	cosiresource "github.com/cosi-project/runtime/pkg/resource"
	"github.com/cosi-project/runtime/pkg/state"
	cabpt "github.com/talos-systems/cluster-api-bootstrap-provider-talos/api/v1alpha3"
	cacpt "github.com/talos-systems/cluster-api-control-plane-provider-talos/api/v1alpha3"
	sidero "github.com/talos-systems/sidero/app/caps-controller-manager/api/v1alpha3"
	metal "github.com/talos-systems/sidero/app/sidero-controller-manager/api/v1alpha1"
	"github.com/talos-systems/talos/pkg/machinery/api/resource"
	"github.com/talos-systems/talos/pkg/machinery/client"
	clientconfig "github.com/talos-systems/talos/pkg/machinery/client/config"
	"github.com/talos-systems/talos/pkg/machinery/config/configloader"
	"github.com/talos-systems/talos/pkg/machinery/config/types/v1alpha1/generate"
	"go.uber.org/zap"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	corev1 "k8s.io/api/core/v1"
	"sigs.k8s.io/cluster-api/api/v1alpha3"

	"github.com/talos-systems/theila/api/common"
	"github.com/talos-systems/theila/api/socket/message"
	"github.com/talos-systems/theila/internal/backend/logging"
	"github.com/talos-systems/theila/internal/backend/runtime"
	"github.com/talos-systems/theila/internal/backend/runtime/kubernetes"
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

	c, err := r.GetClient(ctx, contextName, cluster)
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

	c, err := r.GetClient(ctx, opts.Context, opts.Cluster)
	if err != nil {
		return nil, err
	}

	resources, err := c.Resources.Get(ctx, opts.Namespace, opts.Resource, opts.Name)
	if err != nil {
		return nil, err
	}

	if len(resources) == 1 {
		return runtime.NewResource(resources[0].Metadata, resources[0].Resource)
	}

	l := runtime.NewResourceList()

	for _, r := range resources {
		if r.Resource == nil {
			continue
		}

		res, err := runtime.NewResource(r.Metadata, r.Resource)
		if err != nil {
			return nil, err
		}

		l.Items = append(l.Items, res)
	}

	return l, nil
}

// List implements runtime.Runtime.
func (r *Runtime) List(ctx context.Context, setters ...runtime.QueryOption) (interface{}, error) {
	opts := runtime.NewQueryOptions(setters...)

	ctx = withNodes(ctx, opts.Nodes)

	c, err := r.GetClient(ctx, opts.Context, opts.Cluster)
	if err != nil {
		return nil, err
	}

	listClient, err := c.Resources.List(ctx, opts.Namespace, opts.Resource)
	if err != nil {
		return nil, err
	}

	response := runtime.NewResourceList()

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

		response.Items = append(response.Items, r)
	}

	return response, nil
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
func (r *Runtime) GetClient(ctx context.Context, name string, cluster *common.Cluster) (*client.Client, error) {
	contextName := runtime.DefaultClient

	switch {
	case cluster != nil:
		contextName = cluster.Uid
	case name != "":
		contextName = name
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

//nolint:gocognit,gocyclo,cyclop
func (r *Runtime) fetchTalosconfig(ctx context.Context, name string, clusterCtx *common.Cluster) error {
	var (
		controlplane = cacpt.TalosControlPlane{}
		machines     = v1alpha3.MachineList{}
		cluster      = v1alpha3.Cluster{}
		metalMachine = sidero.MetalMachine{}
		server       = metal.Server{}
		talosConfig  = cabpt.TalosConfig{}
	)

	k8s, err := runtime.Get(kubernetes.Name)
	if err != nil {
		return err
	}

	cfg, err := r.getConfig()
	if err != nil {
		return err
	}

	if clusterCtx == nil {
		if _, ok := cfg.Contexts[name]; !ok && name != runtime.DefaultClient {
			return fmt.Errorf("no context with name %v found in the config", name)
		}

		return nil
	}

	_, err = k8s.Get(ctx,
		runtime.WithType(&cluster),
		runtime.WithName(clusterCtx.Name),
		runtime.WithNamespace(clusterCtx.Namespace),
	)
	if err != nil {
		return fmt.Errorf("failed to get cluster %w", err)
	}

	id := string(cluster.UID)
	if _, ok := cfg.Contexts[id]; ok {
		return nil
	}

	_, err = k8s.Get(ctx,
		runtime.WithNamespace(cluster.Spec.ControlPlaneRef.Namespace),
		runtime.WithName(cluster.Spec.ControlPlaneRef.Name),
		runtime.WithType(&controlplane),
	)
	if err != nil {
		return fmt.Errorf("failed to controlplane %w", err)
	}

	_, err = k8s.List(ctx,
		runtime.WithLabelSelector(controlplane.Status.Selector),
		runtime.WithType(&machines),
	)
	if err != nil {
		return fmt.Errorf("failed to get talos control plane %w", err)
	}

	if len(machines.Items) < 1 {
		return fmt.Errorf("not enough machines found")
	}

	configRef := machines.Items[0].Spec.Bootstrap.ConfigRef

	resolveMachinesToIPs := func(machines *v1alpha3.MachineList) ([]string, error) {
		var endpoints []string

		for _, machine := range machines.Items {
			if !machine.DeletionTimestamp.IsZero() {
				continue
			}

			if v1alpha3.MachinePhase(machine.Status.Phase) != v1alpha3.MachinePhaseRunning {
				continue
			}

			_, err = k8s.Get(ctx,
				runtime.WithNamespace(machine.Spec.InfrastructureRef.Namespace),
				runtime.WithName(machine.Spec.InfrastructureRef.Name),
				runtime.WithType(&metalMachine),
			)
			if err != nil {
				return nil, err
			}

			if metalMachine.Spec.ServerRef == nil {
				continue
			}

			if !metalMachine.DeletionTimestamp.IsZero() {
				continue
			}

			_, err = k8s.Get(ctx,
				runtime.WithNamespace(metalMachine.Spec.ServerRef.Namespace),
				runtime.WithName(metalMachine.Spec.ServerRef.Name),
				runtime.WithType(&server),
			)
			if err != nil {
				return nil, err
			}

			for _, address := range server.Status.Addresses {
				if address.Type == corev1.NodeInternalIP {
					endpoints = append(endpoints, address.Address)
				}
			}
		}

		return endpoints, nil
	}

	controlPlaneNodes, err := resolveMachinesToIPs(&machines)
	if err != nil {
		return fmt.Errorf("failed to resolve machines to IPs %w", err)
	}

	if len(controlPlaneNodes) < 1 {
		return fmt.Errorf("failed to find control plane nodes")
	}

	_, err = k8s.Get(ctx,
		runtime.WithNamespace(configRef.Namespace),
		runtime.WithName(configRef.Name),
		runtime.WithType(&talosConfig),
	)
	if err != nil {
		return fmt.Errorf("failed to get machines list %w", err)
	}

	var (
		clientConfig *clientconfig.Config
		context      *clientconfig.Context
	)

	if talosConfig.Status.TalosConfig != "" {
		clientConfig, err = clientconfig.FromString(talosConfig.Status.TalosConfig)
		if err != nil {
			return fmt.Errorf("failed to parse client config %w", err)
		}

		context = clientConfig.Contexts[clientConfig.Context]
		delete(clientConfig.Contexts, clientConfig.Context)

		// replace config name with cluster UID
		clientConfig.Context = id
		clientConfig.Contexts[id] = context
	} else {
		// generate it from the machine config
		machineConfig, err := configloader.NewFromBytes([]byte(talosConfig.Spec.Data))
		if err != nil {
			return err
		}

		secrets := generate.NewSecretsBundleFromConfig(generate.NewClock(), machineConfig)

		in := &generate.Input{
			ClusterName: id,
			Certs:       secrets.Certs,
		}

		clientConfig, err = generate.Talosconfig(in)
		if err != nil {
			return err
		}
	}

	context = clientConfig.Contexts[clientConfig.Context]

	context.Endpoints = controlPlaneNodes
	context.Nodes = controlPlaneNodes

	r.configMu.Lock()
	r.config.Merge(clientConfig)
	r.configMu.Unlock()

	return nil
}

func withNodes(ctx context.Context, nodes []string) context.Context {
	if len(nodes) > 0 {
		return client.WithNodes(ctx, nodes...)
	}

	return ctx
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
