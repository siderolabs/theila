## [theila 0.1.0-alpha.0](https://github.com/talos-systems/theila/releases/tag/v0.1.0-alpha.0) (2021-05-21)

Welcome to the v0.1.0-alpha.0 release of theila!  
*This is a pre-release of theila*



Please try out the release binaries and report any issues at
https://github.com/talos-systems/theila/issues.

### The First Release

This is the very first release of the UI for Talos and Sidero.

The first iteration is only able to run against the management cluster with Sidero installed.
Theila gets credentials from `~/.kube/config` or from the file defined in `KUBECONFIG`
environment variable. The current context is always used.

For each Sidero Kubernetes cluster it is possible to:
- get the kubeconfig and talosconfig.
- get the list of nodes and pods.

For each node in the cluster it is possible to:
- get the list of services and their health.


### Contributors

* Artem Chernyshev
* Andrew Rynhard

### Changes
<details><summary>18 commits</summary>
<p>

* [`33c7d72`](https://github.com/talos-systems/theila/commit/33c7d72822aa6b7431744396c9f16f4df63ac2a5) release(v0.1.0-alpha.0): prepare release
* [`7bde4c8`](https://github.com/talos-systems/theila/commit/7bde4c8c6e16c197578cbb4e037a05d50194958f) fix: cobra command was initialized but not actually used
* [`04624c9`](https://github.com/talos-systems/theila/commit/04624c95cec587ae0b0d8888d95d484ef8d98cfa) feat: support getting Talos and Kubernetes client configs for a cluster
* [`219b9c8`](https://github.com/talos-systems/theila/commit/219b9c8663fe03af65796b0b6299cff5e66b3efc) feat: implement notifications component
* [`f8b19a0`](https://github.com/talos-systems/theila/commit/f8b19a0585e6e19c0e7da4e4afad5bbd264e0029) feat: decouple watch list from the view
* [`2f8c96e`](https://github.com/talos-systems/theila/commit/2f8c96e44012e7bd0db9869eeb90ab48ff41e162) feat: implement appearance settings modal window
* [`de745d6`](https://github.com/talos-systems/theila/commit/de745d6b7170a9c509cc835a8b675a1c788e80f4) feat: implement Talos runtime backend
* [`af69a0d`](https://github.com/talos-systems/theila/commit/af69a0d58906a86974bc7dbec2c09ca9f78b152f) feat: support getting Kubernetes resource through gRPC gateway
* [`2c50010`](https://github.com/talos-systems/theila/commit/2c50010b0d9f7b168354fedd698600d94123c354) feat: implement breadcrumbs component, add support for table header
* [`3fc1e80`](https://github.com/talos-systems/theila/commit/3fc1e808875f6f502cd2657c4548dd886fbf465d) feat: implement nodes view
* [`961e93a`](https://github.com/talos-systems/theila/commit/961e93a4af430eaa9efcd1e2922af8072fe4cf85) feat: implement clusters view
* [`e8248ff`](https://github.com/talos-systems/theila/commit/e8248ffab89633cae8834631e39cf4dce5e4147a) feat: use plain zap instead of SugaredLogger everywhere
* [`81ba93d`](https://github.com/talos-systems/theila/commit/81ba93dffdc37efdde06557a1c63511a7d61b2f2) chore: generate websocket protocol messages using protobuf
* [`37a878d`](https://github.com/talos-systems/theila/commit/37a878dd396b650df8afaf6730f9afe52d35569c) feat: make JS websocket reconnect on connection loss
* [`23b3281`](https://github.com/talos-systems/theila/commit/23b3281f8880800a9084e1c8a74617fcf966c846) feat: use dynamic watcher to allow listing any kinds of resources
* [`16475f5`](https://github.com/talos-systems/theila/commit/16475f51cc9651736213b36c57381b24dcabdc62) feat: implement real time update server on top of web sockets
* [`76b39ae`](https://github.com/talos-systems/theila/commit/76b39ae563d9f09ecac3451389e3d260abdad48d) feat: create hello world Vue app using Kres
* [`baab493`](https://github.com/talos-systems/theila/commit/baab493f155cbd78c2e8af6ce45268c40ef6aeed) Initial commit
</p>
</details>

### Dependency Changes

This release has no dependency changes

