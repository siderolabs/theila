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

	noderesource "github.com/cosi-project/runtime/pkg/resource"
	"github.com/cosi-project/runtime/pkg/state"
	cabpt "github.com/talos-systems/cluster-api-bootstrap-provider-talos/api/v1alpha3"
	cacpt "github.com/talos-systems/cluster-api-control-plane-provider-talos/api/v1alpha3"
	sidero "github.com/talos-systems/sidero/app/cluster-api-provider-sidero/api/v1alpha3"
	metal "github.com/talos-systems/sidero/app/metal-controller-manager/api/v1alpha1"
	nodecommon "github.com/talos-systems/talos/pkg/machinery/api/common"
	"github.com/talos-systems/talos/pkg/machinery/api/resource"
	"github.com/talos-systems/talos/pkg/machinery/client"
	clientconfig "github.com/talos-systems/talos/pkg/machinery/client/config"
	"github.com/talos-systems/talos/pkg/machinery/config/configloader"
	"github.com/talos-systems/talos/pkg/machinery/config/types/v1alpha1/generate"
	"go.uber.org/zap"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"gopkg.in/yaml.v3"
	corev1 "k8s.io/api/core/v1"
	"sigs.k8s.io/cluster-api/api/v1alpha3"

	"github.com/talos-systems/theila/api/common"
	"github.com/talos-systems/theila/api/socket/message"
	"github.com/talos-systems/theila/internal/backend/logging"
	"github.com/talos-systems/theila/internal/backend/runtime"
	"github.com/talos-systems/theila/internal/backend/runtime/kubernetes"
)

// Name talos runtime string id.
var Name = common.Source_Talos.String()

// ResourceList wraps multiple items responses from Talos resource API into a struct which is similar to what we have in Kubernetes.
type ResourceList struct {
	Items []*Resource `json:"items"`
}

// Resource wraps Talos resource response to be encoded as JSON.
type Resource struct {
	Metadata map[string]interface{} `yaml:"metadata" json:"metadata"`
	Spec     map[string]interface{} `yaml:"spec" json:"spec"`
	ID       string                 `yaml:"-" json:"-"`
}

func newResource(m *nodecommon.Metadata, r noderesource.Resource) (*Resource, error) {
	s, err := noderesource.MarshalYAML(r)
	if err != nil {
		return nil, err
	}

	data, err := yaml.Marshal(s)
	if err != nil {
		return nil, err
	}

	parts := []string{}
	if m != nil {
		parts = append(parts, m.Hostname)
	}

	parts = append(parts, r.Metadata().Namespace(), r.Metadata().ID())

	res := &Resource{
		ID: strings.Join(parts, "/"),
	}
	if err = yaml.Unmarshal(data, &res); err != nil {
		return nil, err
	}

	if m != nil {
		res.Metadata["node"] = m.GetHostname()
	}

	return res, nil
}

// Runtime implements runtime.Runtime for Talos resources.
type Runtime struct {
	clients   map[string]*client.Client
	config    *clientconfig.Config
	logger    *zap.Logger
	configMu  sync.Mutex
	clientsMu sync.RWMutex
}

// New creates new Talos runtime.
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
		items: []*Resource{},
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

	if len(resources) == 1 {
		return newResource(resources[0].Metadata, resources[0].Resource)
	}

	l := &ResourceList{
		Items: make([]*Resource, len(resources)),
	}

	for i, r := range resources {
		r := r

		l.Items[i], err = newResource(r.Metadata, r.Resource)
		if err != nil {
			return nil, err
		}
	}

	return l, nil
}

// List implements runtime.Runtime.
func (r *Runtime) List(ctx context.Context, setters ...runtime.QueryOption) (interface{}, error) {
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

	res := &ResourceList{
		Items: []*Resource{},
	}

	for {
		info, err := listClient.Recv()
		if err != nil {
			if err == io.EOF || status.Code(err) == codes.Canceled { //nolint:errorlint
				break
			}

			return nil, fmt.Errorf("error streaming results: %w", err)
		}

		if info.Metadata.Error != "" {
			return nil, fmt.Errorf(info.Metadata.Error)
		}

		r, err := newResource(info.Metadata, info.Resource)
		if err != nil {
			return nil, err
		}

		res.Items = append(res.Items, r)
	}

	return res, nil
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
func (r *Runtime) GetContext(ctx context.Context, cluster *common.Cluster) ([]byte, error) {
	err := r.fetchTalosconfig(ctx, runtime.DefaultClient, cluster)
	if err != nil {
		return nil, err
	}

	config, err := r.getConfig()
	if err != nil {
		return nil, err
	}

	contextName := cluster.Uid

	// extract only specified context into a separate config.
	context := config.Contexts[contextName]

	config = &clientconfig.Config{
		Context: contextName,
		Contexts: map[string]*clientconfig.Context{
			contextName: context,
		},
	}

	return config.Bytes()
}

func (r *Runtime) getClient(ctx context.Context, name string, cluster *common.Cluster) (*client.Client, error) {
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
	k8s, err := runtime.Get(kubernetes.Name)
	if err != nil {
		return err
	}

	cfg, err := r.getConfig()
	if err != nil {
		return err
	}

	if clusterCtx == nil {
		if _, ok := cfg.Contexts[name]; ok && name != runtime.DefaultClient {
			return fmt.Errorf("no context with name %v found in the config", name)
		}

		return nil
	}

	res, err := k8s.Get(ctx,
		runtime.WithType(v1alpha3.Cluster{}),
		runtime.WithName(clusterCtx.Name),
		runtime.WithNamespace(clusterCtx.Namespace),
	)
	if err != nil {
		return fmt.Errorf("failed to get cluster %w", err)
	}

	cluster, ok := res.(*v1alpha3.Cluster)
	if !ok {
		return fmt.Errorf("failed to convert the response to v1alpha3.Cluster")
	}

	id := string(cluster.UID)
	if _, ok = cfg.Contexts[id]; ok {
		return nil
	}

	res, err = k8s.Get(ctx,
		runtime.WithNamespace(cluster.Spec.ControlPlaneRef.Namespace),
		runtime.WithName(cluster.Spec.ControlPlaneRef.Name),
		runtime.WithType(cacpt.TalosControlPlane{}),
	)
	if err != nil {
		return fmt.Errorf("failed to controlplane %w", err)
	}

	controlplane, ok := res.(*cacpt.TalosControlPlane)
	if !ok {
		return fmt.Errorf("failed to convert the response to cacpt.TalosControlPlane")
	}

	res, err = k8s.List(ctx,
		runtime.WithLabelSelector(controlplane.Status.Selector),
		runtime.WithType(v1alpha3.MachineList{}),
	)
	if err != nil {
		return fmt.Errorf("failed to get talos control plane %w", err)
	}

	machines, ok := res.(*v1alpha3.MachineList)
	if !ok {
		return fmt.Errorf("failed to convert the response to v1alpha3.MachineList")
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

			var metalMachine *sidero.MetalMachine

			r, e := k8s.Get(ctx,
				runtime.WithNamespace(machine.Spec.InfrastructureRef.Namespace),
				runtime.WithName(machine.Spec.InfrastructureRef.Name),
				runtime.WithType(sidero.MetalMachine{}),
			)
			if e != nil {
				return nil, e
			}

			metalMachine, ok = r.(*sidero.MetalMachine)
			if !ok {
				return nil, fmt.Errorf("failed to convert the response to sidero.MetalMachine")
			}

			if metalMachine.Spec.ServerRef == nil {
				continue
			}

			if !metalMachine.DeletionTimestamp.IsZero() {
				continue
			}

			var server *metal.Server

			r, e = k8s.Get(ctx,
				runtime.WithNamespace(metalMachine.Spec.ServerRef.Namespace),
				runtime.WithName(metalMachine.Spec.ServerRef.Name),
				runtime.WithType(metal.Server{}),
			)
			if e != nil {
				return nil, e
			}

			server, ok = r.(*metal.Server)
			if !ok {
				return nil, fmt.Errorf("failed to convert the response to metal.Server")
			}

			for _, address := range server.Status.Addresses {
				if address.Type == corev1.NodeInternalIP {
					endpoints = append(endpoints, address.Address)
				}
			}
		}

		return endpoints, nil
	}

	controlPlaneNodes, err := resolveMachinesToIPs(machines)
	if err != nil {
		return fmt.Errorf("failed to resolve machines to IPs %w", err)
	}

	if len(controlPlaneNodes) < 1 {
		return fmt.Errorf("failed to find control plane nodes")
	}

	res, err = k8s.Get(ctx,
		runtime.WithNamespace(configRef.Namespace),
		runtime.WithName(configRef.Name),
		runtime.WithType(cabpt.TalosConfig{}),
	)
	if err != nil {
		return fmt.Errorf("failed to get machines list %w", err)
	}

	talosConfig, ok := res.(*cabpt.TalosConfig)
	if !ok {
		return fmt.Errorf("failed to convert the response to cabpt.TalosConfig")
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
	items    []*Resource
}

//nolint:gocognit
func (w *Watch) run(ctx context.Context) error {
	watchClient, err := w.client.Resources.Watch(ctx, w.resource.Namespace, w.resource.Type, w.resource.Id)
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

			r, err := newResource(msg.Metadata, msg.Resource)
			if err != nil {
				w.logger.Error("failed to create resource", zap.Error(err))

				continue
			}

			switch msg.EventType {
			case state.Created:
				w.items = append(w.items, r)
				w.events <- runtime.Event{
					Kind: message.Kind_EventItemAdd,
					Spec: r,
				}
			case state.Updated:
				index := sort.Search(len(w.items), func(i int) bool {
					return w.items[i].ID == r.ID
				})

				if index == len(w.items) {
					w.logger.Error("failed to find an old item in the items cache")

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
