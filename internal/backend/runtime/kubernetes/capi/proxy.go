// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Package capi contains capi util helpers specific to Theila.
package capi

import (
	"context"
	"fmt"
	"strings"
	"time"

	"github.com/pkg/errors"
	"github.com/talos-systems/go-retry/retry"
	apierrors "k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
	utilversion "k8s.io/apimachinery/pkg/util/version"
	"k8s.io/client-go/discovery"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
	"sigs.k8s.io/controller-runtime/pkg/client"
)

// this is a copy from clusterapi, unfortunately these vars are not exported.
const (
	minVersion = "v1.16.0"
	maxVersion = "v1.22.2"
)

// Proxy custom implementation of clusterapi proxy that allows getting kubeconfig from memory.
type Proxy struct {
	config *rest.Config
	client client.Client
}

// NewProxy creates new proxy.
func NewProxy(config *rest.Config) *Proxy {
	return &Proxy{
		config: config,
	}
}

// CurrentNamespace implements cluster.Proxy interface.
func (k *Proxy) CurrentNamespace() (string, error) {
	return "default", nil
}

// ValidateKubernetesVersion implements cluster.Proxy interface.
func (k *Proxy) ValidateKubernetesVersion() error {
	cmp, err := k.compareVersions(minVersion)
	if err != nil {
		return err
	}

	if cmp == -1 {
		return fmt.Errorf("unsupported management cluster version: minimum required version is %s", minVersion)
	}

	return nil
}

// ValidateKubernetesMaxVersion implements cluster.Proxy interface.
func (k *Proxy) ValidateKubernetesMaxVersion() error {
	cmp, err := k.compareVersions(maxVersion)
	if err != nil {
		return err
	}

	if cmp == -1 {
		return fmt.Errorf("unsupported management cluster version: maximum required version is %s", maxVersion)
	}

	return nil
}

// GetConfig returns the config for a kubernetes client.
func (k *Proxy) GetConfig() (*rest.Config, error) {
	return k.config, nil
}

// GetContexts implements cluster.Proxy interface.
func (k *Proxy) GetContexts(string) ([]string, error) {
	return nil, fmt.Errorf("not implemented")
}

// NewClient implements cluster.Proxy interface.
func (k *Proxy) NewClient() (client.Client, error) {
	if k.client != nil {
		return k.client, nil
	}

	var err error

	k.client, err = client.New(k.config, client.Options{Scheme: Scheme})
	if err != nil {
		return nil, err
	}

	return k.client, nil
}

// ListResources implements cluster.Proxy interface.
func (k *Proxy) ListResources(labels map[string]string, namespaces ...string) ([]unstructured.Unstructured, error) {
	cs, err := k.newClientSet()
	if err != nil {
		return nil, err
	}

	c, err := k.NewClient()
	if err != nil {
		return nil, err
	}

	// Get all the API resources in the cluster.
	var resourceList []*metav1.APIResourceList

	resourceList, err = cs.Discovery().ServerPreferredResources()

	if err != nil {
		return nil, err
	}

	// Select resources with list and delete methods (list is required by this method, delete by the callers of this method)
	resourceList = discovery.FilteredBy(discovery.SupportsAllVerbs{Verbs: []string{"list", "delete"}}, resourceList)

	var ret []unstructured.Unstructured

	discard := map[string]struct{}{
		"daemonsets":      {},
		"deployments":     {},
		"replicasets":     {},
		"networkpolicies": {},
		"ingresses":       {},
	}

	for _, resourceGroup := range resourceList {
		for _, resourceKind := range resourceGroup.APIResources {
			// Discard the resourceKind that exists in two api groups (we are excluding one of the two groups arbitrarily).
			if _, ok := discard[resourceKind.Name]; resourceGroup.GroupVersion == "extensions/v1beta1" && ok {
				continue
			}

			// List all the object instances of this resourceKind with the given labels
			if resourceKind.Namespaced {
				for _, namespace := range namespaces {
					objList, err := listObjByGVK(c, resourceGroup.GroupVersion, resourceKind.Kind, []client.ListOption{client.MatchingLabels(labels), client.InNamespace(namespace)})
					if err != nil {
						return nil, err
					}

					ret = append(ret, objList.Items...)
				}
			} else {
				objList, err := listObjByGVK(c, resourceGroup.GroupVersion, resourceKind.Kind, []client.ListOption{client.MatchingLabels(labels)})
				if err != nil {
					return nil, err
				}

				ret = append(ret, objList.Items...)
			}
		}
	}

	return ret, nil
}

// GetResourceNames returns the list of resource names which begin with prefix.
func (k *Proxy) GetResourceNames(groupVersion, kind string, options []client.ListOption, prefix string) ([]string, error) {
	client, err := k.NewClient()
	if err != nil {
		return nil, err
	}

	objList, err := listObjByGVK(client, groupVersion, kind, options)
	if err != nil {
		return nil, err
	}

	var comps []string

	for _, item := range objList.Items {
		name := item.GetName()

		if strings.HasPrefix(name, prefix) {
			comps = append(comps, name)
		}
	}

	return comps, nil
}

// CheckClusterAvailable implements proxy interface.
func (k *Proxy) CheckClusterAvailable() error {
	// Check if the cluster is available by creating a client to the cluster.
	// If creating the client times out and never established we assume that
	// the cluster does not exist or is not reachable.
	// For the purposes of clusterctl operations non-existent clusters and
	// non-reachable clusters can be treated as the same.
	config, err := k.GetConfig()
	if err != nil {
		return err
	}

	return retry.Exponential(time.Minute*10, retry.WithUnits(time.Millisecond*250)).Retry(func() error {
		_, err := client.New(config, client.Options{Scheme: Scheme})
		if err != nil {
			return retry.ExpectedError(err)
		}

		return nil
	})
}

func (k *Proxy) newClientSet() (*kubernetes.Clientset, error) {
	return kubernetes.NewForConfig(k.config)
}

func (k *Proxy) compareVersions(ver string) (int, error) {
	client, err := discovery.NewDiscoveryClientForConfig(k.config)
	if err != nil {
		return 0, err
	}

	version, err := client.ServerVersion()
	if err != nil {
		return 0, err
	}

	var v *utilversion.Version

	if v, err = utilversion.ParseGeneric(version.String()); err != nil {
		return 0, err
	}

	return v.Compare(ver)
}

func listObjByGVK(c client.Client, groupVersion, kind string, options []client.ListOption) (*unstructured.UnstructuredList, error) {
	objList := new(unstructured.UnstructuredList)
	objList.SetAPIVersion(groupVersion)
	objList.SetKind(kind)

	if err := c.List(context.Background(), objList, options...); err != nil {
		if !apierrors.IsNotFound(err) {
			return nil, errors.Wrapf(err, "failed to list objects for the %q GroupVersionKind", objList.GroupVersionKind())
		}
	}

	return objList, nil
}
