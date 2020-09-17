// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Package server provides externally visible API for starting control plane server
package server

import (
	"context"
	"log"
	"net/http"
	"sync"

	"github.com/markbates/pkger"

	"github.com/talos-systems/theila/internal/handlers/web"
)

// HTTPServer http server that serves both API endpoints and website.
type HTTPServer struct {
	config *Config
}

// Config represents set of settings for theila server.
type Config struct {
	Endpoint string
}

// NewHTTPServer creates and starts new theila server.
func NewHTTPServer(config *Config) *HTTPServer {
	res := &HTTPServer{
		config: config,
	}

	return res
}

// Serve starts theila server.
// server listen can be interrupted if context is canceled.
func (ts *HTTPServer) Serve(ctx context.Context) {
	s := &http.Server{
		Addr: ts.config.Endpoint,
	}

	path := "/frontend/dist"
	fs := web.NewWebHandler(path)

	_ = pkger.Include("/frontend/dist") // replace with go:embed when Go 1.16 arrives

	http.Handle("/", fs)

	var wg sync.WaitGroup

	wg.Add(1)

	go func() {
		defer wg.Done()
		log.Fatal(s.ListenAndServe())
	}()

	wg.Add(1)

	go func() {
		defer wg.Done()
		<-ctx.Done()
		s.Close() //nolint:errcheck
	}()

	wg.Wait()
}
