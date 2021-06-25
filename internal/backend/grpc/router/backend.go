// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

package router

import (
	"context"
	"strings"

	"google.golang.org/grpc"
	"google.golang.org/grpc/metadata"
)

// Backend implements a backend (proxying one2one).
type Backend struct {
	conn *grpc.ClientConn
	name string
}

// NewBackend builds new backend.
func NewBackend(name string, conn *grpc.ClientConn) *Backend {
	backend := &Backend{
		name: name,
		conn: conn,
	}

	return backend
}

func (l *Backend) String() string {
	return l.name
}

// GetConnection returns a grpc connection to the backend.
func (l *Backend) GetConnection(ctx context.Context) (context.Context, *grpc.ClientConn, error) {
	md, _ := metadata.FromIncomingContext(ctx)
	if n := md.Get("nodes"); n != nil {
		nodes := strings.Split(n[0], ",")

		md = md.Copy()
		md.Set("nodes", nodes...)
	}

	outCtx := metadata.NewOutgoingContext(ctx, md)

	return outCtx, l.conn, nil
}

// AppendInfo is called to enhance response from the backend with additional data.
func (l *Backend) AppendInfo(streaming bool, resp []byte) ([]byte, error) {
	return resp, nil
}

// BuildError is called to convert error from upstream into response field.
func (l *Backend) BuildError(streaming bool, err error) ([]byte, error) {
	return nil, nil
}
