// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

package main

import (
	"context"
	"errors"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	"github.com/spf13/cobra"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"

	"github.com/talos-systems/theila/internal/backend"
)

// rootCmd represents the base command when called without any subcommands.
var rootCmd = &cobra.Command{
	Use:   "theila",
	Short: "Talos and Sidero frontend",
	Long:  ``,
	Run: func(cmd *cobra.Command, args []string) {
		config := zap.NewDevelopmentConfig()
		config.EncoderConfig.EncodeLevel = zapcore.CapitalColorLevelEncoder

		logger, err := config.Build()
		if err != nil {
			log.Fatalf("failed to set up logging %s", err)
		}

		server, err := backend.NewServer(rootCmdArgs.address, rootCmdArgs.port)
		if err != nil {
			logger.Fatal("failed to create server", zap.Error(err))
		}

		ctx, _ := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)

		if err := server.Run(ctx); err != nil && !errors.Is(err, http.ErrServerClosed) {
			logger.Fatal("failed to run server", zap.Error(err))
		}
	},
}

var rootCmdArgs struct {
	address string
	port    int
}

func main() {
	if err := rootCmd.Execute(); err != nil {
		log.Printf("execute error %s", err)
		os.Exit(1)
	}
}

func init() {
	rootCmd.Flags().IntVarP(&rootCmdArgs.port, "port", "p", 8080, "Start HTTP server on the defined port.")
	rootCmd.Flags().StringVar(&rootCmdArgs.address, "address", "", "Start HTTP server on the defined address.")
}
