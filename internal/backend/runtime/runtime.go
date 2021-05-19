// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Package runtime implements connectors to various runtimes.
package runtime

import (
	"context"
	"fmt"
	"sync"

	"github.com/talos-systems/theila/api/common"
	"github.com/talos-systems/theila/api/socket/message"
)

// DefaultClient defines default client id.
const DefaultClient = "default"

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
	Watch(context.Context, *message.WatchSpec, chan Event) error
	Get(context.Context, ...QueryOption) (interface{}, error)
	List(context.Context, ...QueryOption) (interface{}, error)
	AddContext(string, []byte) error
	GetContext(context.Context, *common.Cluster) ([]byte, error)
}

var (
	runtimeMu sync.RWMutex
	runtimes  = map[string]Runtime{}
)

// Install a runtime singleton for a type.
func Install(name string, runtime Runtime) {
	runtimeMu.Lock()
	defer runtimeMu.Unlock()

	runtimes[name] = runtime
}

// Get returns runtime for a type.
func Get(name string) (Runtime, error) {
	runtimeMu.RLock()
	defer runtimeMu.RUnlock()

	if runtime, ok := runtimes[name]; ok {
		return runtime, nil
	}

	return nil, fmt.Errorf("failed to find the runtime %v", name)
}
