// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

package kubernetes

import (
	"os"
	"path/filepath"
	"sort"

	"k8s.io/client-go/tools/clientcmd"
	clientcmdapi "k8s.io/client-go/tools/clientcmd/api"
)

// CurrentContext returns current local context.
func CurrentContext() (string, error) {
	config, err := loadConfig()
	if err != nil {
		return "", err
	}

	return config.CurrentContext, nil
}

// GetContexts returns all locally defined context names.
func GetContexts() ([]string, error) {
	config, err := loadConfig()
	if err != nil {
		return nil, err
	}

	contexts := make([]string, 0, len(config.Contexts))

	for name := range config.Contexts {
		contexts = append(contexts, name)
	}

	sort.Strings(contexts)

	return contexts, nil
}

func loadConfig() (*clientcmdapi.Config, error) {
	var kubeconfig string

	if env, ok := os.LookupEnv("KUBECONFIG"); ok {
		kubeconfig = env
	} else {
		kubeconfig = filepath.Join(os.Getenv("HOME"), ".kube", "config")
	}

	config, err := clientcmd.LoadFromFile(kubeconfig)
	if err != nil {
		return nil, err
	}

	return config, nil
}
