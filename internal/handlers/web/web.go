// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Package web handles static data routes
package web

import (
	"net/http"

	"github.com/markbates/pkger"
)

// NewWebHandler create new FileServer that serves static resources.
func NewWebHandler(path string) http.Handler {
	return http.FileServer(pkger.Dir(path))
}
