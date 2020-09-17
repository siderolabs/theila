// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

package main

import (
	"fmt"
	"io/fs"
	"log"
	"net/http"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"

	"github.com/talos-systems/theila/internal/frontend"
)

func main() {
	log.Println("Starting app")

	router := registerRoutes()

	port := 8080

	log.Printf("Serving on port %d", port)

	if err := http.ListenAndServe(fmt.Sprintf("0.0.0.0:%d", port), router); err != nil {
		log.Fatal(err)
	}
}

func registerRoutes() http.Handler {
	log.Println("Registering routes")

	r := chi.NewMux()

	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	sub, err := fs.Sub(frontend.Dist, "dist")
	if err != nil {
		log.Fatalf("failed to get dist/frontend directory")
	}

	r.Handle("/*", http.FileServer(http.FS(sub)))

	logRoutes(r)

	return r
}

func logRoutes(r chi.Routes) {
	log.Println("Serving with routes:")
	//nolint:errcheck
	chi.Walk(r, func(method, route string, handler http.Handler, middlewares ...func(http.Handler) http.Handler) error {
		log.Printf("\t%s %s", method, route)

		return nil
	})
}
