// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

package runtime

import "github.com/talos-systems/theila/api/socket/message"

// QueryOptions List and Get query options.
type QueryOptions struct {
	Cluster       *message.Cluster
	Namespace     string
	Name          string
	Context       string
	Resource      string
	LabelSelector string
}

// NewQueryOptions creates new QueryOptions.
func NewQueryOptions(setters ...QueryOption) *QueryOptions {
	o := &QueryOptions{}

	for _, s := range setters {
		s(o)
	}

	return o
}

// QueryOption defines variable input option for List and Get methods in the Runtime implementations.
type QueryOption func(*QueryOptions)

// WithNamespace enables filtering by namespace.
func WithNamespace(namespace string) QueryOption {
	return func(o *QueryOptions) {
		o.Namespace = namespace
	}
}

// WithName enables filtering by resource name.
func WithName(name string) QueryOption {
	return func(o *QueryOptions) {
		o.Name = name
	}
}

// WithLabelSelector enables filtering by label.
func WithLabelSelector(selector string) QueryOption {
	return func(o *QueryOptions) {
		o.LabelSelector = selector
	}
}

// WithContext routes the request to a specific context.
func WithContext(name string) QueryOption {
	return func(o *QueryOptions) {
		o.Context = name
	}
}

// WithResource explicitly specifies the resource type to get from the runtime.
func WithResource(resource string) QueryOption {
	return func(o *QueryOptions) {
		o.Resource = resource
	}
}

// WithCluster specifies the cluster to use to get the resource from.
func WithCluster(cluster *message.Cluster) QueryOption {
	return func(o *QueryOptions) {
		o.Cluster = cluster
	}
}
