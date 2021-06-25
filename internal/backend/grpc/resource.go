// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

package grpc

import (
	"context"
	"encoding/json"
	"fmt"

	gateway "github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"google.golang.org/grpc"

	"github.com/talos-systems/theila/api/common"
	"github.com/talos-systems/theila/api/rpc"
	"github.com/talos-systems/theila/internal/backend/runtime"
)

type clusterResourceServer struct {
	rpc.UnimplementedClusterResourceServiceServer
}

func (s *clusterResourceServer) register(server grpc.ServiceRegistrar) {
	rpc.RegisterClusterResourceServiceServer(server, s)
}

func (s *clusterResourceServer) gateway(ctx context.Context, mux *gateway.ServeMux, address string, opts []grpc.DialOption) error {
	return rpc.RegisterClusterResourceServiceHandlerFromEndpoint(ctx, mux, address, opts)
}

// Get returns resource from cluster using Talos or Kubernetes.
func (s *clusterResourceServer) Get(ctx context.Context, in *rpc.GetFromClusterRequest) (*rpc.GetFromClusterResponse, error) {
	r, err := runtime.Get(in.Source.String())
	if err != nil {
		return nil, err
	}

	opts := withContext(in.Context)

	opts = append(opts, withResource(in.Resource)...)

	if in.Resource.Id != "" {
		opts = append(opts, runtime.WithName(in.Resource.Id))
	}

	res := &rpc.GetFromClusterResponse{}

	result, err := r.Get(ctx, opts...)
	if err != nil {
		return nil, err
	}

	data, err := json.Marshal(result)
	if err != nil {
		return nil, err
	}

	res.Body = string(data)

	return res, nil
}

// List returns resources from cluster using Talos or Kubernetes.
func (s *clusterResourceServer) List(ctx context.Context, in *rpc.ListFromClusterRequest) (*rpc.ListFromClusterResponse, error) {
	r, err := runtime.Get(in.Source.String())
	if err != nil {
		return nil, err
	}

	opts := withContext(in.Context)

	opts = append(opts, withResource(in.Resource)...)

	for _, s := range in.Selectors {
		opts = append(opts, runtime.WithLabelSelector(s))
	}

	res := &rpc.ListFromClusterResponse{}

	result, err := r.List(ctx, opts...)
	if err != nil {
		return nil, err
	}

	data, err := json.Marshal(result)
	if err != nil {
		return nil, err
	}

	res.Messages = []string{
		string(data),
	}

	return res, nil
}

// GetConfig returns kubeconfig or talos config.
// It's a bit more than just getting a resource that's why it has this custom getter.
func (s *clusterResourceServer) GetConfig(ctx context.Context, in *rpc.ConfigRequest) (*rpc.ConfigResponse, error) {
	r, err := runtime.Get(in.Source.String())
	if err != nil {
		return nil, err
	}

	if in.Cluster == nil {
		return nil, fmt.Errorf("cluster is not set")
	}

	res, err := r.GetContext(ctx, in.Context, in.Cluster)
	if err != nil {
		return nil, err
	}

	return &rpc.ConfigResponse{
		Data: string(res),
	}, nil
}

type resource interface {
	GetType() string
	GetNamespace() string
}

func withContext(ctx *common.Context) []runtime.QueryOption {
	opts := []runtime.QueryOption{}
	if ctx == nil {
		return opts
	}

	opts = append(opts, runtime.WithContext(ctx.Name))

	if ctx.Cluster != nil {
		opts = append(opts, runtime.WithCluster(ctx.Cluster))
	}

	if len(ctx.Nodes) > 0 {
		opts = append(opts, runtime.WithNodes(ctx.Nodes...))
	}

	return opts
}

func withResource(r resource) []runtime.QueryOption {
	opts := []runtime.QueryOption{}
	if r == nil {
		return opts
	}

	if r.GetNamespace() != "" {
		opts = append(opts, runtime.WithNamespace(r.GetNamespace()))
	}

	if r.GetType() != "" {
		opts = append(opts, runtime.WithResource(r.GetType()))
	}

	return opts
}
