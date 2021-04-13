// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Package ws implements websocket server and protocol.
package ws

import (
	"context"
	"encoding/json"
	"net/http"
	"sync"

	"github.com/gorilla/websocket"
	"go.uber.org/zap"
	"google.golang.org/protobuf/reflect/protoreflect"

	"github.com/talos-systems/theila/api/socket/message"
	"github.com/talos-systems/theila/internal/backend/logging"
	"github.com/talos-systems/theila/internal/backend/runtime"
	"github.com/talos-systems/theila/internal/backend/ws/proto"
)

// Server is a websocket server.
type Server struct {
	logger   *zap.SugaredLogger
	ctx      context.Context
	runtimes map[message.Source]runtime.Runtime
	upgrader *websocket.Upgrader
}

// New creates new websocket server instance and registers routes in the gin engine.
func New(ctx context.Context, mux *http.ServeMux, runtimes map[message.Source]runtime.Runtime) *Server {
	ws := &Server{
		ctx: ctx,
		logger: logging.With(
			logging.Component("websocket"),
		),
		runtimes: runtimes,
		upgrader: &websocket.Upgrader{},
	}

	mux.HandleFunc("/ws", ws.createSession)

	return ws
}

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
			ws.logger.Errorw("faield to encode error response", logging.ErrorContext(err)...)

			return
		}

		if _, err = rw.Write(data); err != nil {
			ws.logger.Errorw("failed to write error", logging.ErrorContext(err)...)
		}

		return
	}

	defer c.Close() //nolint:errcheck

	conn := &Conn{Conn: c}

	session := NewSession(ws.ctx, ws.runtimes, conn)
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
			request, err := proto.Decode(data)
			if err != nil {
				ws.logger.Errorw("failed to decode request message", logging.ErrorContext(err)...)

				continue
			}

			response, err := session.handleMessage(request)
			if err != nil {
				var errResponse *message.Message

				errResponse, err = proto.NewErrorResponse(request, err)
				if err != nil {
					ws.logger.Errorw("failed to encode error response", logging.ErrorContext(err)...)

					continue
				}

				if err = conn.WriteProtobuf(errResponse); err != nil {
					ws.logger.Errorw("failed to write error response", logging.ErrorContext(err)...)
				}

				continue
			}

			if err = conn.WriteProtobuf(response); err != nil {
				ws.logger.Errorw("failed to write response", logging.ErrorContext(err)...)
			}
		default:
			ws.logger.Errorf("unhandled message type %d", mt)
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
