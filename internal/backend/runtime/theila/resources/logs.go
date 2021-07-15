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
	// TaskLogType is the type of TaskLog resource.
	TaskLogType = resource.Type("TaskLogs.theila.sidero.dev")
)

// TaskLog represents the ongoing K8s upgrade task.
type TaskLog struct {
	spec *rpc.TaskLogSpec
	md   resource.Metadata
}

// NewTaskLog creates new StrResource.
func NewTaskLog(ns resource.Namespace, id resource.ID, line string) *TaskLog {
	r := &TaskLog{
		md: resource.NewMetadata(ns, TaskLogType, id, resource.VersionUndefined),
		spec: &rpc.TaskLogSpec{
			Line: line,
		},
	}
	r.md.BumpVersion()

	return r
}

// Metadata implements resource.Resource.
func (r *TaskLog) Metadata() *resource.Metadata {
	return &r.md
}

// Spec implements resource.Resource.
func (r *TaskLog) Spec() interface{} {
	return r.spec
}

func (r *TaskLog) String() string {
	return fmt.Sprintf("TaskLog(%s): owner %q", r.md.ID(), r.md.Owner())
}

// DeepCopy implements resource.Resource.
func (r *TaskLog) DeepCopy() resource.Resource {
	return &TaskLog{
		md:   r.md,
		spec: proto.Clone(r.spec).(*rpc.TaskLogSpec),
	}
}

// UnmarshalProto implements protobuf.ResourceUnmarshaler.
func (r *TaskLog) UnmarshalProto(md *resource.Metadata, protoSpec []byte) error {
	r.md = *md

	r.spec = &rpc.TaskLogSpec{}

	return proto.Unmarshal(protoSpec, r.spec)
}

// Update the log line.
func (r *TaskLog) Update(line string) {
	if r.spec.Line != "" {
		r.Metadata().BumpVersion()
	}

	r.spec.Line = line
}
