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
	"github.com/talos-systems/grpc-proxy/proxy"
	"go.uber.org/zap"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"

	"github.com/siderolabs/theila/api/talos/machine"
	"github.com/siderolabs/theila/internal/backend/grpc/router"
	"github.com/siderolabs/theila/internal/backend/logging"
)

// Server implements grpc server.
type Server struct {
	logger  *zap.Logger
	ctx     context.Context
	cancel  context.CancelFunc
	stopped chan struct{}
}

type grpcServer interface {
	register(grpc.ServiceRegistrar)
	gateway(context.Context, *gateway.ServeMux, string, []grpc.DialOption) error
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
	}

	servers := []grpcServer{
		&contextServer{},
		&resourceServer{},
		&managementServer{},
	}

	addr, local, err := s.newServer(servers)
	if err != nil {
		cancel()

		return nil, err
	}

	conn, err := grpc.DialContext(
		ctx,
		"dns:///"+addr,
		grpc.WithTransportCredentials(insecure.NewCredentials()),
		grpc.WithCodec(proxy.Codec()), //nolint: staticcheck
	)
	if err != nil {
		cancel()

		return nil, err
	}

	router := router.NewRouter(
		router.NewBackend("theila", conn),
	)

	var server *grpc.Server

	addr, server, err = s.newServer(
		nil,
		grpc.CustomCodec(proxy.Codec()), //nolint:staticcheck
		grpc.UnknownServiceHandler(
			proxy.TransparentHandler(
				router.Director,
			)),
	)

	if err != nil {
		cancel()

		return nil, err
	}

	marshaller := &gateway.JSONPb{}
	runtimeMux := gateway.NewServeMux(
		gateway.WithMarshalerOption(gateway.MIMEWildcard, marshaller),
	)
	opts := []grpc.DialOption{
		grpc.WithTransportCredentials(insecure.NewCredentials()),
	}

	for _, srv := range servers {
		err = srv.gateway(ctx, runtimeMux, addr, opts)
		if err != nil {
			cancel()

			return nil, err
		}
	}

	if err = machine.RegisterMachineServiceHandlerFromEndpoint(ctx, runtimeMux, addr, opts); err != nil {
		cancel()

		return nil, err
	}

	mux.Handle("/api/", http.StripPrefix("/api", runtimeMux))

	s.logger.Sugar().Infof("serve gRPC at %s", addr)

	go func() {
		<-ctx.Done()

		defer close(s.stopped)

		for _, srv := range []*grpc.Server{local, server} {
			srv := srv

			go func() {
				<-time.After(time.Second * 30)
				srv.Stop()
			}()

			srv.GracefulStop()
			s.logger.Info("stopped gRPC server")
		}
	}()

	return s, nil
}

func (s *Server) newServer(servers []grpcServer, opts ...grpc.ServerOption) (string, *grpc.Server, error) {
	listener, err := net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		return "", nil, err
	}

	gRPCPort := listener.Addr().(*net.TCPAddr).Port

	grpcAddress := fmt.Sprintf("127.0.0.1:%d", gRPCPort)

	server := grpc.NewServer(opts...)

	for _, srv := range servers {
		srv.register(server)
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

	return grpcAddress, server, nil
}

// Shutdown waits until the grpc server is stopped.
func (s *Server) Shutdown() {
	s.cancel()

	<-s.stopped
}
