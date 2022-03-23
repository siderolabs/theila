// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

package resources

import (
	"fmt"

	"github.com/cosi-project/runtime/pkg/resource"
	"google.golang.org/protobuf/proto"

	"github.com/siderolabs/theila/api/rpc"
)

const (
	// UpgradeK8sTaskType is the type of UpgradeK8sTask resource.
	UpgradeK8sTaskType = resource.Type("UpgradeTasks.theila.sidero.dev")
)

// UpgradeK8sTask represents the ongoing K8s upgrade task.
type UpgradeK8sTask struct {
	spec *rpc.UpgradeK8SSpec
	md   resource.Metadata
}

// NewUpgradeK8sTask creates new StrResource.
func NewUpgradeK8sTask(ns resource.Namespace, id resource.ID, spec *rpc.UpgradeK8SSpec) *UpgradeK8sTask {
	r := &UpgradeK8sTask{
		md:   resource.NewMetadata(ns, UpgradeK8sTaskType, id, resource.VersionUndefined),
		spec: spec,
	}
	r.md.BumpVersion()

	return r
}

// Metadata implements resource.Resource.
func (r *UpgradeK8sTask) Metadata() *resource.Metadata {
	return &r.md
}

// Spec implements resource.Resource.
func (r *UpgradeK8sTask) Spec() interface{} {
	return r.spec
}

// TypedSpec returns typed spec object.
func (r *UpgradeK8sTask) TypedSpec() *rpc.UpgradeK8SSpec {
	return r.spec
}

func (r *UpgradeK8sTask) String() string {
	return fmt.Sprintf("UpgradeK8sTask(%s) to %s", r.md.ID(), r.spec.ToVersion)
}

// DeepCopy implements resource.Resource.
func (r *UpgradeK8sTask) DeepCopy() resource.Resource {
	return &UpgradeK8sTask{
		md:   r.md,
		spec: proto.Clone(r.spec).(*rpc.UpgradeK8SSpec),
	}
}

// UnmarshalProto implements protobuf.ResourceUnmarshaler.
func (r *UpgradeK8sTask) UnmarshalProto(md *resource.Metadata, protoSpec []byte) error {
	r.md = *md

	r.spec = &rpc.UpgradeK8SSpec{}

	return proto.Unmarshal(protoSpec, r.spec)
}
