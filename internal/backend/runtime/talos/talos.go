// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Package talos implements the connector that can pull data from the Talos controller runtime.
package talos

import (
	"context"
	"sync"

	"github.com/talos-systems/talos/pkg/machinery/client"
	clientconfig "github.com/talos-systems/talos/pkg/machinery/client/config"

	"github.com/talos-systems/theila/api/socket/message"
	"github.com/talos-systems/theila/internal/backend/runtime"
)

// Name talos runtime string id.
var Name = message.Source_Talos.String()

// Runtime implements runtime.Runtime for Talos resources.
type Runtime struct {
	config   *clientconfig.Config
	configMu sync.Mutex
}

// New creates new Talos runtime.
func New() *Runtime {
	return &Runtime{}
}

// Watch implements runtime.Runtime.
func (r *Runtime) Watch(ctx context.Context, request *message.WatchSpec, events chan runtime.Event) error {
	return nil
}

// Get implements runtime.Runtime.
func (r *Runtime) Get(ctx context.Context, dest interface{}, setters ...runtime.QueryOption) error {
	opts := runtime.NewQueryOptions(setters...)

	if opts.Resource == "kubeconfig" {
		return r.kubeconfig(ctx, opts, dest)
	}

	return nil
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

func (r *Runtime) getClient(ctx context.Context, name string) (*client.Client, error) {
	r.configMu.Lock()
	defer r.configMu.Unlock()

	config, err := r.getConfig()
	if err != nil {
		return nil, err
	}

	opts := []client.OptionFunc{
		client.WithConfig(config),
	}

	if name != "" {
		opts = append(opts, client.WithContextName(name))
	}

	var c *client.Client

	c, err = client.New(ctx, opts...)
	if err != nil {
		return nil, err
	}

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
