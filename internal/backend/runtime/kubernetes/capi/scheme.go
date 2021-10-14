// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

package capi

import (
	admissionregistration "k8s.io/api/admissionregistration/v1"
	admissionregistrationv1beta1 "k8s.io/api/admissionregistration/v1beta1"
	apiextensionsv1 "k8s.io/apiextensions-apiserver/pkg/apis/apiextensions/v1"
	apiextensionsv1beta1 "k8s.io/apiextensions-apiserver/pkg/apis/apiextensions/v1beta1"
	"k8s.io/apimachinery/pkg/runtime"
	clientgoscheme "k8s.io/client-go/kubernetes/scheme"
	clusterv1 "sigs.k8s.io/cluster-api/api/v1alpha4"
	clusterctlv1 "sigs.k8s.io/cluster-api/cmd/clusterctl/api/v1alpha3"
	addonsv1 "sigs.k8s.io/cluster-api/exp/addons/api/v1alpha4"
)

// Scheme for CAPI kubernetes client.
var Scheme = runtime.NewScheme()

func init() {
	clientgoscheme.AddToScheme(Scheme)               //nolint:errcheck
	clusterctlv1.AddToScheme(Scheme)                 //nolint:errcheck
	clusterv1.AddToScheme(Scheme)                    //nolint:errcheck
	apiextensionsv1.AddToScheme(Scheme)              //nolint:errcheck
	apiextensionsv1beta1.AddToScheme(Scheme)         //nolint:errcheck
	admissionregistration.AddToScheme(Scheme)        //nolint:errcheck
	admissionregistrationv1beta1.AddToScheme(Scheme) //nolint:errcheck
	addonsv1.AddToScheme(Scheme)                     //nolint:errcheck
}
