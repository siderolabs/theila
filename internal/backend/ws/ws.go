// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Package ws implements websocket server and protocol.
package ws

import (
	"context"
	"encoding/json"
	"net/http"

	"github.com/gorilla/websocket"
	"go.uber.org/zap"

	"github.com/talos-systems/theila/internal/backend/logging"
	"github.com/talos-systems/theila/internal/backend/runtime"
	"github.com/talos-systems/theila/internal/backend/ws/message"
)

// Server is a websocket server.
type Server struct {
	logger   *zap.SugaredLogger
	ctx      context.Context
	runtimes map[string]runtime.Runtime
	upgrader *websocket.Upgrader
}

// New creates new websocket server instance and registers routes in the gin engine.
func New(ctx context.Context, mux *http.ServeMux, runtimes map[string]runtime.Runtime) *Server {
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

	session := NewSession(ws.ctx, ws.runtimes, c)
	defer session.Shutdown()

	for {
		mt, data, err := c.ReadMessage()
		if err != nil {
			break
		}

		switch mt {
		case websocket.CloseMessage:
			return
		case websocket.TextMessage:
			request, err := message.Decode(data)
			if err != nil {
				ws.logger.Errorw("failed to decode request message", logging.ErrorContext(err)...)

				continue
			}

			response, err := session.handleMessage(request)
			if err != nil {
				if err = c.WriteJSON(message.NewErrorResponse(request, err)); err != nil {
					ws.logger.Errorw("failed to write error response", logging.ErrorContext(err)...)
				}

				continue
			}

			if err = c.WriteJSON(response); err != nil {
				ws.logger.Errorw("failed to write response", logging.ErrorContext(err)...)
			}
		}
	}
}
