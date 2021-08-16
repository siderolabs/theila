// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Package ws implements websocket server and protocol.
package ws

import (
	"context"
	"encoding/json"
	"net/http"
	"net/url"
	"strings"
	"sync"

	"github.com/gorilla/websocket"
	"go.uber.org/zap"
	"google.golang.org/protobuf/reflect/protoreflect"

	"github.com/talos-systems/theila/api/socket/message"
	"github.com/talos-systems/theila/internal/backend/logging"
	"github.com/talos-systems/theila/internal/backend/ws/proto"
)

// Server is a websocket server.
type Server struct {
	logger   *zap.Logger
	ctx      context.Context
	upgrader *websocket.Upgrader
}

// New creates new websocket server instance and registers routes in the gin engine.
func New(ctx context.Context, mux *http.ServeMux) *Server {
	ws := &Server{
		ctx: ctx,
		logger: logging.With(
			logging.Component("websocket"),
		),
		upgrader: &websocket.Upgrader{
			CheckOrigin: func(r *http.Request) bool {
				origin := r.Header["Origin"]
				if len(origin) == 0 {
					return true
				}

				u, err := url.Parse(origin[0])
				if err != nil {
					return false
				}

				forwardedHost := r.Header["X-Forwarded-Host"]
				if len(forwardedHost) != 0 {
					return strings.EqualFold(u.Host, forwardedHost[0])
				}

				return strings.EqualFold(u.Host, r.Host)
			},
		},
	}

	mux.HandleFunc("/ws", ws.createSession)

	return ws
}

//nolint:gocognit
func (ws *Server) createSession(rw http.ResponseWriter, r *http.Request) {
	c, err := ws.upgrader.Upgrade(rw, r, nil)
	if err != nil {
		rw.WriteHeader(http.StatusInternalServerError)
		rw.Header().Set("Content-Type", "application/json")

		var data []byte

		data, err = json.Marshal(struct {
			Message string `json:"msg"`
		}{
			Message: err.Error(),
		})

		if err != nil {
			ws.logger.Error("failed to encode error response", zap.Error(err))

			return
		}

		if _, err = rw.Write(data); err != nil {
			ws.logger.Error("failed to write error", zap.Error(err))
		}

		return
	}

	defer c.Close() //nolint:errcheck

	conn := &Conn{Conn: c}

	session := NewSession(ws.ctx, conn)
	defer session.Shutdown()

	for {
		mt, data, err := c.ReadMessage()
		if err != nil {
			break
		}

		switch mt {
		case websocket.CloseMessage:
			return
		case websocket.BinaryMessage:
			func() {
				defer func() {
					if r := recover(); r != nil {
						ws.logger.Error("panic in message loop", zap.Reflect("recover", r))
					}
				}()

				request, err := proto.Decode(data)
				if err != nil {
					ws.logger.Error("failed to decode request message", zap.Error(err))

					return
				}

				response, err := session.handleMessage(request)
				if err != nil {
					var errResponse *message.Message

					ws.logger.Error("failed to handle message", zap.Error(err))

					errResponse, err = proto.NewErrorResponse(request, err)
					if err != nil {
						ws.logger.Error("failed to encode error response", zap.Error(err))

						return
					}

					if err = conn.WriteProtobuf(errResponse); err != nil {
						ws.logger.Error("failed to write error response", zap.Error(err))
					}

					return
				}

				if err = conn.WriteProtobuf(response); err != nil {
					ws.logger.Error("failed to write response", zap.Error(err))
				}
			}()
		default:
			ws.logger.Sugar().Errorf("unhandled message type %d", mt)
		}
	}
}

// Conn thread safe wrapper for websocket.Conn.
type Conn struct {
	*websocket.Conn
	mutex sync.Mutex
}

// WriteProtobuf writes protobuf message to the websocket.
func (c *Conn) WriteProtobuf(message protoreflect.ProtoMessage) error {
	var (
		data []byte
		err  error
	)

	if data, err = proto.Encode(message); err != nil {
		return err
	}

	c.mutex.Lock()
	defer c.mutex.Unlock()

	return c.WriteMessage(websocket.BinaryMessage, data)
}
