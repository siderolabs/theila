# THIS FILE WAS AUTOMATICALLY GENERATED, PLEASE DO NOT EDIT.
#
# Generated on 2022-03-24T12:00:33Z by kres latest.

# common variables

SHA := $(shell git describe --match=none --always --abbrev=8 --dirty)
TAG := $(shell git describe --tag --always --dirty)
BRANCH := $(shell git rev-parse --abbrev-ref HEAD)
ARTIFACTS := _out
REGISTRY ?= ghcr.io
USERNAME ?= siderolabs
REGISTRY_AND_USERNAME ?= $(REGISTRY)/$(USERNAME)
PROTOBUF_TS_VERSION ?= 1.79.2
PROTOBUF_GRPC_GATEWAY_TS_VERSION ?= 1.1.0
TESTPKGS ?= ./...
GOFUMPT_VERSION ?= abc0db2c416aca0f60ea33c23c76665f6e7ba0b6
GO_VERSION ?= 1.17
PROTOBUF_GO_VERSION ?= 1.27.1
GRPC_GO_VERSION ?= 1.1.0
GRPC_GATEWAY_VERSION ?= 2.4.0
VTPROTOBUF_VERSION ?= 81d623a9a700ede8ef765e5ab08b3aa1f5b4d5a8
TESTPKGS ?= ./...
KRES_IMAGE ?= ghcr.io/siderolabs/kres:latest

# docker build settings

BUILD := docker buildx build
PLATFORM ?= linux/amd64
PROGRESS ?= auto
PUSH ?= false
CI_ARGS ?=
COMMON_ARGS = --file=Dockerfile
COMMON_ARGS += --progress=$(PROGRESS)
COMMON_ARGS += --platform=$(PLATFORM)
COMMON_ARGS += --push=$(PUSH)
COMMON_ARGS += --build-arg=ARTIFACTS=$(ARTIFACTS)
COMMON_ARGS += --build-arg=SHA=$(SHA)
COMMON_ARGS += --build-arg=TAG=$(TAG)
COMMON_ARGS += --build-arg=USERNAME=$(USERNAME)
COMMON_ARGS += --build-arg=JS_TOOLCHAIN=$(JS_TOOLCHAIN)
COMMON_ARGS += --build-arg=PROTOBUF_TS_VERSION=$(PROTOBUF_TS_VERSION)
COMMON_ARGS += --build-arg=PROTOBUF_GRPC_GATEWAY_TS_VERSION=$(PROTOBUF_GRPC_GATEWAY_TS_VERSION)
COMMON_ARGS += --build-arg=TOOLCHAIN=$(TOOLCHAIN)
COMMON_ARGS += --build-arg=GOFUMPT_VERSION=$(GOFUMPT_VERSION)
COMMON_ARGS += --build-arg=PROTOBUF_GO_VERSION=$(PROTOBUF_GO_VERSION)
COMMON_ARGS += --build-arg=GRPC_GO_VERSION=$(GRPC_GO_VERSION)
COMMON_ARGS += --build-arg=GRPC_GATEWAY_VERSION=$(GRPC_GATEWAY_VERSION)
COMMON_ARGS += --build-arg=VTPROTOBUF_VERSION=$(VTPROTOBUF_VERSION)
COMMON_ARGS += --build-arg=TESTPKGS=$(TESTPKGS)
JS_TOOLCHAIN ?= docker.io/node:14.18.1-alpine3.14
TOOLCHAIN ?= docker.io/golang:1.17-alpine

# help menu

export define HELP_MENU_HEADER
# Getting Started

To build this project, you must have the following installed:

- git
- make
- docker (19.03 or higher)

## Creating a Builder Instance

The build process makes use of experimental Docker features (buildx).
To enable experimental features, add 'experimental: "true"' to '/etc/docker/daemon.json' on
Linux or enable experimental features in Docker GUI for Windows or Mac.

To create a builder instance, run:

	docker buildx create --name local --use


If you already have a compatible builder instance, you may use that instead.

## Artifacts

All artifacts will be output to ./$(ARTIFACTS). Images will be tagged with the
registry "$(REGISTRY)", username "$(USERNAME)", and a dynamic tag (e.g. $(IMAGE):$(TAG)).
The registry and username can be overridden by exporting REGISTRY, and USERNAME
respectively.

endef

all: unit-tests-frontend lint-eslint frontend unit-tests theila image-theila dev-server lint

.PHONY: clean
clean:  ## Cleans up all artifacts.
	@rm -rf $(ARTIFACTS)

target-%:  ## Builds the specified target defined in the Dockerfile. The build result will only remain in the build cache.
	@$(BUILD) --target=$* $(COMMON_ARGS) $(TARGET_ARGS) $(CI_ARGS) .

local-%:  ## Builds the specified target defined in the Dockerfile using the local output type. The build result will be output to the specified local destination.
	@$(MAKE) target-$* TARGET_ARGS="--output=type=local,dest=$(DEST) $(TARGET_ARGS)"

generate-frontend:  ## Generate .proto definitions.
	@$(MAKE) local-$@ DEST=./

.PHONY: js
js:  ## Prepare js base toolchain.
	@$(MAKE) target-$@

.PHONY: unit-tests-frontend
unit-tests-frontend:  ## Performs unit tests
	@$(MAKE) target-$@

lint-eslint:  ## Runs eslint linter.
	@$(MAKE) target-$@

.PHONY: $(ARTIFACTS)/frontend-js
$(ARTIFACTS)/frontend-js:
	@$(MAKE) target-frontend

.PHONY: frontend
frontend: $(ARTIFACTS)/frontend-js  ## Builds js release for frontend.

lint-golangci-lint:  ## Runs golangci-lint linter.
	@$(MAKE) target-$@

lint-gofumpt:  ## Runs gofumpt linter.
	@$(MAKE) target-$@

.PHONY: fmt
fmt:  ## Formats the source code
	@docker run --rm -it -v $(PWD):/src -w /src golang:$(GO_VERSION) \
		bash -c "export GO111MODULE=on; export GOPROXY=https://proxy.golang.org; \
		go install mvdan.cc/gofumpt/gofumports@$(GOFUMPT_VERSION) && \
		gofumports -w -local github.com/siderolabs/theila ."

generate:  ## Generate .proto definitions.
	@$(MAKE) local-$@ DEST=./

.PHONY: base
base: frontend  ## Prepare base toolchain
	@$(MAKE) target-$@

.PHONY: unit-tests
unit-tests:  ## Performs unit tests
	@$(MAKE) local-$@ DEST=$(ARTIFACTS)

.PHONY: unit-tests-race
unit-tests-race:  ## Performs unit tests with race detection enabled.
	@$(MAKE) target-$@

.PHONY: coverage
coverage:  ## Upload coverage data to codecov.io.
	bash -c "bash <(curl -s https://codecov.io/bash) -f $(ARTIFACTS)/coverage.txt -X fix"

.PHONY: $(ARTIFACTS)/theila-darwin-amd64
$(ARTIFACTS)/theila-darwin-amd64:
	@$(MAKE) local-theila-darwin-amd64 DEST=$(ARTIFACTS)

.PHONY: theila-darwin-amd64
theila-darwin-amd64: $(ARTIFACTS)/theila-darwin-amd64  ## Builds executable for theila-darwin-amd64.

.PHONY: $(ARTIFACTS)/theila-darwin-arm64
$(ARTIFACTS)/theila-darwin-arm64:
	@$(MAKE) local-theila-darwin-arm64 DEST=$(ARTIFACTS)

.PHONY: theila-darwin-arm64
theila-darwin-arm64: $(ARTIFACTS)/theila-darwin-arm64  ## Builds executable for theila-darwin-arm64.

.PHONY: $(ARTIFACTS)/theila-linux-amd64
$(ARTIFACTS)/theila-linux-amd64:
	@$(MAKE) local-theila-linux-amd64 DEST=$(ARTIFACTS)

.PHONY: theila-linux-amd64
theila-linux-amd64: $(ARTIFACTS)/theila-linux-amd64  ## Builds executable for theila-linux-amd64.

.PHONY: $(ARTIFACTS)/theila-linux-arm64
$(ARTIFACTS)/theila-linux-arm64:
	@$(MAKE) local-theila-linux-arm64 DEST=$(ARTIFACTS)

.PHONY: theila-linux-arm64
theila-linux-arm64: $(ARTIFACTS)/theila-linux-arm64  ## Builds executable for theila-linux-arm64.

.PHONY: $(ARTIFACTS)/theila-linux-armv7
$(ARTIFACTS)/theila-linux-armv7:
	@$(MAKE) local-theila-linux-armv7 DEST=$(ARTIFACTS)

.PHONY: theila-linux-armv7
theila-linux-armv7: $(ARTIFACTS)/theila-linux-armv7  ## Builds executable for theila-linux-armv7.

.PHONY: $(ARTIFACTS)/theila-windows-amd64.exe
$(ARTIFACTS)/theila-windows-amd64.exe:
	@$(MAKE) local-theila-windows-amd64.exe DEST=$(ARTIFACTS)

.PHONY: theila-windows-amd64.exe
theila-windows-amd64.exe: $(ARTIFACTS)/theila-windows-amd64.exe  ## Builds executable for theila-windows-amd64.exe.

.PHONY: theila
theila: theila-darwin-amd64 theila-darwin-arm64 theila-linux-amd64 theila-linux-arm64 theila-linux-armv7 theila-windows-amd64.exe  ## Builds executables for theila.

.PHONY: lint-markdown
lint-markdown:  ## Runs markdownlint.
	@$(MAKE) target-$@

.PHONY: lint
lint: lint-golangci-lint lint-gofumpt lint-markdown  ## Run all linters for the project.

.PHONY: image-theila
image-theila:  ## Builds image for theila.
	@$(MAKE) target-$@ TARGET_ARGS="--tag=$(REGISTRY)/$(USERNAME)/theila:$(TAG)"

.PHONY: dev-server
dev-server:
	hack/dev-server.sh

.PHONY: rekres
rekres:
	@docker pull $(KRES_IMAGE)
	@docker run --rm -v $(PWD):/src -w /src -e GITHUB_TOKEN $(KRES_IMAGE)

.PHONY: help
help:  ## This help menu.
	@echo "$$HELP_MENU_HEADER"
	@grep -E '^[a-zA-Z%_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: release-notes
release-notes:
	mkdir -p $(ARTIFACTS)
	@ARTIFACTS=$(ARTIFACTS) ./hack/release.sh $@ $(ARTIFACTS)/RELEASE_NOTES.md $(TAG)

