// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Package message specifies webcocket protocol messages.
package message

import (
	"encoding/json"
	"fmt"
	"reflect"

	"github.com/talos-systems/theila/internal/backend/runtime"
)

var types = map[string]interface{}{
	Watch:       WatchRequest{},
	Unsubscribe: UnsubscribeRequest{},
}

// Decode implements websocket message decoding.
func Decode(data []byte) (*Message, error) {
	var m struct {
		Message
		Spec json.RawMessage `json:"spec"`
	}

	if err := json.Unmarshal(data, &m); err != nil {
		return nil, err
	}

	t, ok := types[m.Kind]

	if !ok {
		return nil, fmt.Errorf("incorrect message kind %v", m.Kind)
	}

	value := reflect.New(reflect.TypeOf(t)).Interface()

	if err := json.Unmarshal(m.Spec, &value); err != nil {
		return nil, err
	}

	message := m.Message
	message.Spec = value

	return &message, nil
}

// Encode implements websocket message encoding.
func Encode(message *Message) ([]byte, error) {
	return json.Marshal(message)
}

// Metadata contains message routing information.
type Metadata struct {
	// UID is used to match request and response messages.
	// Or to target any specific subscription.
	UID string `json:"uid"`
}

func newMessage(kind string, metadata *Metadata, spec interface{}) *Message {
	return &Message{
		Kind: kind,
		Metadata: &Metadata{
			UID: metadata.UID,
		},
		Spec: spec,
	}
}

// Message implements generic websocket message.
type Message struct {
	// Metadata message metadata.
	Metadata *Metadata `json:"metadata"`
	// Spec describes any Kind specific information.
	Spec interface{} `json:"spec"`
	// Kind specific message kind.
	Kind string `json:"kind"`
}

// Client -> Server.
const (
	// Watch intializes resource watch.
	Watch = "Watch"
	// Unsubscribe destroys a subscription by id.
	Unsubscribe = "Unsubscribe"
)

// Server -> Client.
const (
	// Ok is returned when the request succeeds.
	Ok = "Ok"
	// Error is returned when the server has encountered an error.
	Error = "Error"
)

// WatchRequest request to watch a resource.
type WatchRequest struct {
	// Source runtime to get the data from.
	// Can be either kubernetes or talos.
	Source string `json:"source"`
	// Resource resource name.
	Resource string `json:"resource"`
}

// UnsubscribeRequest destroys the subcription.
type UnsubscribeRequest struct {
	// UID subscription id.
	UID string `json:"uid"`
}

// NewSubscribedResponse compose subscribed response.
func NewSubscribedResponse(request *Message, id string) *Message {
	return newMessage(
		Ok,
		request.Metadata,
		&SubscribedResponse{
			UID: id,
		},
	)
}

// SubscribedResponse returns subscription id back to the client.
type SubscribedResponse struct {
	// UID subscription id.
	UID string `json:"uid"`
}

// NewOkResponse creates new Ok message.
func NewOkResponse(request *Message) *Message {
	return newMessage(
		Ok,
		request.Metadata,
		nil,
	)
}

// NewErrorResponse creates new Error message.
func NewErrorResponse(request *Message, err error) *Message {
	return newMessage(
		Error,
		request.Metadata,
		&ErrorResponse{
			Error: err.Error(),
		},
	)
}

// ErrorResponse returns error details back to the client.
type ErrorResponse struct {
	Error string `json:"error"`
	// TODO: error codes
}

// NewRuntimeEvent creates new runtime event.
func NewRuntimeEvent(subscriptionUID string, event runtime.Event) *Message {
	return newMessage(
		event.Kind.String(),
		&Metadata{
			UID: subscriptionUID,
		},
		event.Spec,
	)
}
