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

type contextService struct {
	rpc.UnimplementedContextServiceServer
}

func (s *contextService) register(ctx context.Context, server grpc.ServiceRegistrar, mux *gateway.ServeMux, address string, opts []grpc.DialOption) error {
	rpc.RegisterContextServiceServer(server, s)

	return rpc.RegisterContextServiceHandlerFromEndpoint(ctx, mux, address, opts)
}

// List returns the list of locally defined clusters.
func (s *contextService) List(ctx context.Context, in *rpc.ListContextsRequest) (*rpc.ListContextsResponse, error) {
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
