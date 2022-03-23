# syntax = docker/dockerfile-upstream:1.2.0-labs

# THIS FILE WAS AUTOMATICALLY GENERATED, PLEASE DO NOT EDIT.
#
# Generated on 2022-03-24T12:29:51Z by kres latest.

ARG JS_TOOLCHAIN
ARG TOOLCHAIN

FROM ghcr.io/siderolabs/ca-certificates:v1.0.0 AS image-ca-certificates

FROM ghcr.io/siderolabs/fhs:v1.0.0 AS image-fhs

# base toolchain image
FROM ${JS_TOOLCHAIN} AS js-toolchain
COPY --from=golang:1.17-alpine /usr/local/go /usr/local/go
RUN apk --update --no-cache add bash curl protoc protobuf-dev
COPY ./go.mod .
COPY ./go.sum .
ENV GOPATH /go
ENV PATH ${PATH}:/usr/local/go/bin

# runs markdownlint
FROM node:14.8.0-alpine AS lint-markdown
RUN npm i -g markdownlint-cli@0.23.2
RUN npm i sentences-per-line@0.2.1
WORKDIR /src
COPY .markdownlint.json .
COPY ./docs ./docs
COPY ./CHANGELOG.md ./CHANGELOG.md
COPY ./CONTRIBUTING.md ./CONTRIBUTING.md
COPY ./README.md ./README.md
RUN markdownlint --ignore "CHANGELOG.md" --ignore "**/node_modules/**" --ignore '**/hack/chglog/**' --rules /node_modules/sentences-per-line/index.js .

# collects proto specs
FROM scratch AS proto-specs
ADD api/socket/message.proto /api/socket/message/
ADD api/common/theila.proto /api/common/
ADD api/rpc/resource.proto /api/rpc/
ADD api/rpc/context.proto /api/rpc/
ADD api/rpc/management.proto /api/rpc/
ADD https://raw.githubusercontent.com/googleapis/googleapis/master/google/rpc/status.proto /api/google/rpc/
ADD https://raw.githubusercontent.com/siderolabs/talos/master/api/common/common.proto /api/common/
ADD https://raw.githubusercontent.com/siderolabs/talos/master/api/resource/resource.proto /api/talos/resource/
ADD https://raw.githubusercontent.com/siderolabs/talos/master/api/machine/machine.proto /api/talos/machine/
ADD https://raw.githubusercontent.com/cosi-project/runtime/master/api/v1alpha1/state.proto /api/v1alpha1/
ADD https://raw.githubusercontent.com/cosi-project/runtime/master/api/v1alpha1/resource.proto /api/v1alpha1/

# collects proto specs
FROM scratch AS proto-specs-frontend
ADD api/common/theila.proto /frontend/src/api/common/
ADD api/socket/message.proto /frontend/src/api/socket/
ADD api/rpc/resource.proto /frontend/src/api/rpc/
ADD api/rpc/context.proto /frontend/src/api/rpc/
ADD api/rpc/management.proto /frontend/src/api/rpc/
ADD https://raw.githubusercontent.com/googleapis/googleapis/master/google/rpc/status.proto /frontend/src/api/google/rpc/
ADD https://raw.githubusercontent.com/siderolabs/talos/master/api/resource/resource.proto /frontend/src/api/talos/resource/
ADD https://raw.githubusercontent.com/siderolabs/talos/master/api/machine/machine.proto /frontend/src/api/talos/machine/
ADD https://raw.githubusercontent.com/protocolbuffers/protobuf/master/src/google/protobuf/any.proto /frontend/src/api/google/protobuf/
ADD https://raw.githubusercontent.com/protocolbuffers/protobuf/master/src/google/protobuf/duration.proto /frontend/src/api/google/protobuf/
ADD https://raw.githubusercontent.com/protocolbuffers/protobuf/master/src/google/protobuf/empty.proto /frontend/src/api/google/protobuf/
ADD https://raw.githubusercontent.com/protocolbuffers/protobuf/master/src/google/protobuf/timestamp.proto /frontend/src/api/google/protobuf/
ADD https://raw.githubusercontent.com/googleapis/googleapis/master/google/rpc/code.proto /frontend/src/api/google/rpc/
ADD https://raw.githubusercontent.com/siderolabs/talos/master/api/common/common.proto /frontend/src/api/common/
ADD https://raw.githubusercontent.com/cosi-project/runtime/master/api/v1alpha1/resource.proto /frontend/src/api/v1alpha1/

# base toolchain image
FROM ${TOOLCHAIN} AS toolchain
RUN apk --update --no-cache add bash curl build-base protoc protobuf-dev

# tools and sources
FROM js-toolchain AS js
WORKDIR /src
ARG PROTOBUF_TS_VERSION
RUN npm install -g ts-proto@^${PROTOBUF_TS_VERSION}
ARG PROTOBUF_GRPC_GATEWAY_TS_VERSION
RUN go install github.com/grpc-ecosystem/protoc-gen-grpc-gateway-ts@v${PROTOBUF_GRPC_GATEWAY_TS_VERSION}
RUN mv /go/bin/protoc-gen-grpc-gateway-ts /bin
COPY frontend/package.json ./
COPY frontend/package-lock.json ./
RUN --mount=type=cache,target=/src/node_modules npm version ${VERSION}
RUN --mount=type=cache,target=/src/node_modules npm install
COPY .eslintrc.yaml ./
COPY frontend/babel.config.js ./
COPY frontend/jest.config.js ./
COPY frontend/tsconfig.json ./
COPY ./frontend/src ./src
COPY ./frontend/tests ./tests
COPY ./frontend/public ./public
COPY ./frontend/babel.config.js ./babel.config.js
COPY ./frontend/jest.config.js ./jest.config.js
COPY ./frontend/postcss.config.js ./postcss.config.js
COPY ./frontend/tailwind.config.js ./tailwind.config.js
COPY ./frontend/vue.config.js ./vue.config.js

# build tools
FROM toolchain AS tools
ENV GO111MODULE on
ENV CGO_ENABLED 0
ENV GOPATH /go
RUN curl -sfL https://install.goreleaser.com/github.com/golangci/golangci-lint.sh | bash -s -- -b /bin v1.42.1
ARG GOFUMPT_VERSION
RUN go install mvdan.cc/gofumpt/gofumports@${GOFUMPT_VERSION} \
	&& mv /go/bin/gofumports /bin/gofumports
ARG PROTOBUF_GO_VERSION
RUN go install google.golang.org/protobuf/cmd/protoc-gen-go@v${PROTOBUF_GO_VERSION}
RUN mv /go/bin/protoc-gen-go /bin
ARG GRPC_GO_VERSION
RUN go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@v${GRPC_GO_VERSION}
RUN mv /go/bin/protoc-gen-go-grpc /bin
ARG GRPC_GATEWAY_VERSION
RUN go install github.com/grpc-ecosystem/grpc-gateway/v2/protoc-gen-grpc-gateway@v${GRPC_GATEWAY_VERSION}
RUN mv /go/bin/protoc-gen-grpc-gateway /bin

# builds frontend
FROM js AS frontend
RUN --mount=type=cache,target=/src/node_modules npm run build
RUN mkdir -p /internal/frontend/dist
RUN cp -rf ./dist/* /internal/frontend/dist

# runs eslint
FROM js AS lint-eslint
RUN --mount=type=cache,target=/src/node_modules npm run lint

# runs protobuf compiler
FROM js AS proto-compile-frontend
COPY --from=proto-specs-frontend / /
RUN protoc -I/frontend/src/api --grpc-gateway-ts_out=source_relative:/frontend/src/api --plugin=/root/.npm-global/.bin/protoc-gen-ts_proto.cmd --ts_proto_out=paths=source_relative:/frontend/src/api --ts_proto_opt=returnObservable=false --ts_proto_opt=outputClientImpl=false --ts_proto_opt=snakeToCamel=false /frontend/src/api/common/theila.proto
RUN protoc -I/frontend/src/api --plugin=/root/.npm-global/.bin/protoc-gen-ts_proto.cmd --ts_proto_out=paths=source_relative:/frontend/src/api --ts_proto_opt=returnObservable=false --ts_proto_opt=outputClientImpl=false --ts_proto_opt=snakeToCamel=false /frontend/src/api/socket/message.proto
RUN protoc -I/frontend/src/api --grpc-gateway-ts_out=source_relative:/frontend/src/api --plugin=/root/.npm-global/.bin/protoc-gen-ts_proto.cmd --ts_proto_out=paths=source_relative:/frontend/src/api --ts_proto_opt=returnObservable=false --ts_proto_opt=outputClientImpl=false --ts_proto_opt=snakeToCamel=false /frontend/src/api/rpc/resource.proto
RUN protoc -I/frontend/src/api --grpc-gateway-ts_out=source_relative:/frontend/src/api --plugin=/root/.npm-global/.bin/protoc-gen-ts_proto.cmd --ts_proto_out=paths=source_relative:/frontend/src/api --ts_proto_opt=returnObservable=false --ts_proto_opt=outputClientImpl=false --ts_proto_opt=snakeToCamel=false /frontend/src/api/rpc/context.proto
RUN protoc -I/frontend/src/api --grpc-gateway-ts_out=source_relative:/frontend/src/api --plugin=/root/.npm-global/.bin/protoc-gen-ts_proto.cmd --ts_proto_out=paths=source_relative:/frontend/src/api --ts_proto_opt=returnObservable=false --ts_proto_opt=outputClientImpl=false --ts_proto_opt=snakeToCamel=false /frontend/src/api/rpc/management.proto
RUN protoc -I/frontend/src/api --grpc-gateway-ts_out=source_relative:/frontend/src/api --plugin=/root/.npm-global/.bin/protoc-gen-ts_proto.cmd --ts_proto_out=paths=source_relative:/frontend/src/api --ts_proto_opt=returnObservable=false --ts_proto_opt=outputClientImpl=false --ts_proto_opt=snakeToCamel=false /frontend/src/api/google/rpc/status.proto
RUN protoc -I/frontend/src/api --grpc-gateway-ts_out=source_relative:/frontend/src/api --plugin=/root/.npm-global/.bin/protoc-gen-ts_proto.cmd --ts_proto_out=paths=source_relative:/frontend/src/api --ts_proto_opt=returnObservable=false --ts_proto_opt=outputClientImpl=false --ts_proto_opt=snakeToCamel=false /frontend/src/api/talos/resource/resource.proto
RUN protoc -I/frontend/src/api --grpc-gateway-ts_out=source_relative:/frontend/src/api --plugin=/root/.npm-global/.bin/protoc-gen-ts_proto.cmd --ts_proto_out=paths=source_relative:/frontend/src/api --ts_proto_opt=returnObservable=false --ts_proto_opt=outputClientImpl=false --ts_proto_opt=snakeToCamel=false /frontend/src/api/talos/machine/machine.proto
RUN protoc -I/frontend/src/api --grpc-gateway-ts_out=source_relative:/frontend/src/api --plugin=/root/.npm-global/.bin/protoc-gen-ts_proto.cmd --ts_proto_out=paths=source_relative:/frontend/src/api --ts_proto_opt=returnObservable=false --ts_proto_opt=outputClientImpl=false --ts_proto_opt=snakeToCamel=false /frontend/src/api/google/protobuf/any.proto
RUN protoc -I/frontend/src/api --grpc-gateway-ts_out=source_relative:/frontend/src/api --plugin=/root/.npm-global/.bin/protoc-gen-ts_proto.cmd --ts_proto_out=paths=source_relative:/frontend/src/api --ts_proto_opt=returnObservable=false --ts_proto_opt=outputClientImpl=false --ts_proto_opt=snakeToCamel=false /frontend/src/api/google/protobuf/duration.proto
RUN protoc -I/frontend/src/api --grpc-gateway-ts_out=source_relative:/frontend/src/api --plugin=/root/.npm-global/.bin/protoc-gen-ts_proto.cmd --ts_proto_out=paths=source_relative:/frontend/src/api --ts_proto_opt=returnObservable=false --ts_proto_opt=outputClientImpl=false --ts_proto_opt=snakeToCamel=false /frontend/src/api/google/protobuf/empty.proto
RUN protoc -I/frontend/src/api --grpc-gateway-ts_out=source_relative:/frontend/src/api --plugin=/root/.npm-global/.bin/protoc-gen-ts_proto.cmd --ts_proto_out=paths=source_relative:/frontend/src/api --ts_proto_opt=returnObservable=false --ts_proto_opt=outputClientImpl=false --ts_proto_opt=snakeToCamel=false /frontend/src/api/google/protobuf/timestamp.proto
RUN protoc -I/frontend/src/api --grpc-gateway-ts_out=source_relative:/frontend/src/api --plugin=/root/.npm-global/.bin/protoc-gen-ts_proto.cmd --ts_proto_out=paths=source_relative:/frontend/src/api --ts_proto_opt=returnObservable=false --ts_proto_opt=outputClientImpl=false --ts_proto_opt=snakeToCamel=false /frontend/src/api/google/rpc/code.proto
RUN protoc -I/frontend/src/api --grpc-gateway-ts_out=source_relative:/frontend/src/api --plugin=/root/.npm-global/.bin/protoc-gen-ts_proto.cmd --ts_proto_out=paths=source_relative:/frontend/src/api --ts_proto_opt=returnObservable=false --ts_proto_opt=outputClientImpl=false --ts_proto_opt=snakeToCamel=false /frontend/src/api/common/common.proto
RUN protoc -I/frontend/src/api --grpc-gateway-ts_out=source_relative:/frontend/src/api --plugin=/root/.npm-global/.bin/protoc-gen-ts_proto.cmd --ts_proto_out=paths=source_relative:/frontend/src/api --ts_proto_opt=returnObservable=false --ts_proto_opt=outputClientImpl=false --ts_proto_opt=snakeToCamel=false /frontend/src/api/v1alpha1/resource.proto
RUN rm /frontend/src/api/common/theila.proto
RUN rm /frontend/src/api/socket/message.proto
RUN rm /frontend/src/api/rpc/resource.proto
RUN rm /frontend/src/api/rpc/context.proto
RUN rm /frontend/src/api/rpc/management.proto

# runs js unit-tests
FROM js AS unit-tests-frontend
RUN --mount=type=cache,target=/src/node_modules CI=true npm run test

# runs protobuf compiler
FROM tools AS proto-compile
COPY --from=proto-specs / /
RUN protoc -I/api --go_out=paths=source_relative:/api --go-grpc_out=paths=source_relative:/api /api/socket/message/message.proto
RUN protoc -I/api --go_out=paths=source_relative:/api --go-grpc_out=paths=source_relative:/api /api/common/theila.proto
RUN protoc -I/api --grpc-gateway_out=paths=source_relative:/api --grpc-gateway_opt=generate_unbound_methods=true --go_out=paths=source_relative:/api --go-grpc_out=paths=source_relative:/api /api/rpc/resource.proto
RUN protoc -I/api --grpc-gateway_out=paths=source_relative:/api --grpc-gateway_opt=generate_unbound_methods=true --go_out=paths=source_relative:/api --go-grpc_out=paths=source_relative:/api /api/rpc/context.proto
RUN protoc -I/api --grpc-gateway_out=paths=source_relative:/api --grpc-gateway_opt=generate_unbound_methods=true --go_out=paths=source_relative:/api --go-grpc_out=paths=source_relative:/api /api/rpc/management.proto
RUN protoc -I/api --grpc-gateway_out=paths=source_relative:/api --grpc-gateway_opt=generate_unbound_methods=true --grpc-gateway_opt=standalone=true /api/google/rpc/status.proto
RUN protoc -I/api --grpc-gateway_out=paths=source_relative:/api --grpc-gateway_opt=generate_unbound_methods=true --grpc-gateway_opt=standalone=true /api/common/common.proto
RUN protoc -I/api --grpc-gateway_out=paths=source_relative:/api --grpc-gateway_opt=generate_unbound_methods=true --grpc-gateway_opt=standalone=true /api/talos/resource/resource.proto
RUN protoc -I/api --grpc-gateway_out=paths=source_relative:/api --grpc-gateway_opt=generate_unbound_methods=true --grpc-gateway_opt=standalone=true /api/talos/machine/machine.proto
RUN protoc -I/api --grpc-gateway_out=paths=source_relative:/api --grpc-gateway_opt=generate_unbound_methods=true --grpc-gateway_opt=standalone=true /api/v1alpha1/state.proto
RUN protoc -I/api --grpc-gateway_out=paths=source_relative:/api --grpc-gateway_opt=generate_unbound_methods=true --grpc-gateway_opt=standalone=true /api/v1alpha1/resource.proto
RUN rm /api/socket/message/message.proto
RUN rm /api/common/theila.proto
RUN rm /api/rpc/resource.proto
RUN rm /api/rpc/context.proto
RUN rm /api/rpc/management.proto

# tools and sources
FROM tools AS base
WORKDIR /src
COPY ./go.mod .
COPY ./go.sum .
RUN --mount=type=cache,target=/go/pkg go mod download
RUN --mount=type=cache,target=/go/pkg go mod verify
COPY ./api ./api
COPY ./cmd ./cmd
COPY ./internal ./internal
COPY --from=frontend /internal/frontend/dist ./internal/frontend/dist
RUN --mount=type=cache,target=/go/pkg go list -mod=readonly all >/dev/null

# cleaned up specs and compiled versions
FROM scratch AS generate-frontend
COPY --from=proto-compile-frontend frontend/ frontend/

# cleaned up specs and compiled versions
FROM scratch AS generate
COPY --from=proto-compile /api/ /api/

# runs gofumpt
FROM base AS lint-gofumpt
RUN find . -name '*.pb.go' | xargs -r rm
RUN find . -name '*.pb.gw.go' | xargs -r rm
RUN FILES="$(gofumports -l -local github.com/siderolabs/theila .)" && test -z "${FILES}" || (echo -e "Source code is not formatted with 'gofumports -w -local github.com/siderolabs/theila .':\n${FILES}"; exit 1)

# runs golangci-lint
FROM base AS lint-golangci-lint
COPY .golangci.yml .
ENV GOGC 50
RUN --mount=type=cache,target=/root/.cache/go-build --mount=type=cache,target=/root/.cache/golangci-lint --mount=type=cache,target=/go/pkg golangci-lint run --config .golangci.yml

# runs unit-tests with race detector
FROM base AS unit-tests-race
ARG TESTPKGS
RUN --mount=type=cache,target=/root/.cache/go-build --mount=type=cache,target=/go/pkg --mount=type=cache,target=/tmp CGO_ENABLED=1 go test -v -race -count 1 ${TESTPKGS}

# runs unit-tests
FROM base AS unit-tests-run
ARG TESTPKGS
RUN --mount=type=cache,target=/root/.cache/go-build --mount=type=cache,target=/go/pkg --mount=type=cache,target=/tmp go test -v -covermode=atomic -coverprofile=coverage.txt -coverpkg=${TESTPKGS} -count 1 ${TESTPKGS}

# builds theila-darwin-amd64
FROM base AS theila-darwin-amd64-build
COPY --from=generate / /
WORKDIR /src/cmd/theila
RUN --mount=type=cache,target=/root/.cache/go-build --mount=type=cache,target=/go/pkg GOARCH=amd64 GOOS=darwin go build -ldflags "-s -w" -o /theila-darwin-amd64

# builds theila-darwin-arm64
FROM base AS theila-darwin-arm64-build
COPY --from=generate / /
WORKDIR /src/cmd/theila
RUN --mount=type=cache,target=/root/.cache/go-build --mount=type=cache,target=/go/pkg GOARCH=arm64 GOOS=darwin go build -ldflags "-s -w" -o /theila-darwin-arm64

# builds theila-linux-amd64
FROM base AS theila-linux-amd64-build
COPY --from=generate / /
WORKDIR /src/cmd/theila
RUN --mount=type=cache,target=/root/.cache/go-build --mount=type=cache,target=/go/pkg GOARCH=amd64 GOOS=linux go build -ldflags "-s -w" -o /theila-linux-amd64

# builds theila-linux-arm64
FROM base AS theila-linux-arm64-build
COPY --from=generate / /
WORKDIR /src/cmd/theila
RUN --mount=type=cache,target=/root/.cache/go-build --mount=type=cache,target=/go/pkg GOARCH=arm64 GOOS=linux go build -ldflags "-s -w" -o /theila-linux-arm64

# builds theila-linux-armv7
FROM base AS theila-linux-armv7-build
COPY --from=generate / /
WORKDIR /src/cmd/theila
RUN --mount=type=cache,target=/root/.cache/go-build --mount=type=cache,target=/go/pkg GOARCH=arm GOARM=7 GOOS=linux go build -ldflags "-s -w" -o /theila-linux-armv7

# builds theila-windows-amd64.exe
FROM base AS theila-windows-amd64.exe-build
COPY --from=generate / /
WORKDIR /src/cmd/theila
RUN --mount=type=cache,target=/root/.cache/go-build --mount=type=cache,target=/go/pkg GOARCH=amd64 GOOS=windows go build -ldflags "-s -w" -o /theila-windows-amd64.exe

FROM scratch AS unit-tests
COPY --from=unit-tests-run /src/coverage.txt /coverage.txt

FROM scratch AS theila-darwin-amd64
COPY --from=theila-darwin-amd64-build /theila-darwin-amd64 /theila-darwin-amd64

FROM scratch AS theila-darwin-arm64
COPY --from=theila-darwin-arm64-build /theila-darwin-arm64 /theila-darwin-arm64

FROM scratch AS theila-linux-amd64
COPY --from=theila-linux-amd64-build /theila-linux-amd64 /theila-linux-amd64

FROM scratch AS theila-linux-arm64
COPY --from=theila-linux-arm64-build /theila-linux-arm64 /theila-linux-arm64

FROM scratch AS theila-linux-armv7
COPY --from=theila-linux-armv7-build /theila-linux-armv7 /theila-linux-armv7

FROM scratch AS theila-windows-amd64.exe
COPY --from=theila-windows-amd64.exe-build /theila-windows-amd64.exe /theila-windows-amd64.exe

FROM theila-linux-${TARGETARCH} AS theila

FROM scratch AS image-theila
ARG TARGETARCH
COPY --from=theila theila-linux-${TARGETARCH} /theila
COPY --from=image-fhs / /
COPY --from=image-ca-certificates / /
LABEL org.opencontainers.image.source https://github.com/siderolabs/theila
ENTRYPOINT ["/theila"]

