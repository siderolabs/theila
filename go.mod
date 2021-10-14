module github.com/talos-systems/theila

go 1.16

replace (
	// required to get talos repo root
	github.com/talos-systems/talos/pkg/machinery => github.com/talos-systems/talos/pkg/machinery v0.0.0-20210721155126-70d2505b7c88
	// forked go-yaml that introduces RawYAML interface, which can be used to populate YAML fields using bytes
	// which are then encoded as a valid YAML blocks with proper indentiation
	gopkg.in/yaml.v3 => github.com/unix4ever/yaml v0.0.0-20210315173758-8fb30b8e5a5b
)

require (
	github.com/cosi-project/runtime v0.0.0-20210707150857-25f235cd0682
	github.com/gertd/go-pluralize v0.1.7
	github.com/golang/protobuf v1.5.2
	github.com/google/go-github/v35 v35.3.0
	github.com/google/uuid v1.3.0
	github.com/gorilla/websocket v1.4.2
	github.com/grpc-ecosystem/grpc-gateway/v2 v2.4.0
	github.com/pkg/errors v0.9.1
	github.com/spf13/cobra v1.2.1
	github.com/stretchr/testify v1.7.0
	github.com/talos-systems/capi-utils v0.0.0-20211014162503-b018ea29c13a
	github.com/talos-systems/grpc-proxy v0.2.0
	github.com/talos-systems/talos v0.11.0-alpha.2.0.20210721155126-70d2505b7c88
	github.com/talos-systems/talos/pkg/machinery v0.12.3
	go.uber.org/zap v1.19.0
	golang.org/x/oauth2 v0.0.0-20210819190943-2bc19b11175f
	golang.org/x/sync v0.0.0-20210220032951-036812b2e83c
	google.golang.org/grpc v1.40.0
	google.golang.org/protobuf v1.27.1
	gopkg.in/yaml.v3 v3.0.0-20210107192922-496545a6307b
	k8s.io/api v0.22.2
	k8s.io/apiextensions-apiserver v0.22.2
	k8s.io/apimachinery v0.22.2
	k8s.io/client-go v0.22.2
	sigs.k8s.io/cluster-api v0.4.3
	sigs.k8s.io/controller-runtime v0.9.7
)
