// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

package talos

import (
	"context"
	"fmt"

	"github.com/talos-systems/capi-utils/pkg/capi"

	"github.com/talos-systems/theila/api/common"
	"github.com/talos-systems/theila/internal/backend/runtime"
	"github.com/talos-systems/theila/internal/backend/runtime/kubernetes"
)

func (r *Runtime) fetchTalosconfig(ctx context.Context, name string, clusterCtx *common.Cluster) error {
	cfg, err := r.getConfig()
	if err != nil {
		return err
	}

	k8s, err := runtime.Get(kubernetes.Name)
	if err != nil {
		return err
	}

	if clusterCtx == nil {
		if _, ok := cfg.Contexts[name]; !ok && name != runtime.DefaultClient {
			return fmt.Errorf("no context with name %v found in the config", name)
		}

		return nil
	}

	proxy, err := k8s.(*kubernetes.Runtime).GetCapiProxy(ctx, &common.Context{Name: name})
	if err != nil {
		return err
	}

	manager, err := capi.NewManager(ctx, capi.Options{
		Proxy: proxy,
	})
	if err != nil {
		return err
	}

	if manager.Version() == "" {
		return fmt.Errorf("failed to detect CAPI version")
	}

	cluster, err := manager.NewCluster(ctx, clusterCtx.Name, clusterCtx.Namespace)
	if err != nil {
		return fmt.Errorf("failed to get cluster %w", err)
	}

	clientConfig, err := cluster.TalosConfig(ctx)
	if err != nil {
		return err
	}

	contextName := clientConfig.Context

	clientConfig.Contexts[clusterCtx.Uid] = clientConfig.Contexts[contextName]

	clientConfig.Context = clusterCtx.Uid
	delete(clientConfig.Contexts, contextName)

	r.configMu.Lock()
	r.config.Merge(clientConfig)
	r.configMu.Unlock()

	return nil
}
