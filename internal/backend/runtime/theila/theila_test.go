// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

package theila_test

import (
	"context"
	"fmt"
	"strconv"
	"testing"
	"time"

	"github.com/cosi-project/runtime/pkg/resource"
	"github.com/stretchr/testify/suite"
	"google.golang.org/protobuf/proto"

	"github.com/talos-systems/theila/api/common"
	"github.com/talos-systems/theila/api/rpc"
	"github.com/talos-systems/theila/internal/backend/runtime"
	"github.com/talos-systems/theila/internal/backend/runtime/theila"
)

const (
	testResourceType = resource.Type("TestResources.theila.sidero.dev")
)

// testResource represents the ongoing K8s upgrade task.
type testResource struct {
	spec *rpc.UpgradeK8SSpec
	md   resource.Metadata
}

// NewtestResource creates new StrResource.
func newTestResource(ns resource.Namespace, id resource.ID, spec *rpc.UpgradeK8SSpec) *testResource {
	r := &testResource{
		md:   resource.NewMetadata(ns, testResourceType, id, resource.VersionUndefined),
		spec: spec,
	}
	r.md.BumpVersion()

	return r
}

// Metadata implements resource.Resource.
func (r *testResource) Metadata() *resource.Metadata {
	return &r.md
}

// Spec implements resource.Resource.
func (r *testResource) Spec() interface{} {
	return r.spec
}

func (r *testResource) String() string {
	return fmt.Sprintf("testResource(%s) to %s", r.md.ID(), r.spec.ToVersion)
}

// DeepCopy implements resource.Resource.
func (r *testResource) DeepCopy() resource.Resource {
	return &testResource{
		md:   r.md,
		spec: proto.Clone(r.spec).(*rpc.UpgradeK8SSpec),
	}
}

// UnmarshalProto implements protobuf.ResourceUnmarshaler.
func (r *testResource) UnmarshalProto(md *resource.Metadata, protoSpec []byte) error {
	r.md = *md

	r.spec = &rpc.UpgradeK8SSpec{}

	return proto.Unmarshal(protoSpec, r.spec)
}

type TheilaRuntimeSuite struct {
	suite.Suite
	runtime   *theila.Runtime
	ctx       context.Context
	ctxCancel context.CancelFunc
}

func (suite *TheilaRuntimeSuite) SetupTest() {
	suite.ctx, suite.ctxCancel = context.WithTimeout(context.Background(), 3*time.Minute)

	var err error

	suite.runtime, err = theila.New()

	suite.Require().NoError(err)

	suite.startRuntime()
}

func (suite *TheilaRuntimeSuite) startRuntime() {
	suite.runtime.Run(suite.ctx)
}

func (suite *TheilaRuntimeSuite) TestCrud() {
	id := "test"
	namespace := "test"

	resource := newTestResource(namespace, id, &rpc.UpgradeK8SSpec{
		ToVersion: "1.21",
		Context: &common.Context{
			Nodes: []string{
				"127.0.0.1",
			},
		},
	})

	suite.Require().NoError(suite.runtime.Create(suite.ctx, resource))

	getResource := func() *runtime.Resource {
		resp, err := suite.runtime.Get(suite.ctx, runtime.WithName(id), runtime.WithNamespace(id), runtime.WithResource(testResourceType))
		suite.Require().NoError(err)

		resourceResponse, ok := resp.(*runtime.Resource)
		suite.Require().True(ok)

		return resourceResponse
	}

	r := getResource()

	suite.Require().Equal(map[string]interface{}{"nodes": []interface{}{"127.0.0.1"}, "cluster": nil, "name": ""}, r.Spec["context"])
	suite.Require().Equal("1.21", r.Spec["toversion"])

	version := strconv.Itoa(r.Metadata["version"].(int))

	resource = newTestResource(namespace, id, &rpc.UpgradeK8SSpec{
		ToVersion: "1.21",
		Context: &common.Context{
			Nodes: []string{
				"127.0.0.2",
			},
		},
	})
	resource.Metadata().BumpVersion()

	suite.Require().NoError(suite.runtime.Update(suite.ctx, resource, runtime.WithCurrentVersion(version)))

	r = getResource()

	suite.Require().Equal(map[string]interface{}{"nodes": []interface{}{"127.0.0.2"}, "cluster": nil, "name": ""}, r.Spec["context"])

	suite.Require().NoError(suite.runtime.Delete(suite.ctx, runtime.WithName(id), runtime.WithNamespace(namespace), runtime.WithResource(testResourceType)))

	_, err := suite.runtime.Get(suite.ctx, runtime.WithName(id), runtime.WithNamespace(id), runtime.WithResource(testResourceType))
	suite.Require().Error(err)
}

func (suite *TheilaRuntimeSuite) TearDownTest() {
	suite.T().Log("tear down")

	suite.ctxCancel()

	suite.Require().NoError(suite.runtime.Shutdown())
}

func TestTheilaRuntimeSuite(t *testing.T) {
	suite.Run(t, new(TheilaRuntimeSuite))
}
