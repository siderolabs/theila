// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Package logging contains zap logging heplers.
package logging

import "go.uber.org/zap"

// Setter implements context field setter.
type Setter func() (string, interface{})

// SubscriptionID watch subscription id.
func SubscriptionID(id string) Setter {
	return func() (string, interface{}) {
		return "subscription_id", id
	}
}

// Component log subsystem.
func Component(name string) Setter {
	return func() (string, interface{}) {
		return "component", name
	}
}

// Error logs error.
func Error(err error) Setter {
	return func() (string, interface{}) {
		return "err", err
	}
}

// Context constructs logging context based on provided options.
func Context(setters ...Setter) []interface{} {
	fields := make([]interface{}, len(setters)*2)

	index := 0

	for _, setter := range setters {
		key, value := setter()

		fields[index] = key
		fields[index+1] = value

		index += 2 //nolint:wastedassign
	}

	return fields
}

// ErrorContext is a shortcut that creates a context with an error.
func ErrorContext(err error, setters ...Setter) []interface{} {
	setters = append(setters, Error(err))

	return Context(setters...)
}

// Logger is a global logger instance from which we deliver all other logger instances.
var Logger *zap.SugaredLogger

// With creates new logger.
func With(setters ...Setter) *zap.SugaredLogger {
	return Logger.With(Context(setters...)...)
}
