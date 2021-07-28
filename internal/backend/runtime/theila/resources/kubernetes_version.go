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
	// KubernetesVersionType is the type of KubernetesResource resource.
	KubernetesVersionType = resource.Type("KubernetesVersions.theila.sidero.dev")
)

// KubernetesVersion represents discovered Kubernetes version.
type KubernetesVersion struct {
	spec *rpc.KubernetesVersionSpec
	md   resource.Metadata
}

// NewKubernetesVersion creates new KubernetesVersion resource.
func NewKubernetesVersion(ns resource.Namespace, id resource.ID, version string) *KubernetesVersion {
	r := &KubernetesVersion{
		md: resource.NewMetadata(ns, KubernetesVersionType, id, resource.VersionUndefined),
		spec: &rpc.KubernetesVersionSpec{
			Version: version,
		},
	}
	r.md.BumpVersion()

	return r
}

// Metadata implements resource.Resource.
func (r *KubernetesVersion) Metadata() *resource.Metadata {
	return &r.md
}

// Spec implements resource.Resource.
func (r *KubernetesVersion) Spec() interface{} {
	return r.spec
}

func (r *KubernetesVersion) String() string {
	return fmt.Sprintf("KubernetesVersion(%s): %s", r.md.ID(), r.spec.Version)
}

// DeepCopy implements resource.Resource.
func (r *KubernetesVersion) DeepCopy() resource.Resource {
	return &KubernetesVersion{
		md:   r.md,
		spec: proto.Clone(r.spec).(*rpc.KubernetesVersionSpec),
	}
}

// UnmarshalProto implements protobuf.ResourceUnmarshaler.
func (r *KubernetesVersion) UnmarshalProto(md *resource.Metadata, protoSpec []byte) error {
	r.md = *md

	r.spec = &rpc.KubernetesVersionSpec{}

	return proto.Unmarshal(protoSpec, r.spec)
}

// SetVersion updates spec version.
func (r *KubernetesVersion) SetVersion(version string) {
	r.spec.Version = version
}
