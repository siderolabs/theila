# syntax = docker/dockerfile-upstream:1.2.0-labs

# THIS FILE WAS AUTOMATICALLY GENERATED, PLEASE DO NOT EDIT.
#
# Generated on 2021-03-30T15:28:27Z by kres def665a-dirty.

ARG JS_TOOLCHAIN
ARG TOOLCHAIN

# cleaned up specs and compiled versions
FROM scratch AS generate

FROM ghcr.io/talos-systems/ca-certificates:v0.3.0-12-g90722c3 AS image-ca-certificates

FROM ghcr.io/talos-systems/fhs:v0.3.0-12-g90722c3 AS image-fhs

# base toolchain image
FROM ${JS_TOOLCHAIN} AS js-toolchain
RUN apk --update --no-cache add bash curl

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
RUN apk --update --no-cache add bash curl build-base protoc protobuf-dev

# tools and sources
FROM js-toolchain AS js
WORKDIR /src
COPY frontend/package.json ./
COPY frontend/package-lock.json ./
RUN --mount=type=cache,target=/src/node_modules npm version ${VERSION}
RUN --mount=type=cache,target=/src/node_modules npm install
COPY .eslintrc.yaml ./
COPY .babelrc ./babel.config.js
COPY .jestrc ./jest.config.js
COPY .tsconfig ./tsconfig.json
COPY ./frontend/src ./src
COPY ./frontend/tests ./tests
COPY ./frontend/public ./public

# build tools
FROM toolchain AS tools
ENV GO111MODULE on
ENV CGO_ENABLED 0
ENV GOPATH /go
RUN curl -sfL https://install.goreleaser.com/github.com/golangci/golangci-lint.sh | bash -s -- -b /bin v1.38.0
ARG GOFUMPT_VERSION
RUN cd $(mktemp -d) \
	&& go mod init tmp \
	&& go get mvdan.cc/gofumpt/gofumports@${GOFUMPT_VERSION} \
	&& mv /go/bin/gofumports /bin/gofumports

# builds frontend
FROM js AS frontend
RUN --mount=type=cache,target=/src/node_modules npm run build
RUN mkdir -p /internal/frontend/dist
RUN cp -rf ./dist/* /internal/frontend/dist

# runs eslint
FROM js AS lint-eslint
RUN --mount=type=cache,target=/src/node_modules npm run lint

# runs js unit-tests
FROM js AS unit-tests-frontend
RUN --mount=type=cache,target=/src/node_modules CI=true npm run test

# tools and sources
FROM tools AS base
WORKDIR /src
COPY ./go.mod .
COPY ./go.sum .
RUN --mount=type=cache,target=/go/pkg go mod download
RUN --mount=type=cache,target=/go/pkg go mod verify
COPY ./internal ./internal
COPY ./cmd ./cmd
COPY --from=frontend /internal/frontend/dist ./internal/frontend/dist
RUN --mount=type=cache,target=/go/pkg go list -mod=readonly all >/dev/null

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
COPY --from=generate / /
WORKDIR /src/cmd/theila
RUN --mount=type=cache,target=/root/.cache/go-build --mount=type=cache,target=/go/pkg go build -ldflags "-s -w" -o /theila

# runs unit-tests with race detector
FROM base AS unit-tests-race
ARG TESTPKGS
RUN --mount=type=cache,target=/root/.cache/go-build --mount=type=cache,target=/go/pkg --mount=type=cache,target=/tmp CGO_ENABLED=1 go test -v -race -count 1 ${TESTPKGS}

# runs unit-tests
FROM base AS unit-tests-run
ARG TESTPKGS
RUN --mount=type=cache,target=/root/.cache/go-build --mount=type=cache,target=/go/pkg --mount=type=cache,target=/tmp go test -v -covermode=atomic -coverprofile=coverage.txt -coverpkg=${TESTPKGS} -count 1 ${TESTPKGS}

FROM scratch AS theila
COPY --from=theila-build /theila /theila

FROM scratch AS unit-tests
COPY --from=unit-tests-run /src/coverage.txt /coverage.txt

FROM scratch AS image-theila
COPY --from=theila / /
COPY --from=image-fhs / /
COPY --from=image-ca-certificates / /
ENTRYPOINT ["/theila"]

