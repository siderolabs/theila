// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Package runtime implements connectors to various runtimes.
package runtime

import "context"

// EventKind runtime event kind.
type EventKind int

// String implements fmt.Stringer.
func (k EventKind) String() string {
	return []string{
		"EventItemAdd",
		"EventItemDelete",
		"EventItemUpdate",
		"EventError",
	}[k]
}

const (
	// EventItemAdd triggered when a new item is added.
	EventItemAdd = iota
	// EventItemDelete triggered when some item is delete.
	EventItemDelete
	// EventItemUpdate triggered when some item is updated.
	EventItemUpdate
	// EventError triggered when watch encounters some error and has to be terminated.
	EventError
)

// Event runtime event.
type Event struct {
	Spec interface{}
	Kind EventKind
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
