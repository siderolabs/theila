// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

package ws

import (
	"context"
	"fmt"
	"sync"

	"github.com/gorilla/websocket"
	"go.uber.org/zap"

	"github.com/talos-systems/theila/internal/backend/logging"
	"github.com/talos-systems/theila/internal/backend/runtime"
	"github.com/talos-systems/theila/internal/backend/ws/message"
)

// Session keeps the information about client subscriptions and handles data update routing.
type Session struct { //nolint:govet
	ctx             context.Context
	cancel          context.CancelFunc
	runtimes        map[string]runtime.Runtime
	conn            *websocket.Conn
	logger          *zap.SugaredLogger
	subscriptionsMu sync.RWMutex
	subscriptions   map[string]*Subscription
}

// NewSession creates a new session.
func NewSession(ctx context.Context, runtimes map[string]runtime.Runtime, conn *websocket.Conn) *Session {
	s := &Session{
		logger:        logging.With(logging.Component("session")),
		runtimes:      runtimes,
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

	switch request.Kind {
	case message.Watch:
		response, err = s.startWatch(request)
	case message.Unsubscribe:
		response, err = s.unsubscribe(request)
	default:
		return nil, fmt.Errorf("unknown request kind %s", request.Kind)
	}

	return response, err
}

func (s *Session) startWatch(request *message.Message) (*message.Message, error) {
	w, ok := request.Spec.(*message.WatchRequest)
	if !ok {
		return nil, fmt.Errorf("got unexpected object type in the spec of the watch request")
	}

	r, err := s.getRuntime(w)
	if err != nil {
		return nil, err
	}

	request.Spec = w

	subscription, err := NewSubscription(s.ctx, r, w, s.conn)
	if err != nil {
		return nil, err
	}

	s.subscriptionsMu.Lock()
	s.subscriptions[subscription.ID] = subscription
	s.subscriptionsMu.Unlock()

	return message.NewSubscribedResponse(
		request,
		subscription.ID,
	), nil
}

func (s *Session) unsubscribe(request *message.Message) (*message.Message, error) {
	unsubscribe, ok := request.Spec.(*message.UnsubscribeRequest)
	if !ok {
		return nil, fmt.Errorf("got unexpected spec in the UnsubscribeRequest")
	}

	s.subscriptionsMu.Lock()
	defer s.subscriptionsMu.Unlock()

	subscription, ok := s.subscriptions[unsubscribe.UID]
	if !ok {
		return nil, fmt.Errorf("no subscription with uid %s", unsubscribe.UID)
	}

	subscription.shutdown()
	delete(s.subscriptions, unsubscribe.UID)

	return message.NewOkResponse(request), nil
}

func (s *Session) getRuntime(watch *message.WatchRequest) (runtime.Runtime, error) {
	p, ok := s.runtimes[watch.Source]
	if !ok {
		return nil, fmt.Errorf("failed to get %s runtime", watch.Source)
	}

	return p, nil
}
