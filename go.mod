module github.com/talos-systems/theila

go 1.16

replace (
	// forked go-yaml that introduces RawYAML interface, which can be used to populate YAML fields using bytes
	// which are then encoded as a valid YAML blocks with proper indentiation
	gopkg.in/yaml.v3 => github.com/unix4ever/yaml v0.0.0-20210315173758-8fb30b8e5a5b
	sigs.k8s.io/cluster-api v0.3.12 => sigs.k8s.io/cluster-api v0.3.9
)

require (
	github.com/containernetworking/cni v0.8.1 // indirect
	github.com/cosi-project/runtime v0.0.0-20210423184025-225827c8b0d8
	github.com/gertd/go-pluralize v0.1.7
	github.com/go-logr/logr v0.2.1 // indirect
	github.com/golang/protobuf v1.5.2
	github.com/google/gofuzz v1.2.0 // indirect
	github.com/google/uuid v1.2.0
	github.com/googleapis/gnostic v0.5.1 // indirect
	github.com/gorilla/websocket v1.4.2
	github.com/grpc-ecosystem/grpc-gateway/v2 v2.4.0
	github.com/imdario/mergo v0.3.11 // indirect
	github.com/onsi/gomega v1.10.3 // indirect
	github.com/prometheus/procfs v0.6.0 // indirect
	github.com/spf13/cobra v1.1.3
	github.com/stretchr/testify v1.7.0
	github.com/talos-systems/cluster-api-bootstrap-provider-talos v0.2.0-alpha.11
	github.com/talos-systems/cluster-api-control-plane-provider-talos v0.1.0-alpha.11
	github.com/talos-systems/sidero v0.2.0
	github.com/talos-systems/talos/pkg/machinery v0.0.0-20210511182023-1cf011a809b9
	go.uber.org/zap v1.16.0
	golang.org/x/crypto v0.0.0-20210220033148-5ea612d1eb83 // indirect
	golang.org/x/sync v0.0.0-20210220032951-036812b2e83c
	golang.org/x/term v0.0.0-20210220032956-6a3ed077a48d // indirect
	golang.org/x/time v0.0.0-20210220033141-f8bda1e9f3ba // indirect
	google.golang.org/grpc v1.37.0
	google.golang.org/protobuf v1.26.0
	gopkg.in/yaml.v3 v3.0.0-20210107192922-496545a6307b
	honnef.co/go/tools v0.1.2 // indirect
	k8s.io/api v0.20.5
	k8s.io/apimachinery v0.20.5
	k8s.io/client-go v0.20.5
	sigs.k8s.io/cluster-api v0.3.12
	sigs.k8s.io/controller-runtime v0.6.3
)
