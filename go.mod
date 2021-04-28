module github.com/talos-systems/theila

go 1.16

require (
	github.com/containernetworking/cni v0.8.1 // indirect
	github.com/go-logr/logr v0.2.1 // indirect
	github.com/golang/protobuf v1.5.2
	github.com/google/gofuzz v1.2.0 // indirect
	github.com/google/uuid v1.2.0
	github.com/googleapis/gnostic v0.5.1 // indirect
	github.com/gorilla/websocket v1.4.2
	github.com/imdario/mergo v0.3.11 // indirect
	github.com/onsi/gomega v1.10.3 // indirect
	github.com/prometheus/procfs v0.6.0 // indirect
	github.com/spf13/cobra v1.1.3
	github.com/stretchr/testify v1.7.0
	github.com/talos-systems/cluster-api-bootstrap-provider-talos v0.2.0-alpha.11
	github.com/talos-systems/cluster-api-control-plane-provider-talos v0.1.0-alpha.11
	github.com/talos-systems/os-runtime v0.0.0-20210315190223-7b3d14457439 // indirect
	github.com/talos-systems/sidero v0.2.0
	github.com/talos-systems/talos/pkg/machinery v0.0.0-20210401163915-1d8e9674a91b
	go.uber.org/multierr v1.6.0 // indirect
	go.uber.org/zap v1.16.0
	golang.org/x/crypto v0.0.0-20210220033148-5ea612d1eb83 // indirect
	golang.org/x/oauth2 v0.0.0-20200902213428-5d25da1a8d43 // indirect
	golang.org/x/sync v0.0.0-20210220032951-036812b2e83c
	golang.org/x/sys v0.0.0-20210301091718-77cc2087c03b // indirect
	golang.org/x/term v0.0.0-20210220032956-6a3ed077a48d // indirect
	golang.org/x/time v0.0.0-20210220033141-f8bda1e9f3ba // indirect
	google.golang.org/protobuf v1.26.0
	gopkg.in/yaml.v3 v3.0.0-20210107192922-496545a6307b
	honnef.co/go/tools v0.1.2 // indirect
	k8s.io/api v0.20.5
	k8s.io/apimachinery v0.20.5
	k8s.io/client-go v0.20.5
	sigs.k8s.io/cluster-api v0.3.12
	sigs.k8s.io/controller-runtime v0.6.3
)

replace sigs.k8s.io/cluster-api v0.3.12 => sigs.k8s.io/cluster-api v0.3.9
