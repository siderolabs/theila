// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

package resources

import (
	"fmt"
	"time"

	"github.com/cosi-project/runtime/pkg/resource"
	"google.golang.org/protobuf/proto"
	"google.golang.org/protobuf/types/known/timestamppb"

	"github.com/siderolabs/theila/api/rpc"
)

const (
	// TaskStatusType is the type of TaskStatus resource.
	TaskStatusType = resource.Type("TaskStatuses.theila.sidero.dev")
	// TaskStateType is the type of TaskState resource.
	TaskStateType = resource.Type("TaskState.theila.sidero.dev")
)

// TaskStatus represents the ongoing K8s upgrade task status.
type TaskStatus struct {
	spec *rpc.TaskStatusSpec
	md   resource.Metadata
}

// NewTaskStatus creates new TaskStatus resource.
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
	if phase != rpc.TaskStatusSpec_RUNNING {
		r.spec.FinishedAt = timestamppb.New(time.Now())
	}
}

// TypedSpec returns the exact type of the spec of this resource.
func (r *TaskStatus) TypedSpec() *rpc.TaskStatusSpec {
	return r.spec
}

// SetProgress updates status progress.
func (r *TaskStatus) SetProgress(progress float32) {
	r.spec.Progress = progress
}

// SetError sets status error.
func (r *TaskStatus) SetError(err error) {
	r.spec.Error = err.Error()
}

// SetVersions updates the versions of the upgrade task.
func (r *TaskStatus) SetVersions(from, to string) {
	r.spec.FromVersion = from
	r.spec.ToVersion = to
}

// TaskState represents the ongoing K8s upgrade task status.
type TaskState struct {
	spec *rpc.TaskStateSpec
	md   resource.Metadata
}

// NewTaskState creates new TaskState resource.
func NewTaskState(ns resource.Namespace, id, statusID resource.ID) *TaskState {
	r := &TaskState{
		md: resource.NewMetadata(ns, TaskStateType, id, resource.VersionUndefined),
		spec: &rpc.TaskStateSpec{
			StatusId: statusID,
		},
	}
	r.md.BumpVersion()

	return r
}

// Metadata implements resource.Resource.
func (r *TaskState) Metadata() *resource.Metadata {
	return &r.md
}

// Spec implements resource.Resource.
func (r *TaskState) Spec() interface{} {
	return r.spec
}

// TypedSpec returns typed representation for the spec.
func (r *TaskState) TypedSpec() *rpc.TaskStateSpec {
	return r.spec
}

func (r *TaskState) String() string {
	return fmt.Sprintf("TaskState(%s): owner %q", r.md.ID(), r.md.Owner())
}

// DeepCopy implements resource.Resource.
func (r *TaskState) DeepCopy() resource.Resource {
	return &TaskState{
		md:   r.md,
		spec: proto.Clone(r.spec).(*rpc.TaskStateSpec),
	}
}

// UnmarshalProto implements protobuf.ResourceUnmarshaler.
func (r *TaskState) UnmarshalProto(md *resource.Metadata, protoSpec []byte) error {
	r.md = *md

	r.spec = &rpc.TaskStateSpec{}

	return proto.Unmarshal(protoSpec, r.spec)
}
