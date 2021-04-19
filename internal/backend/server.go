// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Package backend contains all internal backend code.
package backend

import (
	"context"
	"errors"
	"fmt"
	"io/fs"
	"log"
	"net/http"

	"go.uber.org/zap"

	"github.com/talos-systems/theila/api/socket/message"
	"github.com/talos-systems/theila/internal/backend/logging"
	"github.com/talos-systems/theila/internal/backend/runtime"
	"github.com/talos-systems/theila/internal/backend/runtime/kubernetes"
	"github.com/talos-systems/theila/internal/backend/ws"
	"github.com/talos-systems/theila/internal/frontend"
)

// Server is main backend entrypoint that starts REST API, WebSocket and Serves static contents.
type Server struct {
	ctx      context.Context
	logger   *zap.Logger
	ws       *ws.Server
	runtimes map[message.Source]runtime.Runtime
	address  string
	port     int
}

// NewServer creates new HTTP server.
func NewServer(address string, port int) *Server {
	s := &Server{
		address: address,
		port:    port,
		logger: logging.With(
			logging.Component("server"),
		),
		runtimes: map[message.Source]runtime.Runtime{},
	}

	s.RegisterRuntime(message.Source_Kubernetes, kubernetes.New())

	return s
}

// RegisterRuntime adds a runtime.
func (s *Server) RegisterRuntime(name message.Source, runtime runtime.Runtime) {
	s.runtimes[name] = runtime
}

// Run runs HTTP server.
func (s *Server) Run(ctx context.Context) error {
	s.ctx = ctx

	mux, err := s.registerRoutes()
	if err != nil {
		return err
	}

	s.logger.Sugar().Infof("Serving on port %d", s.port)

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
				log.Printf("Failed to stop server %s", err)
			}
		// exit goroutine if the the server is already stopped
		case <-stopped:
		}
	}()

	if err := server.ListenAndServe(); errors.Is(err, http.ErrServerClosed) {
		return err
	}

	close(stopped)

	return nil
}

func (s *Server) registerRoutes() (*http.ServeMux, error) {
	s.logger.Debug("Registering routes")

	mux := http.NewServeMux()

	sub, err := fs.Sub(frontend.Dist, "dist")
	if err != nil {
		return nil, fmt.Errorf("failed to get dist/frontend directory")
	}

	mux.Handle("/", http.FileServer(http.FS(sub)))

	s.ws = ws.New(s.ctx, mux, s.runtimes)

	return mux, nil
}
