// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Package grpc implements gRPC server.
package grpc

import (
	"context"
	"errors"
	"fmt"
	"net"
	"net/http"
	"time"

	gateway "github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"go.uber.org/zap"
	"google.golang.org/grpc"

	"github.com/talos-systems/theila/api/rpc"
	"github.com/talos-systems/theila/internal/backend/logging"
)

const gRPCPort = 9052

// Server implements grpc server.
type Server struct {
	rpc.UnimplementedClusterResourceServiceServer
	logger  *zap.Logger
	ctx     context.Context
	cancel  context.CancelFunc
	stopped chan struct{}
	servers []grpcServer
}

type grpcServer interface {
	register(context.Context, grpc.ServiceRegistrar, *gateway.ServeMux, string, []grpc.DialOption) error
}

// New creates new grpc server and registers all routes.
func New(ctx context.Context, mux *http.ServeMux) (*Server, error) {
	ctx, cancel := context.WithCancel(ctx)

	s := &Server{
		logger: logging.With(
			logging.Component("grpc"),
		),
		ctx:     ctx,
		cancel:  cancel,
		stopped: make(chan struct{}),
		servers: []grpcServer{
			&clusterResourceServer{},
		},
	}

	grpcAddress := fmt.Sprintf("127.0.0.1:%d", gRPCPort)

	server := grpc.NewServer()

	marshaller := &gateway.JSONPb{}
	runtimeMux := gateway.NewServeMux(
		gateway.WithMarshalerOption(gateway.MIMEWildcard, marshaller),
	)
	opts := []grpc.DialOption{grpc.WithInsecure()}

	for _, grpcServer := range s.servers {
		err := grpcServer.register(ctx, server, runtimeMux, grpcAddress, opts)
		if err != nil {
			cancel()

			return nil, err
		}
	}

	mux.Handle("/api/", http.StripPrefix("/api", runtimeMux))

	s.logger.Sugar().Infof("serve gRPC at %s", grpcAddress)

	listener, err := net.Listen("tcp", grpcAddress)
	if err != nil {
		cancel()

		return nil, err
	}

	go func() {
		for {
			err := server.Serve(listener)
			if err == nil || errors.Is(err, grpc.ErrServerStopped) {
				break
			}

			s.logger.Error("failed to serve gRPC", zap.Error(err))
		}
	}()

	go func() {
		<-ctx.Done()

		defer close(s.stopped)

		go func() {
			<-time.After(time.Second * 30)
			server.Stop()
		}()

		server.GracefulStop()
		s.logger.Info("stopped gRPC server")
	}()

	return s, nil
}

// Shutdown waits until the grpc server is stopped.
func (s *Server) Shutdown() {
	s.cancel()

	<-s.stopped
}
