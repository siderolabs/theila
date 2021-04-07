// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

package kubernetes

import (
	appsv1 "k8s.io/api/apps/v1"
	corev1 "k8s.io/api/core/v1"
	"k8s.io/apimachinery/pkg/runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
)

// Types defines resource name -> runtime.Object mappings.
var Types = map[string]client.Object{
	"node":       &corev1.Node{},
	"pod":        &corev1.Pod{},
	"namespace":  &corev1.Namespace{},
	"deployment": &appsv1.Deployment{},
	"daemonset":  &appsv1.DaemonSet{},
}

func getScheme() *runtime.Scheme {
	s := runtime.NewScheme()
	corev1.AddToScheme(s) //nolint:errcheck
	appsv1.AddToScheme(s) //nolint:errcheck

	return s
}
