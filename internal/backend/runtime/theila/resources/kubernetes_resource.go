// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

package resources

import (
	"fmt"

	"github.com/cosi-project/runtime/pkg/resource"
	"google.golang.org/protobuf/proto"

	"github.com/talos-systems/theila/api/rpc"
)

const (
	// KubernetesResourceType is the type of TaskStatus resource.
	KubernetesResourceType = resource.Type("KubernetesResources.theila.sidero.dev")
)

// KubernetesResource represents the ongoing K8s upgrade task.
type KubernetesResource struct {
	spec *rpc.KubernetesResourceSpec
	md   resource.Metadata
}

// Metadata implements resource.Resource.
func (r *KubernetesResource) Metadata() *resource.Metadata {
	return &r.md
}

// Spec implements resource.Resource.
func (r *KubernetesResource) Spec() interface{} {
	return r.spec
}

func (r *KubernetesResource) String() string {
	return fmt.Sprintf("KubernetesResource(%s)", r.md.ID())
}

// DeepCopy implements resource.Resource.
func (r *KubernetesResource) DeepCopy() resource.Resource {
	return &KubernetesResource{
		md:   r.md,
		spec: proto.Clone(r.spec).(*rpc.KubernetesResourceSpec),
	}
}

// UnmarshalProto implements protobuf.ResourceUnmarshaler.
func (r *KubernetesResource) UnmarshalProto(md *resource.Metadata, protoSpec []byte) error {
	r.md = *md

	r.spec = &rpc.KubernetesResourceSpec{}

	return proto.Unmarshal(protoSpec, r.spec)
}
