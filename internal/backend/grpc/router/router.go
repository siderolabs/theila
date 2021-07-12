// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Package router defines gRPC proxy helpers.
package router

import (
	"context"
	"fmt"
	"strings"
	"sync"

	"github.com/talos-systems/grpc-proxy/proxy"
	"google.golang.org/grpc"
	"google.golang.org/grpc/metadata"

	"github.com/talos-systems/theila/api/common"
	"github.com/talos-systems/theila/internal/backend/runtime"
	"github.com/talos-systems/theila/internal/backend/runtime/talos"
)

// Router wraps grpc-proxy StreamDirector.
type Router struct {
	local      proxy.Backend
	backends   map[string]proxy.Backend
	backendsMu sync.Mutex
}

// NewRouter builds new Router.
func NewRouter(local proxy.Backend) *Router {
	return &Router{
		local:    local,
		backends: map[string]proxy.Backend{},
	}
}

// Register is no-op to implement factory.Registrator interface.
//
// Actual proxy handler is installed via grpc.UnknownServiceHandler option.
func (r *Router) Register(srv *grpc.Server) {
}

// Director implements proxy.StreamDirector function.
func (r *Router) Director(ctx context.Context, fullMethodName string) (proxy.Mode, []proxy.Backend, error) {
	if strings.HasPrefix(fullMethodName, "/machine.MachineService") {
		md, ok := metadata.FromIncomingContext(ctx)
		if !ok {
			return proxy.One2One, nil, fmt.Errorf("machine requests require metadata to be defined in the request")
		}

		if runtime := md.Get("runtime"); runtime != nil && runtime[0] == common.Runtime_Talos.String() {
			backends, err := r.getTalosBackend(ctx, md)
			if err != nil {
				return proxy.One2One, nil, err
			}

			return proxy.One2One, backends, nil
		}
	}

	return proxy.One2One, []proxy.Backend{r.local}, nil
}

func (r *Router) getTalosBackend(ctx context.Context, md metadata.MD) ([]proxy.Backend, error) {
	r.backendsMu.Lock()
	defer r.backendsMu.Unlock()

	var cluster *common.Cluster

	contextName := runtime.DefaultClient

	if context := extractContext(md); context != nil {
		contextName = context.Name

		cluster = context.Cluster
	}

	parts := []string{contextName}
	if cluster != nil {
		parts = append(parts, cluster.Name, cluster.Namespace, cluster.Uid)
	}

	id := strings.Join(parts, ",")

	if b, ok := r.backends[id]; ok {
		return []proxy.Backend{b}, nil
	}

	talosRuntime, err := runtime.Get(talos.Name)
	if err != nil {
		return nil, err
	}

	t, ok := talosRuntime.(*talos.Runtime)
	if !ok {
		return nil, fmt.Errorf("failed to get talos runtime")
	}

	client, err := t.GetClient(ctx, contextName, cluster)
	if err != nil {
		return nil, err
	}

	conn, err := client.GetConn(ctx, grpc.WithCodec(proxy.Codec())) //nolint:staticcheck
	if err != nil {
		return nil, err
	}

	b := NewBackend(id, conn)
	r.backends[id] = b

	backends := []proxy.Backend{b}

	return backends, nil
}

// ExtractContext reads cluster context from the supplied metadata.
func ExtractContext(ctx context.Context) *common.Context {
	md, ok := metadata.FromIncomingContext(ctx)
	if !ok {
		return nil
	}

	return extractContext(md)
}

func extractContext(md metadata.MD) *common.Context {
	get := func(key string) string {
		vals := md.Get(key)
		if vals == nil {
			return ""
		}

		return vals[0]
	}

	context := get("context")
	cluster := get("cluster")
	namespace := get("namespace")
	uid := get("uid")

	var c *common.Cluster

	if cluster != "" && namespace != "" && uid != "" {
		c = &common.Cluster{
			Name:      cluster,
			Namespace: namespace,
			Uid:       uid,
		}
	}

	if c == nil && context == "" {
		return nil
	}

	return &common.Context{
		Name:    context,
		Cluster: c,
	}
}
