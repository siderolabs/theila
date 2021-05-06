// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

package talos

import (
	"context"

	"gopkg.in/yaml.v3"

	"github.com/talos-systems/theila/internal/backend/runtime"
)

func (r *Runtime) kubeconfig(ctx context.Context, opts *runtime.QueryOptions) (interface{}, error) {
	client, err := r.getClient(ctx, opts.Context)
	if err != nil {
		return nil, err
	}

	data, err := client.Kubeconfig(ctx)
	if err != nil {
		return nil, err
	}

	var config interface{}
	if err = yaml.Unmarshal(data, &config); err != nil {
		return nil, err
	}

	return config, nil
}
