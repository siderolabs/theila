// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"os"
	"os/signal"
	"syscall"

	"github.com/spf13/pflag"
	"github.com/spf13/viper"

	"github.com/talos-systems/theila/pkg/server"
)

func main() {
	flag.Int("port", 8042, "port to listen on")
	flag.String("bind-address", "0.0.0.0", "address to bind")
	pflag.CommandLine.AddGoFlagSet(flag.CommandLine)
	pflag.Parse()

	if err := viper.BindPFlags(pflag.CommandLine); err != nil {
		log.Fatalf("failed to parse input arguments: %s", err)
	}

	ctx, cancel := context.WithCancel(context.Background())

	sigCh := make(chan os.Signal, 1)
	signal.Notify(sigCh, syscall.SIGINT, syscall.SIGTERM)

	go func() {
		<-sigCh

		cancel()
	}()

	config := &server.Config{
		Endpoint: fmt.Sprintf("%s:%d", viper.GetString("bind-address"), viper.GetInt("port")),
	}

	s := server.NewHTTPServer(config)
	s.Serve(ctx)
}
