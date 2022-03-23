// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

package ws

import (
	"context"
	"fmt"
	"sync"

	"go.uber.org/zap"

	"github.com/siderolabs/theila/api/socket/message"
	"github.com/siderolabs/theila/internal/backend/logging"
	"github.com/siderolabs/theila/internal/backend/runtime"
	"github.com/siderolabs/theila/internal/backend/ws/proto"
)

// Session keeps the information about client subscriptions and handles data update routing.
type Session struct { //nolint:govet
	ctx             context.Context
	cancel          context.CancelFunc
	conn            *Conn
	logger          *zap.Logger
	subscriptionsMu sync.RWMutex
	subscriptions   map[string]*Subscription
}

// NewSession creates a new session.
func NewSession(ctx context.Context, conn *Conn) *Session {
	s := &Session{
		logger:        logging.With(logging.Component("session")),
		subscriptions: map[string]*Subscription{},
		conn:          conn,
	}

	s.ctx, s.cancel = context.WithCancel(ctx)

	return s
}

// Shutdown cleans up all related session resources.
func (s *Session) Shutdown() {
	s.cancel()

	for _, subscription := range s.subscriptions {
		subscription.shutdown()
	}
}

func (s *Session) handleMessage(request *message.Message) (*message.Message, error) {
	var err error

	var response *message.Message

	//nolint:exhaustive
	switch request.Kind {
	case message.Kind_Watch:
		response, err = s.startWatch(request)
	case message.Kind_Unsubscribe:
		response, err = s.unsubscribe(request)
	default:
		return nil, fmt.Errorf("unknown request kind %s", request.Kind)
	}

	return response, err
}

func (s *Session) startWatch(request *message.Message) (*message.Message, error) {
	var w *message.WatchSpec

	err := request.UnmarshalSpec(&w)
	if err != nil {
		return nil, err
	}

	r, err := runtime.Get(w.Source.String())
	if err != nil {
		return nil, err
	}

	subscription, err := NewSubscription(s.ctx, r, w, s.conn)
	if err != nil {
		return nil, err
	}

	s.subscriptionsMu.Lock()
	s.subscriptions[subscription.ID] = subscription
	s.subscriptionsMu.Unlock()

	return proto.NewSubscribedResponse(
		request,
		subscription.ID,
	)
}

func (s *Session) unsubscribe(request *message.Message) (*message.Message, error) {
	var unsubscribe *message.UnsubscribeSpec
	if err := request.UnmarshalSpec(&unsubscribe); err != nil {
		return nil, err
	}

	s.subscriptionsMu.Lock()
	defer s.subscriptionsMu.Unlock()

	subscription, ok := s.subscriptions[unsubscribe.Uid]
	if !ok {
		return nil, fmt.Errorf("no subscription with uid %s", unsubscribe.Uid)
	}

	subscription.shutdown()
	delete(s.subscriptions, unsubscribe.Uid)

	return proto.NewOkResponse(request)
}
