// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

package grpc

import (
	"context"

	gateway "github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"github.com/talos-systems/talos/pkg/cluster"
	k8s "github.com/talos-systems/talos/pkg/cluster/kubernetes"
	"google.golang.org/grpc"
	"google.golang.org/protobuf/types/known/emptypb"

	"github.com/siderolabs/theila/api/rpc"
	"github.com/siderolabs/theila/internal/backend/grpc/router"
	"github.com/siderolabs/theila/internal/backend/management"
	"github.com/siderolabs/theila/internal/backend/runtime"
	"github.com/siderolabs/theila/internal/backend/runtime/talos"
	"github.com/siderolabs/theila/internal/backend/runtime/theila"
	"github.com/siderolabs/theila/internal/backend/runtime/theila/resources"
)

type managementServer struct {
	rpc.UnimplementedManagementServiceServer
}

func (s *managementServer) register(server grpc.ServiceRegistrar) {
	rpc.RegisterManagementServiceServer(server, s)
}

func (s *managementServer) gateway(ctx context.Context, mux *gateway.ServeMux, address string, opts []grpc.DialOption) error {
	return rpc.RegisterManagementServiceHandlerFromEndpoint(ctx, mux, address, opts)
}

// UpgradeInfo returns the provided cluster upgrade information: current k8s version and latest k8s version.
func (s *managementServer) UpgradeInfo(ctx context.Context, in *emptypb.Empty) (*rpc.UpgradeInfoResponse, error) {
	context := router.ExtractContext(ctx)
	ctx = talos.WithNodes(ctx, context)

	clientProvider, err := management.NewUpgradeClientProvider(ctx, context)
	if err != nil {
		return nil, err
	}

	state := struct {
		cluster.ClientProvider
		cluster.K8sProvider
	}{
		ClientProvider: clientProvider,
		K8sProvider: &cluster.KubernetesClient{
			ClientProvider: clientProvider,
		},
	}

	fromVersion, detectErr := k8s.DetectLowestVersion(ctx, &state, k8s.UpgradeOptions{})
	if detectErr != nil {
		// try to detect lowest version from an ongoing upgrade task
		theila, err := runtime.Get(theila.Name)
		if err != nil {
			return nil, detectErr
		}

		items, err := theila.List(ctx, runtime.WithResource(resources.UpgradeK8sTaskType))
		if err != nil {
			return nil, detectErr
		}

		if len(items) == 0 {
			return nil, detectErr
		}

		for _, item := range items {
			upgradeTask, ok := item.(*runtime.Resource).Resource.(*resources.TaskStatus)
			if !ok {
				return nil, detectErr
			}

			if upgradeTask.TypedSpec().Phase == rpc.TaskStatusSpec_RUNNING {
				fromVersion = upgradeTask.TypedSpec().FromVersion
			}
		}
	}

	return &rpc.UpgradeInfoResponse{
		FromVersion: fromVersion,
	}, nil
}
