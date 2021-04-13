// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Package runtime implements connectors to various runtimes.
package runtime

import (
	"context"

	"github.com/talos-systems/theila/api/socket/message"
)

// Event runtime event.
type Event struct {
	Spec interface{}
	Kind message.Kind
}

// EventUpdate spec for update event.
type EventUpdate struct {
	Old interface{} `json:"old"`
	New interface{} `json:"new"`
}

// Runtime is an abstraction for the data access.
type Runtime interface {
	Watch(ctx context.Context, resource string, events chan Event) error
}
