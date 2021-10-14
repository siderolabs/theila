// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Package logging contains zap logging helpers.
package logging

import (
	"log"

	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

// SubscriptionID watch subscription id.
func SubscriptionID(id string) zap.Field {
	return zap.String("subscription", id)
}

// Component log subsystem.
func Component(name string) zap.Field {
	return zap.String("component", name)
}

// Logger is a global logger instance from which we deliver all other logger instances.
var Logger *zap.Logger

// With creates new logger.
func With(fields ...zap.Field) *zap.Logger {
	return Logger.With(fields...)
}

func init() {
	config := zap.NewDevelopmentConfig()
	config.EncoderConfig.EncodeLevel = zapcore.CapitalColorLevelEncoder
	config.EncoderConfig.ConsoleSeparator = " "

	zapLogger, err := config.Build()
	if err != nil {
		log.Fatalf("failed to set up logging %s", err)
	}

	Logger = zapLogger
}
