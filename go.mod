module github.com/talos-systems/theila

go 1.16

replace (
	// required to get talos repo root
	github.com/talos-systems/talos/pkg/machinery => github.com/talos-systems/talos/pkg/machinery v0.0.0-20210715153248-2e463348b26f
	// forked go-yaml that introduces RawYAML interface, which can be used to populate YAML fields using bytes
	// which are then encoded as a valid YAML blocks with proper indentiation
	gopkg.in/yaml.v3 => github.com/unix4ever/yaml v0.0.0-20210315173758-8fb30b8e5a5b
	// keep older versions of k8s.io packages to keep compatiblity with cluster-api
	k8s.io/api v0.21.2 => k8s.io/api v0.20.5
	k8s.io/apimachinery v0.21.2 => k8s.io/apimachinery v0.20.5
	k8s.io/client-go v0.21.2 => k8s.io/client-go v0.20.5

	sigs.k8s.io/cluster-api v0.3.20 => sigs.k8s.io/cluster-api v0.3.9
)

require (
	github.com/cosi-project/runtime v0.0.0-20210707150857-25f235cd0682
	github.com/gertd/go-pluralize v0.1.7
	github.com/golang/protobuf v1.5.2
	github.com/google/uuid v1.2.0
	github.com/gorilla/websocket v1.4.2
	github.com/grpc-ecosystem/grpc-gateway/v2 v2.4.0
	github.com/spf13/cobra v1.2.1
	github.com/stretchr/testify v1.7.0
	github.com/talos-systems/cluster-api-bootstrap-provider-talos v0.2.0
	github.com/talos-systems/cluster-api-control-plane-provider-talos v0.1.0
	github.com/talos-systems/grpc-proxy v0.2.0
	github.com/talos-systems/sidero v0.3.0
	github.com/talos-systems/talos v0.11.0-alpha.2.0.20210715153248-2e463348b26f
	github.com/talos-systems/talos/pkg/machinery v0.0.0-20210715153248-2e463348b26f
	go.uber.org/zap v1.18.1
	golang.org/x/sync v0.0.0-20210220032951-036812b2e83c
	google.golang.org/grpc v1.39.0
	google.golang.org/protobuf v1.27.1
	gopkg.in/yaml.v3 v3.0.0-20210107192922-496545a6307b
	k8s.io/api v0.21.2
	k8s.io/apiextensions-apiserver v0.19.1
	k8s.io/apimachinery v0.21.2
	k8s.io/client-go v0.21.2
	sigs.k8s.io/cluster-api v0.3.20
	sigs.k8s.io/controller-runtime v0.6.3
)
