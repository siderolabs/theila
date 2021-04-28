// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

package ws

import (
	"context"
	"sync"

	"github.com/google/uuid"
	"go.uber.org/zap"

	"github.com/talos-systems/theila/api/socket/message"
	"github.com/talos-systems/theila/internal/backend/logging"
	"github.com/talos-systems/theila/internal/backend/runtime"
	"github.com/talos-systems/theila/internal/backend/ws/proto"
)

// Subscription is a reactive list of items that sends updates to the websocket on each state change.
type Subscription struct { //nolint:govet
	// ID should be an unique subscription id.
	// Message routing is using this ID to sync server and client sides.
	ID string

	wg      sync.WaitGroup
	conn    *Conn
	logger  *zap.Logger
	ctx     context.Context
	cancel  context.CancelFunc
	runtime runtime.Runtime
	watch   *message.WatchSpec
	items   []interface{}
	events  chan runtime.Event
}

// NewSubscription creates new Subscription.
func NewSubscription(ctx context.Context, r runtime.Runtime, watch *message.WatchSpec, conn *Conn) (*Subscription, error) {
	ctx, cancel := context.WithCancel(ctx)
	id := uuid.New().String()

	subscription := &Subscription{
		ID: id,

		watch:   watch,
		runtime: r,
		items:   []interface{}{},
		ctx:     ctx,
		cancel:  cancel,
		conn:    conn,
		logger: logging.With(
			logging.Component("subscription"),
			logging.SubscriptionID(id),
		),
		events: make(chan runtime.Event),
	}

	if err := subscription.run(); err != nil {
		return nil, err
	}

	return subscription, nil
}

func (s *Subscription) run() error {
	s.wg.Add(1)

	go func() {
		defer s.wg.Done()

		for {
			select {
			case <-s.ctx.Done():
				s.logger.Debug("unsubscribed")
				close(s.events)

				return
			case event := <-s.events:
				s.handleEvent(event)
			}
		}
	}()

	if err := s.runtime.Watch(s.ctx, s.watch, s.events); err != nil {
		s.cancel()

		return err
	}

	s.logger.Debug("subscribed")

	return nil
}

func (s *Subscription) shutdown() {
	s.cancel()

	s.wg.Wait()
}

func (s *Subscription) handleEvent(e runtime.Event) {
	var err error

	defer func() {
		if err != nil {
			s.logger.Error("failed to write event to the socket", zap.Error(err))
		}
	}()

	if e.Kind == message.Kind_EventError {
		s.cancel()
	}

	event, err := proto.NewRuntimeEvent(s.ID, e)
	if err != nil {
		return
	}

	err = s.conn.WriteProtobuf(event)
}
