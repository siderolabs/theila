# syntax = docker/dockerfile-upstream:1.1.7-experimental

# THIS FILE WAS AUTOMATICALLY GENERATED, PLEASE DO NOT EDIT.
#
# Generated on 2020-10-05T10:50:08Z by kres ce6bee5-dirty.

ARG TOOLCHAIN_JS
ARG TOOLCHAIN

FROM autonomy/ca-certificates:v0.2.0-29-gdda8024 AS image-ca-certificates

FROM autonomy/fhs:v0.2.0-29-gdda8024 AS image-fhs

# runs markdownlint
FROM node:14.8.0-alpine AS lint-markdown
RUN npm i -g markdownlint-cli@0.23.2
RUN npm i sentences-per-line@0.2.1
WORKDIR /src
COPY .markdownlint.json .
COPY ./README.md ./README.md
RUN markdownlint --ignore "**/node_modules/**" --ignore '**/hack/chglog/**' --rules /node_modules/sentences-per-line/index.js .

# base toolchain image
FROM ${TOOLCHAIN} AS toolchain
RUN apk --update --no-cache add bash curl build-base

# base toolchain image
FROM ${TOOLCHAIN_JS} AS toolchain-js
RUN apk --update --no-cache add bash curl

# build tools
FROM toolchain AS tools
ENV GO111MODULE on
ENV CGO_ENABLED 0
ENV GOPATH /go
RUN curl -sfL https://install.goreleaser.com/github.com/golangci/golangci-lint.sh | bash -s -- -b /bin v1.30.0
ARG GOFUMPT_VERSION
RUN cd $(mktemp -d) \
	&& go mod init tmp \
	&& go get mvdan.cc/gofumpt/gofumports@${GOFUMPT_VERSION} \
	&& mv /go/bin/gofumports /bin/gofumports

# build tools for javascript
FROM toolchain-js AS tools-js

# tools and sources
FROM tools AS base
WORKDIR /src
COPY ./go.mod .
COPY ./go.sum .
RUN --mount=type=cache,target=/go/pkg go mod download
RUN --mount=type=cache,target=/go/pkg go mod verify
COPY ./internal ./internal
COPY ./pkg ./pkg
COPY ./cmd ./cmd
COPY ./pkged.go ./pkged.go
RUN --mount=type=cache,target=/go/pkg go list -mod=readonly all >/dev/null

# tools and sources
FROM tools-js AS base-js
WORKDIR /src
COPY ./frontend ./frontend

# runs gofumpt
FROM base AS lint-gofumpt
RUN find . -name '*.pb.go' | xargs -r rm
RUN FILES="$(gofumports -l -local github.com/talos-systems/theila .)" && test -z "${FILES}" || (echo -e "Source code is not formatted with 'gofumports -w -local github.com/talos-systems/theila .':\n${FILES}"; exit 1)

# runs golangci-lint
FROM base AS lint-golangci-lint
COPY .golangci.yml .
ENV GOGC 50
RUN --mount=type=cache,target=/root/.cache/go-build --mount=type=cache,target=/root/.cache/golangci-lint --mount=type=cache,target=/go/pkg golangci-lint run --config .golangci.yml

# builds theila
FROM base AS theila-build
WORKDIR /src/cmd/theila
RUN --mount=type=cache,target=/root/.cache/go-build --mount=type=cache,target=/go/pkg go build -ldflags "-s -w" -o /theila

# runs unit-tests with race detector
FROM base AS unit-tests-race
ARG TESTPKGS
RUN --mount=type=cache,target=/root/.cache/go-build --mount=type=cache,target=/go/pkg --mount=type=cache,target=/tmp CGO_ENABLED=1 go test -v -race -count 1 ${TESTPKGS}

# runs unit-tests
FROM base AS unit-tests-run
ARG TESTPKGS
RUN --mount=type=cache,target=/root/.cache/go-build --mount=type=cache,target=/go/pkg --mount=type=cache,target=/tmp go test -v -covermode=atomic -coverprofile=coverage.txt -count 1 ${TESTPKGS}

# builds frontend
FROM base-js AS frontend
WORKDIR /src/frontend
RUN npm version ${VERSION}
RUN npm run build

FROM scratch AS theila
COPY --from=theila-build /theila /theila

FROM scratch AS unit-tests
COPY --from=unit-tests-run /src/coverage.txt /coverage.txt

FROM scratch AS image-theila
COPY --from=theila / /
COPY --from=image-fhs / /
COPY --from=image-ca-certificates / /
ENTRYPOINT ["/theila"]

