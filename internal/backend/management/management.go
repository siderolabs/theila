// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Package management contains cluster management helpers.
package management

import (
	"context"
	"fmt"
	"net/http"
	"net/url"
	"os"
	"strings"
	"time"

	"github.com/google/go-github/v35/github"
	"github.com/talos-systems/talos/pkg/machinery/client"
	"golang.org/x/oauth2"

	"github.com/talos-systems/theila/api/common"
	"github.com/talos-systems/theila/internal/backend/runtime"
	"github.com/talos-systems/theila/internal/backend/runtime/talos"
)

// NewUpgradeClientProvider creates new ClientProvider for the upgrade or management modules.
func NewUpgradeClientProvider(ctx context.Context, context *common.Context) (*ClientProvider, error) {
	r, err := runtime.Get(talos.Name)
	if err != nil {
		return nil, err
	}

	c, err := r.(*talos.Runtime).GetClient(ctx, context)
	if err != nil {
		return nil, err
	}

	return &ClientProvider{c}, nil
}

// ClientProvider is a simple wrapper around talos clients managed by the runtime.
type ClientProvider struct {
	client *client.Client
}

// Client implements cluster.ClientProvider.
func (cp *ClientProvider) Client(endpoints ...string) (*client.Client, error) {
	return cp.client, nil
}

// Close implements cluster.ClientProvider.
func (cp *ClientProvider) Close() error {
	return nil
}

const (
	maxPerPage = 100 // https://docs.github.com/en/rest/reference/repos
	timeout    = 15 * time.Second
)

// K8sUpgradeCandidates fetches release list from the Github.
func K8sUpgradeCandidates(ctx context.Context, source string) ([]string, error) {
	c := new(http.Client)

	// set up the client with token, otherwise we quickly hit the rate limit
	token := os.Getenv("GITHUB_TOKEN")
	if token != "" {
		src := oauth2.StaticTokenSource(&oauth2.Token{AccessToken: token})
		c = oauth2.NewClient(ctx, src)
	}

	c.Timeout = timeout

	client := github.NewClient(c)

	opts := &github.ListOptions{
		PerPage: maxPerPage,
	}

	sourceURL, err := url.Parse(source)
	if err != nil {
		return nil, err
	}

	if sourceURL.Host != "github.com" {
		panic(fmt.Sprintf("unexpected host %q", sourceURL.Host))
	}

	parts := strings.Split(sourceURL.Path, "/")
	owner, repo := parts[1], parts[2]

	versions := []string{}

	for {
		page, resp, err := client.Repositories.ListReleases(ctx, owner, repo, opts)
		if err != nil {
			return nil, err
		}

		for _, record := range page {
			if record.TagName == nil {
				continue
			}

			versions = append(versions, *record.TagName)
		}

		if resp.NextPage == 0 {
			break
		}

		opts.Page = resp.NextPage
	}

	return versions, nil
}
