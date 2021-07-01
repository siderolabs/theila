## [theila 0.1.0-alpha.1](https://github.com/talos-systems/theila/releases/tag/v0.1.0-alpha.1) (2021-07-01)

Welcome to the v0.1.0-alpha.1 release of theila!  
*This is a pre-release of theila*



Please try out the release binaries and report any issues at
https://github.com/talos-systems/theila/issues.

### The First Release

This is the very first release of the UI for Talos and Sidero.

Theila gets credentials from `~/.kube/config` or from the file defined in `KUBECONFIG`
environment variable.

For each cluster it is possible to get the list of nodes and pods.

If Sidero is deployed then the UI also provides a way to view:
- the list of servers.
- the list of clusters (for any CAPI provider).
- allows getting kubeconfig and talosconfig for each Sidero cluster.

For each node in the cluster it is possible to:
- get the list of services and their health.
- get node logs.
- get performance metrics.
- get each internal service logs (etcd, apid, machined and so on).
- reboot the node.


### Contributors

* Artem Chernyshev
* Andrew Rynhard

### Changes
<details><summary>37 commits</summary>
<p>

* [`8e5e722`](https://github.com/talos-systems/theila/commit/8e5e7229470713d2fbd5ad0df027bd825f5481e3) feat: implement node reboot controls
* [`9765a88`](https://github.com/talos-systems/theila/commit/9765a88069f05c49f5a7d854675ee37e1c7a8273) feat: dmesg logs page
* [`ecbbd67`](https://github.com/talos-systems/theila/commit/ecbbd67936b1fb570d706fe3b93b81f6089b5124) feat: use updated timestamp to display event time on the graph
* [`7c56773`](https://github.com/talos-systems/theila/commit/7c56773448a496fe1ceeec3c47978975ce336b3a) refactor: use Metadata to pass context in all gRPC calls
* [`abb4733`](https://github.com/talos-systems/theila/commit/abb47330222217d7d8b5c36ff28902415bc755d8) feat: implement service logs viewer
* [`8e8e032`](https://github.com/talos-systems/theila/commit/8e8e032b20d082bfd71a26c2af2bbc821d9c2a7b) feat: add ability to pick sort order on the servers page
* [`1a1c728`](https://github.com/talos-systems/theila/commit/1a1c728ac929bb02db7f1bd0b991a747e63fe81a) fix: resolve the issue with idFn value generating undefined ids
* [`2e83fe2`](https://github.com/talos-systems/theila/commit/2e83fe23a7feb51b73bc7b53997636b641ae42b9) feat: allow filtering servers by picking from predefined categories
* [`48f776e`](https://github.com/talos-systems/theila/commit/48f776e10f6c79772481393d7397557419520046) fix: navigate home when changing the context
* [`a1ce0ca`](https://github.com/talos-systems/theila/commit/a1ce0ca8c8fabb2267c3dc6f6b1509f131e18ba8) fix: resolve services search issues
* [`5b768f8`](https://github.com/talos-systems/theila/commit/5b768f85277ee31131994ae0b253700a5d26978d) feat: make stacked lists searchable
* [`ec1bc5b`](https://github.com/talos-systems/theila/commit/ec1bc5b48943e473c756ebc7a8c943a34cdeaeac) feat: implement stats component and add stats to the servers page
* [`1a85999`](https://github.com/talos-systems/theila/commit/1a8599981f93fc5ce68e23b1b4cd7aabbb43c90c) feat: align Sidero servers list outlook with the wireframes
* [`524264c`](https://github.com/talos-systems/theila/commit/524264c515a9efdce9f06a3c2ebd59c2979f9b2a) fix: display error message and use proper layout for the spinner
* [`5263d16`](https://github.com/talos-systems/theila/commit/5263d16cfb936aad9ba461e0cc7b150ff9b806d5) feat: introduce node stats page
* [`8feb35e`](https://github.com/talos-systems/theila/commit/8feb35e95a6d588e1d9c605231308976be452a2e) feat: make root sidebar sections collapsible
* [`36ad656`](https://github.com/talos-systems/theila/commit/36ad656a3bbdc1e2915a87c0d09c31738ae3f3c4) feat: detect cluster capabilities
* [`a25d90d`](https://github.com/talos-systems/theila/commit/a25d90d58a85b3b73432858f134fa09cd1338d5c) feat: support switching context in the UI
* [`67903e2`](https://github.com/talos-systems/theila/commit/67903e23f49623ae9a9a6b297282c62aa8579aa8) refactor: separate Watch from StackedList
* [`76b9e1d`](https://github.com/talos-systems/theila/commit/76b9e1dc88cccf74cebb28470eae5e9249809d40) release(v0.1.0-alpha.0): prepare release
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

### Changes since v0.1.0-alpha.0
<details><summary>19 commits</summary>
<p>

* [`8e5e722`](https://github.com/talos-systems/theila/commit/8e5e7229470713d2fbd5ad0df027bd825f5481e3) feat: implement node reboot controls
* [`9765a88`](https://github.com/talos-systems/theila/commit/9765a88069f05c49f5a7d854675ee37e1c7a8273) feat: dmesg logs page
* [`ecbbd67`](https://github.com/talos-systems/theila/commit/ecbbd67936b1fb570d706fe3b93b81f6089b5124) feat: use updated timestamp to display event time on the graph
* [`7c56773`](https://github.com/talos-systems/theila/commit/7c56773448a496fe1ceeec3c47978975ce336b3a) refactor: use Metadata to pass context in all gRPC calls
* [`abb4733`](https://github.com/talos-systems/theila/commit/abb47330222217d7d8b5c36ff28902415bc755d8) feat: implement service logs viewer
* [`8e8e032`](https://github.com/talos-systems/theila/commit/8e8e032b20d082bfd71a26c2af2bbc821d9c2a7b) feat: add ability to pick sort order on the servers page
* [`1a1c728`](https://github.com/talos-systems/theila/commit/1a1c728ac929bb02db7f1bd0b991a747e63fe81a) fix: resolve the issue with idFn value generating undefined ids
* [`2e83fe2`](https://github.com/talos-systems/theila/commit/2e83fe23a7feb51b73bc7b53997636b641ae42b9) feat: allow filtering servers by picking from predefined categories
* [`48f776e`](https://github.com/talos-systems/theila/commit/48f776e10f6c79772481393d7397557419520046) fix: navigate home when changing the context
* [`a1ce0ca`](https://github.com/talos-systems/theila/commit/a1ce0ca8c8fabb2267c3dc6f6b1509f131e18ba8) fix: resolve services search issues
* [`5b768f8`](https://github.com/talos-systems/theila/commit/5b768f85277ee31131994ae0b253700a5d26978d) feat: make stacked lists searchable
* [`ec1bc5b`](https://github.com/talos-systems/theila/commit/ec1bc5b48943e473c756ebc7a8c943a34cdeaeac) feat: implement stats component and add stats to the servers page
* [`1a85999`](https://github.com/talos-systems/theila/commit/1a8599981f93fc5ce68e23b1b4cd7aabbb43c90c) feat: align Sidero servers list outlook with the wireframes
* [`524264c`](https://github.com/talos-systems/theila/commit/524264c515a9efdce9f06a3c2ebd59c2979f9b2a) fix: display error message and use proper layout for the spinner
* [`5263d16`](https://github.com/talos-systems/theila/commit/5263d16cfb936aad9ba461e0cc7b150ff9b806d5) feat: introduce node stats page
* [`8feb35e`](https://github.com/talos-systems/theila/commit/8feb35e95a6d588e1d9c605231308976be452a2e) feat: make root sidebar sections collapsible
* [`36ad656`](https://github.com/talos-systems/theila/commit/36ad656a3bbdc1e2915a87c0d09c31738ae3f3c4) feat: detect cluster capabilities
* [`a25d90d`](https://github.com/talos-systems/theila/commit/a25d90d58a85b3b73432858f134fa09cd1338d5c) feat: support switching context in the UI
* [`67903e2`](https://github.com/talos-systems/theila/commit/67903e23f49623ae9a9a6b297282c62aa8579aa8) refactor: separate Watch from StackedList
</p>
</details>

### Dependency Changes

This release has no dependency changes

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

