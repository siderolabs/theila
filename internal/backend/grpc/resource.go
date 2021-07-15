// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

package grpc

import (
	"context"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/cosi-project/runtime/api/v1alpha1"
	"github.com/cosi-project/runtime/pkg/resource/protobuf"
	gateway "github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"github.com/talos-systems/talos/pkg/machinery/api/resource"
	"google.golang.org/grpc"
	"google.golang.org/grpc/metadata"

	"github.com/talos-systems/theila/api/common"
	"github.com/talos-systems/theila/api/rpc"
	"github.com/talos-systems/theila/internal/backend/grpc/router"
	"github.com/talos-systems/theila/internal/backend/runtime"
)

type resourceServer struct {
	rpc.UnimplementedResourceServiceServer
}

func (s *resourceServer) register(server grpc.ServiceRegistrar) {
	rpc.RegisterResourceServiceServer(server, s)
}

func (s *resourceServer) gateway(ctx context.Context, mux *gateway.ServeMux, address string, opts []grpc.DialOption) error {
	return rpc.RegisterResourceServiceHandlerFromEndpoint(ctx, mux, address, opts)
}

// Get returns resource from cluster using Talos or Kubernetes.
func (s *resourceServer) Get(ctx context.Context, in *resource.GetRequest) (*rpc.GetResponse, error) {
	r, err := runtime.Get(getSource(ctx).String())
	if err != nil {
		return nil, err
	}

	opts := withContext(router.ExtractContext(ctx))

	opts = append(opts, withResource(in)...)

	if in.Id != "" {
		opts = append(opts, runtime.WithName(in.Id))
	}

	res := &rpc.GetResponse{}

	md, _ := metadata.FromIncomingContext(ctx)

	if nodes := md.Get("nodes"); nodes != nil {
		opts = append(opts, runtime.WithNodes(nodes...))
	}

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
func (s *resourceServer) List(ctx context.Context, in *resource.ListRequest) (*rpc.ListResponse, error) {
	r, err := runtime.Get(getSource(ctx).String())
	if err != nil {
		return nil, err
	}

	opts := withContext(router.ExtractContext(ctx))

	opts = append(opts, withResource(in)...)

	md, _ := metadata.FromIncomingContext(ctx)

	for _, s := range md.Get("selectors") {
		for _, condition := range strings.Split(s, ",") {
			opts = append(opts, runtime.WithLabelSelector(condition))
		}
	}

	res := &rpc.ListResponse{}

	if nodes := md.Get("nodes"); nodes != nil {
		opts = append(opts, runtime.WithNodes(nodes...))
	}

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

// Create a new resource in Theila runtime or Kubernetes.
func (s *resourceServer) Create(ctx context.Context, in *rpc.CreateRequest) (*rpc.CreateResponse, error) {
	r, err := runtime.Get(getSource(ctx).String())
	if err != nil {
		return nil, err
	}

	populateResource(in.Resource)

	opts := withContext(router.ExtractContext(ctx))

	protoR, err := protobuf.Unmarshal(in.Resource)
	if err != nil {
		return nil, err
	}

	obj, err := protobuf.UnmarshalResource(protoR)
	if err != nil {
		return nil, err
	}

	if err = r.Create(ctx, obj, opts...); err != nil {
		return nil, err
	}

	return &rpc.CreateResponse{}, nil
}

// Update a resource in Theila runtime or Kubernetes.
func (s *resourceServer) Update(ctx context.Context, in *rpc.UpdateRequest) (*rpc.UpdateResponse, error) {
	r, err := runtime.Get(getSource(ctx).String())
	if err != nil {
		return nil, err
	}

	populateResource(in.Resource)

	opts := withContext(router.ExtractContext(ctx))

	if in.CurrentVersion != "" {
		opts = append(opts, runtime.WithCurrentVersion(in.CurrentVersion))
	}

	protoR, err := protobuf.Unmarshal(in.Resource)
	if err != nil {
		return nil, err
	}

	obj, err := protobuf.UnmarshalResource(protoR)
	if err != nil {
		return nil, err
	}

	if err = r.Update(ctx, obj, opts...); err != nil {
		return nil, err
	}

	return &rpc.UpdateResponse{}, nil
}

// Delete a resource in Theila runtime or Kubernetes.
func (s *resourceServer) Delete(ctx context.Context, in *rpc.DeleteRequest) (*rpc.DeleteResponse, error) {
	r, err := runtime.Get(getSource(ctx).String())
	if err != nil {
		return nil, err
	}

	opts := withContext(router.ExtractContext(ctx))

	opts = append(opts,
		runtime.WithNamespace(in.Namespace),
		runtime.WithName(in.Id),
		runtime.WithResource(in.Type),
	)

	if err = r.Delete(ctx, opts...); err != nil {
		return nil, err
	}

	return &rpc.DeleteResponse{}, nil
}

// GetConfig returns kubeconfig or talos config.
// It's a bit more than just getting a resource that's why it has this custom getter.
func (s *resourceServer) GetConfig(ctx context.Context, cluster *common.Cluster) (*rpc.ConfigResponse, error) {
	r, err := runtime.Get(getSource(ctx).String())
	if err != nil {
		return nil, err
	}

	context := router.ExtractContext(ctx)
	if context == nil {
		return nil, fmt.Errorf("context parameters are required for the config request")
	}

	res, err := r.GetContext(ctx, context, cluster)
	if err != nil {
		return nil, err
	}

	return &rpc.ConfigResponse{
		Data: string(res),
	}, nil
}

func getSource(ctx context.Context) common.Runtime {
	if md, ok := metadata.FromIncomingContext(ctx); ok {
		source := md.Get("runtime")
		if source != nil {
			if res, ok := common.Runtime_value[source[0]]; ok {
				return common.Runtime(res)
			}
		}
	}

	return common.Runtime_Kubernetes
}

type res interface {
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

	return opts
}

func withResource(r res) []runtime.QueryOption {
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

func populateResource(resource *v1alpha1.Resource) {
	if resource.Metadata.Version == "" {
		resource.Metadata.Version = "1"
	}

	resource.Metadata.Phase = "running"
}
