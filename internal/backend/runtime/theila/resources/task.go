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
	// TaskStatusType is the type of TaskStatus resource.
	TaskStatusType = resource.Type("TaskStatuses.theila.sidero.dev")
)

// TaskStatus represents the ongoing K8s upgrade task.
type TaskStatus struct {
	spec *rpc.TaskStatusSpec
	md   resource.Metadata
}

// NewTaskStatus creates new StrResource.
func NewTaskStatus(ns resource.Namespace, id resource.ID) *TaskStatus {
	r := &TaskStatus{
		md: resource.NewMetadata(ns, TaskStatusType, id, resource.VersionUndefined),
		spec: &rpc.TaskStatusSpec{
			Phase: rpc.TaskStatusSpec_RUNNING,
		},
	}
	r.md.BumpVersion()

	return r
}

// Metadata implements resource.Resource.
func (r *TaskStatus) Metadata() *resource.Metadata {
	return &r.md
}

// Spec implements resource.Resource.
func (r *TaskStatus) Spec() interface{} {
	return r.spec
}

func (r *TaskStatus) String() string {
	return fmt.Sprintf("TaskStatus(%s): owner %q", r.md.ID(), r.md.Owner())
}

// DeepCopy implements resource.Resource.
func (r *TaskStatus) DeepCopy() resource.Resource {
	return &TaskStatus{
		md:   r.md,
		spec: proto.Clone(r.spec).(*rpc.TaskStatusSpec),
	}
}

// UnmarshalProto implements protobuf.ResourceUnmarshaler.
func (r *TaskStatus) UnmarshalProto(md *resource.Metadata, protoSpec []byte) error {
	r.md = *md

	r.spec = &rpc.TaskStatusSpec{}

	return proto.Unmarshal(protoSpec, r.spec)
}

// SetPhase updates status phase.
func (r *TaskStatus) SetPhase(phase rpc.TaskStatusSpec_Phase) {
	r.spec.Phase = phase
}

// SetProgress updates status progress.
func (r *TaskStatus) SetProgress(progress float32) {
	r.spec.Progress = progress
}

// SetError sets status error.
func (r *TaskStatus) SetError(err error) {
	r.spec.Error = err.Error()
}
