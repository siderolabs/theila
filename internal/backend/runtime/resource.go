// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

package runtime

import (
	"strings"

	"github.com/cosi-project/runtime/pkg/resource"
	"github.com/talos-systems/talos/pkg/machinery/api/common"
	"gopkg.in/yaml.v3"
)

// Resource wraps Talos and COSI resource response to be encoded as JSON.
type Resource struct {
	Metadata map[string]interface{} `yaml:"metadata" json:"metadata"`
	Spec     map[string]interface{} `yaml:"spec" json:"spec"`
	ID       string                 `yaml:"-" json:"-"`
}

// NewResource creates new resource.
func NewResource(m *common.Metadata, r resource.Resource) (*Resource, error) {
	s, err := resource.MarshalYAML(r)
	if err != nil {
		return nil, err
	}

	data, err := yaml.Marshal(s)
	if err != nil {
		return nil, err
	}

	parts := []string{}
	if m != nil {
		parts = append(parts, m.Hostname)
	}

	parts = append(parts, r.Metadata().Namespace(), r.Metadata().ID())

	res := &Resource{
		ID: strings.Join(parts, "/"),
	}
	if err = yaml.Unmarshal(data, &res); err != nil {
		return nil, err
	}

	if m != nil {
		res.Metadata["node"] = m.GetHostname()
	}

	return res, nil
}

// ResourceList wraps multiple items responses from Talos resource API into a struct which is similar to what we have in Kubernetes.
type ResourceList struct {
	Items []*Resource `json:"items"`
}

// NewResourceList creates new resource list.
func NewResourceList() *ResourceList {
	return &ResourceList{
		Items: []*Resource{},
	}
}
