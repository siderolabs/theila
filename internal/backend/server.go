// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Package backend contains all internal backend code.
package backend

import (
	"context"
	"fmt"
	"io/fs"
	"log"
	"net/http"
	"os"

	"go.uber.org/zap"

	"github.com/siderolabs/theila/internal/backend/grpc"
	"github.com/siderolabs/theila/internal/backend/logging"
	"github.com/siderolabs/theila/internal/backend/runtime"
	"github.com/siderolabs/theila/internal/backend/runtime/kubernetes"
	"github.com/siderolabs/theila/internal/backend/runtime/talos"
	"github.com/siderolabs/theila/internal/backend/runtime/theila"
	"github.com/siderolabs/theila/internal/backend/ws"
	"github.com/siderolabs/theila/internal/frontend"
)

// Server is main backend entrypoint that starts REST API, WebSocket and Serves static contents.
type Server struct {
	ctx               context.Context
	controllerRuntime *theila.Runtime
	logger            *zap.Logger
	ws                *ws.Server
	grpc              *grpc.Server
	address           string
	port              int
}

// NewServer creates new HTTP server.
func NewServer(address string, port int) (*Server, error) {
	s := &Server{
		address: address,
		port:    port,
		logger: logging.With(
			logging.Component("server"),
		),
	}

	k8sruntime, err := kubernetes.New()
	if err != nil {
		return nil, err
	}

	s.controllerRuntime, err = theila.New()
	if err != nil {
		return nil, err
	}

	runtime.Install(kubernetes.Name, k8sruntime)
	runtime.Install(talos.Name, talos.New())
	runtime.Install(theila.Name, s.controllerRuntime)

	return s, nil
}

// RegisterRuntime adds a runtime.
func (s *Server) RegisterRuntime(name string, r runtime.Runtime) {
	runtime.Install(name, r)
}

// Run runs HTTP server.
func (s *Server) Run(ctx context.Context) error {
	s.ctx = ctx

	var err error

	s.controllerRuntime.Run(ctx)

	defer func() {
		err = s.controllerRuntime.Shutdown()
		if err != nil {
			s.logger.Error("failed to gracefully stop controller runtime", zap.Error(err))
		}
	}()

	mux := http.NewServeMux()

	sub, err := fs.Sub(frontend.Dist, "dist")
	if err != nil {
		return fmt.Errorf("failed to get dist/frontend directory")
	}

	s.grpc, err = grpc.New(s.ctx, mux)
	if err != nil {
		return err
	}

	defer s.grpc.Shutdown()

	mux.Handle("/", http.FileServer(&singlePage{http.FS(sub)}))

	s.ws = ws.New(s.ctx, mux)

	s.logger.Sugar().Infof("serving on %s:%d", s.address, s.port)

	server := &http.Server{
		Addr:    fmt.Sprintf("%s:%d", s.address, s.port),
		Handler: mux,
	}

	stopped := make(chan struct{})

	go func() {
		select {
		// close server when ctx is canceled
		case <-ctx.Done():
			if err := server.Close(); err != nil {
				log.Printf("failed to stop server %s", err)
			}
		// exit goroutine if the the server is already stopped
		case <-stopped:
		}
	}()

	defer close(stopped)

	return server.ListenAndServe()
}

type singlePage struct {
	wrapped http.FileSystem
}

func (s *singlePage) Open(name string) (http.File, error) {
	// only difference here is that if the file is not found we always fallback to the /index.html
	f, err := s.wrapped.Open(name)

	if os.IsNotExist(err) {
		return s.wrapped.Open("/index.html")
	}

	return f, err
}
