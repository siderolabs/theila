// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

package backend_test

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"net/url"
	"testing"
	"time"

	"github.com/google/uuid"
	"github.com/gorilla/websocket"
	"github.com/stretchr/testify/suite"
	"github.com/talos-systems/talos/pkg/machinery/api/resource"
	"golang.org/x/sync/errgroup"

	"github.com/talos-systems/theila/api/common"
	"github.com/talos-systems/theila/api/socket/message"
	"github.com/talos-systems/theila/internal/backend"
	"github.com/talos-systems/theila/internal/backend/runtime"
	"github.com/talos-systems/theila/internal/backend/runtime/talos"
	"github.com/talos-systems/theila/internal/backend/ws/proto"
)

type testRuntime struct {
	events chan runtime.Event
	ctx    context.Context
}

func (t *testRuntime) Watch(ctx context.Context, watch *message.WatchSpec, events chan runtime.Event) error {
	if watch.Resource.Type == "boom" {
		return fmt.Errorf("failed to watch this particular resource")
	}

	t.events = events
	t.ctx = ctx

	return nil
}

func (t *testRuntime) AddContext(id string, data []byte) error {
	return nil
}

func (t *testRuntime) GetContext(ctx context.Context, context *common.Context, cluster *common.Cluster) ([]byte, error) {
	return nil, nil
}

func (t *testRuntime) Get(ctx context.Context, setters ...runtime.QueryOption) (interface{}, error) {
	return nil, nil
}

func (t *testRuntime) List(ctx context.Context, setters ...runtime.QueryOption) (interface{}, error) {
	return nil, nil
}

type ServerSuite struct {
	suite.Suite
	server    *backend.Server
	runtime   *testRuntime
	ctx       context.Context
	cancel    context.CancelFunc
	conn      *websocket.Conn
	responses chan *message.Message
	eg        errgroup.Group
}

func (s *ServerSuite) SetupTest() {
	var err error

	s.runtime = &testRuntime{}

	port := 35000 + rand.Intn(6000)
	s.server, err = backend.NewServer("", port)

	s.Require().NoError(err)

	s.server.RegisterRuntime(talos.Name, s.runtime)

	s.ctx, s.cancel = context.WithCancel(context.Background())

	s.eg.Go(func() error {
		return s.server.Run(s.ctx)
	})

	u := url.URL{Scheme: "ws", Host: fmt.Sprintf("0.0.0.0:%d", port), Path: "/ws"}

	var (
		c    *websocket.Conn
		resp *http.Response
	)

	for i := 0; i < 10; i++ {
		c, resp, err = websocket.DefaultDialer.DialContext(s.ctx, u.String(), nil)
		if err != nil {
			time.Sleep(time.Second * 1)
		}

		if resp != nil && resp.Body != nil {
			resp.Body.Close() //nolint:errcheck
		}
	}
	s.Require().NoError(err)
	s.conn = c
	s.responses = make(chan *message.Message)

	go func() {
		for {
			_, data, err := c.ReadMessage()
			if err != nil {
				log.Printf("read message error %s", err)

				return
			}

			m, err := proto.Decode(data)
			if err != nil {
				log.Printf("decode message error %s", err)

				continue
			}

			s.Require().NoError(err)

			s.responses <- m
		}
	}()
}

func (s *ServerSuite) TearDownTest() {
	if s.conn != nil {
		s.Require().NoError(s.conn.Close())
	}

	if s.cancel != nil {
		s.cancel()
	}

	if err := s.eg.Wait(); !errors.Is(err, http.ErrServerClosed) {
		s.Require().NoError(err)
	}
}

type testPayload struct {
	ID   string `json:"id"`
	Body string `json:"body"`
}

func (s *ServerSuite) sendMessage(kind message.Kind, spec interface{}) (*message.Message, error) {
	specData, err := json.Marshal(spec)
	if err != nil {
		return nil, err
	}

	m := &message.Message{
		Kind: kind,
		Metadata: &message.Metadata{
			Uid: uuid.New().String(),
		},
		Spec: string(specData),
	}

	data, err := proto.Encode(m)
	if err != nil {
		return nil, err
	}

	err = s.conn.WriteMessage(websocket.BinaryMessage, data)
	if err != nil {
		return nil, err
	}

	var res *message.Message
loop:
	for {
		select {
		case response := <-s.responses:
			if response.Metadata.Uid == m.Metadata.Uid {
				if response.Kind == message.Kind_Error {
					var spec *message.ErrorSpec

					if e := response.UnmarshalSpec(&spec); e != nil {
						return nil, e
					}

					return nil, fmt.Errorf(spec.GetError())
				}

				res = response

				break loop
			}
		case <-time.After(time.Second * 5):
			return nil, fmt.Errorf("timeout waiting for response")
		}
	}

	return res, nil
}

func (s *ServerSuite) TestSubscription() {
	response, err := s.sendMessage(message.Kind_Watch, message.WatchSpec{
		Resource: &resource.WatchRequest{
			Type: "node",
		},
		Source: common.Source_Talos,
	})

	s.Require().NoError(err)
	s.Require().Equal(response.Kind, message.Kind_Subscribed)

	var subscribedSpec *message.SubscribedSpec

	s.Require().NoError(response.UnmarshalSpec(&subscribedSpec))

	subscriptionUID := subscribedSpec.Uid

	events := []runtime.Event{
		{
			Kind: message.Kind_EventItemAdd,
			Spec: &testPayload{
				"1", "a",
			},
		},
		{
			Kind: message.Kind_EventItemAdd,
			Spec: &testPayload{
				"2", "b",
			},
		},
		{
			Kind: message.Kind_EventItemDelete,
			Spec: &testPayload{
				"2", "b",
			},
		},
		{
			Kind: message.Kind_EventItemUpdate,
			Spec: &testPayload{
				"2", "c",
			},
		},
		{
			Kind: message.Kind_EventError,
			Spec: "whoops",
		},
	}

	go func() {
		for _, e := range events {
			select {
			case s.runtime.events <- e:
			case <-time.After(time.Second * 5):
			case <-s.ctx.Done():
				return
			}
		}
	}()

	visited := map[string]bool{}

	for range events {
		select {
		case resp := <-s.responses:
			var id string

			if resp.Kind != message.Kind_EventError {
				spec := map[string]interface{}{}

				s.Require().NoError(resp.UnmarshalSpec(&spec))

				s.Require().Equal(resp.Metadata.Uid, subscriptionUID)

				id = fmt.Sprintf("%s:%s", spec["id"], resp.Kind)
			} else {
				id = resp.Spec
			}

			visited[id] = true
		case <-time.After(time.Second * 5):
			s.FailNow("timeout waiting for event")
		}
	}

	s.Require().Equal(len(visited), len(events))

	// at this point we got the error, no more events should be able to pass through
	// check that the context was canceled
	select {
	case res := <-s.runtime.ctx.Done():
		s.Require().Empty(res)
	case <-time.After(time.Second * 5):
		s.FailNow("timeout waiting for context to be canceled")
	}

	// and now unsubscribe
	_, err = s.sendMessage(message.Kind_Unsubscribe, &message.UnsubscribeSpec{
		Uid: subscriptionUID,
	})
	s.Require().NoError(err)
}

func (s *ServerSuite) TestSubscribeUnsubscribe() {
	resp, err := s.sendMessage(message.Kind_Watch, &message.WatchSpec{
		Resource: &resource.WatchRequest{
			Type: "nope",
		},
		Source: common.Source_Talos,
	})

	s.Require().NoError(err)

	var subscribedSpec *message.SubscribedSpec

	s.Require().NoError(resp.UnmarshalSpec(&subscribedSpec))

	subscriptionUID := subscribedSpec.Uid

	// and now unsubscribe
	_, err = s.sendMessage(message.Kind_Unsubscribe, &message.UnsubscribeSpec{
		Uid: subscriptionUID,
	})
	s.Require().NoError(err)
}

func (s *ServerSuite) TestBadInputs() {
	_, err := s.sendMessage(message.Kind_Unsubscribe, &message.UnsubscribeSpec{
		Uid: "hai",
	})
	s.Require().Error(err)

	_, err = s.sendMessage(message.Kind_Watch, &message.WatchSpec{
		Resource: &resource.WatchRequest{
			Type: "boom",
		},
		Source: common.Source_Talos,
	})
	s.Require().Error(err)

	_, err = s.sendMessage(message.Kind_Watch, &message.WatchSpec{
		Resource: &resource.WatchRequest{
			Type: "node",
		},
		Source: 100,
	})
	s.Require().Error(err)

	_, err = s.sendMessage(message.Kind_OK, map[string]interface{}{
		"message": "I have no idea what I'm doing",
	})
	s.Require().Error(err)
}

// TODO: test subscribe and walk away

func TestServerSuite(t *testing.T) {
	suite.Run(t, &ServerSuite{})
}
