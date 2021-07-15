// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

package kubernetes

import (
	cabpt "github.com/talos-systems/cluster-api-bootstrap-provider-talos/api/v1alpha3"
	cacppt "github.com/talos-systems/cluster-api-control-plane-provider-talos/api/v1alpha3"
	sidero "github.com/talos-systems/sidero/app/caps-controller-manager/api/v1alpha3"
	metal "github.com/talos-systems/sidero/app/sidero-controller-manager/api/v1alpha1"
	v1 "k8s.io/api/core/v1"
	apiextensions "k8s.io/apiextensions-apiserver/pkg/apis/apiextensions/v1"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/apimachinery/pkg/runtime/schema"
	clientgoscheme "k8s.io/client-go/kubernetes/scheme"
	"k8s.io/client-go/rest"
	"sigs.k8s.io/cluster-api/api/v1alpha3"
	runtimeclient "sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/client/apiutil"
)

func getScheme() (*runtime.Scheme, error) {
	scheme := runtime.NewScheme()

	if err := clientgoscheme.AddToScheme(scheme); err != nil {
		return nil, err
	}

	if err := v1alpha3.AddToScheme(scheme); err != nil {
		return nil, err
	}

	if err := cacppt.AddToScheme(scheme); err != nil {
		return nil, err
	}

	if err := cabpt.AddToScheme(scheme); err != nil {
		return nil, err
	}

	if err := sidero.AddToScheme(scheme); err != nil {
		return nil, err
	}

	if err := metal.AddToScheme(scheme); err != nil {
		return nil, err
	}

	if err := v1.AddToScheme(scheme); err != nil {
		return nil, err
	}

	if err := apiextensions.AddToScheme(scheme); err != nil {
		return nil, err
	}

	return scheme, nil
}

// client wraps controller-runtime client and provides access to mapper.
type client struct {
	runtimeclient.Client
	opts runtimeclient.Options
}

func (c *client) kindFor(gvr schema.GroupVersionResource) (schema.GroupVersionKind, error) {
	return c.opts.Mapper.KindFor(gvr)
}

func newClient(config *rest.Config, options runtimeclient.Options) (*client, error) {
	// Init a Mapper if none provided
	if options.Mapper == nil {
		var err error
		options.Mapper, err = apiutil.NewDynamicRESTMapper(config)

		if err != nil {
			return nil, err
		}
	}

	c, err := runtimeclient.New(config, options)
	if err != nil {
		return nil, err
	}

	return &client{c, options}, nil
}
