// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Package proto specifies websocket protocol helpers.
package proto

import (
	"encoding/json"

	"google.golang.org/protobuf/proto"
	"google.golang.org/protobuf/reflect/protoreflect"

	"github.com/talos-systems/theila/api/socket/message"
	"github.com/talos-systems/theila/internal/backend/runtime"
)

// Decode implements websocket message decoding.
func Decode(data []byte) (*message.Message, error) {
	m := &message.Message{}
	if err := proto.Unmarshal(data, m); err != nil {
		return nil, err
	}

	return m, nil
}

// Encode implements websocket message encoding.
func Encode(message protoreflect.ProtoMessage) ([]byte, error) {
	return proto.Marshal(message)
}

func newMessage(kind message.Kind, metadata *message.Metadata, spec interface{}) (*message.Message, error) {
	var (
		s   []byte
		err error
	)

	if spec != nil {
		if s, err = json.Marshal(spec); err != nil {
			return nil, err
		}
	}

	return &message.Message{
		Kind:     kind,
		Metadata: metadata,
		Spec:     string(s),
	}, nil
}

// NewSubscribedResponse compose subscribed response.
func NewSubscribedResponse(request *message.Message, id string) (*message.Message, error) {
	spec := &message.SubscribedSpec{
		Uid: id,
	}

	return newMessage(
		message.Kind_Subscribed,
		request.Metadata,
		spec,
	)
}

// NewOkResponse creates new Ok message.
func NewOkResponse(request *message.Message) (*message.Message, error) {
	return newMessage(
		message.Kind_OK,
		request.Metadata,
		nil,
	)
}

// NewErrorResponse creates new Error message.
func NewErrorResponse(request *message.Message, err error) (*message.Message, error) {
	return newMessage(
		message.Kind_Error,
		request.Metadata,
		&message.ErrorSpec{
			Error: err.Error(),
		},
	)
}

// NewRuntimeEvent creates new runtime event.
func NewRuntimeEvent(subscriptionUID string, event runtime.Event) (*message.Message, error) {
	return newMessage(
		event.Kind,
		&message.Metadata{
			Uid: subscriptionUID,
		},
		event.Spec,
	)
}
