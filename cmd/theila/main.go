// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

package main

import (
	"context"
	"errors"
	"log"
	"net/http"
	"os/signal"
	"syscall"

	"github.com/spf13/cobra"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"

	"github.com/talos-systems/theila/internal/backend"
	"github.com/talos-systems/theila/internal/backend/logging"
)

// rootCmd represents the base command when called without any subcommands.
var rootCmd = &cobra.Command{
	Use:   "theila",
	Short: "Talos and Sidero frontend",
	Long:  ``,
}

var rootCmdArgs struct {
	address string
	port    int
}

func main() {
	config := zap.NewDevelopmentConfig()
	config.EncoderConfig.EncodeLevel = zapcore.CapitalColorLevelEncoder

	zapLogger, err := config.Build()
	if err != nil {
		log.Fatalf("failed to set up logging %s", err)
	}

	logger := zapLogger.Sugar()
	logging.Logger = logger

	server := backend.NewServer(rootCmdArgs.address, rootCmdArgs.port)

	ctx, _ := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)

	if err := server.Run(ctx); err != nil && !errors.Is(err, http.ErrServerClosed) {
		logger.Fatalf("failed to run server %s", err)
	}
}

func init() {
	rootCmd.Flags().IntVarP(&rootCmdArgs.port, "port", "p", 8080, "Start HTTP server on the defined port.")
	rootCmd.Flags().StringVar(&rootCmdArgs.address, "address", "", "Start HTTP server on the defined address.")
}
