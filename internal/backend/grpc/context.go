// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

package grpc

import (
	"context"

	gateway "github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"google.golang.org/grpc"

	"github.com/talos-systems/theila/api/rpc"
	"github.com/talos-systems/theila/internal/backend/runtime/kubernetes"
)

type contextServer struct {
	rpc.UnimplementedContextServiceServer
}

func (s *contextServer) register(server grpc.ServiceRegistrar) {
	rpc.RegisterContextServiceServer(server, s)
}

func (s *contextServer) gateway(ctx context.Context, mux *gateway.ServeMux, address string, opts []grpc.DialOption) error {
	return rpc.RegisterContextServiceHandlerFromEndpoint(ctx, mux, address, opts)
}

// List returns the list of locally defined clusters.
func (s *contextServer) List(ctx context.Context, in *rpc.ListContextsRequest) (*rpc.ListContextsResponse, error) {
	current, err := kubernetes.CurrentContext()
	if err != nil {
		return nil, err
	}

	contexts, err := kubernetes.GetContexts()
	if err != nil {
		return nil, err
	}

	response := &rpc.ListContextsResponse{
		Current:  current,
		Contexts: contexts,
	}

	return response, nil
}
