## [theila 0.2.1](https://github.com/siderolabs/theila/releases/tag/v0.2.1) (2022-04-08)

Welcome to the v0.2.1 release of theila!



Please try out the release binaries and report any issues at
https://github.com/siderolabs/theila/issues.

### Configuration Priority Changes

Starting from 0.2.1 Theila no longer relies on the local Kubeconfig.
Instead it fetches the initial list of clusters from `~/.talos/config` or whatever is set in the `TALOSCONFIG`
environment variable.
It helps to get rid of strong requirement for matching context in `~/.kube/config` and `~/.talos/config` as
Kubernetes config is now always retrieved from the Talos API.

> Note: due to change in that flow it may be required to drop browser local storage cache for your Theila page as it will have
an old context name cached there.


### The New UI

Sidero UI is getting the next iteration of the design.
The color scheme was aligned to the new Sidero company color scheme.

Main changes UX-wise:
- all clusters are now placed in the context dropdown: both kubeconfig clusters and CAPI clusters.
- now it is possible to see Kubernetes upgrades history (dropped after theila restart as of now).
- pod information has got more details.
- servers list is now also available for CAPI clusters.
- now the UI provides summary page for cluster resources usage.


### Contributors

* Andrey Smirnov
* Spencer Smith
* Noel Georgi
* Artem Chernyshev
* Tim Jones
* Andrew Rynhard
* evgeniybryzh
* Andrey Smirnov
* Dmitriy Matrenichev
* Steve Francis
* Andrei Dobre
* Caleb Woodbine
* Daniel Höxtermann
* Gerard de Leeuw
* Jori Huisman
* Nico Berlee
* Serge Logvinov
* Seán C McCord
* Steve Francis
* Suraj Shirvankar
* Tomasz Zurkowski
* William Ashton

### Changes
<details><summary>12 commits</summary>
<p>

* [`5d00726`](https://github.com/siderolabs/theila/commit/5d00726179a09b6d5752b311253d12311d510230) release(v0.2.1): prepare release
* [`b29df3c`](https://github.com/siderolabs/theila/commit/b29df3cb4db156fa45068200865429c2745673ee) chore: disable single commit check
* [`a8ec4ac`](https://github.com/siderolabs/theila/commit/a8ec4ac77404d985cece160eacee482625690cc5) chore: update Talos libs to the latest version
* [`92a1c14`](https://github.com/siderolabs/theila/commit/92a1c145e9732d50280022a4953211a5380399f8) fix: display delta time for pod's age
* [`c376b06`](https://github.com/siderolabs/theila/commit/c376b0620dfb46e48c76fdde1cccf08257046b9e) feat: update favicon to sidero logo
* [`6f8114e`](https://github.com/siderolabs/theila/commit/6f8114e3650ac7b6a623fb9ccb4cad0626f4c562) feat: show the extended hardware info
* [`19c718a`](https://github.com/siderolabs/theila/commit/19c718a3e90fb08cb4f22c84526dc6cd1a8f000e) chore: allow getting resources without version and group
* [`4f7b4a7`](https://github.com/siderolabs/theila/commit/4f7b4a703c7a9347f52bc9eff341ecd0a708f94c) fix: remove t-header error notification
* [`36b6832`](https://github.com/siderolabs/theila/commit/36b6832179f063a022ac336ce48e2542f2fc6f6d) feat: restyle t-alert component
* [`60a1a23`](https://github.com/siderolabs/theila/commit/60a1a23784e3be4b06c8ed25c6063f5869f1cfb1) fix: get rid of racy code in the kubeconfig request code
* [`da6b879`](https://github.com/siderolabs/theila/commit/da6b8799af63fd5caf658ce124d31d4e6b7f101f) feat: add text Highlight feature
* [`ecb6be6`](https://github.com/siderolabs/theila/commit/ecb6be63d203d682a66a5dfd4ee7f7430a3c726a) feat: use `~/.talos/config` as a primary source for clusters
</p>
</details>

### Changes from talos-systems/grpc-proxy
<details><summary>4 commits</summary>
<p>

* [`b076302`](https://github.com/talos-systems/grpc-proxy/commit/b076302cc46ec6742e71fe1d49f6ec2d5d3a15dc) fix: use io.EOF error when no backend connections are available
* [`82daca0`](https://github.com/talos-systems/grpc-proxy/commit/82daca0322a4293bd27071ae1ba8dd5097509d21) docs: update README
* [`fa6843a`](https://github.com/talos-systems/grpc-proxy/commit/fa6843ae5b64500d481a1d031790406ed9df77d7) chore: fix spelling
* [`c0a87d9`](https://github.com/talos-systems/grpc-proxy/commit/c0a87d95be9c62b0c4fd1fa694ef768e1f8e2391) chore: major cleanup of the code and build
</p>
</details>

### Changes from talos-systems/talos
<details><summary>105 commits</summary>
<p>

* [`88f1d8fc`](https://github.com/talos-systems/talos/commit/88f1d8fcc0e3bd28a9db4677ad9d782c80ffdbb9) docs: update sitemap to point to direct url
* [`a6eebee3`](https://github.com/talos-systems/talos/commit/a6eebee36f9a3f6fbde441ccb5e170dae9727a58) chore: update eudev
* [`0cb84e8c`](https://github.com/talos-systems/talos/commit/0cb84e8c1a09c5b391461aa17c277a0a7803f725) fix: correctly parse tags out of images
* [`17d09739`](https://github.com/talos-systems/talos/commit/17d09739f3fe8cb942008a44f902b65705e39575) docs: enable nested arrow
* [`1e4320b6`](https://github.com/talos-systems/talos/commit/1e4320b64e2477a55f808c6b8720b0779088d0f8) chore: add support for rockpi 4A and 4B
* [`d1869d94`](https://github.com/talos-systems/talos/commit/d1869d948c84cf7191819eddac9c2aa27b365eb9) docs: update to Sidero Metal, mention clusterctl
* [`18d0038e`](https://github.com/talos-systems/talos/commit/18d0038ecaa2cf43164f72f3acad5445e395b37e) fix: avoid panic in DHCPv6 operator on nil dereference
* [`9e3d438d`](https://github.com/talos-systems/talos/commit/9e3d438db461529abf3dfa6ef750b4fa4a9125ec) docs: fix code fence formatting
* [`b3f1bb2c`](https://github.com/talos-systems/talos/commit/b3f1bb2cff544a35f767b32ca8ca1d13b83c535e) fix: add support for FAT12/16 filesystems
* [`8619f95c`](https://github.com/talos-systems/talos/commit/8619f95c5c7779815a87118cbb0a1e493251355d) chore: bump dependencies
* [`8c4f7200`](https://github.com/talos-systems/talos/commit/8c4f720048c0187b203ca869befd759249bac79f) docs: override sitemap.xml to only include latest results
* [`5192ba4e`](https://github.com/talos-systems/talos/commit/5192ba4e2314c05e107adcc0a2a71a65ec35bfc3) docs: fix a typo in QEMU VM setup guide
* [`663e3e87`](https://github.com/talos-systems/talos/commit/663e3e8796c3f501275fdd7836687b811318b685) refactor: change the stages for embed files generation
* [`19bf12af`](https://github.com/talos-systems/talos/commit/19bf12af07aaf6b54d08027676d8a01b4dd4ed29) fix: enable IPv6 in Docker-based Talos clusters
* [`3889a583`](https://github.com/talos-systems/talos/commit/3889a583970c73ea4c6089b1fe8438b183ec756e) docs: update config.yaml, storage.md, digital-rebar.md
* [`25d19131`](https://github.com/talos-systems/talos/commit/25d19131d378960603a510cb70b35352b07bf7cb) release(v1.1.0-alpha.0): prepare release
* [`2ca5279e`](https://github.com/talos-systems/talos/commit/2ca5279e56d154fdf21fab7ed5c73edb30494560) fix: retry manifest updates in upgrade-k8s
* [`eeb75616`](https://github.com/talos-systems/talos/commit/eeb756168f31c8e7a1e0cb2f80e1ae2bc2eed0a9) feat: use kexec when resetting a node
* [`1ed1f73e`](https://github.com/talos-systems/talos/commit/1ed1f73e511f4a5cf4d1db5f97422cf1eb088fda) test: bump CAPI to 1.1.3
* [`2ee1d2c7`](https://github.com/talos-systems/talos/commit/2ee1d2c72085df41ec0355bac0d33bedcb4f2786) feat: update Kuberentes to 1.24.0-beta.0
* [`c26fa4cc`](https://github.com/talos-systems/talos/commit/c26fa4ccc1e109c889c01384422f88387ad512a2) test: push GITHUB_TOKEN to the e2e-aws/gcp steps
* [`95d900de`](https://github.com/talos-systems/talos/commit/95d900de7799cfa9d0a16049586ba246bddb09d0) feat: use kubeconfig env var
* [`0b407dd1`](https://github.com/talos-systems/talos/commit/0b407dd17e9515fecd8083fd5ac1fc84f6085106) feat: add dhcp-v6 NTP/DHCP-DUID
* [`a140a6ba`](https://github.com/talos-systems/talos/commit/a140a6bad74bcf34e62e13b6efa63a17741eb5b1) docs: update releases shortcode in upgrade guide
* [`12931dce`](https://github.com/talos-systems/talos/commit/12931dcedd38c407a2a03f692d910853130986db) fix: align partitions on 1M boundary
* [`37f868e3`](https://github.com/talos-systems/talos/commit/37f868e37454f63a4dfe38d94dbbeef5bb40a2a8) fix: validate empty TLS config for registries
* [`ca8b9c0a`](https://github.com/talos-systems/talos/commit/ca8b9c0a3a15898d9562a6f22aded138d6c3ed7f) feat: update Kubernetes to 1.24.0-alpha.4
* [`d9ec6b21`](https://github.com/talos-systems/talos/commit/d9ec6b2151e94c94eea44771e455555eaf1f257a) chore: drop dirty from abbreviated tag
* [`08624fd0`](https://github.com/talos-systems/talos/commit/08624fd0b12039e5a77ce43f14df65a6c95f7a39) docs: add banner to main page
* [`fc23c7a5`](https://github.com/talos-systems/talos/commit/fc23c7a5952d87a51f29d61ead585bf060eeab1c) test: bump versions for upgrade tests
* [`4bfe6861`](https://github.com/talos-systems/talos/commit/4bfe686105d5734b282f4817673972b71954e620) feat: update runc to 1.1.1
* [`b315ed95`](https://github.com/talos-systems/talos/commit/b315ed95327a9b7cfb1f83a9da02e96bafecbb1d) chore: use go:embed instead of ldflags
* [`a5d64fc8`](https://github.com/talos-systems/talos/commit/a5d64fc814f122fb7e282b97283a46ac0e5d6709) feat: update Flannel to 0.17.0
* [`6d6eb3f6`](https://github.com/talos-systems/talos/commit/6d6eb3f6a52626c8c94a75439133e7bc22b25e60) docs: fork docs for 1.1
* [`1d55f05d`](https://github.com/talos-systems/talos/commit/1d55f05d11e5a03a8de0e7ce5ec0167971b03135) docs: update index page
* [`ad6b7ec1`](https://github.com/talos-systems/talos/commit/ad6b7ec1a4347753488de3ab5813947f01967078) fix: enable etcd consistency on check startup
* [`65a31f75`](https://github.com/talos-systems/talos/commit/65a31f7531a629b29fbf86ddcbaba20767475924) docs: re-add GA token
* [`741c0483`](https://github.com/talos-systems/talos/commit/741c048320b931228336034ad17de10272ff5a77) docs: mark 1.0 docs as latest
* [`e97433c8`](https://github.com/talos-systems/talos/commit/e97433c8a37ca504577355d98c917e083aaedafe) docs: update jetson nano
* [`6665e0f0`](https://github.com/talos-systems/talos/commit/6665e0f00c1c5d45123eb28d8755d0815af4822a) docs: code block copying
* [`c41f2b21`](https://github.com/talos-systems/talos/commit/c41f2b216717db80e44654f54080a9d462946d45) docs: update whats-new-v1.0
* [`0a36fbbf`](https://github.com/talos-systems/talos/commit/0a36fbbf3ca579becd0a7f2e5a9715ff4196e8ae) docs: add release notes for 1.0
* [`bd0035f6`](https://github.com/talos-systems/talos/commit/bd0035f6a285f8b7e4c7c0b5013a271a8d18c5f4) docs: add NVIDIA docs
* [`efa3f289`](https://github.com/talos-systems/talos/commit/efa3f289853a47ae0d4bca5dbf656e527cf312dd) fix: correctly find partitions with config data (`metal-iso`)
* [`9ebeec0d`](https://github.com/talos-systems/talos/commit/9ebeec0d0ea4dd3cc1ba3b7171fe0a9bda943fe8) docs: fix incorrect path for talosconfig
* [`9fef4540`](https://github.com/talos-systems/talos/commit/9fef4540e1c7a7deb5d4745d3de17c6e5cc45369) docs: fix non-latest download links
* [`f8ef6a08`](https://github.com/talos-systems/talos/commit/f8ef6a081e055637a5652366a6e344b6df911871) docs: add rook ceph configuration guide
* [`e2666f58`](https://github.com/talos-systems/talos/commit/e2666f58f5835db6ff8802b2370a480d8afcd8fc) chore: bump kernel to 5.15.32
* [`957b2f23`](https://github.com/talos-systems/talos/commit/957b2f233c4b81eacdb5a3190c0070fa36ef0d82) chore: bump dependencies
* [`0fd2aa08`](https://github.com/talos-systems/talos/commit/0fd2aa08bd70d1c869e0dca136ca0c487bfcdefe) fix: correctly escape '.' in volume names
* [`108fd03a`](https://github.com/talos-systems/talos/commit/108fd03a72534cebbab7c09d63051021483566ac) fix: give up virtual IPs before the kubelet workloads are shut down
* [`856e1333`](https://github.com/talos-systems/talos/commit/856e1333dcfb8c0244ca8ead415025b32a4819fc) fix: use 'localhost' endpoint in docker provisioner on Windows
* [`c5da3860`](https://github.com/talos-systems/talos/commit/c5da386092185fe4ed4173b08f95eac4e435ff99) docs: use variables and templates in the docs
* [`4c83847b`](https://github.com/talos-systems/talos/commit/4c83847b9091a4e8968544a515632a3391c06cd0) docs: target search results
* [`67fb72d9`](https://github.com/talos-systems/talos/commit/67fb72d96db1cb772392dcab9b5a3a08ee50ff03) docs: add algolia versions to all content
* [`5344d6e7`](https://github.com/talos-systems/talos/commit/5344d6e7ce2b7febc6109acc566cf49346eca6d9) docs: fix extension service `path` dependency
* [`9b9191c5`](https://github.com/talos-systems/talos/commit/9b9191c5e7a4a03bb7fa271ab49b52874e63ee31) fix: increase intiial window and connection window sizes
* [`7a88a022`](https://github.com/talos-systems/talos/commit/7a88a0224155755a64c911165bf25bff775e1ec2) docs: show archived/pre-release banner based on version
* [`e403470b`](https://github.com/talos-systems/talos/commit/e403470bfefe7af0217d91cb18d900b7046254f9) docs: filter algolia results by latest
* [`0497d5f9`](https://github.com/talos-systems/talos/commit/0497d5f9fee404f68d09c0c500cb446126cfc6aa) docs: tag latest docs for search
* [`a2542548`](https://github.com/talos-systems/talos/commit/a25425483518adc5bdd575c5fb8cc1b3464444ea) feat: update containerd to 1.6.2, Linux to 5.15.31
* [`9b6422fc`](https://github.com/talos-systems/talos/commit/9b6422fcc39c2f4e0723c0db0b6aefe3e4fc8267) feat: update CoreDNS to 1.9.1
* [`020856f8`](https://github.com/talos-systems/talos/commit/020856f80dd93fb47170351c083602ffd516d113) docs: remove second search bar
* [`5f27f4c6`](https://github.com/talos-systems/talos/commit/5f27f4c6384e9bb6df4fc969c3a318ad3052cf3f) docs: update asset links
* [`9ff42b43`](https://github.com/talos-systems/talos/commit/9ff42b43202bb59845439a88014011ff002a7770) docs: fix redirects for /docs URLs
* [`7283efd5`](https://github.com/talos-systems/talos/commit/7283efd568d35e6d2c68aa2bc101a7af86db8c62) chore: update the talosctl CNI download url
* [`e0eee7fc`](https://github.com/talos-systems/talos/commit/e0eee7fcc68f03243ae3248f84d50eb278998e07) test: use clusterctl.yaml overrides after org rename
* [`73966f51`](https://github.com/talos-systems/talos/commit/73966f51e83b7f166e4f7fe013bfed36e9b9a15a) docs: fix extensions
* [`f9766edb`](https://github.com/talos-systems/talos/commit/f9766edb52d6a029d12ac5d74fdb45b6294be058) docs: remove empty doc file
* [`e06e1473`](https://github.com/talos-systems/talos/commit/e06e1473b02cea088499c25f48a9b5e2b75cf879) feat: update golangci-lint to 1.45.0 and gofumpt to 0.3.0
* [`a92c614b`](https://github.com/talos-systems/talos/commit/a92c614b2f712fb046fb40e00b37773d1390df71) docs: add enterprise link to docs header
* [`0ae7174b`](https://github.com/talos-systems/talos/commit/0ae7174ba3a6c1674c77cf074087a68915e3e612) docs: update search settings and redirects
* [`883d401f`](https://github.com/talos-systems/talos/commit/883d401f9f62229305c2e24f58a0bb0e2e4bb409) chore: rename github organization to siderolabs
* [`d1294d01`](https://github.com/talos-systems/talos/commit/d1294d014f5bee7fc1b5dfd6865f22b22f18f5f1) chore: add day-two tests for e2e-qemu
* [`a6240e4b`](https://github.com/talos-systems/talos/commit/a6240e4b67060357c4250e7e5a3a7960408f7c08) feat: update Linux to 5.15.30
* [`e3fda049`](https://github.com/talos-systems/talos/commit/e3fda049fee62f3c5cef4ae08eaf848826a6dbed) docs: overhaul all the docs
* [`f4775072`](https://github.com/talos-systems/talos/commit/f477507262041a24def6ac9b32fa92d276d4d4e6) fix: the etcd recovery client and tests
* [`69e07cdd`](https://github.com/talos-systems/talos/commit/69e07cddc77d6ff2c2477ec64f860ef824132000) fix: trigger properly `udevd` on types and actions
* [`47d0e629`](https://github.com/talos-systems/talos/commit/47d0e629d48930f6cb02dff32469bcb34440c73c) fix: clean up custom udev rules if the config is cleared
* [`b6691b35`](https://github.com/talos-systems/talos/commit/b6691b35085e4e614752b60441c17fe39fe15928) chore: bump dependencies
* [`27af5d41`](https://github.com/talos-systems/talos/commit/27af5d41c6c58f4d2fc2f5c222d9de39539de1c0) feat: pause the boot process on some failures instead of rebooting
* [`58cb9db1`](https://github.com/talos-systems/talos/commit/58cb9db1e2b3d8fa86c0db0cf38c9f21a843da9d) feat: allow hardlinks in the system extension images
* [`1e982808`](https://github.com/talos-systems/talos/commit/1e982808fbac0a7f897bafacde348c5d83db38b2) fix: ignore pod CIDRs for kubelet node IPs
* [`5e0c80f6`](https://github.com/talos-systems/talos/commit/5e0c80f6168ac8a171e35e0c3ee53d959c2dd80d) fix: ignore connection reset errors on k8s upgrade
* [`c156580a`](https://github.com/talos-systems/talos/commit/c156580a386e19d020b550b8459af339f440bf3e) fix: split regular network operation configuration and virtual IP
* [`cd4d4c60`](https://github.com/talos-systems/talos/commit/cd4d4c6054107cd6c9274acb2abb4a045368a9fc) feat: relax extensions file structure validation
* [`50594ab1`](https://github.com/talos-systems/talos/commit/50594ab1a7e4d7d025f41873aaa1bf6954827d3e) fix: ignore terminated pods in pod health checks
* [`9d69fb6b`](https://github.com/talos-systems/talos/commit/9d69fb6b40f47061ff96bd7fb3952aa9c16ed601) feat: update Kubernetes to 1.23.5
* [`327ce5ab`](https://github.com/talos-systems/talos/commit/327ce5aba352054837c9cc03c1ba3993a1d18158) fix: invert the condition to skip kubelet kernel checks
* [`cf85b3f0`](https://github.com/talos-systems/talos/commit/cf85b3f07ccc3a6845f82f7853da298f5fce62a3) docs: update cilium inline install
* [`84ee1795`](https://github.com/talos-systems/talos/commit/84ee1795dc914574d299b1b0f1ede42bfaee110a) docs: update logo
* [`cc7719c9`](https://github.com/talos-systems/talos/commit/cc7719c9d014ca8c16828a84ccc95c0344bb34ed) docs: improve comments in security proto
* [`caf800fe`](https://github.com/talos-systems/talos/commit/caf800fe843aca5d3559ae5baf08b59db21cccd7) feat: implement D-Bus systemd-compatible shutdown for kubelet
* [`6bec0842`](https://github.com/talos-systems/talos/commit/6bec084299062ec6df6e319d4a83313de97e3c67) feat: add talosctl completions to copy, usage, logs, restart and service
* [`355b1a4b`](https://github.com/talos-systems/talos/commit/355b1a4bedd6755dbbaa9e98505f5c8540520bb5) fix: refresh etcd certs on startup/join
* [`d256b5c5`](https://github.com/talos-systems/talos/commit/d256b5c5e46ac87edf5681611eeda95fe091d922) docs: fix spelling mistakes
* [`5fdedae2`](https://github.com/talos-systems/talos/commit/5fdedae208bfa561b7ca1a04f140adcee3deb565) chore: bump kernel to 5.15.28
* [`18a21b5f`](https://github.com/talos-systems/talos/commit/18a21b5f24baeea5b876d99b29f5397cc3617399) chore: add dependency images-essential -> images
* [`714e5eca`](https://github.com/talos-systems/talos/commit/714e5eca63ee0dd4a81ca5937081779829092111) chore: bump dependencies
* [`58be4067`](https://github.com/talos-systems/talos/commit/58be4067e6ddc7ba3a346469c30c435b560df377) docs: update README.md
* [`c5fb2093`](https://github.com/talos-systems/talos/commit/c5fb20930555e5e31ea01e75aa3690d2cf628f29) docs: add loki note
* [`f448cb4f`](https://github.com/talos-systems/talos/commit/f448cb4f3c1620669fa34250e39aeec0e4002d37) feat: bump boot partition size to 1000 MiB
* [`a095acb0`](https://github.com/talos-systems/talos/commit/a095acb09f225bce0e1c17f86576400549789608) chore: fix equinixMetal platform name
* [`2a7f9a44`](https://github.com/talos-systems/talos/commit/2a7f9a4457bcb18e66b9ee6eb0ff49a290c381ce) fix: check for IPv6 before applying accept_ra
* [`59681b8c`](https://github.com/talos-systems/talos/commit/59681b8c9a47701092c7287c2375123134d3f9ba) fix: backport fixes from release-1.0 branch
</p>
</details>

### Dependency Changes

* **github.com/spf13/cobra**                        v1.3.0 -> v1.4.0
* **github.com/stretchr/testify**                   v1.7.0 -> v1.7.1
* **github.com/talos-systems/grpc-proxy**           v0.2.0 -> v0.3.0
* **github.com/talos-systems/talos**                v1.0.0-beta.1 -> 88f1d8fcc0e3
* **github.com/talos-systems/talos/pkg/machinery**  v1.0.0-beta.1 -> 88f1d8fcc0e3
* **google.golang.org/grpc**                        v1.44.0 -> v1.45.0
* **google.golang.org/protobuf**                    v1.27.1 -> v1.28.0
* **k8s.io/api**                                    v0.23.4 -> v0.24.0-beta.0
* **k8s.io/apimachinery**                           v0.23.4 -> v0.24.0-beta.0
* **k8s.io/client-go**                              v0.23.4 -> v0.24.0-beta.0

Previous release can be found at [v0.2.0](https://github.com/siderolabs/theila/releases/tag/v0.2.0)

## [theila 0.2.0](https://github.com/siderolabs/theila/releases/tag/v0.2.0) (2022-03-30)

Welcome to the v0.2.0 release of theila!  
*This is a pre-release of theila*



Please try out the release binaries and report any issues at
https://github.com/siderolabs/theila/issues.

### The New UI

Sidero UI is getting the next iteration of the design.
The color scheme was aligned to the new Sidero company color scheme.

Main changes UX-wise:
- all clusters are now placed in the context dropdown: both kubeconfig clusters and CAPI clusters.
- now it is possible to see Kubernetes upgrades history (dropped after theila restart as of now).
- pod information has got more details.
- servers list is now also available for CAPI clusters.
- now the UI provides summary page for cluster resources usage.


### Contributors

* Andrey Smirnov
* Artem Chernyshev
* Alexey Palazhchenko
* Serge Logvinov
* Noel Georgi
* Andrey Smirnov
* Spencer Smith
* Seán C McCord
* evgeniybryzh
* Andrew Rynhard
* Artem Chernyshev
* Steve Francis
* Alexey Palazhchenko
* Florian Klink
* Nico Berlee
* Rui Lopes
* Spencer Smith
* Andrey Smirnov
* Bernard Sébastien
* Branden Cash
* Charlie Haley
* Eric Wohltman
* Jori Huisman
* Lennard Klein
* Matt Layher
* Michael Fornaro
* Niklas Metje
* Olli Janatuinen
* Philipp Sauter
* Rohit Dandamudi
* Shahar Naveh
* Tim Jones
* Utku Ozdemir
* Volodymyr Mazurets
* nebulait

### Changes
<details><summary>37 commits</summary>
<p>

* [`e10547b`](https://github.com/siderolabs/theila/commit/e10547b5761ad96ab8b5766fe5c3f06fcdf86477) refactor: remove old components and not used code parts
* [`f704684`](https://github.com/siderolabs/theila/commit/f7046846ea8e83a0e39647c4fcc49addf4c56061) fix: properly calculate servers capacity
* [`755a077`](https://github.com/siderolabs/theila/commit/755a0779014b0a4177e0fc5180db20720be5a814) fix: use proper units for memory and CPU charts on the node monitor page
* [`d0a083d`](https://github.com/siderolabs/theila/commit/d0a083d1c15c319e236dd258fabcc9a231f797a1) release(v0.2.0-alpha.0): prepare release
* [`53878ee`](https://github.com/siderolabs/theila/commit/53878eea09c18f2bc0dd55ca11a6743587748319) fix: properly update servers menu item when the context is changed
* [`b4cb9c7`](https://github.com/siderolabs/theila/commit/b4cb9c7989ec5299785b86acb3fa0ee648efd259) feat: restyle TMonitor page
* [`f0377e2`](https://github.com/siderolabs/theila/commit/f0377e2ad5da702af71f2706141f4d7c638c7a15) fix: invert chart value for cpu, storage and memory on the overview page
* [`6ea6ecf`](https://github.com/siderolabs/theila/commit/6ea6ecf12c4d8b5253b4dfc2e64f5b5d787d022a) fix: update capi-utils to fix talosconfig requests for CAPI clusters
* [`e3796d3`](https://github.com/siderolabs/theila/commit/e3796d3876d33248fd0998901273a14d29a487a3) chore: update capi-utils
* [`39186eb`](https://github.com/siderolabs/theila/commit/39186ebe50da531f35d21ac2488f8a58c1ef8e78) feat: implement overview page, cluster dropdown, ongoing tasks
* [`59f2b27`](https://github.com/siderolabs/theila/commit/59f2b27be4d7f5a591fdeae533d649494356250d) docs: update README.md
* [`2b7831f`](https://github.com/siderolabs/theila/commit/2b7831f2d22106ac8a82f890d73c2705841b0739) feat: add Kubernetes and Servers pages
* [`4451a5b`](https://github.com/siderolabs/theila/commit/4451a5bc9f5c6b058c6bcf1252b7c83a001cafbe) fix: properly set TaskStatus namespace in the initial call
* [`4545464`](https://github.com/siderolabs/theila/commit/454546425f2fd7e4418aa8a03465f3a062de804e) fix: add new fields to the TaskStatus spec, update Talos
* [`891cf3b`](https://github.com/siderolabs/theila/commit/891cf3b79c8430deeed8a168955afd6e97083baa) docs: describe client context types, usage
* [`309b515`](https://github.com/siderolabs/theila/commit/309b51545ead2ee144244591df2e5ead2849fb11) feat: update k8s upgrades tasks structure for the new UI representation
* [`5aa8ca2`](https://github.com/siderolabs/theila/commit/5aa8ca24bd3159879c46c8e8a134702b174e3362) feat: add NodesPage
* [`db434e0`](https://github.com/siderolabs/theila/commit/db434e07b9f23562bd746a0f78e3868b079006e2) feat: add TPagination component
* [`0b51727`](https://github.com/siderolabs/theila/commit/0b51727efed31f13f52fa20b360071e7e2a6d9eb) feat: add Pods, Dashboard, Upgrade views, etc
* [`c549b8b`](https://github.com/siderolabs/theila/commit/c549b8b9ee8a563f14b2e791f91a7b3cb0430aa7) feat: add Overview and Upgrade Kubernetes pages
* [`cec2e85`](https://github.com/siderolabs/theila/commit/cec2e854f4f3999109220902bccaee6c25d1f502) chore: define constants for all used resource types
* [`962bdaf`](https://github.com/siderolabs/theila/commit/962bdaf6406ab8e5febea0ad8d32da9c86fa39e7) feat: add TSideBar
* [`fa28ccb`](https://github.com/siderolabs/theila/commit/fa28ccb67f52c1dd9096b23388427d78be526275) feat: add TheHeader component
* [`f3418a5`](https://github.com/siderolabs/theila/commit/f3418a59e38e551bd0be7cc7ae66ef4645719aa7) feat: button;icons;config
* [`db30f50`](https://github.com/siderolabs/theila/commit/db30f503730bdbd8ed359d4070dea0214df67fcd) fix: add `frontend/node_modules` to gitignore
* [`a675b86`](https://github.com/siderolabs/theila/commit/a675b86f7d55cecd4ae1277cbf057a6bc264940c) fix: properly pass label selector to the metadata in ClusterListItem
* [`7911d6a`](https://github.com/siderolabs/theila/commit/7911d6a31abdb51e86586a025b705ddfeb1dd19e) chore: add ability to start local development server for the frontend
* [`076fee1`](https://github.com/siderolabs/theila/commit/076fee10c6583dc49e6530b02cab1f757da0e853) feat: use CAPI utils for CAPI requests
* [`5ed5ba2`](https://github.com/siderolabs/theila/commit/5ed5ba2a122585a97cf65c3ff081126752cd26fa) fix: more websocket client bugfixes
* [`6fe22ad`](https://github.com/siderolabs/theila/commit/6fe22ad370026380ba75b38e261870addc341e6f) fix: reset reconnect timeouts after the client is reconnected
* [`c4b144a`](https://github.com/siderolabs/theila/commit/c4b144af272a46dbdc8d1bb35784e09ba1b79987) fix: talosconfig/kubeconfig when using the default context
* [`b439a37`](https://github.com/siderolabs/theila/commit/b439a371c13a8d46d986a1dae3d6f4b7cba4a298) fix: properly handle Same-Origin header in websockets
* [`ffffed1`](https://github.com/siderolabs/theila/commit/ffffed100cec18209bae723b9919eb8613950649) fix: read node name from nodename resource instead of hostname
* [`2d6f984`](https://github.com/siderolabs/theila/commit/2d6f9844440a6d18b3093dea6228ac6a237dc86b) fix: use secure websockets if the page itself is using https
* [`799f2d2`](https://github.com/siderolabs/theila/commit/799f2d2d00762d5270dd4a3f4b4b312b32dbb7dd) feat: rework the node overview page
* [`0d0eaf4`](https://github.com/siderolabs/theila/commit/0d0eaf4b2721dfa1b04bce24e4a1e476579e3a74) fix: make charts height resize depending on the screen height
* [`7de0101`](https://github.com/siderolabs/theila/commit/7de0101bf0e613653caadd5733db0e29a6bb5bfb) fix: use polyfill to fix streaming APIs on Firefox
</p>
</details>

### Changes since v0.2.0-alpha.0
<details><summary>3 commits</summary>
<p>

* [`e10547b`](https://github.com/siderolabs/theila/commit/e10547b5761ad96ab8b5766fe5c3f06fcdf86477) refactor: remove old components and not used code parts
* [`f704684`](https://github.com/siderolabs/theila/commit/f7046846ea8e83a0e39647c4fcc49addf4c56061) fix: properly calculate servers capacity
* [`755a077`](https://github.com/siderolabs/theila/commit/755a0779014b0a4177e0fc5180db20720be5a814) fix: use proper units for memory and CPU charts on the node monitor page
</p>
</details>

### Changes from talos-systems/capi-utils
<details><summary>26 commits</summary>
<p>

* [`e994250`](https://github.com/talos-systems/capi-utils/commit/e994250edede51ab1f1cac0d3f539fcaf6aae655) fix: use correct name for getting talosconfig secret
* [`3a6f8ee`](https://github.com/talos-systems/capi-utils/commit/3a6f8ee7b753e120c965992fad91cc10e11f4f9a) feat: read talosconfig from secret instead of status
* [`dc4a2f3`](https://github.com/talos-systems/capi-utils/commit/dc4a2f30b9e928961d0f69975f2dcaa5976dd048) chore: update libs, rekres, update Go version (#25)
* [`e8c3bf9`](https://github.com/talos-systems/capi-utils/commit/e8c3bf93e75fd46232ed6ac7df2cc7d0ad3cc8b3) feat: pass through an option to wait for providers to be set up
* [`144451c`](https://github.com/talos-systems/capi-utils/commit/144451cdef39bf6aed0cf1395ff69f9ce0496243) feat: switch to CAPI v1beta1
* [`151aac2`](https://github.com/talos-systems/capi-utils/commit/151aac243655ecf5ac82fde99db1d11795f4c14c) fix: properly define calico version
* [`658f48a`](https://github.com/talos-systems/capi-utils/commit/658f48a2034f991278ba7eeebccb3519dc1ee30a) feat: support getting cluster template files by http urls
* [`e0cadf5`](https://github.com/talos-systems/capi-utils/commit/e0cadf51e3dec7f7af7acfc533233365e01860a1) feat: add method to fetch a k8s client
* [`b018ea2`](https://github.com/talos-systems/capi-utils/commit/b018ea29c13a09ae2fdb2a071c5b7c8bd626bb50) feat: add ability to pass custom `Proxy` implementation in clusterapi
* [`b2f8f83`](https://github.com/talos-systems/capi-utils/commit/b2f8f83d3df6a7cd0308ae724d7423280c6924a8) feat: update cluster API library to the latest version
* [`f2a34fd`](https://github.com/talos-systems/capi-utils/commit/f2a34fdddec066097e346c144bb8660398a5e69d) chore: do not rely on ENV variables to configure CAPI client
* [`9587089`](https://github.com/talos-systems/capi-utils/commit/9587089e8425e11ef34d00c33b38b1d3c1710b42) feat: add API method to get CAPI version
* [`3053852`](https://github.com/talos-systems/capi-utils/commit/3053852b107c9dd0a82340accc98b798abd6160c) chore: update go mod to remove requires
* [`2e0c2fe`](https://github.com/talos-systems/capi-utils/commit/2e0c2fe20b78c10d8af6f62662063ae2c41124c9) feat: allow for specifying namespace in infra providers
* [`e5fdc2a`](https://github.com/talos-systems/capi-utils/commit/e5fdc2a068ac8bfed8effdd33e717aa3f97a62a9) feat: enable builds of darwin/windows
* [`028c7d3`](https://github.com/talos-systems/capi-utils/commit/028c7d3c025764260fb37ae5618c59122027640d) fix: call sync until number of replicas != actual replicas
* [`0fbad9a`](https://github.com/talos-systems/capi-utils/commit/0fbad9a4d06661e7fc8816d98663a349f4bde936) fix: sync talos config and nodes list after scaling
* [`c1830ba`](https://github.com/talos-systems/capi-utils/commit/c1830ba4aada30e9b968b456620526bf35c73190) feat: support scaling cluster nodes up and down
* [`5e78193`](https://github.com/talos-systems/capi-utils/commit/5e78193aff23909ec8516fad8a02f077d57d5ad5) feat: add ability to detect CAPI version and installed infra providers
* [`c20b1a8`](https://github.com/talos-systems/capi-utils/commit/c20b1a80b4277c1729d0b5d4972aa2794203e83c) fix: do CAPI init once if several infra providers are defined
* [`83353b6`](https://github.com/talos-systems/capi-utils/commit/83353b6b16d0ebc813ac43f45f2a18a1f451e016) fix: remove lots of unused indirect dependencies
* [`9a6b78a`](https://github.com/talos-systems/capi-utils/commit/9a6b78a78edbbcb662f349ede1d66c0b1326a4d0) chore: move provider creation code to the common method
* [`c2adaee`](https://github.com/talos-systems/capi-utils/commit/c2adaee0629a0b73565a0a67ccb4b393c32f6063) feat: add `DestroyCluster` function
* [`81aabe0`](https://github.com/talos-systems/capi-utils/commit/81aabe04803fa529ce73c2dbf49dc3f83394c66d) feat: support bootstrapping AWS clusters
* [`64a30e7`](https://github.com/talos-systems/capi-utils/commit/64a30e7fcd5f6fc488f70b8f8b08548a1a959199) feat: add the code for bootstrapping CAPI using kubeconfig
* [`6f52762`](https://github.com/talos-systems/capi-utils/commit/6f527622e0ae356ddbc59622bd673a8071650304) Initial commit
</p>
</details>

### Changes from talos-systems/go-retry
<details><summary>8 commits</summary>
<p>

* [`c78cc95`](https://github.com/talos-systems/go-retry/commit/c78cc953d9e95992575305b4e8648392c6c9b9e6) fix: implement `errors.Is` for all errors in the set
* [`7885e16`](https://github.com/talos-systems/go-retry/commit/7885e16b2cb0267bcc8b07cdd0eced14e8005864) feat: add ExpectedErrorf
* [`3d83f61`](https://github.com/talos-systems/go-retry/commit/3d83f6126c1a3a238d1d1d59bfb6273e4087bdac) feat: deprecate UnexpectedError
* [`b9dc1a9`](https://github.com/talos-systems/go-retry/commit/b9dc1a990133dd3399549b4ea199759bdfe58bb8) feat: add support for `context.Context` in Retry
* [`8c63d29`](https://github.com/talos-systems/go-retry/commit/8c63d290a6884095ea2e754c52e575603abe4bc0) fix: correctly implement error interfaces on wrapped errors
* [`752f081`](https://github.com/talos-systems/go-retry/commit/752f081252cfef6106151dc285fcbe4849ab0a0c) feat: add an option to log errors being retried
* [`073067b`](https://github.com/talos-systems/go-retry/commit/073067bd95a70e9b0a2a8d07d33311be69c24923) feat: copy initial version from talos-systems/talos
* [`c7968c5`](https://github.com/talos-systems/go-retry/commit/c7968c54b4b1743d14dedce51431bf6e79a67a4f) Initial commit
</p>
</details>

### Changes from talos-systems/talos
<details><summary>521 commits</summary>
<p>

* [`602e049d`](https://github.com/talos-systems/talos/commit/602e049d996478f1b58d8b0d4be49d9d89811712) release(v1.0.0-beta.1): prepare release
* [`06647da3`](https://github.com/talos-systems/talos/commit/06647da34c04c29e49d081095abfa4efc0af39a4) chore: fix equinixMetal platform name
* [`7e31e7d8`](https://github.com/talos-systems/talos/commit/7e31e7d8f92c8ae02461149cb2dc28b968e8696c) feat: bump boot partition size to 1000 MiB
* [`83d7aebe`](https://github.com/talos-systems/talos/commit/83d7aebe18f7643197414a948daf3ac179f0df83) fix: check for IPv6 before applying accept_ra
* [`d785204a`](https://github.com/talos-systems/talos/commit/d785204aa29e1950217abf0eae68d476f3c24953) chore: disable one commit per PR
* [`f7ad1b98`](https://github.com/talos-systems/talos/commit/f7ad1b98206429ce179adc69de21d59bbbff7fcf) release(v1.0.0-beta.0): prepare release
* [`0aa23cb3`](https://github.com/talos-systems/talos/commit/0aa23cb3271d9ee852a6ba607a9efa28d24f35b3) feat: update pkgs to 1.0 versions, Go 1.17.8
* [`dc8e9ed4`](https://github.com/talos-systems/talos/commit/dc8e9ed4a5662a9e214e79ee480bdcecdb366996) feat: bond interfaces from kernel cmdline
* [`947c77b6`](https://github.com/talos-systems/talos/commit/947c77b60c355136b23d054b3327c786449f5e87) docs: update cilium inline install
* [`65447200`](https://github.com/talos-systems/talos/commit/65447200545562b574bdb36ed4fd194c38b9511a) chore: update talos-systems modules to released version
* [`77158a61`](https://github.com/talos-systems/talos/commit/77158a61fd3c93b1c3cc60628fa4d87588667a06) chore: rename v0.15 to v1.0
* [`22a4d6b3`](https://github.com/talos-systems/talos/commit/22a4d6b3e67c81ab2241517924c199be636e9987) feat: update containerd to 1.6.1
* [`a50747a6`](https://github.com/talos-systems/talos/commit/a50747a64acaa216c2242807ff9a883bee5934e7) fix: align list and diskusage command flags with their Linux analogs
* [`d29e9202`](https://github.com/talos-systems/talos/commit/d29e9202f3e3cf5a320338a3845a8ccb8881b954) chore: remove iSCSI packages from the rootfs image
* [`09efa62f`](https://github.com/talos-systems/talos/commit/09efa62f68f4ea7f2bf3b1c90a2914de8af5a62d) chore: re-enable kexec and default to UEFI booting in tests
* [`8975a56e`](https://github.com/talos-systems/talos/commit/8975a56eb275727b5f9e16a560aaacfe9f97856d) docs: fix typo in release notes
* [`61461de6`](https://github.com/talos-systems/talos/commit/61461de634488d4536eababc9a6e8c1f9ec9f465) feat: define resource reservation
* [`7ddc7f60`](https://github.com/talos-systems/talos/commit/7ddc7f605327d1d0dd58d10c7c1089fbd350a7a7) feat: support specifying env vars for control plane pods
* [`7c1924a3`](https://github.com/talos-systems/talos/commit/7c1924a3aebf0a430169b3c53ab69db14a2387cc) docs: update cilium docs
* [`7b33ffbd`](https://github.com/talos-systems/talos/commit/7b33ffbd8558e92d6fcc5986d5985ac2560c261b) chore: update pkgs and extras
* [`c5992c2b`](https://github.com/talos-systems/talos/commit/c5992c2bf84bfe4b9f14ccde705aa57119d4ec64) chore: bump dependencies
* [`de69ab79`](https://github.com/talos-systems/talos/commit/de69ab79025994fdfbc98b8a5bc454bb8fccbd36) fix: scaleway network config
* [`f81fb9f7`](https://github.com/talos-systems/talos/commit/f81fb9f7cf2dc1f66915e0bc2c3f3a9c1014767e) feat: implement sysfs
* [`79d9720a`](https://github.com/talos-systems/talos/commit/79d9720a35d9b2f36bf5d63d34becd0caa0aa434) fix: set route to metaserver for scaleway platform
* [`eb40b925`](https://github.com/talos-systems/talos/commit/eb40b9254f4cce4db86bc49c5dfa67f3feffbdaa) feat: add a way to override kubelet configuration via machine config
* [`dc237154`](https://github.com/talos-systems/talos/commit/dc237154783cff1ea9656529e165902d45f5902c) chore: update packet to equinix
* [`7917b1ac`](https://github.com/talos-systems/talos/commit/7917b1aca0bd8b0d3c8cd303427c95efd6f1d7e3) feat: support admission control configuration and Pod Security admission
* [`45feb72a`](https://github.com/talos-systems/talos/commit/45feb72a47a0773be316b8d28a4c7a0f6887f38b) feat: fluent-bit example
* [`9b0b5501`](https://github.com/talos-systems/talos/commit/9b0b5501ddd53630f729575b0192a501880dff80) docs: add katacoda link
* [`b2bf3117`](https://github.com/talos-systems/talos/commit/b2bf3117ffe3bef50246f0186e4dc9b3d2f22db0) feat: implement extension services
* [`063a9e16`](https://github.com/talos-systems/talos/commit/063a9e165762c65b8d38184dafadff5c49138f33) test: pre-fetch CLI tools
* [`d749643e`](https://github.com/talos-systems/talos/commit/d749643e7ec44cf9de51238ed167ca229a3088c1) feat: download metadata on Scaleway using low source port
* [`1800b4c7`](https://github.com/talos-systems/talos/commit/1800b4c7079401b706bc4e9795136247b7a110e2) chore: fix kernel reference errata
* [`743a0300`](https://github.com/talos-systems/talos/commit/743a0300257a58039bfb4344a37c7716ddc6a3a4) chore: bump github.com/mdlayher/arp@latest
* [`614adf0f`](https://github.com/talos-systems/talos/commit/614adf0ffdeb3923cf9f06c9b6a611f2551fe2f4) feat: update xfsprogs to 5.14.2, replace LibreSSL with OpenSSL
* [`28c3b495`](https://github.com/talos-systems/talos/commit/28c3b495dacfb1aa89221fff76b90819ba41ccbc) docs: updates to troubleshooting doc
* [`673fe2eb`](https://github.com/talos-systems/talos/commit/673fe2ebf763a1437e835d14f4c6e893e2449226) feat: disable PSP by default for Talos >= 0.15
* [`4d419a00`](https://github.com/talos-systems/talos/commit/4d419a007fbfecd8bec85bb5b36cb9a0cefd9259) feat: store audit logs to disk
* [`8ef3d85b`](https://github.com/talos-systems/talos/commit/8ef3d85bc4748b65a423a427f34b38edd9cd483a) chore: bump dependencies
* [`8a634d56`](https://github.com/talos-systems/talos/commit/8a634d56486453938152ffd45409b8c618afadf9) chore: bump tools, pkgs, extras
* [`f40b480b`](https://github.com/talos-systems/talos/commit/f40b480bddcfcd1109a7455d19d77c5488500a11) chore: expand Cilium deployment docs
* [`3ba8eb00`](https://github.com/talos-systems/talos/commit/3ba8eb00d3afb84961d6c944e67b86cb7e6ca03d) docs: design concepts page
* [`a5fb271a`](https://github.com/talos-systems/talos/commit/a5fb271ac8e40466ac6d363b9f08e8c2f8b08da3) feat: enable protectKernelDefaults in kubelet_spec
* [`b7a1e043`](https://github.com/talos-systems/talos/commit/b7a1e0431000225442a80d2ee4054e4cea3ef5bf) chore: don't append `initrd=` to the kernel command line
* [`4d5cd665`](https://github.com/talos-systems/talos/commit/4d5cd6653846048bd84f87c23be1271bd4e293fc) feat: add new grub parser and descriptive grub menu entries
* [`6ccfdbaf`](https://github.com/talos-systems/talos/commit/6ccfdbaf1b8d0d3a7c0a125bbc9dfe528a1d7f64) fix: avoid replacing default gRPC codec in machinery
* [`0fe34b35`](https://github.com/talos-systems/talos/commit/0fe34b35812346d921ceafd3fa7bf741866b47b9) feat: update Kubernetes to 1.23.4
* [`95a564ba`](https://github.com/talos-systems/talos/commit/95a564ba2ad09eba0c36ccda78fdb50c04237a95) fix: prefer logical on merging link specs
* [`8b7091a0`](https://github.com/talos-systems/talos/commit/8b7091a06e8bf0d0a5c3702aa2e81432b9144d23) fix: correct vultr interface IP calculation
* [`5a0fd63c`](https://github.com/talos-systems/talos/commit/5a0fd63c81a14727e141755244e67887f7758743) fix: determine openstack interface IP correctly
* [`00ccaf13`](https://github.com/talos-systems/talos/commit/00ccaf13fb310d3b8069bc6635fb1fa02eb377fd) feat: update CoreDNS to 1.9.0
* [`a9a47b75`](https://github.com/talos-systems/talos/commit/a9a47b755938456dd4572762fa967a90bb206207) feat: update containerd to 1.6.0
* [`961067e8`](https://github.com/talos-systems/talos/commit/961067e8b3322e57ff92643fef58f3c915c9b120) docs: update getting-started.md
* [`bddd53fc`](https://github.com/talos-systems/talos/commit/bddd53fc4a0477b5745ef0f82f577d5b4bada6a1) chore: bump dependencies
* [`f1a93d28`](https://github.com/talos-systems/talos/commit/f1a93d28fbeec51681b2318431f46e2925113aa9) release(v0.15.0-alpha.2): prepare release
* [`1e9f0ad4`](https://github.com/talos-systems/talos/commit/1e9f0ad4c6abcfb5244f0d4159b7085b387f2cc1) feat: update Go to 1.17.7, Linux to 5.15.23
* [`fef99892`](https://github.com/talos-systems/talos/commit/fef99892d5ba11c9c87d047e23fb7023de5116a6) chore: pin kubernetes version to `talosctl gen config`
* [`bcf92813`](https://github.com/talos-systems/talos/commit/bcf928134c8d1a17d69d425061350040d3ed15a4) feat: udev extensions support
* [`47619f83`](https://github.com/talos-systems/talos/commit/47619f8320f8e03246ffa43d19dcd759b1d9511c) docs: update system extensions guide with grammar fixes
* [`2bcceb6e`](https://github.com/talos-systems/talos/commit/2bcceb6e437b5e30f856ea495eccdb0ab4d5e1ca) chore: disable TIPC and B.A.T.M.A.N
* [`c6bca1b3`](https://github.com/talos-systems/talos/commit/c6bca1b33b5b0522ee7b997c2bcc5afadc991a94) docs: add guide on system extensions
* [`492b156d`](https://github.com/talos-systems/talos/commit/492b156dabca6552002881f9d8ca57b02a04add2) feat: implement static pods via machine configuration
* [`6fadfa8d`](https://github.com/talos-systems/talos/commit/6fadfa8dbcc22b80dc83ed477f81f5c55727298c) fix: parse properly IPv6 address in the cmdline `ip=` arg
* [`d991f398`](https://github.com/talos-systems/talos/commit/d991f3982c329e97c78d068eae0abf02020d21a9) chore: update the kernel with IGC driver enabled
* [`cbc9610b`](https://github.com/talos-systems/talos/commit/cbc9610be66f4b2552e2c7374118cfa71764a148) feat: sysctl system optimization
* [`8b6d6220`](https://github.com/talos-systems/talos/commit/8b6d6220d3799cb79cd66267017b54d0a09e2c63) fix: parse interface ip correctly (nocloud)
* [`54632b1b`](https://github.com/talos-systems/talos/commit/54632b1be7b08440b562dfb0bf44ef9784317dbf) docs: fix developing Talos docs
* [`0da370df`](https://github.com/talos-systems/talos/commit/0da370dfefecdba9c981ccafa3255c4dc256d4d2) test: unlock CABPT/CACPPT provider versions
* [`df0e388a`](https://github.com/talos-systems/talos/commit/df0e388a4fa1995124d4e722fc1b8a1bfdffed58) feat: extract firmware part of system extensions into initramfs
* [`8899dd34`](https://github.com/talos-systems/talos/commit/8899dd34945105e7276fa453341cc0aa4dbe51d4) chore: add json-tags for SecretsBundle
* [`4f391cd5`](https://github.com/talos-systems/talos/commit/4f391cd5c540a0a955f294d628adc7437b7513b5) chore: bump kernel to 5.15.22
* [`6bd07406`](https://github.com/talos-systems/talos/commit/6bd07406e1895d190b5bbd9838ee84f85d02cd3f) feat: disable reboots via kexec
* [`1e3f2f95`](https://github.com/talos-systems/talos/commit/1e3f2f95275aa5f71abe931015799caaca42bf61) fix: validate kubelet node IP subnets correctly
* [`d211bff4`](https://github.com/talos-systems/talos/commit/d211bff47d661697926fece893784519dbf4f8f3) feat: enable accept_ra when IPv6 forwarding
* [`93020583`](https://github.com/talos-systems/talos/commit/93020583195d066e879ccb19da38b8cfd6b93e96) chore: update kernel to 5.15.21
* [`c7186ed0`](https://github.com/talos-systems/talos/commit/c7186ed08013efaa9957fe064152ccfca8ec1ab8) chore: bump dependencies
* [`9ee470f9`](https://github.com/talos-systems/talos/commit/9ee470f9556462dd3fda656d58358e7ae78f4d47) feat: set /etc/localtime to UTC
* [`c3476836`](https://github.com/talos-systems/talos/commit/c347683670d489230a2e87e4f04f05009173aca0) fix: disable auto-tls for etcd
* [`9bffc7e8`](https://github.com/talos-systems/talos/commit/9bffc7e8d5eff6d5ce0b83d627557f4110fc5c58) fix: pass proper sequence to shutdown sequence on ACPI shutdown
* [`e47387e4`](https://github.com/talos-systems/talos/commit/e47387e4197974366844b2741cae345666d474da) chore: bump CAPI to 1.0.4
* [`5462f5ed`](https://github.com/talos-systems/talos/commit/5462f5ed18b7ffe023b3a41f1ac7d9b4ca9b726d) feat: update etcd to 3.5.2
* [`f6fa12e5`](https://github.com/talos-systems/talos/commit/f6fa12e53697c763bd0463d91e92a446eb1ac2f7) docs: update upgrading Talos, Kubernetes, and Docker guides
* [`5484579c`](https://github.com/talos-systems/talos/commit/5484579c1a897f2378aacbef94bd4381d6b8299c) feat: allow link scope routes in the machine config
* [`56b83b08`](https://github.com/talos-systems/talos/commit/56b83b08730c13910b0e5eb724decaf27e187047) feat: enable persistence for docker provider
* [`949464e4`](https://github.com/talos-systems/talos/commit/949464e4b6e1e807d9299b451758a6d144725fb1) fix: use leaf certificate in the apid RBAC check
* [`446972f2`](https://github.com/talos-systems/talos/commit/446972f2113ada8e6c511ce56f630ec170ef0f26) chore: bump kernel to 5.15.19
* [`fe40e7b1`](https://github.com/talos-systems/talos/commit/fe40e7b1b39281f9bc14393b8c9db55ab6d6f8cd) feat: drain node on shutdown
* [`7f0b3aae`](https://github.com/talos-systems/talos/commit/7f0b3aae0a37b519623422841e3cbcda8bdd21a1) feat: add multiple config patches, patches from files, YAML support
* [`202290be`](https://github.com/talos-systems/talos/commit/202290be7b9b04ec909d369326d463c3b462eafa) docs: update Kubernetes upgrade video
* [`036644f7`](https://github.com/talos-systems/talos/commit/036644f7a03383922fd8407b1d514c7f79d44d0d) chore: bump kernel to 5.15.18
* [`dcde2c4f`](https://github.com/talos-systems/talos/commit/dcde2c4f68982974d6e55c52ba0fa8665e7f40b8) chore: update k8s upgrade message
* [`1c949335`](https://github.com/talos-systems/talos/commit/1c949335cc41cc9157e4c7dead44826c99b336f3) docs: add documentation for Hyper-V
* [`7f979091`](https://github.com/talos-systems/talos/commit/7f9790912308dfa88457a6db4f94728e5337c399) fix: clean up containerd state on installer run/validate
* [`8b98d8eb`](https://github.com/talos-systems/talos/commit/8b98d8eb3976cb8e64ffa94cfdf0305216f7dbeb) docs: clarify Filebeat example
* [`74c03120`](https://github.com/talos-systems/talos/commit/74c03120cf1da93d79fd786036e8d296c00c221e) docs: replace Talos upgrades video
* [`65e64d42`](https://github.com/talos-systems/talos/commit/65e64d425e0253ae6780d52063d227c47df1ae29) chore: update kernel to stable 5.15.17
* [`4245f72d`](https://github.com/talos-systems/talos/commit/4245f72d3ff3712742d6d7d6ec3310f40f900c79) feat: add --extra-uefi-search-paths option
* [`7ffeb6c2`](https://github.com/talos-systems/talos/commit/7ffeb6c2e2bef1482b641725e4075c44264e899e) docs: update oracle cloud example
* [`151c9df0`](https://github.com/talos-systems/talos/commit/151c9df091f32d00748e7e5effbb2c759916e8b9) chore: add CSI tests for e2e-qemu
* [`cdb621c8`](https://github.com/talos-systems/talos/commit/cdb621c82e15026a851bbfb567afd834d88165e7) feat: provide a way to list installed system extensions
* [`abfb2581`](https://github.com/talos-systems/talos/commit/abfb2581289c72c9e7bda8bc1f7bc2aa2ba758f7) feat: share `/lib/firmware` across initramfs and rootfs
* [`ebec5d4a`](https://github.com/talos-systems/talos/commit/ebec5d4a0c20fe20aa1fd5d1f9b28c0745a08fe7) feat: support full disk path in the diskSelector
* [`831f65a0`](https://github.com/talos-systems/talos/commit/831f65a07f3b0a93ee9f38327dc5b84ce97a3237) fix: close client provider instead of Talos client in the upgrade module
* [`0bf161df`](https://github.com/talos-systems/talos/commit/0bf161dffb8c7805c44a4fb2c3db191dfa901b88) test: add integration test for system extensions
* [`7b396274`](https://github.com/talos-systems/talos/commit/7b3962745625decb720c53ca3b454f65079715f6) fix: handle 404 errors from AWS IMDS correctly
* [`85782faa`](https://github.com/talos-systems/talos/commit/85782faa24772dc9fa757aac3803a196f0325544) feat: update Kubernetes to 1.23.3
* [`c5e5922e`](https://github.com/talos-systems/talos/commit/c5e5922e536533badcaae568171f1b78cac40105) chore: bump dependencies
* [`b3c3ef29`](https://github.com/talos-systems/talos/commit/b3c3ef29bdf0f21805adf3489972cb92c98c00aa) feat: install system extensions
* [`a0889600`](https://github.com/talos-systems/talos/commit/a0889600fb19f62a2503244c32364808777ffdcc) chore: fix golangci-lint install
* [`a50c4298`](https://github.com/talos-systems/talos/commit/a50c42980febfe51ba1e4ce750768f01de8c2d47) fix: use #!/usr/bin/env bash as shebang instead of #!/bin/bash
* [`4464b725`](https://github.com/talos-systems/talos/commit/4464b725c4fea4234961959e884426c384822eab) fix: qemu: always use runtime.GOARCH for CNI bundle
* [`e7379c81`](https://github.com/talos-systems/talos/commit/e7379c81b222341633d6f1011bcdbffa1bf429fc) release(v0.15.0-alpha.1): prepare release
* [`58eb3600`](https://github.com/talos-systems/talos/commit/58eb3600fc44dc2fccaa82322207291ffd807205) fix: enforce reasonable TLS min tls-min-version
* [`b8d4c5df`](https://github.com/talos-systems/talos/commit/b8d4c5dfad4585c0af52287513176411a79fc20c) fix: use correct error in `kernel_param_spec` Modify call handling
* [`4961d686`](https://github.com/talos-systems/talos/commit/4961d6867cadab5e8b48e73355b23b91d36f70b4) docs: drop talos.interface kernel arg
* [`b1e61fa5`](https://github.com/talos-systems/talos/commit/b1e61fa5b1bcd5affd42b498711b9e3378344c33) chore: update Linux to 5.15.16
* [`d4b84459`](https://github.com/talos-systems/talos/commit/d4b844593587ae3f82efcdbdfe0f24cda4262474) feat: support CRI configuration merging and reimplement registry config
* [`f94c8c6e`](https://github.com/talos-systems/talos/commit/f94c8c6e1c3915c962c331943120bdfd2b76259f) feat: update Kubernetes to 1.23.2
* [`21f497b3`](https://github.com/talos-systems/talos/commit/21f497b3e20f3b1cc9b744f1787ba80cf396d3e0) feat: install readonly overlay mounts during talos chroot sequence
* [`9ad5a67d`](https://github.com/talos-systems/talos/commit/9ad5a67d21b0788d1b43f1bea8e39c003a4a8ecc) feat: inject platform network configuration as network resources
* [`907f8cbf`](https://github.com/talos-systems/talos/commit/907f8cbfb8ed28cf399b9797230790718fc04a58) docs: fix patch flag
* [`caa43442`](https://github.com/talos-systems/talos/commit/caa43442640744a0aa7a17aa1a205f1641e6445a) docs: add documentation on developing Talos
* [`16eeb677`](https://github.com/talos-systems/talos/commit/16eeb677625c0859d73b82948c1a073ba6e17e8d) docs: readme updates
* [`3c073702`](https://github.com/talos-systems/talos/commit/3c0737027b5574581a6461211199274ee709b1da) chore: update release notes
* [`6d8bea5d`](https://github.com/talos-systems/talos/commit/6d8bea5d559b1156f7d0b576b7b5784c25cd3595) feat: jetson nano SoC
* [`1d8955eb`](https://github.com/talos-systems/talos/commit/1d8955ebe43259a5e072b8a89f37cb728b6fcf53) feat: update CoreDNS to 1.8.7
* [`6af83afd`](https://github.com/talos-systems/talos/commit/6af83afd5aba64ffa7887d62f84c434109b7579b) fix: handle multiple-IP cluster nodes
* [`43b2d813`](https://github.com/talos-systems/talos/commit/43b2d8137116863cfc5ca969c429c13483465b01) chore: bump dependencies
* [`529e80f4`](https://github.com/talos-systems/talos/commit/529e80f4f529f066872b5768cd80eeeb7b766a31) docs: update home page and footer
* [`37630e70`](https://github.com/talos-systems/talos/commit/37630e70ccc9950e139bf7fcfcded6a18d0c7a01) Update twitter link
* [`af440919`](https://github.com/talos-systems/talos/commit/af440919bbaf12f414f04a5a621c1e2d5ed84ae2) fix: avoid panic in config loading/validation
* [`4b8e9de5`](https://github.com/talos-systems/talos/commit/4b8e9de599812f82275605a93de7f5c05471f7f5) docs: add guide on adding proprietary kernel modules
* [`833dc416`](https://github.com/talos-systems/talos/commit/833dc4169a9702383930816d13be39f6b81c7a31) docs: rework vmware assets
* [`2869b5ee`](https://github.com/talos-systems/talos/commit/2869b5eeacf0b6c96aedcb605bfa8a5f9fb87625) feat: add oraclecloud.com platform support
* [`f3ec24be`](https://github.com/talos-systems/talos/commit/f3ec24bebf0aaa7983228a09b21a67b9a2a098c1) fix: vmware documentation typo
* [`2f2bdb26`](https://github.com/talos-systems/talos/commit/2f2bdb26aa5367066c12a6402af554b7a5a148d6) feat: replace flags with --mode in `apply`, `edit` and `patch` commands
* [`b09be2a6`](https://github.com/talos-systems/talos/commit/b09be2a69c6b6f8064a676fc014e6e60ea01a08d) docs: update index.md and sync across versions
* [`ca65b918`](https://github.com/talos-systems/talos/commit/ca65b918a7292ae53d40e410cca4e89be91e4261) docs: add nocloud documentation
* [`59437d6d`](https://github.com/talos-systems/talos/commit/59437d6d8360ad7dd8f801797ab91ac0791270f7) fix: filter down nameservers for docker-based cluster create
* [`194eaa6f`](https://github.com/talos-systems/talos/commit/194eaa6f22249fe4f43958bd897744a2cc57279f) chore: clean up /usr/bin from unneeded files
* [`74e72724`](https://github.com/talos-systems/talos/commit/74e7272401ccb75464dd42ed0427d73842af74e1) docs: update office office
* [`539af338`](https://github.com/talos-systems/talos/commit/539af338c4b8f6e4291654f66628c81022aeda72) docs: update vmware docs
* [`279a3fda`](https://github.com/talos-systems/talos/commit/279a3fda7ba24037e06377f01cc495207722caa9) feat: update Go to 1.17.6, containerd to 1.5.9
* [`3d308894`](https://github.com/talos-systems/talos/commit/3d308894120092fe095b41970d6341362ab80a6b) chore: bump Go dependencies
* [`d02d944e`](https://github.com/talos-systems/talos/commit/d02d944ec767441612b84c164af31bc27c0c0659) chore: provide umarshal from YAML methods for network resource specs
* [`2e735714`](https://github.com/talos-systems/talos/commit/2e735714d9218cbc335d9c418730c146821fb8d4) fix: derive machine-id from node identity
* [`d8a2721e`](https://github.com/talos-systems/talos/commit/d8a2721e129be33f4a3c37be1bf5b89a1cd91685) test: update CAPI components to latest
* [`7dff8a53`](https://github.com/talos-systems/talos/commit/7dff8a53ee7bc37afe9dc216ca8a9113718d76af) fix: ignore missing init.yaml for cluster create
* [`f4516c7d`](https://github.com/talos-systems/talos/commit/f4516c7d847d905b49b4e2127eb86a1f38156d53) chore: bump dependencies
* [`944f1322`](https://github.com/talos-systems/talos/commit/944f13221d50694d5c59ace1c12f8769d7ade9ae) chore: fix release pipeline
* [`cb548a36`](https://github.com/talos-systems/talos/commit/cb548a368a75ca379209213948518c880b242b0c) release(v0.15.0-alpha.0): prepare release
* [`da0b36e6`](https://github.com/talos-systems/talos/commit/da0b36e616f7da7eb0c6791b9cf5e4ee2757f08f) feat: introduce `talos.exp.wipe` kernel param to wipe system disk
* [`c079eb32`](https://github.com/talos-systems/talos/commit/c079eb32bd7fc19d506146e2a9edf5b406e25e02) refactor: use AWS SDK to access AWS metadata service
* [`2f4b9d8d`](https://github.com/talos-systems/talos/commit/2f4b9d8d6d10c0aa753f405282aa99696b923bb4) feat: make machine configuration read-only in Talos (almost)
* [`524f83d3`](https://github.com/talos-systems/talos/commit/524f83d3d8af3857f178c179a9552a5f32b70f47) feat: use official Go SDK to fetch GCP instance metadata
* [`d2a7e082`](https://github.com/talos-systems/talos/commit/d2a7e082c24d0b42820b3ea454329a19178ba0a4) test: retry in discovery tests
* [`f4219e53`](https://github.com/talos-systems/talos/commit/f4219e530ca7635ada666ae69071746d698939a8) chore: remove unused methods in AWS platform
* [`35bc2940`](https://github.com/talos-systems/talos/commit/35bc2940e375b99e0d6e22a26a05c25d642bf35a) fix: kexec on RPI4
* [`f235cfba`](https://github.com/talos-systems/talos/commit/f235cfbaed8b5254e19616bfaaa8b48fd7d32e64) fix: multiple usability fixes
* [`b3fbb2f3`](https://github.com/talos-systems/talos/commit/b3fbb2f312d5de0c14ffee567956b868a317aba7) test: don't build all images in the default CI pipeline
* [`dac550a5`](https://github.com/talos-systems/talos/commit/dac550a50f4793194e4aeee98702a052925a0e88) docs: fix troubleshooting guide
* [`83e8bec6`](https://github.com/talos-systems/talos/commit/83e8bec6b9d4c0ecc689f45b15d7203bbf9bf0cc) feat: update Linux to 5.15.11
* [`d5a82b37`](https://github.com/talos-systems/talos/commit/d5a82b37eb147a68ffd08fc8ec800edc92da9f9c) feat: remove `ApplyDynamicConfig`
* [`3623da13`](https://github.com/talos-systems/talos/commit/3623da136bde51422ba1aec06e22dea2e3dfa756) feat: provide a way to load Linux kernel modules
* [`4d1514ad`](https://github.com/talos-systems/talos/commit/4d1514add6e0b972aee26a8ad63ef8f972050d46) docs: update Mayastor deployment process
* [`cff1ff6d`](https://github.com/talos-systems/talos/commit/cff1ff6d5c3a68063ed2c0c063daadf2474cc43f) feat: shell completion for `list`, `read`
* [`19728437`](https://github.com/talos-systems/talos/commit/19728437ead7ab6e95afc8bd7f70be3f861c9a6e) feat: output IPs when etcd needs to be bootstrapped
* [`c297d66a`](https://github.com/talos-systems/talos/commit/c297d66a130cba708fcb42f8f2e6b356c36f5109) test: attempt number on two on proper retries in CLI time tests
* [`dc299da9`](https://github.com/talos-systems/talos/commit/dc299da9e8e885b7a44c184ef3d251726aa934a8) docs: add arm64 option to talosctl download
* [`f49f40a3`](https://github.com/talos-systems/talos/commit/f49f40a3361381e51d6986547be12ec3b4a3f24a) fix: pass path to conformance retrieve results
* [`942c8074`](https://github.com/talos-systems/talos/commit/942c8074fd14478089769e2b8132ea2796109721) docs: fork docs for 0.15
* [`880a7782`](https://github.com/talos-systems/talos/commit/880a7782cbc703b38a2ff2b3d76c1eda621524ba) docs: update documentation for 0.14.0 release
* [`dc9a0cfe`](https://github.com/talos-systems/talos/commit/dc9a0cfe94b59c688d65ef74ebc04f273b8a72fb) chore: bump Go dependencies
* [`77349693`](https://github.com/talos-systems/talos/commit/7734969356abac8355a31da08d47fafd4000e814) fix: config apply immediate
* [`17c14748`](https://github.com/talos-systems/talos/commit/17c14748815e2ab928a9c0c8a079f65a63f0194e) test: retry `talosctl time` call in the tests
* [`acf1ac0f`](https://github.com/talos-systems/talos/commit/acf1ac0f1aff929ae9bf66b1c0322b4f83c0fef1) feat: show human-readable aliases in `talosctl get rd`
* [`5532867b`](https://github.com/talos-systems/talos/commit/5532867b05bb596f42516ff121b0a3a97176b3d1) refactor: rewrite the implementation of Processes API
* [`80350861`](https://github.com/talos-systems/talos/commit/80350861a2c1cee234d2f3a571d3993841c554d9) feat: update Kubernetes to 1.23.1
* [`4c96e936`](https://github.com/talos-systems/talos/commit/4c96e936ed467ae7838258699bdd83fd6da15ae6) docs: add cilium guide
* [`e3f2acb5`](https://github.com/talos-systems/talos/commit/e3f2acb5e57f9b3e7b11986f180e287f1f693079) refactor: rewrite the check for unknown keys in the machine configuration
* [`4175396a`](https://github.com/talos-systems/talos/commit/4175396a89f836bb1835d201b59224b286eeb62a) refactor: use update go-blockdevice library with allocation fixes
* [`b58f567a`](https://github.com/talos-systems/talos/commit/b58f567a133b661cc045a995dd29ab5090dfe194) refactor: optimize Runtime config interface to avoid config marshaling
* [`bb355c9a`](https://github.com/talos-systems/talos/commit/bb355c9ab38a417ed471bf3ce7b1879609f5e806) chore: remove govalidator library
* [`3af56bd2`](https://github.com/talos-systems/talos/commit/3af56bd2e70e8964cc48b430b1e67e48052af682) test: update capi templates to v1beta1
* [`936b4c4c`](https://github.com/talos-systems/talos/commit/936b4c4cee87697b3f08d51f22208b44b8a02db5) fix: update DHCP library with the panic fix
* [`ab42886b`](https://github.com/talos-systems/talos/commit/ab42886bf333dcaa9d3a1b765781ab19354de397) fix: allow kubelet to be started via the API
* [`ec641f72`](https://github.com/talos-systems/talos/commit/ec641f7296ce62b2f9ba1353ff2eba70c2287c08) fix: use default time servers in time API if none are configured
* [`79f213ee`](https://github.com/talos-systems/talos/commit/79f213eec65af46c4a3a4c4494d67ffc1b0a53ec) fix: cleanup affiliates
* [`2dd0b5b6`](https://github.com/talos-systems/talos/commit/2dd0b5b68aa5b8efbc9b0bc4f8ebc159e2d991ab) chore: update Go to 1.17.5
* [`97ffa7a6`](https://github.com/talos-systems/talos/commit/97ffa7a645d7db93ee58032795f91131f6950e89) feat: upgrade kubelet version in `talosctl upgrade-k8s`
* [`5bc5123e`](https://github.com/talos-systems/talos/commit/5bc5123eb91386ca12e7e7f9fc0f66637343a642) docs: document `ip=` kernel argument
* [`8e1d0bfb`](https://github.com/talos-systems/talos/commit/8e1d0bfb5fbaf0849bdd07b73a8e3bda4e8c3b75) feat: update Kubernetes to 1.23.0
* [`1d6f140d`](https://github.com/talos-systems/talos/commit/1d6f140d76f53b12f40c07ef11ced8aebc6fc003) fix: make `apply-config` work reliably in any Talos state
* [`a5a6c720`](https://github.com/talos-systems/talos/commit/a5a6c720e96a3c64b1f3126f1bfa4014ac00a85b) chore: remove boot-{arch}.tar.gz artifact
* [`fc5ec500`](https://github.com/talos-systems/talos/commit/fc5ec500731b4593d2b2735e0b616e9825cf4f4f) fix: relax validation for wireguard endpoints
* [`cdbd5cff`](https://github.com/talos-systems/talos/commit/cdbd5cff40eb521d98fa8f9ad1469740b5b60542) docs: vlan VIP
* [`149ffa97`](https://github.com/talos-systems/talos/commit/149ffa9774bc3fbea1a69afc01f5da4ac311f085) fix: increase boot and etcd join timeouts
* [`dc9db214`](https://github.com/talos-systems/talos/commit/dc9db2141967603aaf2855e5a6874465e207d7b1) feat: autocomplete nodes, context and resource definitions
* [`b4b3e213`](https://github.com/talos-systems/talos/commit/b4b3e21333c54cff3559fcc3464327fc23e673ee) chore: bump tools/pkgs/extra to final released versions
* [`d225cf91`](https://github.com/talos-systems/talos/commit/d225cf91e83077857b386e5131e74980d3aef476) fix: tmpfs default permissions
* [`8f3e1a4a`](https://github.com/talos-systems/talos/commit/8f3e1a4ad6af61e75c26fffd496c9a4b7fca313e) fix: drop unpacked layers from containerd image store
* [`1fc43619`](https://github.com/talos-systems/talos/commit/1fc43619d2e80088540fdf8fa99f0cfcdd36bab0) docs: improve clarity for users
* [`36c9a65a`](https://github.com/talos-systems/talos/commit/36c9a65ac083e975c27a22e198213c55899f1f93) feat: update deps and Kubernetes to 1.23.0-rc.1
* [`64a4f6e7`](https://github.com/talos-systems/talos/commit/64a4f6e77c52dde4068659129c52b3b00bd9a6fd) test: bump Talos versions in upgrade tests
* [`d2ebda78`](https://github.com/talos-systems/talos/commit/d2ebda78cc592afca57aea51cdd3e343329d4b10) feat: update runc to 1.0.3
* [`adf05072`](https://github.com/talos-systems/talos/commit/adf05072ac9bc8090bd83bf3fdfceb2d988f5bb7) chore: drop unused package
* [`961d1567`](https://github.com/talos-systems/talos/commit/961d1567d9124069d047a1d44b9afbfdec365120) chore: update Go to 1.17.4
* [`d2fd7c21`](https://github.com/talos-systems/talos/commit/d2fd7c217015405a28cf3564a6916508425d48ef) feat: make kubelet service apply changes immediately
* [`4f5d9da9`](https://github.com/talos-systems/talos/commit/4f5d9da922bc3ca29ff9e834863471f0d2b830fd) feat: allow overriding KSPP kernel parameters
* [`6377f3df`](https://github.com/talos-systems/talos/commit/6377f3df7bf8017d764c3311c664f97a9b90b8a2) test: uplift capi versions and templates
* [`2a0da062`](https://github.com/talos-systems/talos/commit/2a0da062475edd80c2f4aa7a26da433d5fdc6d5a) feat: split installer and imager images
* [`1a13aaa2`](https://github.com/talos-systems/talos/commit/1a13aaa239d8afa5f7d2bfd3096762eb70e5fab7) feat: update Linux to 5.15.6
* [`73293bc2`](https://github.com/talos-systems/talos/commit/73293bc2a76cbb40f29b0767784461f186c0f1b2) feat: can disable controlmanager and scheduler
* [`7f992229`](https://github.com/talos-systems/talos/commit/7f9922296a6a19019c2bf0299d16f2b84f41c38e) feat: add powercycle mode in reboot
* [`bc69f6ec`](https://github.com/talos-systems/talos/commit/bc69f6ec84418000e6397c887a5a01a99948c5da) feat: vip for VLANs
* [`99338e5f`](https://github.com/talos-systems/talos/commit/99338e5ffde0e9bb87f948935633861a23858720) feat: update Flannel to 0.15.1
* [`8370dde1`](https://github.com/talos-systems/talos/commit/8370dde1fd17d7f1a4c91fd3360835e527dc1d4f) docs: fix typos
* [`a5646db2`](https://github.com/talos-systems/talos/commit/a5646db297f382274dbf02eed7a4fa3ed4f2e950) feat: support MTU for VLAN's
* [`4aad0ebf`](https://github.com/talos-systems/talos/commit/4aad0ebf91387b21fe430f77d8cc4111e05294d2) docs: expand logging documentation
* [`400225c8`](https://github.com/talos-systems/talos/commit/400225c886d1115ffc61ceac07c882a34e16a8df) docs: fix GCP docs
* [`f7c87d1d`](https://github.com/talos-systems/talos/commit/f7c87d1d9d8ec5bf7bd8277c0502ea76563e65b1) release(v0.14.0-alpha.2): prepare release
* [`e9f4b7b2`](https://github.com/talos-systems/talos/commit/e9f4b7b2041223309467227fa8b99cf35b797c72) feat: update Linux to 5.15.5
* [`4d0a75a3`](https://github.com/talos-systems/talos/commit/4d0a75a3f0795d5a0537c3b59007f97423c072ab) docs: add documentation about logging
* [`8d1cbeef`](https://github.com/talos-systems/talos/commit/8d1cbeef9f2ae95d04035f5d999aa181fb88e9fc) chore: add API breaking changes detector
* [`ed7fb9db`](https://github.com/talos-systems/talos/commit/ed7fb9db14554ccc191cc0c989aba38021a59690) feat: move kubelet proccesses to /podruntime cgroup
* [`2cd3f9be`](https://github.com/talos-systems/talos/commit/2cd3f9be1f36dd3389ee528fa8f0b2548032c2f7) feat: filter out SideroLink addresses by default
* [`0f169bf9`](https://github.com/talos-systems/talos/commit/0f169bf9b15239bfd35f371832211c42caf4349c) chore: add API deprecations mechanism
* [`eaf6d472`](https://github.com/talos-systems/talos/commit/eaf6d4720383881c0dcf967dbc4e960d5ef49dd8) refactor: use random port listener in kernel log delivery tests
* [`bf4c81e7`](https://github.com/talos-systems/talos/commit/bf4c81e7da854b7e9491f4ecb6fce89b026f4a9f) feat: kernel log (kmsg) delivery controller
* [`f3149780`](https://github.com/talos-systems/talos/commit/f3149780e6663f7dc0fd0091cd6e3df605eac848) feat: update Kubernetes to 1.23.0-rc.0
* [`b824909d`](https://github.com/talos-systems/talos/commit/b824909d686b1f5a8cd20afe9ca5a4f291a6f12d) fix: disable kexec on RPi4
* [`3257751b`](https://github.com/talos-systems/talos/commit/3257751bc0a18e0d3bb7097191989440ae473ee6) fix: initialize Drainer properly
* [`e4bc68bf`](https://github.com/talos-systems/talos/commit/e4bc68bf026966a3326872a1d342ef3b9c05cc9d) fix: leave only a single IPv4/IPv6 address as kubelet's node IP
* [`e6d00741`](https://github.com/talos-systems/talos/commit/e6d007418efeb5d7f82eb82a35cddacc64ec99ba) feat: update pkgs - Linux 5.15.4, LibreSSL 3.2.7
* [`d5cbc364`](https://github.com/talos-systems/talos/commit/d5cbc3640256090e354b3896ffea72b8e58874bb) feat: add GCP ccm
* [`7433150f`](https://github.com/talos-systems/talos/commit/7433150fd84ef0935e1aad91ca654892dc522806) feat: implement events sink controller
* [`b4a406ae`](https://github.com/talos-systems/talos/commit/b4a406ae7c72e30ba488493682045495cd31dc4e) test: pin cluster API templates version to tag v1alpha4
* [`9427e78d`](https://github.com/talos-systems/talos/commit/9427e78dc6d581e752bf41a20f1e0379cc99d92d) fix: catch panics in network operator runs
* [`d1f55f90`](https://github.com/talos-systems/talos/commit/d1f55f90128859d41ada63159d6b2d12e83fabac) fix: update blockdevice library to properly handle absent GPT
* [`5ac64b2d`](https://github.com/talos-systems/talos/commit/5ac64b2d97c6e013c83a6618c6bece2e70dedd98) chore: set version in unit-tests
* [`20d39c0b`](https://github.com/talos-systems/talos/commit/20d39c0b48b64f237270e13df7f277abd262d10b) chore: format .proto files
* [`852bf4a7`](https://github.com/talos-systems/talos/commit/852bf4a7de815b75e2e632de18fae30bd1bc22be) feat: talosctl fish completion support
* [`6bb75150`](https://github.com/talos-systems/talos/commit/6bb75150a394ee1ef4a3677ab4d8e73f27172209) fix: allow add_key and request_key in kubelet seccomp profile
* [`6487b21f`](https://github.com/talos-systems/talos/commit/6487b21feb12291419c6fd1f6635a051b0a60afc) feat: update pkgs for u-boot, containerd, etc
* [`f7d1e777`](https://github.com/talos-systems/talos/commit/f7d1e7776917475507aa99847f88b9c22c9f7b95) feat: provide SideroLink client implementation
* [`58892cd6`](https://github.com/talos-systems/talos/commit/58892cd697676c19f830f55e8ba1d84cd6000621) fix: unblock events watch on context cancel
* [`caa76be2`](https://github.com/talos-systems/talos/commit/caa76be2c982d9d6bc8d3103f16b5915796f76b1) fix: containerd failed to load plugin
* [`1ffa8e04`](https://github.com/talos-systems/talos/commit/1ffa8e0480084264eee551ad177b2443ddb02ead) feat: add ULA prefix for SideroLink
* [`c6a67b86`](https://github.com/talos-systems/talos/commit/c6a67b8662bb3c6efbe912b19699ace19e70dd3f) fix: ignore not existing nodes on cordoning
* [`f7302525`](https://github.com/talos-systems/talos/commit/f730252579879df2e95878de292f17f791740804) feat: add new event types
* [`7c9b082f`](https://github.com/talos-systems/talos/commit/7c9b082f74f26349a0e309d9818d5bc55e672378) feat: update Kubernetes to 1.23.0-beta.0
* [`750e31c4`](https://github.com/talos-systems/talos/commit/750e31c4a46f2835eca9fc9a085d2bb64e582e40) fix: ignore EBUSY from `kexec_file_load`
* [`2d11b595`](https://github.com/talos-systems/talos/commit/2d11b59558c98f4cd07a50b25be29b5c355a4495) fix: ignore virtual IP as kubelet node IPs
* [`030fd349`](https://github.com/talos-systems/talos/commit/030fd349b1c0669d7059f8c6883c85096f6f9ef5) fix: don't run kexec prepare on shutdown and reset
* [`6dcce20e`](https://github.com/talos-systems/talos/commit/6dcce20e6fa088c3063aab728912731f5e827eb7) test: set proper pod CIDR for Cilium tests
* [`695300da`](https://github.com/talos-systems/talos/commit/695300dac46c114b8e7e40abdaeece25f7079c88) release(v0.14.0-alpha.1): prepare release
* [`753a8218`](https://github.com/talos-systems/talos/commit/753a82188f227da4f2f40da5f4d46ebe45774455) refactor: move pkg/resources to machinery
* [`0102a64a`](https://github.com/talos-systems/talos/commit/0102a64a5f6de2c3fe5d7792c2c5845fc737edff) refactor: remove pkg/resources dependencies on wgtypes, netx
* [`7462733b`](https://github.com/talos-systems/talos/commit/7462733bcb075b923b8c7ba4a763308c641c49a2) chore: update golangci-lint
* [`032c99a0`](https://github.com/talos-systems/talos/commit/032c99a0300ccb09105a07434884d2b1f57e537d) refactor: remove pkg/resources dependencies on k8s and base62
* [`4a5cff45`](https://github.com/talos-systems/talos/commit/4a5cff45f397ac29b7bfc390f11691c32d8615b2) perf: raspberry PIs clockspeed as fast as firmware allows
* [`a76f6d69`](https://github.com/talos-systems/talos/commit/a76f6d69dbfdf34e4383dd5d2ee9f8cca4661e87) feat: allow kubelet to be restarted and provide negative nodeIP subnets
* [`189221d5`](https://github.com/talos-systems/talos/commit/189221d589c1c9d4fc012dd9e31fd6d142d88dde) chore: update dependencies
* [`41f0aecc`](https://github.com/talos-systems/talos/commit/41f0aecc1d3c4afce96d034f160fa9f120c67e85) docs: update partition info
* [`95105071`](https://github.com/talos-systems/talos/commit/95105071de29f70552bd7c0881c2cc2e7c78c0ac) chore: fix simple issues found by golangci-lint
* [`d4b0ca21`](https://github.com/talos-systems/talos/commit/d4b0ca21a1ee1183b28738bb3d9ca251e1968fe7) test: retry upgrade mutex lock failures
* [`4357e9a8`](https://github.com/talos-systems/talos/commit/4357e9a849fcb7fb66378bdd767a926dde0c4318) docs: add Talos partions info
* [`8e8687d7`](https://github.com/talos-systems/talos/commit/8e8687d7592d4bc071981478491d70489e7dd4a9) fix: use temporary sonobuoy version
* [`e4e8e873`](https://github.com/talos-systems/talos/commit/e4e8e8737f564be47098e284706a63ef84636890) test: disable e2e-misc test with Canal CNI
* [`897da2f6`](https://github.com/talos-systems/talos/commit/897da2f6efc571a66d14722a67bbc401bad31887) docs: common typos
* [`a50483dd`](https://github.com/talos-systems/talos/commit/a50483dddfd9a742b998f509ee713af996a2484e) feat: update Linux to 5.15.1
* [`a2233bfe`](https://github.com/talos-systems/talos/commit/a2233bfe46bfb55d71cfc07174f6f22aee6d2651) fix: improve NTP sync process
* [`7efc1238`](https://github.com/talos-systems/talos/commit/7efc1238ee285d55c4619b6a40190b54ff953a66) fix: parse partition size correctly
* [`d6147eb1`](https://github.com/talos-systems/talos/commit/d6147eb17d2ebf263ca0537068bbbba6d3ced061) chore: update sonobuoy
* [`efbae785`](https://github.com/talos-systems/talos/commit/efbae7857d09aa7e5e704d5989efced5aa655259) fix: use etc folder for du cli tests
* [`198eea51`](https://github.com/talos-systems/talos/commit/198eea51a81bf041470c3c88cb6cb97af3a4e203) fix: wait for follow reader to start before writing to the file
* [`e7f715eb`](https://github.com/talos-systems/talos/commit/e7f715eb0ca0587a05949910cafdeb486654b577) chore: log KubeSpan IPs overlaps
* [`82a1ad16`](https://github.com/talos-systems/talos/commit/82a1ad1681bf262dcc68fc9cbac71ff2eb5639af) chore: bump dependencies
* [`e8fccbf5`](https://github.com/talos-systems/talos/commit/e8fccbf5351ec2481813553181cb73b8f16c915a) fix: clear time adjustment error when setting time to specific value
* [`e6f90bb4`](https://github.com/talos-systems/talos/commit/e6f90bb41a757b5173bbbf7554b6f85c08aaf58e) chore: remove unused parameters
* [`785161d1`](https://github.com/talos-systems/talos/commit/785161d19f68fb64451cf3d887b67f85a8bcb952) feat: update k8s to 1.23.0-alpha.4
* [`fe228d7c`](https://github.com/talos-systems/talos/commit/fe228d7c85a1f8437398061b18c090962adc9f29) fix: do not use yaml.v2 in the support cmd
* [`9b48ca21`](https://github.com/talos-systems/talos/commit/9b48ca21731cce53f0a61f05f74dcd264417d784) fix: endpoints and nodes in generated talosconfig
* [`6e16fd2f`](https://github.com/talos-systems/talos/commit/6e16fd2feeb3f8bf0b99e6cbe21047b7a5c1f05c) chore: update tools, pkgs, and extras
* [`261c497c`](https://github.com/talos-systems/talos/commit/261c497c71eb5ab5197bef05d8c209dbeb770d3f) feat: implement `talosctl support` command
* [`fc7dc454`](https://github.com/talos-systems/talos/commit/fc7dc454840e100d82bb036a7f065293234593f7) chore: check our API idiosyncrasies
* [`b1584429`](https://github.com/talos-systems/talos/commit/b15844298a6bfedca5acc0cc27061666481eb94b) feat: use GCP deployment manager
* [`3e7d4df9`](https://github.com/talos-systems/talos/commit/3e7d4df99019e3cc6d9a90920d377c73a76ac577) chore: bump dependencies
* [`88f24229`](https://github.com/talos-systems/talos/commit/88f2422955690d1eca1e21cd60a35e1d49141e3d) refactor: get rid of prometheus/procfs dependency in pkg/resources
* [`dd196d30`](https://github.com/talos-systems/talos/commit/dd196d3006d29ae5cae5d43b648da1ca2e5af236) refactor: prepare for move of pkg/resources to machinery
* [`f6110f80`](https://github.com/talos-systems/talos/commit/f6110f8036bc176188abb583bfa51296c4d3897d) fix: remove listening socket to fix Talos in a container restart
* [`53bbb13e`](https://github.com/talos-systems/talos/commit/53bbb13ed8592978dc27578fa79b3a2018941427) docs: update docs with emmc boot guide
* [`8329d211`](https://github.com/talos-systems/talos/commit/8329d21114abf841788be64765378343c12eaf69) chore: split polymorphic RootSecret resource into specific types
* [`c97becdd`](https://github.com/talos-systems/talos/commit/c97becdd9548d85b2b894a05765f93dcdf9ad803) chore: remove interfaces and routes APIs
* [`d798635d`](https://github.com/talos-systems/talos/commit/d798635d993a21392b8a7972a689c4be0728db32) feat: automatically limit kubelet node IP family based on service CIDRs
* [`205a8d6d`](https://github.com/talos-systems/talos/commit/205a8d6dc495e25af87bf0b920d0f55b8a27bbfd) chore: make nethelpers build on all OSes
* [`5b5dd49f`](https://github.com/talos-systems/talos/commit/5b5dd49f64bef584000655687e5b9c5d25af6a93) feat: extract JSON fields from more log messages
* [`eb4f1182`](https://github.com/talos-systems/talos/commit/eb4f11822dc0b35541e0576a75ca263ca96d4981) docs: create cluster in hetzner cloud
* [`728164e2`](https://github.com/talos-systems/talos/commit/728164e25a5705ae5194b416941f3607d592b140) docs: fix kexec_load_disabled param name in release notes
* [`f6328f09`](https://github.com/talos-systems/talos/commit/f6328f09a2bf8d233a48354dd548fb740e509341) fix: fix filename typo
* [`01b0f0ab`](https://github.com/talos-systems/talos/commit/01b0f0abb341b387f16d9b3a142af742f36c8c2b) release(v0.14.0-alpha.0): prepare release
* [`8b620653`](https://github.com/talos-systems/talos/commit/8b6206537a30be049f74f8c4c7350028e6e56c74) fix: skip generating empty `.machine.logging`
* [`60ad0063`](https://github.com/talos-systems/talos/commit/60ad006367e73f56fd69726e0044f1ce48f18a8b) fix: don't drop ability to use ambient capabilities
* [`b6b78e7f`](https://github.com/talos-systems/talos/commit/b6b78e7fef3f6ef0c566e1815d1e28f16f868c93) test: add cluster discovery integration tests
* [`97d64d16`](https://github.com/talos-systems/talos/commit/97d64d160ce7e71c3107adbd31404853f543f7cc) fix: hcloud network config changes
* [`4c76865d`](https://github.com/talos-systems/talos/commit/4c76865d0ecec726e801a4b8f87e09476481d808) feat: multiple logging improvements
* [`1d1e1df6`](https://github.com/talos-systems/talos/commit/1d1e1df643832478aaa715aea5f51ad2e61e2880) fix: handle skipped mounts correctly
* [`0a964d92`](https://github.com/talos-systems/talos/commit/0a964d921922a247293e36b5fecaab466b91d924) test: fix openstack unit-test stability
* [`72f62ac2`](https://github.com/talos-systems/talos/commit/72f62ac27b5d0a72db409fd003a7cf9c41a03d7c) chore: bump Go and Docker dependencies
* [`9c48ebe8`](https://github.com/talos-systems/talos/commit/9c48ebe8f94afa85921ee5f1c1e9315201905a92) fix: gcp fetching externalIP
* [`6c297268`](https://github.com/talos-systems/talos/commit/6c297268ce596c2a875b7c419c85317dc24d9f4f) test: fix e2e k8s version
* [`ae5af9d3`](https://github.com/talos-systems/talos/commit/ae5af9d3fad399dea95c316d94e3e66b124bfb24) feat: update Kubernetes to 1.23.0-alpha.3
* [`28d3a69e`](https://github.com/talos-systems/talos/commit/28d3a69e9d4ae7ffa231804e26af6d1f39c07afd) feat: openstack config-drive support
* [`2258bc49`](https://github.com/talos-systems/talos/commit/2258bc4918e89b3d6fcb841b2ad677f114ddba7e) test: update GCP e2e script to work with new templates
* [`36b6ace2`](https://github.com/talos-systems/talos/commit/36b6ace25378e8c4a607de6efb6b89a2d52f5cea) feat: update Linux to 5.10.75
* [`38516a54`](https://github.com/talos-systems/talos/commit/38516a5499d933a8038ce6768946ff096e7c6f98) test: update Talos versions in upgrade tests
* [`cff20ec7`](https://github.com/talos-systems/talos/commit/cff20ec78340b3855751e13f2ad0e54bd47e9989) fix: change services OOM score
* [`666a2b62`](https://github.com/talos-systems/talos/commit/666a2b6207d257edda20c9e0411b0d4cd4112aa6) feat: azure platform ipv6 support
* [`d32814e3`](https://github.com/talos-systems/talos/commit/d32814e302c370ec1e82aa2879186a034cd2a905) feat: extract JSON fields from log lines
* [`e77d81ff`](https://github.com/talos-systems/talos/commit/e77d81fff31d68f762da3741846f95a6d2303903) fix: treat literal 'unknown' as a valid machine type
* [`c8e404e3`](https://github.com/talos-systems/talos/commit/c8e404e356878f6cd819a33386b351c1c152c3f5) test: update vars for AWS cluster
* [`ad23891b`](https://github.com/talos-systems/talos/commit/ad23891b1f6b33409721528c6771304b7ab94b2c) feat: update CoreDNS version 1.8.6
* [`41299cae`](https://github.com/talos-systems/talos/commit/41299cae9961665c2bf2a642290f8309683f040d) feat: udev rules support
* [`5237fdc9`](https://github.com/talos-systems/talos/commit/5237fdc957efbb018649b866bfb756f280f589a2) feat: send JSON logs over UDP
* [`6d44587a`](https://github.com/talos-systems/talos/commit/6d44587a4d4c16defa6bb06329cdfc6e39c95188) feat: coredns service dualstack
* [`12f7888b`](https://github.com/talos-systems/talos/commit/12f7888b75fa2498e0f8305f5d6910cecad5c65c) feat: feed control plane endpoints on workers from cluster discovery
* [`431e4fb4`](https://github.com/talos-systems/talos/commit/431e4fb4b690fa4955c407d8dd8156bdecd9a2c5) chore: bump Go and Docker dependencies
* [`89f3b9f8`](https://github.com/talos-systems/talos/commit/89f3b9f8d41e33c4cb736917f418ab5cfb9edd83) feat: update etcd to 3.5.1
* [`e60469a3`](https://github.com/talos-systems/talos/commit/e60469a38cb81ace2039bae1927eb6c5f1f0ad1f) feat: initial support for JSON logging
* [`68c420e3`](https://github.com/talos-systems/talos/commit/68c420e3c96a0fdc3b3e6cd75be24cc797c48e09) feat: enable cluster discovery by default
* [`3e100aa9`](https://github.com/talos-systems/talos/commit/3e100aa97734ea809563e23fc36e19bdd3df1920) test: workaround EventsWatch test flakiness
* [`9bd4838a`](https://github.com/talos-systems/talos/commit/9bd4838ac10abbd4760da4fb905d7639a1c26f9f) chore: stop using sonobuoy CLI
* [`6ad45951`](https://github.com/talos-systems/talos/commit/6ad45951975aac48fdcc282e5a0e31344058d07e) docs: fix field names for bonding configuration
* [`d7a3b7b5`](https://github.com/talos-systems/talos/commit/d7a3b7b5b70293884d2e19c6a59b14ebcfa24397) chore: use discovery-client and discovery-api modules
* [`d6309eed`](https://github.com/talos-systems/talos/commit/d6309eed6618abd1b4efd0e3cd18a6c0df39378f) docs: create docs for Talos 0.14
* [`c0fda643`](https://github.com/talos-systems/talos/commit/c0fda6436ae27d8bbc210ee74a1128968108f6a6) fix: attempt to clean up tasks in containerd runner
* [`8cf442da`](https://github.com/talos-systems/talos/commit/8cf442daa60d911caff59d1c2c05dd77652c8b51) chore: bump tools, pkgs, extras
* [`0dad5f4d`](https://github.com/talos-systems/talos/commit/0dad5f4d7846f3fb41ff4ba27395023d33796a61) chore: small cleanup
* [`e3e2113a`](https://github.com/talos-systems/talos/commit/e3e2113adc058940725b1041827d7adb8895c6cf) feat: upgrade CoreDNS during `upgrade-k8s` call
* [`d92c98e1`](https://github.com/talos-systems/talos/commit/d92c98e19a054472bff3e0d646756f16c5e65bbf) docs: fix discovery service documentation link
* [`e44b11c5`](https://github.com/talos-systems/talos/commit/e44b11c595e4cab796128a932843b90734ff6d1d) feat: update containerd to 1.5.7, bump Go dependencies
* [`24129307`](https://github.com/talos-systems/talos/commit/24129307a14d6e59c6bc0d3586c0c95969bde679) docs: make Talos 0.13 docs latest, update documentation
* [`31b6e39e`](https://github.com/talos-systems/talos/commit/31b6e39e58a27e1f2c1be500fca8636971bfa5c6) fix: delete expired affiliates from the discovery service
* [`877a2b6f`](https://github.com/talos-systems/talos/commit/877a2b6fc00eaa7574349f9086d78c04df163840) test: bump CAPI components to v1alpha4
* [`2ba0e0ac`](https://github.com/talos-systems/talos/commit/2ba0e0ac4ad460409101f5f2374e66698adbba4c) docs: add KubeSpan documentation
* [`997873b6`](https://github.com/talos-systems/talos/commit/997873b6d3116b59ebb46df66b8aa1cee06df92f) fix: use ECDSA-SHA512 when generating certs for Talos < 0.13
* [`7137166d`](https://github.com/talos-systems/talos/commit/7137166d1d5817e2d44ead4a01796275f92a9d4a) fix: allow overriding `audit-policy-file` in `kube-apiserver` static pod
* [`8fcd4219`](https://github.com/talos-systems/talos/commit/8fcd4219671a9359880ba344a2ec7fd65dfe5e2a) chore: fix integration-qemu-race
* [`91a858b5`](https://github.com/talos-systems/talos/commit/91a858b53704ede86392fe3c155ce9ab3c2d406f) fix: sort output of the argument builder
* [`657f7a56`](https://github.com/talos-systems/talos/commit/657f7a56b10089e0dc551e178bc85b28d8003243) fix: use ECDSA-SHA256 signature algorithm for Kubernetes certs
* [`983d2459`](https://github.com/talos-systems/talos/commit/983d2459e2aa036774828f773bbaba5697665ae7) feat: suppress logging NTP sync to the console
* [`022c7335`](https://github.com/talos-systems/talos/commit/022c7335f3063675ab744454a2ad4b2c0c19bfbc) fix: add interface route if DHCP4 router is not directly routeable
* [`66a1579e`](https://github.com/talos-systems/talos/commit/66a1579ea7d2a9c4fdf15b762cd024c54b3e8ffb) fix: don't enable 'no new privs' on the system level
* [`423861cf`](https://github.com/talos-systems/talos/commit/423861cf9f99eaf034a4f0cb243d73d1275c3f38) feat: don't drop capabilities if kexec is disabled
* [`facc8c38`](https://github.com/talos-systems/talos/commit/facc8c38a021610da900a45f397aea8ddfc74f1c) docs: fix documentation for cluster discovery
* [`ce65ca4e`](https://github.com/talos-systems/talos/commit/ce65ca4e4a2994f901f01ce5ca269d6df86f0de8) chore: build using only amd64 builders
* [`e9b0f010`](https://github.com/talos-systems/talos/commit/e9b0f010d2855b968a5d8b8b5fbcd268e06ba302) chore: update docker image in the pipeline
* [`5f277713`](https://github.com/talos-systems/talos/commit/5f277713f0f63d04f2817ec852b995dc7e681c52) chore: prepare for 0.13-beta release
* [`5e41dd4a`](https://github.com/talos-systems/talos/commit/5e41dd4a65d74544adf0a91a267df5eb9b0441fa) feat: add an option to configure kubelet node IP based on subnets
* [`72e49029`](https://github.com/talos-systems/talos/commit/72e49029e79b743811667362a6b9797fdb248553) chore: allow insecure discovery in debug builds
* [`d52befd1`](https://github.com/talos-systems/talos/commit/d52befd1acb7bd612e603cf108bb6ece89e3b5f7) fix: ignore 404 for AWS external IPs
* [`44a63e9a`](https://github.com/talos-systems/talos/commit/44a63e9a4d2b26935404e34a474c7df0651fe2ee) feat: update containerd to 1.5.6
* [`0e0fb684`](https://github.com/talos-systems/talos/commit/0e0fb68478d93bcabeccfafe055ebab38e040135) release(v0.13.0-alpha.3): prepare release
* [`4044372e`](https://github.com/talos-systems/talos/commit/4044372e12ff5308ba9cb9178a7e6b3b32955aab) feat: harvest discovered endpoints and push them via discovery svc
* [`9a51aa83`](https://github.com/talos-systems/talos/commit/9a51aa83581b25bdb0604904027a4cedf21b8123) feat: add an option to skip downed peers in KubeSpan
* [`cbbd7c68`](https://github.com/talos-systems/talos/commit/cbbd7c68219808a4f4b0d805203326019ce14ec9) feat: publish node's ExternalIPs as node addresses
* [`0f60ef6d`](https://github.com/talos-systems/talos/commit/0f60ef6d38f9f5978a19e0ca4c6729af03a11f0e) fix: reset inputs back to initial state in secrets.APIController
* [`64cb873e`](https://github.com/talos-systems/talos/commit/64cb873ec4421d43b291acb8afe75f65728d5732) feat: override static pods default args by extra Args
* [`ecdd7757`](https://github.com/talos-systems/talos/commit/ecdd7757fb5906d6fa904581efff74a16b22ae4b) test: workaround race in the tests with zaptest package
* [`9c67fde7`](https://github.com/talos-systems/talos/commit/9c67fde759de1e2a9f2b4406d85485d3d71c3d99) release(v0.13.0-alpha.2): prepare release
* [`30ae7142`](https://github.com/talos-systems/talos/commit/30ae714243379aaa3fb1e93023c2249ff3c3b4e3) feat: implement integration with Discovery Service
* [`353d632a`](https://github.com/talos-systems/talos/commit/353d632ae5d944a8662f0746ff8e757a67ffca53) feat: add nocloud platform support
* [`628fbf9b`](https://github.com/talos-systems/talos/commit/628fbf9b48d98df1063285b14958c94d246ce102) chore: update Linux to 5.10.69
* [`62acd625`](https://github.com/talos-systems/talos/commit/62acd6251637250dbea7d408d8cd4d5eb1f18713) fix: check trustd API CA on worker nodes
* [`ba27bc36`](https://github.com/talos-systems/talos/commit/ba27bc366fb3166b22f1bda909b9ede486ad8c7d) feat: implement Hetzner Cloud support for virtual (shared) IP
* [`95f440ea`](https://github.com/talos-systems/talos/commit/95f440eaa06d2a558fc828c11b451b6aed8d5855) test: add fuzz test for configloader
* [`d2cf021d`](https://github.com/talos-systems/talos/commit/d2cf021d8ffb6d6188b2d50f1f7b9c24df0aac84) chore: remove deprecated "join" term
* [`0e18e280`](https://github.com/talos-systems/talos/commit/0e18e2800fc038a86ed2fd9b042278ae29070bb5) chore: bump dependencies
* [`b450b7ce`](https://github.com/talos-systems/talos/commit/b450b7cef0d84a9ad975d8b50b93854bb0645173) chore: deprecate Interfaces and Routes APIs
* [`cddcb962`](https://github.com/talos-systems/talos/commit/cddcb9622bce7ae3626b8b9dce8c622a0e30ba66) fix: find devices without partition table
* [`b1b6d613`](https://github.com/talos-systems/talos/commit/b1b6d61365c900c4ebfc377b86067ddbe4fe8353) fix: check for existence of dhcp6 FQDN first
* [`519999b8`](https://github.com/talos-systems/talos/commit/519999b8462ff4931ed12323417b9a9c8c20b369) fix: use readonly mode when probing devices with `All` lookup
* [`2b520420`](https://github.com/talos-systems/talos/commit/2b5204200a4bd22aa78245b201c471136016ce3a) feat: enable resource API in the maintenance mode
* [`452893c2`](https://github.com/talos-systems/talos/commit/452893c260b920c601b0fc22ff018dc2d4341fca) fix: make probe open blockdevice in readonly mode
* [`96bccdd3`](https://github.com/talos-systems/talos/commit/96bccdd3b625f0edefd685cadf5f2cd46e3111f5) test: update CABPT provider to 0.3 release
* [`d9eb18bf`](https://github.com/talos-systems/talos/commit/d9eb18bfddf69a61712d930b53aec489a806394a) fix: containerd log symlink
* [`efa7f48e`](https://github.com/talos-systems/talos/commit/efa7f48e08382249609e0ecd3241c01a2e46df73) docs: quicklinks on landing page
* [`1cb9f282`](https://github.com/talos-systems/talos/commit/1cb9f282b541505f2d61ae0a57655cba9ae62843) fix: don't marshal clock with SecretsBundle
* [`b27c75b3`](https://github.com/talos-systems/talos/commit/b27c75b30f689dafa7d4effd0c2eaf8f0f3f8caf) release(v0.13.0-alpha.1): prepare release
* [`9d803d75`](https://github.com/talos-systems/talos/commit/9d803d75bfbe788fa5c2ef2ae0639de31e172c7b) chore: bump dependencies and drop firecracker support
* [`50a24104`](https://github.com/talos-systems/talos/commit/50a24104820e26bb99e66ab68be2bd9a6c17b0be) feat: add operating system version field to discovery
* [`085c61b2`](https://github.com/talos-systems/talos/commit/085c61b2ec432c586daa77464910e967a223ebe0) chore: add a special condition to check for kubeconfig readiness
* [`21cdd854`](https://github.com/talos-systems/talos/commit/21cdd854036498fbeb9f6e4d058a0edd55ed4856) fix: add node address to the list of allowed IPs (kubespan)
* [`fdd80a12`](https://github.com/talos-systems/talos/commit/fdd80a1234dc993cc01daa7764ba5a9db2fdc275) feat: add an option to continue booting on NTP timeout
* [`ef368498`](https://github.com/talos-systems/talos/commit/ef36849899b18bbb35c6116fdf35aa580a50a5e5) feat: add routes, routing rules and nftables rules for KubeSpan
* [`ed12379f`](https://github.com/talos-systems/talos/commit/ed12379f2f49fcbca84080f1066cf52dc202bd2d) fix: patch multi nodes support
* [`d943bb0e`](https://github.com/talos-systems/talos/commit/d943bb0e280e90f3592d9f7b67813b7a15818c84) feat: update Kubernetes to 1.22.2
* [`d0585fb6`](https://github.com/talos-systems/talos/commit/d0585fb6b303dfdd7fc80a76024915df31c72389) feat: reboot via kexec
* [`3de505c8`](https://github.com/talos-systems/talos/commit/3de505c894274bfd5248b6c597f6e3a53f873ba1) fix: skip bad cloud-config in OpenStack platform
* [`a394d1e2`](https://github.com/talos-systems/talos/commit/a394d1e20ba82de7d05e4d3f91823a98362ac9ee) fix: tear down control plane static pods when etcd is stopped
* [`1c05089b`](https://github.com/talos-systems/talos/commit/1c05089bb22c7c1050e95cf8d7bea8b763a0e86f) feat: implement KubeSpan manager for Wireguard peer state
* [`ec7f44ef`](https://github.com/talos-systems/talos/commit/ec7f44efe4f89e7ed207cbd5fe3748953ccfdf28) fix: completely prevent editing resources other than mc
* [`19a8ae97`](https://github.com/talos-systems/talos/commit/19a8ae97c69949f7c2421154b2ae4e52a905ff63) feat: add vultr.com cloud support
* [`0ff4c7cd`](https://github.com/talos-systems/talos/commit/0ff4c7cdb2b9505823f4c4504ec9bf4d7fddf5c5) fix: write KubernetesCACert chmodded 0400 instead of 0500
* [`a1c9d649`](https://github.com/talos-systems/talos/commit/a1c9d64907cce75bcb566f3ee394734e29b3932d) fix: update the way results are retrieved for certified conformance
* [`a0594540`](https://github.com/talos-systems/talos/commit/a0594540451a7636f8cd4bbe835913d31f66d0de) chore: build using Go 1.17
* [`7c5045bd`](https://github.com/talos-systems/talos/commit/7c5045bd929fcf5028cae3840970e692ef3bc7c9) release(v0.13.0-alpha.0): prepare release
* [`ee2dce6c`](https://github.com/talos-systems/talos/commit/ee2dce6c1a0e8838e587a9136afd1b7381000432) chore: bump dependencies
* [`ef022959`](https://github.com/talos-systems/talos/commit/ef022959280f156d6311836ef9cc2d01e5e3ae7d) fix: print etcd member ID in hex
* [`5ca1fb82`](https://github.com/talos-systems/talos/commit/5ca1fb822125483be290e79d8828bba246fda51c) fix: multiple fixes for KubeSpan and Wireguard implementation
* [`b1bd6425`](https://github.com/talos-systems/talos/commit/b1bd64250820df3fcb5214368ce9c8cf4634970a) fix: build platform images
* [`3b5f4038`](https://github.com/talos-systems/talos/commit/3b5f4038de2f855b3b634e4abb1c564da624e2fc) feat: add scaleway.com cloud support
* [`f156ab18`](https://github.com/talos-systems/talos/commit/f156ab1847f2ad1ca2a2548b299a713ee5fe0fcd) feat: add upcloud.com cloud support
* [`c3b2429c`](https://github.com/talos-systems/talos/commit/c3b2429ce91edc4f8f9e720a4b144bc941046fc3) fix: suppress spurious Kubernetes API server cert updates
* [`ff90b575`](https://github.com/talos-systems/talos/commit/ff90b5751e17a60fc6ca4274f35da7ddcca44fea) feat: implement KubeSpan peer generation controller
* [`14c69df5`](https://github.com/talos-systems/talos/commit/14c69df5063e71765b9316ae37657fda2388c60e) fix: correctly parse multiple pod/service CIDRs
* [`69897dbb`](https://github.com/talos-systems/talos/commit/69897dbba402812403c0c15d6cb8d2a771ea5a88) feat: drop some capabilities to be never available
* [`51e9836b`](https://github.com/talos-systems/talos/commit/51e9836b01926d1619d662e6e08df29210ff94e5) docs: promote 0.12 docs to be the latest
* [`812d59c7`](https://github.com/talos-systems/talos/commit/812d59c70085b54136e3b56127b0efea7ddb60af) feat: add hetzner.com cloud support
* [`d53e9e89`](https://github.com/talos-systems/talos/commit/d53e9e89633258d85c2232b85855535ebb42c417) chore: use named constants
* [`2dfe7f1f`](https://github.com/talos-systems/talos/commit/2dfe7f1fc654c8bec83b632a98dbaa8d1b90a521) chore: bump tools to the latest version
* [`82b130e7`](https://github.com/talos-systems/talos/commit/82b130e789aa4376e1f0e2d086233e630b410f74) docs: document required options for extraMounts
* [`af662210`](https://github.com/talos-systems/talos/commit/af6622109faecdf03aed43b047035904110c7580) feat: implement Kubernetes cluster discovery registry
* [`2c66e1b3`](https://github.com/talos-systems/talos/commit/2c66e1b3c5d4c34c5d4cdc155c32f2808a5f1c69) feat: provide building of local `Affiliate` structure (for the node)
* [`d69bd2af`](https://github.com/talos-systems/talos/commit/d69bd2af3e3d3bf12b6d74078e9eedf3dc8752fc) chore: enable GPG identity check for Talos
* [`8dbd851f`](https://github.com/talos-systems/talos/commit/8dbd851fde3febb5999df694a079121b43519aa9) chore: update tools/pkgs/extras to the new version
* [`0b347570`](https://github.com/talos-systems/talos/commit/0b347570a7aca0a133d6b6e6cc8d3e0355630480) feat: use dynamic NodeAddresses/HostnameStatus in Kubernetes certs
* [`bd5b9c96`](https://github.com/talos-systems/talos/commit/bd5b9c96e2563249a5633433703493b292b83ee9) fix: correctly define example for `extraMounts`
* [`01cca099`](https://github.com/talos-systems/talos/commit/01cca099f40ec75d1e047a84c89692eb254e8adf) docs: update docs for Talos 0.12 release
* [`668627d5`](https://github.com/talos-systems/talos/commit/668627d5b8ec79ec955eb1254732b1cc031d3aec) feat: add subnet filter for etcd address
* [`3c3c281b`](https://github.com/talos-systems/talos/commit/3c3c281bff8481f680feca9cf01af413a38e6973) chore: bump dependencies via dependabot
* [`f8bebba2`](https://github.com/talos-systems/talos/commit/f8bebba2de3999b7a36fecb2d6b90e583372c98f) fix: ignore error on duplicate for `MountStatus`
* [`6956edd0`](https://github.com/talos-systems/talos/commit/6956edd0bfae6c6c5d6eba00a22bc3a4cb7f54ea) feat: add node address filters, filter out k8s addresses for Talos API
* [`caee24bf`](https://github.com/talos-systems/talos/commit/caee24bf61136daecb095991a6e439f7fbf40da2) feat: implement KubeSpan identity controller
* [`da0f6e7e`](https://github.com/talos-systems/talos/commit/da0f6e7e1d295dce0c44c1854363528a6ffedde1) fix: allow updating diskSelector option
* [`761ccaf3`](https://github.com/talos-systems/talos/commit/761ccaf32348d8664eb0d5d1a51f6abb19ca52a6) feat: provide machine configuration for KubeSpan and cluster discovery
* [`a81e30cb`](https://github.com/talos-systems/talos/commit/a81e30cb46326fbdd433f37dc37549b588a2bc7a) docs: add bootstrap command to VMware docs
* [`97da354c`](https://github.com/talos-systems/talos/commit/97da354cc0e4a965e14b8939c426150d5c12f228) fix: do not panic on invalid machine configs
* [`c4048e26`](https://github.com/talos-systems/talos/commit/c4048e263d22682142f12fc4af6ac58c679273f0) fix: don't extract nil IPs in the GCP platform
* [`ba169c6f`](https://github.com/talos-systems/talos/commit/ba169c6f91948cf057251236fa7a727a05253639) feat: provide talosctl.exe for Windows
* [`6312f473`](https://github.com/talos-systems/talos/commit/6312f473e63df50287e6801c079242e2311a23e6) fix: properly handle omitempty fields in the validator
* [`7f22879a`](https://github.com/talos-systems/talos/commit/7f22879af0882af4cdebe9c84afb96ae68eb9f20) feat: provide random node identity
* [`032e7c6b`](https://github.com/talos-systems/talos/commit/032e7c6b863b5ca02cfa16df79c88950544dbffb) chore: import yaml.v3 consistently
* [`80b5f0e7`](https://github.com/talos-systems/talos/commit/80b5f0e7f78f09a11ed249f9f1dc7b05ea275ab0) fix: validate IP address returned as HTTP response in platform code
* [`c9af8f7f`](https://github.com/talos-systems/talos/commit/c9af8f7ff17facc18f10675879ed04982a000f6f) docs: fork docs for 0.13
* [`85cda1b9`](https://github.com/talos-systems/talos/commit/85cda1b956b042ba20696637248999d46f63ccc9) feat: provide MountStatus resource for system partition mounts
* [`950f122c`](https://github.com/talos-systems/talos/commit/950f122c95e225858e77083f2490481ed8d21aef) chore: update versions in upgrade tests
* [`83fdb772`](https://github.com/talos-systems/talos/commit/83fdb7721f45aa075898caf05a4b6856d3c5f330) feat: provide first NIC hardware addr as a resource
* [`5f5ac12f`](https://github.com/talos-systems/talos/commit/5f5ac12f1dc8aeb3a8598e57d965471e93fe3724) fix: properly case the VMware name
* [`0a6048f4`](https://github.com/talos-systems/talos/commit/0a6048f469da02efad7e84eb237e6fdeb85b7e33) fix: don't allow bootstrap if etcd data directory is not empty
* [`e24b93b4`](https://github.com/talos-systems/talos/commit/e24b93b4e120448f37109599f3e9eb15954b147a) fix: cgroup delegate
* [`751f64f9`](https://github.com/talos-systems/talos/commit/751f64f9bc10e9ad8508ade9e3a6a14aaaa54d57) docs: add release notes for 0.12, support matrix
* [`57a77696`](https://github.com/talos-systems/talos/commit/57a77696ef2b255a59ee4ed213a1a3971a5e2943) feat: update Kubernetes to 1.22.1
* [`244b08cc`](https://github.com/talos-systems/talos/commit/244b08cc198a8ba676bb9acadcbdd23a161b0876) chore: bump dependencies
* [`576ba195`](https://github.com/talos-systems/talos/commit/576ba195784abf275256c861d5f811ab1f7b1102) fix: do not set KSPP kernel params in container mode
* [`b8c92ede`](https://github.com/talos-systems/talos/commit/b8c92ede52ed515dba68abf4fb1cc6494d510827) fix: don't support cgroups nesting in process runner
* [`9bb0b797`](https://github.com/talos-systems/talos/commit/9bb0b79709a502ab49ea9bacd7e54617554d4cc3) test: adapt tests to the cgroupsv2
* [`1abc12be`](https://github.com/talos-systems/talos/commit/1abc12be13208ad1da03492a1b88d2c1ec0d5d33) fix: extramount should have `yaml:",inline"` tag
* [`2b614e43`](https://github.com/talos-systems/talos/commit/2b614e430e478cc111db018996ab2c8f763e4f92) feat: check if cluster has deprecated resources versions
* [`0b86edab`](https://github.com/talos-systems/talos/commit/0b86edab80cf4dd01f330d7721b130f5017d84a5) fix: don't panic if the machine config doesn't have network (EM)
* [`8bef41e4`](https://github.com/talos-systems/talos/commit/8bef41e4bacc4190976657ae5021afecd2d6e001) fix: make sure file mode is same (reproducibility issue)
* [`fcfca55a`](https://github.com/talos-systems/talos/commit/fcfca55a059e92fcda198baa321c4c63bda1f0a4) chore: do not check that go mod tidy gives empty output
* [`5ce92ca5`](https://github.com/talos-systems/talos/commit/5ce92ca5163616fcd7abe16c4efc3a100953b246) docs: ensure azure VMs are 0 indexed
* [`c601dc73`](https://github.com/talos-systems/talos/commit/c601dc73f6d08c031afaf4193c2fe5740b9f29c5) chore: update versions to final release tags
* [`82731124`](https://github.com/talos-systems/talos/commit/82731124b2c7ce08e740fbcd350abaceeb08b103) chore: run e2e-qemu test against Talos with race-detector enabled
* [`37ea2c9c`](https://github.com/talos-systems/talos/commit/37ea2c9ca240c92f93c61ca640e9b4bb27bf91ec) feat: support for route source addresses in the configuration
* [`0ef8f83a`](https://github.com/talos-systems/talos/commit/0ef8f83acfa509700b241e86ebdaf79b5b9a517d) chore: bump dependencies via dependabot
* [`2108fd7b`](https://github.com/talos-systems/talos/commit/2108fd7b6c90c4266518a0c28398f9b74a53968b) feat: update Linux to 5.10.58 and many pkgs updates
* [`6ee690d9`](https://github.com/talos-systems/talos/commit/6ee690d9a778c559b5cc528147bb0db5e808914e) release(v0.12.0-alpha.1): prepare release
* [`1ed5e545`](https://github.com/talos-systems/talos/commit/1ed5e545385e160fe3b61e6dbbcaa8a701437b62) feat: add ClusterID and ClusterSecret
* [`228b3761`](https://github.com/talos-systems/talos/commit/228b376163597cd825e4a142e6b4bdea0f870365) chore: run etcd as non-root user
* [`3518219b`](https://github.com/talos-systems/talos/commit/3518219bff44f71a60ad8e448e518844d1b933fd) chore: drop deprecated `--no-reboot` param and KernelCurrentRoot const
* [`33d1c3e4`](https://github.com/talos-systems/talos/commit/33d1c3e42582649f25a44fc3c86007bcebbc80b3) chore: run apid and trustd services as non-root user
* [`dadaa65d`](https://github.com/talos-systems/talos/commit/dadaa65d542171d25317840fcf35fa3979cf0632) feat: print uid/gid for the files in `ls -l`
* [`e6fa401b`](https://github.com/talos-systems/talos/commit/e6fa401b663d0ebd4374c9e47a7ca6150a4756cd) fix: enable seccomp default profile by default
* [`8ddbcc96`](https://github.com/talos-systems/talos/commit/8ddbcc9643113c15de538fc070b7053d1c6efdfc) feat: validate if extra fields present in the decoder
* [`5b57a980`](https://github.com/talos-systems/talos/commit/5b57a98008c64d7cb07729fd9b31a0e3493c289c) chore: update Go to 1.16.7, Linux to 5.10.57
* [`eefe1c21`](https://github.com/talos-systems/talos/commit/eefe1c21c30fa2cd281fc5524b2e88553f6fdfcc) feat: add new etcd members in learner mode
* [`b1c66fba`](https://github.com/talos-systems/talos/commit/b1c66fbad113400729cf4db806e30192bf7e0462) feat: implement Equinix Metal support for virtual (shared) IP
* [`62242f97`](https://github.com/talos-systems/talos/commit/62242f979e1921ed8abfa06a26564ea0bf8a5fb3) chore: require GPG signatures
* [`faecae44`](https://github.com/talos-systems/talos/commit/faecae44fde60fc626ccb01da3b221519a9d41d7) feat: make ISO builds reproducible
* [`887c2326`](https://github.com/talos-systems/talos/commit/887c2326a4f81c846e3aa3bd1787bc840877e494) release(v0.12.0-alpha.0): prepare release
* [`a15f0184`](https://github.com/talos-systems/talos/commit/a15f01844fdaf0d3e2dad2750d9353d03e18dea2) fix: move etcd PKI under /system/secrets
* [`eb02afe1`](https://github.com/talos-systems/talos/commit/eb02afe18be63bf483a0467f655611561aef10f6) fix: match correctly routes on the address family
* [`cb948acc`](https://github.com/talos-systems/talos/commit/cb948accfeca13c57b3b512dc8a06425989294f9) feat: allow multiple addresses per interface
* [`e030b2e8`](https://github.com/talos-systems/talos/commit/e030b2e8bb0a65abf4e1f7b5f27348631210ebc4) chore: use k8s 1.21.3 in CAPI tests for now
* [`e08b4f8f`](https://github.com/talos-systems/talos/commit/e08b4f8f9e72f8db1116b4bbe395d49b4bccb460) feat: implement sysctl controllers
* [`fdf6b243`](https://github.com/talos-systems/talos/commit/fdf6b2433c40613bcb039852a96196dbe9b7b5e2) chore: revert "improve artifacts generation reproducibility"
* [`b68ed1eb`](https://github.com/talos-systems/talos/commit/b68ed1eb896039ec1319db2e3d6d364034c86863) fix: make route resources ID match closer routing table primary key
* [`585f6337`](https://github.com/talos-systems/talos/commit/585f633710abb7a6d863b54c37aa65c50a3c7312) fix: correctly handle nodoc for struct fields
* [`f2d394dc`](https://github.com/talos-systems/talos/commit/f2d394dc42f9ec704050db0a8a928a889483ce3e) docs: add AMIs for v0.11.5
* [`d0970cbf`](https://github.com/talos-systems/talos/commit/d0970cbfd696b28b201b232a03da2119f664afbd) feat: bootstrap token limit
* [`5285a46d`](https://github.com/talos-systems/talos/commit/5285a46d78ef2fc76594aad4ad4acb75312bc0a7) fix: maintenance mode reason message
* [`009d15e8`](https://github.com/talos-systems/talos/commit/009d15e8dc6e75eca6b5963dddf8063941099f14) chore: use etcd client TryLock function on upgrade
* [`4dae9ea5`](https://github.com/talos-systems/talos/commit/4dae9ea55c087c28a9d7a8d241e0ec3a7a1b8ca3) chore: use vtprotobuf compiled marshaling in Talos API
* [`7ca5749a`](https://github.com/talos-systems/talos/commit/7ca5749ad4267701ce639d0f0d91c10a7f9c1d3d) chore: bump dependencies via dependabot
* [`b2507b41`](https://github.com/talos-systems/talos/commit/b2507b41d250b989b9c13ad23e16202cd53a18d2) chore: improve artifacts generation reproducibility
* [`1f7dad23`](https://github.com/talos-systems/talos/commit/1f7dad234b480c7a5e3484ccf10180747c979036) chore: update PKGS version (512 cpus, new ca-certficates)
* [`1a2e78a2`](https://github.com/talos-systems/talos/commit/1a2e78a24e997241c4cd18dfac3c2d971ba78116) fix: update go-blockdevice
* [`6d6ed117`](https://github.com/talos-systems/talos/commit/6d6ed1170f3f28e7f559ccdf64e7c34dfee022a0) chore: use parallel xz with higher compression level
* [`571f7db1`](https://github.com/talos-systems/talos/commit/571f7db1bb44a0dcb5e373f9c37396d50eb0e8f4) chore: workaround GitHub new release notes limit
* [`09d70b7e`](https://github.com/talos-systems/talos/commit/09d70b7eafb18343eb4ca57d7f8b84e4ccd2fcfb) feat: update Kubernetes to v1.22.0
* [`f25f10e7`](https://github.com/talos-systems/talos/commit/f25f10e73ec534acd7cc483f254d612d8a7c1858) feat: add an option to disable PSP
* [`7c6e4cf2`](https://github.com/talos-systems/talos/commit/7c6e4cf230ba1f30da664374c41c934d1e6620bc) feat: allow both DHCP and static addressing for the interface
* [`3c566dbc`](https://github.com/talos-systems/talos/commit/3c566dbc30595467a3789707c6e993aa92f36df6) fix: remove admission plugins enabled by default from the list
* [`69ead373`](https://github.com/talos-systems/talos/commit/69ead37353b7e3aa7f089c70073037a6eba37767) fix: preserve PMBR bootable flag correctly
* [`dee63051`](https://github.com/talos-systems/talos/commit/dee63051702d49f495bfb28b4be74ed8b39143ad) fix: align partitions with minimal I/O size
* [`62890229`](https://github.com/talos-systems/talos/commit/628902297d2efe93e6388377b2ea6d4beda83095) feat: update GRUB to 2.06
* [`b9d04928`](https://github.com/talos-systems/talos/commit/b9d04928d960f9d576671c6f3511cf242ff31cb7) feat: move system processes to cgroups
* [`0b8681b4`](https://github.com/talos-systems/talos/commit/0b8681b4b49ab109b8863792d48c2f551d1ceeb5) fix: resolve several issues with Wireguard link specs
* [`f8f4bf3b`](https://github.com/talos-systems/talos/commit/f8f4bf3baef31d4ac957ec68cd869adea1e931cd) docs: add disk encryptions examples
* [`79b8fa64`](https://github.com/talos-systems/talos/commit/79b8fa64b9453917860faae3df5d14647186b9ba) feat: update containerd to 1.5.5
* [`539f4209`](https://github.com/talos-systems/talos/commit/539f42090e436921a23087296cde6eaf7e495b5e) chore: bump dependencies via dependabot
* [`0c7ce1cd`](https://github.com/talos-systems/talos/commit/0c7ce1cd814354213a1a6c7a9251b166ee58c493) feat: remove remnants of bootkube support
* [`d4f9804f`](https://github.com/talos-systems/talos/commit/d4f9804f8659562f6152ae73cb1788f6f6d6ad89) chore: fix typos
* [`5f027615`](https://github.com/talos-systems/talos/commit/5f027615ffac68e0a484a5da4827a6589bae3880) feat: expose more encryption options to the machine config
* [`585152a0`](https://github.com/talos-systems/talos/commit/585152a0be051accd4cb8b7c2f130c5a92dfd32d) chore: bump dependencies
* [`fc66ec59`](https://github.com/talos-systems/talos/commit/fc66ec59691fb1b9d00b27e1f7b34c870a09d717) feat: set oom score for main processes
* [`df54584a`](https://github.com/talos-systems/talos/commit/df54584a33d88de13deadcb87a5cfa9c1f9b3961) fix: drop linux capabilities
* [`f65d0b73`](https://github.com/talos-systems/talos/commit/f65d0b739bd36a57979f9bf26c3092ac544e607c) docs: add 0.11.3 AMIs
* [`7332d636`](https://github.com/talos-systems/talos/commit/7332d63695074dd5eef35ad545d48aff857fbde8) fix: bump pkgs for new kernel 5.10.52
</p>
</details>

### Dependency Changes

* **github.com/cosi-project/runtime**               25f235cd0682 -> 264f8fcd1a4f
* **github.com/pkg/errors**                         v0.9.1 **_new_**
* **github.com/spf13/cobra**                        v1.2.1 -> v1.3.0
* **github.com/talos-systems/capi-utils**           e994250edede **_new_**
* **github.com/talos-systems/go-retry**             v0.3.1 **_new_**
* **github.com/talos-systems/talos**                70d2505b7c88 -> v1.0.0-beta.1
* **github.com/talos-systems/talos/pkg/machinery**  2e463348b26f -> v1.0.0-beta.1
* **go.uber.org/zap**                               v1.18.1 -> v1.21.0
* **golang.org/x/oauth2**                           a8dc77f794b6 -> d3ed0bb246c8
* **google.golang.org/grpc**                        v1.39.0 -> v1.44.0
* **k8s.io/api**                                    v0.21.3 -> v0.23.4
* **k8s.io/apiextensions-apiserver**                v0.19.1 -> v0.23.0
* **k8s.io/apimachinery**                           v0.21.3 -> v0.23.4
* **k8s.io/client-go**                              v0.21.3 -> v0.23.4
* **sigs.k8s.io/cluster-api**                       v0.3.20 -> v1.1.2
* **sigs.k8s.io/controller-runtime**                v0.6.3 -> v0.11.1

Previous release can be found at [v0.1.1](https://github.com/siderolabs/theila/releases/tag/v0.1.1)

## [theila 0.2.0-alpha.0](https://github.com/siderolabs/theila/releases/tag/v0.2.0-alpha.0) (2022-03-24)

Welcome to the v0.2.0-alpha.0 release of theila!  
*This is a pre-release of theila*



Please try out the release binaries and report any issues at
https://github.com/siderolabs/theila/issues.

### The New UI

Sidero UI is getting the next iteration of the design.
The color scheme was aligned to the new Sidero company color scheme.

Main changes UX-wise:
- all clusters are now placed in the context dropdown: both kubeconfig clusters and CAPI clusters.
- now it is possible to see Kubernetes upgrades history (dropped after theila restart as of now).
- pod information has got more details.
- servers list is now also available for CAPI clusters.
- now the UI provides summary page for cluster resources usage.


### Contributors

* Andrey Smirnov
* Artem Chernyshev
* Alexey Palazhchenko
* Serge Logvinov
* Noel Georgi
* Andrey Smirnov
* Spencer Smith
* Seán C McCord
* evgeniybryzh
* Andrew Rynhard
* Artem Chernyshev
* Steve Francis
* Alexey Palazhchenko
* Florian Klink
* Nico Berlee
* Rui Lopes
* Spencer Smith
* Andrey Smirnov
* Bernard Sébastien
* Branden Cash
* Charlie Haley
* Eric Wohltman
* Jori Huisman
* Lennard Klein
* Matt Layher
* Michael Fornaro
* Niklas Metje
* Olli Janatuinen
* Philipp Sauter
* Rohit Dandamudi
* Shahar Naveh
* Tim Jones
* Utku Ozdemir
* Volodymyr Mazurets
* nebulait

### Changes
<details><summary>34 commits</summary>
<p>

* [`b737fc9`](https://github.com/siderolabs/theila/commit/b737fc99db219161c42ce8d69f8c81ed95c10542) release(v0.2.0-alpha.0): prepare release
* [`53878ee`](https://github.com/siderolabs/theila/commit/53878eea09c18f2bc0dd55ca11a6743587748319) fix: properly update servers menu item when the context is changed
* [`b4cb9c7`](https://github.com/siderolabs/theila/commit/b4cb9c7989ec5299785b86acb3fa0ee648efd259) feat: restyle TMonitor page
* [`f0377e2`](https://github.com/siderolabs/theila/commit/f0377e2ad5da702af71f2706141f4d7c638c7a15) fix: invert chart value for cpu, storage and memory on the overview page
* [`6ea6ecf`](https://github.com/siderolabs/theila/commit/6ea6ecf12c4d8b5253b4dfc2e64f5b5d787d022a) fix: update capi-utils to fix talosconfig requests for CAPI clusters
* [`e3796d3`](https://github.com/siderolabs/theila/commit/e3796d3876d33248fd0998901273a14d29a487a3) chore: update capi-utils
* [`39186eb`](https://github.com/siderolabs/theila/commit/39186ebe50da531f35d21ac2488f8a58c1ef8e78) feat: implement overview page, cluster dropdown, ongoing tasks
* [`59f2b27`](https://github.com/siderolabs/theila/commit/59f2b27be4d7f5a591fdeae533d649494356250d) docs: update README.md
* [`2b7831f`](https://github.com/siderolabs/theila/commit/2b7831f2d22106ac8a82f890d73c2705841b0739) feat: add Kubernetes and Servers pages
* [`4451a5b`](https://github.com/siderolabs/theila/commit/4451a5bc9f5c6b058c6bcf1252b7c83a001cafbe) fix: properly set TaskStatus namespace in the initial call
* [`4545464`](https://github.com/siderolabs/theila/commit/454546425f2fd7e4418aa8a03465f3a062de804e) fix: add new fields to the TaskStatus spec, update Talos
* [`891cf3b`](https://github.com/siderolabs/theila/commit/891cf3b79c8430deeed8a168955afd6e97083baa) docs: describe client context types, usage
* [`309b515`](https://github.com/siderolabs/theila/commit/309b51545ead2ee144244591df2e5ead2849fb11) feat: update k8s upgrades tasks structure for the new UI representation
* [`5aa8ca2`](https://github.com/siderolabs/theila/commit/5aa8ca24bd3159879c46c8e8a134702b174e3362) feat: add NodesPage
* [`db434e0`](https://github.com/siderolabs/theila/commit/db434e07b9f23562bd746a0f78e3868b079006e2) feat: add TPagination component
* [`0b51727`](https://github.com/siderolabs/theila/commit/0b51727efed31f13f52fa20b360071e7e2a6d9eb) feat: add Pods, Dashboard, Upgrade views, etc
* [`c549b8b`](https://github.com/siderolabs/theila/commit/c549b8b9ee8a563f14b2e791f91a7b3cb0430aa7) feat: add Overview and Upgrade Kubernetes pages
* [`cec2e85`](https://github.com/siderolabs/theila/commit/cec2e854f4f3999109220902bccaee6c25d1f502) chore: define constants for all used resource types
* [`962bdaf`](https://github.com/siderolabs/theila/commit/962bdaf6406ab8e5febea0ad8d32da9c86fa39e7) feat: add TSideBar
* [`fa28ccb`](https://github.com/siderolabs/theila/commit/fa28ccb67f52c1dd9096b23388427d78be526275) feat: add TheHeader component
* [`f3418a5`](https://github.com/siderolabs/theila/commit/f3418a59e38e551bd0be7cc7ae66ef4645719aa7) feat: button;icons;config
* [`db30f50`](https://github.com/siderolabs/theila/commit/db30f503730bdbd8ed359d4070dea0214df67fcd) fix: add `frontend/node_modules` to gitignore
* [`a675b86`](https://github.com/siderolabs/theila/commit/a675b86f7d55cecd4ae1277cbf057a6bc264940c) fix: properly pass label selector to the metadata in ClusterListItem
* [`7911d6a`](https://github.com/siderolabs/theila/commit/7911d6a31abdb51e86586a025b705ddfeb1dd19e) chore: add ability to start local development server for the frontend
* [`076fee1`](https://github.com/siderolabs/theila/commit/076fee10c6583dc49e6530b02cab1f757da0e853) feat: use CAPI utils for CAPI requests
* [`5ed5ba2`](https://github.com/siderolabs/theila/commit/5ed5ba2a122585a97cf65c3ff081126752cd26fa) fix: more websocket client bugfixes
* [`6fe22ad`](https://github.com/siderolabs/theila/commit/6fe22ad370026380ba75b38e261870addc341e6f) fix: reset reconnect timeouts after the client is reconnected
* [`c4b144a`](https://github.com/siderolabs/theila/commit/c4b144af272a46dbdc8d1bb35784e09ba1b79987) fix: talosconfig/kubeconfig when using the default context
* [`b439a37`](https://github.com/siderolabs/theila/commit/b439a371c13a8d46d986a1dae3d6f4b7cba4a298) fix: properly handle Same-Origin header in websockets
* [`ffffed1`](https://github.com/siderolabs/theila/commit/ffffed100cec18209bae723b9919eb8613950649) fix: read node name from nodename resource instead of hostname
* [`2d6f984`](https://github.com/siderolabs/theila/commit/2d6f9844440a6d18b3093dea6228ac6a237dc86b) fix: use secure websockets if the page itself is using https
* [`799f2d2`](https://github.com/siderolabs/theila/commit/799f2d2d00762d5270dd4a3f4b4b312b32dbb7dd) feat: rework the node overview page
* [`0d0eaf4`](https://github.com/siderolabs/theila/commit/0d0eaf4b2721dfa1b04bce24e4a1e476579e3a74) fix: make charts height resize depending on the screen height
* [`7de0101`](https://github.com/siderolabs/theila/commit/7de0101bf0e613653caadd5733db0e29a6bb5bfb) fix: use polyfill to fix streaming APIs on Firefox
</p>
</details>

### Changes from talos-systems/capi-utils
<details><summary>26 commits</summary>
<p>

* [`e994250`](https://github.com/talos-systems/capi-utils/commit/e994250edede51ab1f1cac0d3f539fcaf6aae655) fix: use correct name for getting talosconfig secret
* [`3a6f8ee`](https://github.com/talos-systems/capi-utils/commit/3a6f8ee7b753e120c965992fad91cc10e11f4f9a) feat: read talosconfig from secret instead of status
* [`dc4a2f3`](https://github.com/talos-systems/capi-utils/commit/dc4a2f30b9e928961d0f69975f2dcaa5976dd048) chore: update libs, rekres, update Go version (#25)
* [`e8c3bf9`](https://github.com/talos-systems/capi-utils/commit/e8c3bf93e75fd46232ed6ac7df2cc7d0ad3cc8b3) feat: pass through an option to wait for providers to be set up
* [`144451c`](https://github.com/talos-systems/capi-utils/commit/144451cdef39bf6aed0cf1395ff69f9ce0496243) feat: switch to CAPI v1beta1
* [`151aac2`](https://github.com/talos-systems/capi-utils/commit/151aac243655ecf5ac82fde99db1d11795f4c14c) fix: properly define calico version
* [`658f48a`](https://github.com/talos-systems/capi-utils/commit/658f48a2034f991278ba7eeebccb3519dc1ee30a) feat: support getting cluster template files by http urls
* [`e0cadf5`](https://github.com/talos-systems/capi-utils/commit/e0cadf51e3dec7f7af7acfc533233365e01860a1) feat: add method to fetch a k8s client
* [`b018ea2`](https://github.com/talos-systems/capi-utils/commit/b018ea29c13a09ae2fdb2a071c5b7c8bd626bb50) feat: add ability to pass custom `Proxy` implementation in clusterapi
* [`b2f8f83`](https://github.com/talos-systems/capi-utils/commit/b2f8f83d3df6a7cd0308ae724d7423280c6924a8) feat: update cluster API library to the latest version
* [`f2a34fd`](https://github.com/talos-systems/capi-utils/commit/f2a34fdddec066097e346c144bb8660398a5e69d) chore: do not rely on ENV variables to configure CAPI client
* [`9587089`](https://github.com/talos-systems/capi-utils/commit/9587089e8425e11ef34d00c33b38b1d3c1710b42) feat: add API method to get CAPI version
* [`3053852`](https://github.com/talos-systems/capi-utils/commit/3053852b107c9dd0a82340accc98b798abd6160c) chore: update go mod to remove requires
* [`2e0c2fe`](https://github.com/talos-systems/capi-utils/commit/2e0c2fe20b78c10d8af6f62662063ae2c41124c9) feat: allow for specifying namespace in infra providers
* [`e5fdc2a`](https://github.com/talos-systems/capi-utils/commit/e5fdc2a068ac8bfed8effdd33e717aa3f97a62a9) feat: enable builds of darwin/windows
* [`028c7d3`](https://github.com/talos-systems/capi-utils/commit/028c7d3c025764260fb37ae5618c59122027640d) fix: call sync until number of replicas != actual replicas
* [`0fbad9a`](https://github.com/talos-systems/capi-utils/commit/0fbad9a4d06661e7fc8816d98663a349f4bde936) fix: sync talos config and nodes list after scaling
* [`c1830ba`](https://github.com/talos-systems/capi-utils/commit/c1830ba4aada30e9b968b456620526bf35c73190) feat: support scaling cluster nodes up and down
* [`5e78193`](https://github.com/talos-systems/capi-utils/commit/5e78193aff23909ec8516fad8a02f077d57d5ad5) feat: add ability to detect CAPI version and installed infra providers
* [`c20b1a8`](https://github.com/talos-systems/capi-utils/commit/c20b1a80b4277c1729d0b5d4972aa2794203e83c) fix: do CAPI init once if several infra providers are defined
* [`83353b6`](https://github.com/talos-systems/capi-utils/commit/83353b6b16d0ebc813ac43f45f2a18a1f451e016) fix: remove lots of unused indirect dependencies
* [`9a6b78a`](https://github.com/talos-systems/capi-utils/commit/9a6b78a78edbbcb662f349ede1d66c0b1326a4d0) chore: move provider creation code to the common method
* [`c2adaee`](https://github.com/talos-systems/capi-utils/commit/c2adaee0629a0b73565a0a67ccb4b393c32f6063) feat: add `DestroyCluster` function
* [`81aabe0`](https://github.com/talos-systems/capi-utils/commit/81aabe04803fa529ce73c2dbf49dc3f83394c66d) feat: support bootstrapping AWS clusters
* [`64a30e7`](https://github.com/talos-systems/capi-utils/commit/64a30e7fcd5f6fc488f70b8f8b08548a1a959199) feat: add the code for bootstrapping CAPI using kubeconfig
* [`6f52762`](https://github.com/talos-systems/capi-utils/commit/6f527622e0ae356ddbc59622bd673a8071650304) Initial commit
</p>
</details>

### Changes from talos-systems/go-retry
<details><summary>8 commits</summary>
<p>

* [`c78cc95`](https://github.com/talos-systems/go-retry/commit/c78cc953d9e95992575305b4e8648392c6c9b9e6) fix: implement `errors.Is` for all errors in the set
* [`7885e16`](https://github.com/talos-systems/go-retry/commit/7885e16b2cb0267bcc8b07cdd0eced14e8005864) feat: add ExpectedErrorf
* [`3d83f61`](https://github.com/talos-systems/go-retry/commit/3d83f6126c1a3a238d1d1d59bfb6273e4087bdac) feat: deprecate UnexpectedError
* [`b9dc1a9`](https://github.com/talos-systems/go-retry/commit/b9dc1a990133dd3399549b4ea199759bdfe58bb8) feat: add support for `context.Context` in Retry
* [`8c63d29`](https://github.com/talos-systems/go-retry/commit/8c63d290a6884095ea2e754c52e575603abe4bc0) fix: correctly implement error interfaces on wrapped errors
* [`752f081`](https://github.com/talos-systems/go-retry/commit/752f081252cfef6106151dc285fcbe4849ab0a0c) feat: add an option to log errors being retried
* [`073067b`](https://github.com/talos-systems/go-retry/commit/073067bd95a70e9b0a2a8d07d33311be69c24923) feat: copy initial version from talos-systems/talos
* [`c7968c5`](https://github.com/talos-systems/go-retry/commit/c7968c54b4b1743d14dedce51431bf6e79a67a4f) Initial commit
</p>
</details>

### Changes from talos-systems/talos
<details><summary>521 commits</summary>
<p>

* [`602e049d`](https://github.com/talos-systems/talos/commit/602e049d996478f1b58d8b0d4be49d9d89811712) release(v1.0.0-beta.1): prepare release
* [`06647da3`](https://github.com/talos-systems/talos/commit/06647da34c04c29e49d081095abfa4efc0af39a4) chore: fix equinixMetal platform name
* [`7e31e7d8`](https://github.com/talos-systems/talos/commit/7e31e7d8f92c8ae02461149cb2dc28b968e8696c) feat: bump boot partition size to 1000 MiB
* [`83d7aebe`](https://github.com/talos-systems/talos/commit/83d7aebe18f7643197414a948daf3ac179f0df83) fix: check for IPv6 before applying accept_ra
* [`d785204a`](https://github.com/talos-systems/talos/commit/d785204aa29e1950217abf0eae68d476f3c24953) chore: disable one commit per PR
* [`f7ad1b98`](https://github.com/talos-systems/talos/commit/f7ad1b98206429ce179adc69de21d59bbbff7fcf) release(v1.0.0-beta.0): prepare release
* [`0aa23cb3`](https://github.com/talos-systems/talos/commit/0aa23cb3271d9ee852a6ba607a9efa28d24f35b3) feat: update pkgs to 1.0 versions, Go 1.17.8
* [`dc8e9ed4`](https://github.com/talos-systems/talos/commit/dc8e9ed4a5662a9e214e79ee480bdcecdb366996) feat: bond interfaces from kernel cmdline
* [`947c77b6`](https://github.com/talos-systems/talos/commit/947c77b60c355136b23d054b3327c786449f5e87) docs: update cilium inline install
* [`65447200`](https://github.com/talos-systems/talos/commit/65447200545562b574bdb36ed4fd194c38b9511a) chore: update talos-systems modules to released version
* [`77158a61`](https://github.com/talos-systems/talos/commit/77158a61fd3c93b1c3cc60628fa4d87588667a06) chore: rename v0.15 to v1.0
* [`22a4d6b3`](https://github.com/talos-systems/talos/commit/22a4d6b3e67c81ab2241517924c199be636e9987) feat: update containerd to 1.6.1
* [`a50747a6`](https://github.com/talos-systems/talos/commit/a50747a64acaa216c2242807ff9a883bee5934e7) fix: align list and diskusage command flags with their Linux analogs
* [`d29e9202`](https://github.com/talos-systems/talos/commit/d29e9202f3e3cf5a320338a3845a8ccb8881b954) chore: remove iSCSI packages from the rootfs image
* [`09efa62f`](https://github.com/talos-systems/talos/commit/09efa62f68f4ea7f2bf3b1c90a2914de8af5a62d) chore: re-enable kexec and default to UEFI booting in tests
* [`8975a56e`](https://github.com/talos-systems/talos/commit/8975a56eb275727b5f9e16a560aaacfe9f97856d) docs: fix typo in release notes
* [`61461de6`](https://github.com/talos-systems/talos/commit/61461de634488d4536eababc9a6e8c1f9ec9f465) feat: define resource reservation
* [`7ddc7f60`](https://github.com/talos-systems/talos/commit/7ddc7f605327d1d0dd58d10c7c1089fbd350a7a7) feat: support specifying env vars for control plane pods
* [`7c1924a3`](https://github.com/talos-systems/talos/commit/7c1924a3aebf0a430169b3c53ab69db14a2387cc) docs: update cilium docs
* [`7b33ffbd`](https://github.com/talos-systems/talos/commit/7b33ffbd8558e92d6fcc5986d5985ac2560c261b) chore: update pkgs and extras
* [`c5992c2b`](https://github.com/talos-systems/talos/commit/c5992c2bf84bfe4b9f14ccde705aa57119d4ec64) chore: bump dependencies
* [`de69ab79`](https://github.com/talos-systems/talos/commit/de69ab79025994fdfbc98b8a5bc454bb8fccbd36) fix: scaleway network config
* [`f81fb9f7`](https://github.com/talos-systems/talos/commit/f81fb9f7cf2dc1f66915e0bc2c3f3a9c1014767e) feat: implement sysfs
* [`79d9720a`](https://github.com/talos-systems/talos/commit/79d9720a35d9b2f36bf5d63d34becd0caa0aa434) fix: set route to metaserver for scaleway platform
* [`eb40b925`](https://github.com/talos-systems/talos/commit/eb40b9254f4cce4db86bc49c5dfa67f3feffbdaa) feat: add a way to override kubelet configuration via machine config
* [`dc237154`](https://github.com/talos-systems/talos/commit/dc237154783cff1ea9656529e165902d45f5902c) chore: update packet to equinix
* [`7917b1ac`](https://github.com/talos-systems/talos/commit/7917b1aca0bd8b0d3c8cd303427c95efd6f1d7e3) feat: support admission control configuration and Pod Security admission
* [`45feb72a`](https://github.com/talos-systems/talos/commit/45feb72a47a0773be316b8d28a4c7a0f6887f38b) feat: fluent-bit example
* [`9b0b5501`](https://github.com/talos-systems/talos/commit/9b0b5501ddd53630f729575b0192a501880dff80) docs: add katacoda link
* [`b2bf3117`](https://github.com/talos-systems/talos/commit/b2bf3117ffe3bef50246f0186e4dc9b3d2f22db0) feat: implement extension services
* [`063a9e16`](https://github.com/talos-systems/talos/commit/063a9e165762c65b8d38184dafadff5c49138f33) test: pre-fetch CLI tools
* [`d749643e`](https://github.com/talos-systems/talos/commit/d749643e7ec44cf9de51238ed167ca229a3088c1) feat: download metadata on Scaleway using low source port
* [`1800b4c7`](https://github.com/talos-systems/talos/commit/1800b4c7079401b706bc4e9795136247b7a110e2) chore: fix kernel reference errata
* [`743a0300`](https://github.com/talos-systems/talos/commit/743a0300257a58039bfb4344a37c7716ddc6a3a4) chore: bump github.com/mdlayher/arp@latest
* [`614adf0f`](https://github.com/talos-systems/talos/commit/614adf0ffdeb3923cf9f06c9b6a611f2551fe2f4) feat: update xfsprogs to 5.14.2, replace LibreSSL with OpenSSL
* [`28c3b495`](https://github.com/talos-systems/talos/commit/28c3b495dacfb1aa89221fff76b90819ba41ccbc) docs: updates to troubleshooting doc
* [`673fe2eb`](https://github.com/talos-systems/talos/commit/673fe2ebf763a1437e835d14f4c6e893e2449226) feat: disable PSP by default for Talos >= 0.15
* [`4d419a00`](https://github.com/talos-systems/talos/commit/4d419a007fbfecd8bec85bb5b36cb9a0cefd9259) feat: store audit logs to disk
* [`8ef3d85b`](https://github.com/talos-systems/talos/commit/8ef3d85bc4748b65a423a427f34b38edd9cd483a) chore: bump dependencies
* [`8a634d56`](https://github.com/talos-systems/talos/commit/8a634d56486453938152ffd45409b8c618afadf9) chore: bump tools, pkgs, extras
* [`f40b480b`](https://github.com/talos-systems/talos/commit/f40b480bddcfcd1109a7455d19d77c5488500a11) chore: expand Cilium deployment docs
* [`3ba8eb00`](https://github.com/talos-systems/talos/commit/3ba8eb00d3afb84961d6c944e67b86cb7e6ca03d) docs: design concepts page
* [`a5fb271a`](https://github.com/talos-systems/talos/commit/a5fb271ac8e40466ac6d363b9f08e8c2f8b08da3) feat: enable protectKernelDefaults in kubelet_spec
* [`b7a1e043`](https://github.com/talos-systems/talos/commit/b7a1e0431000225442a80d2ee4054e4cea3ef5bf) chore: don't append `initrd=` to the kernel command line
* [`4d5cd665`](https://github.com/talos-systems/talos/commit/4d5cd6653846048bd84f87c23be1271bd4e293fc) feat: add new grub parser and descriptive grub menu entries
* [`6ccfdbaf`](https://github.com/talos-systems/talos/commit/6ccfdbaf1b8d0d3a7c0a125bbc9dfe528a1d7f64) fix: avoid replacing default gRPC codec in machinery
* [`0fe34b35`](https://github.com/talos-systems/talos/commit/0fe34b35812346d921ceafd3fa7bf741866b47b9) feat: update Kubernetes to 1.23.4
* [`95a564ba`](https://github.com/talos-systems/talos/commit/95a564ba2ad09eba0c36ccda78fdb50c04237a95) fix: prefer logical on merging link specs
* [`8b7091a0`](https://github.com/talos-systems/talos/commit/8b7091a06e8bf0d0a5c3702aa2e81432b9144d23) fix: correct vultr interface IP calculation
* [`5a0fd63c`](https://github.com/talos-systems/talos/commit/5a0fd63c81a14727e141755244e67887f7758743) fix: determine openstack interface IP correctly
* [`00ccaf13`](https://github.com/talos-systems/talos/commit/00ccaf13fb310d3b8069bc6635fb1fa02eb377fd) feat: update CoreDNS to 1.9.0
* [`a9a47b75`](https://github.com/talos-systems/talos/commit/a9a47b755938456dd4572762fa967a90bb206207) feat: update containerd to 1.6.0
* [`961067e8`](https://github.com/talos-systems/talos/commit/961067e8b3322e57ff92643fef58f3c915c9b120) docs: update getting-started.md
* [`bddd53fc`](https://github.com/talos-systems/talos/commit/bddd53fc4a0477b5745ef0f82f577d5b4bada6a1) chore: bump dependencies
* [`f1a93d28`](https://github.com/talos-systems/talos/commit/f1a93d28fbeec51681b2318431f46e2925113aa9) release(v0.15.0-alpha.2): prepare release
* [`1e9f0ad4`](https://github.com/talos-systems/talos/commit/1e9f0ad4c6abcfb5244f0d4159b7085b387f2cc1) feat: update Go to 1.17.7, Linux to 5.15.23
* [`fef99892`](https://github.com/talos-systems/talos/commit/fef99892d5ba11c9c87d047e23fb7023de5116a6) chore: pin kubernetes version to `talosctl gen config`
* [`bcf92813`](https://github.com/talos-systems/talos/commit/bcf928134c8d1a17d69d425061350040d3ed15a4) feat: udev extensions support
* [`47619f83`](https://github.com/talos-systems/talos/commit/47619f8320f8e03246ffa43d19dcd759b1d9511c) docs: update system extensions guide with grammar fixes
* [`2bcceb6e`](https://github.com/talos-systems/talos/commit/2bcceb6e437b5e30f856ea495eccdb0ab4d5e1ca) chore: disable TIPC and B.A.T.M.A.N
* [`c6bca1b3`](https://github.com/talos-systems/talos/commit/c6bca1b33b5b0522ee7b997c2bcc5afadc991a94) docs: add guide on system extensions
* [`492b156d`](https://github.com/talos-systems/talos/commit/492b156dabca6552002881f9d8ca57b02a04add2) feat: implement static pods via machine configuration
* [`6fadfa8d`](https://github.com/talos-systems/talos/commit/6fadfa8dbcc22b80dc83ed477f81f5c55727298c) fix: parse properly IPv6 address in the cmdline `ip=` arg
* [`d991f398`](https://github.com/talos-systems/talos/commit/d991f3982c329e97c78d068eae0abf02020d21a9) chore: update the kernel with IGC driver enabled
* [`cbc9610b`](https://github.com/talos-systems/talos/commit/cbc9610be66f4b2552e2c7374118cfa71764a148) feat: sysctl system optimization
* [`8b6d6220`](https://github.com/talos-systems/talos/commit/8b6d6220d3799cb79cd66267017b54d0a09e2c63) fix: parse interface ip correctly (nocloud)
* [`54632b1b`](https://github.com/talos-systems/talos/commit/54632b1be7b08440b562dfb0bf44ef9784317dbf) docs: fix developing Talos docs
* [`0da370df`](https://github.com/talos-systems/talos/commit/0da370dfefecdba9c981ccafa3255c4dc256d4d2) test: unlock CABPT/CACPPT provider versions
* [`df0e388a`](https://github.com/talos-systems/talos/commit/df0e388a4fa1995124d4e722fc1b8a1bfdffed58) feat: extract firmware part of system extensions into initramfs
* [`8899dd34`](https://github.com/talos-systems/talos/commit/8899dd34945105e7276fa453341cc0aa4dbe51d4) chore: add json-tags for SecretsBundle
* [`4f391cd5`](https://github.com/talos-systems/talos/commit/4f391cd5c540a0a955f294d628adc7437b7513b5) chore: bump kernel to 5.15.22
* [`6bd07406`](https://github.com/talos-systems/talos/commit/6bd07406e1895d190b5bbd9838ee84f85d02cd3f) feat: disable reboots via kexec
* [`1e3f2f95`](https://github.com/talos-systems/talos/commit/1e3f2f95275aa5f71abe931015799caaca42bf61) fix: validate kubelet node IP subnets correctly
* [`d211bff4`](https://github.com/talos-systems/talos/commit/d211bff47d661697926fece893784519dbf4f8f3) feat: enable accept_ra when IPv6 forwarding
* [`93020583`](https://github.com/talos-systems/talos/commit/93020583195d066e879ccb19da38b8cfd6b93e96) chore: update kernel to 5.15.21
* [`c7186ed0`](https://github.com/talos-systems/talos/commit/c7186ed08013efaa9957fe064152ccfca8ec1ab8) chore: bump dependencies
* [`9ee470f9`](https://github.com/talos-systems/talos/commit/9ee470f9556462dd3fda656d58358e7ae78f4d47) feat: set /etc/localtime to UTC
* [`c3476836`](https://github.com/talos-systems/talos/commit/c347683670d489230a2e87e4f04f05009173aca0) fix: disable auto-tls for etcd
* [`9bffc7e8`](https://github.com/talos-systems/talos/commit/9bffc7e8d5eff6d5ce0b83d627557f4110fc5c58) fix: pass proper sequence to shutdown sequence on ACPI shutdown
* [`e47387e4`](https://github.com/talos-systems/talos/commit/e47387e4197974366844b2741cae345666d474da) chore: bump CAPI to 1.0.4
* [`5462f5ed`](https://github.com/talos-systems/talos/commit/5462f5ed18b7ffe023b3a41f1ac7d9b4ca9b726d) feat: update etcd to 3.5.2
* [`f6fa12e5`](https://github.com/talos-systems/talos/commit/f6fa12e53697c763bd0463d91e92a446eb1ac2f7) docs: update upgrading Talos, Kubernetes, and Docker guides
* [`5484579c`](https://github.com/talos-systems/talos/commit/5484579c1a897f2378aacbef94bd4381d6b8299c) feat: allow link scope routes in the machine config
* [`56b83b08`](https://github.com/talos-systems/talos/commit/56b83b08730c13910b0e5eb724decaf27e187047) feat: enable persistence for docker provider
* [`949464e4`](https://github.com/talos-systems/talos/commit/949464e4b6e1e807d9299b451758a6d144725fb1) fix: use leaf certificate in the apid RBAC check
* [`446972f2`](https://github.com/talos-systems/talos/commit/446972f2113ada8e6c511ce56f630ec170ef0f26) chore: bump kernel to 5.15.19
* [`fe40e7b1`](https://github.com/talos-systems/talos/commit/fe40e7b1b39281f9bc14393b8c9db55ab6d6f8cd) feat: drain node on shutdown
* [`7f0b3aae`](https://github.com/talos-systems/talos/commit/7f0b3aae0a37b519623422841e3cbcda8bdd21a1) feat: add multiple config patches, patches from files, YAML support
* [`202290be`](https://github.com/talos-systems/talos/commit/202290be7b9b04ec909d369326d463c3b462eafa) docs: update Kubernetes upgrade video
* [`036644f7`](https://github.com/talos-systems/talos/commit/036644f7a03383922fd8407b1d514c7f79d44d0d) chore: bump kernel to 5.15.18
* [`dcde2c4f`](https://github.com/talos-systems/talos/commit/dcde2c4f68982974d6e55c52ba0fa8665e7f40b8) chore: update k8s upgrade message
* [`1c949335`](https://github.com/talos-systems/talos/commit/1c949335cc41cc9157e4c7dead44826c99b336f3) docs: add documentation for Hyper-V
* [`7f979091`](https://github.com/talos-systems/talos/commit/7f9790912308dfa88457a6db4f94728e5337c399) fix: clean up containerd state on installer run/validate
* [`8b98d8eb`](https://github.com/talos-systems/talos/commit/8b98d8eb3976cb8e64ffa94cfdf0305216f7dbeb) docs: clarify Filebeat example
* [`74c03120`](https://github.com/talos-systems/talos/commit/74c03120cf1da93d79fd786036e8d296c00c221e) docs: replace Talos upgrades video
* [`65e64d42`](https://github.com/talos-systems/talos/commit/65e64d425e0253ae6780d52063d227c47df1ae29) chore: update kernel to stable 5.15.17
* [`4245f72d`](https://github.com/talos-systems/talos/commit/4245f72d3ff3712742d6d7d6ec3310f40f900c79) feat: add --extra-uefi-search-paths option
* [`7ffeb6c2`](https://github.com/talos-systems/talos/commit/7ffeb6c2e2bef1482b641725e4075c44264e899e) docs: update oracle cloud example
* [`151c9df0`](https://github.com/talos-systems/talos/commit/151c9df091f32d00748e7e5effbb2c759916e8b9) chore: add CSI tests for e2e-qemu
* [`cdb621c8`](https://github.com/talos-systems/talos/commit/cdb621c82e15026a851bbfb567afd834d88165e7) feat: provide a way to list installed system extensions
* [`abfb2581`](https://github.com/talos-systems/talos/commit/abfb2581289c72c9e7bda8bc1f7bc2aa2ba758f7) feat: share `/lib/firmware` across initramfs and rootfs
* [`ebec5d4a`](https://github.com/talos-systems/talos/commit/ebec5d4a0c20fe20aa1fd5d1f9b28c0745a08fe7) feat: support full disk path in the diskSelector
* [`831f65a0`](https://github.com/talos-systems/talos/commit/831f65a07f3b0a93ee9f38327dc5b84ce97a3237) fix: close client provider instead of Talos client in the upgrade module
* [`0bf161df`](https://github.com/talos-systems/talos/commit/0bf161dffb8c7805c44a4fb2c3db191dfa901b88) test: add integration test for system extensions
* [`7b396274`](https://github.com/talos-systems/talos/commit/7b3962745625decb720c53ca3b454f65079715f6) fix: handle 404 errors from AWS IMDS correctly
* [`85782faa`](https://github.com/talos-systems/talos/commit/85782faa24772dc9fa757aac3803a196f0325544) feat: update Kubernetes to 1.23.3
* [`c5e5922e`](https://github.com/talos-systems/talos/commit/c5e5922e536533badcaae568171f1b78cac40105) chore: bump dependencies
* [`b3c3ef29`](https://github.com/talos-systems/talos/commit/b3c3ef29bdf0f21805adf3489972cb92c98c00aa) feat: install system extensions
* [`a0889600`](https://github.com/talos-systems/talos/commit/a0889600fb19f62a2503244c32364808777ffdcc) chore: fix golangci-lint install
* [`a50c4298`](https://github.com/talos-systems/talos/commit/a50c42980febfe51ba1e4ce750768f01de8c2d47) fix: use #!/usr/bin/env bash as shebang instead of #!/bin/bash
* [`4464b725`](https://github.com/talos-systems/talos/commit/4464b725c4fea4234961959e884426c384822eab) fix: qemu: always use runtime.GOARCH for CNI bundle
* [`e7379c81`](https://github.com/talos-systems/talos/commit/e7379c81b222341633d6f1011bcdbffa1bf429fc) release(v0.15.0-alpha.1): prepare release
* [`58eb3600`](https://github.com/talos-systems/talos/commit/58eb3600fc44dc2fccaa82322207291ffd807205) fix: enforce reasonable TLS min tls-min-version
* [`b8d4c5df`](https://github.com/talos-systems/talos/commit/b8d4c5dfad4585c0af52287513176411a79fc20c) fix: use correct error in `kernel_param_spec` Modify call handling
* [`4961d686`](https://github.com/talos-systems/talos/commit/4961d6867cadab5e8b48e73355b23b91d36f70b4) docs: drop talos.interface kernel arg
* [`b1e61fa5`](https://github.com/talos-systems/talos/commit/b1e61fa5b1bcd5affd42b498711b9e3378344c33) chore: update Linux to 5.15.16
* [`d4b84459`](https://github.com/talos-systems/talos/commit/d4b844593587ae3f82efcdbdfe0f24cda4262474) feat: support CRI configuration merging and reimplement registry config
* [`f94c8c6e`](https://github.com/talos-systems/talos/commit/f94c8c6e1c3915c962c331943120bdfd2b76259f) feat: update Kubernetes to 1.23.2
* [`21f497b3`](https://github.com/talos-systems/talos/commit/21f497b3e20f3b1cc9b744f1787ba80cf396d3e0) feat: install readonly overlay mounts during talos chroot sequence
* [`9ad5a67d`](https://github.com/talos-systems/talos/commit/9ad5a67d21b0788d1b43f1bea8e39c003a4a8ecc) feat: inject platform network configuration as network resources
* [`907f8cbf`](https://github.com/talos-systems/talos/commit/907f8cbfb8ed28cf399b9797230790718fc04a58) docs: fix patch flag
* [`caa43442`](https://github.com/talos-systems/talos/commit/caa43442640744a0aa7a17aa1a205f1641e6445a) docs: add documentation on developing Talos
* [`16eeb677`](https://github.com/talos-systems/talos/commit/16eeb677625c0859d73b82948c1a073ba6e17e8d) docs: readme updates
* [`3c073702`](https://github.com/talos-systems/talos/commit/3c0737027b5574581a6461211199274ee709b1da) chore: update release notes
* [`6d8bea5d`](https://github.com/talos-systems/talos/commit/6d8bea5d559b1156f7d0b576b7b5784c25cd3595) feat: jetson nano SoC
* [`1d8955eb`](https://github.com/talos-systems/talos/commit/1d8955ebe43259a5e072b8a89f37cb728b6fcf53) feat: update CoreDNS to 1.8.7
* [`6af83afd`](https://github.com/talos-systems/talos/commit/6af83afd5aba64ffa7887d62f84c434109b7579b) fix: handle multiple-IP cluster nodes
* [`43b2d813`](https://github.com/talos-systems/talos/commit/43b2d8137116863cfc5ca969c429c13483465b01) chore: bump dependencies
* [`529e80f4`](https://github.com/talos-systems/talos/commit/529e80f4f529f066872b5768cd80eeeb7b766a31) docs: update home page and footer
* [`37630e70`](https://github.com/talos-systems/talos/commit/37630e70ccc9950e139bf7fcfcded6a18d0c7a01) Update twitter link
* [`af440919`](https://github.com/talos-systems/talos/commit/af440919bbaf12f414f04a5a621c1e2d5ed84ae2) fix: avoid panic in config loading/validation
* [`4b8e9de5`](https://github.com/talos-systems/talos/commit/4b8e9de599812f82275605a93de7f5c05471f7f5) docs: add guide on adding proprietary kernel modules
* [`833dc416`](https://github.com/talos-systems/talos/commit/833dc4169a9702383930816d13be39f6b81c7a31) docs: rework vmware assets
* [`2869b5ee`](https://github.com/talos-systems/talos/commit/2869b5eeacf0b6c96aedcb605bfa8a5f9fb87625) feat: add oraclecloud.com platform support
* [`f3ec24be`](https://github.com/talos-systems/talos/commit/f3ec24bebf0aaa7983228a09b21a67b9a2a098c1) fix: vmware documentation typo
* [`2f2bdb26`](https://github.com/talos-systems/talos/commit/2f2bdb26aa5367066c12a6402af554b7a5a148d6) feat: replace flags with --mode in `apply`, `edit` and `patch` commands
* [`b09be2a6`](https://github.com/talos-systems/talos/commit/b09be2a69c6b6f8064a676fc014e6e60ea01a08d) docs: update index.md and sync across versions
* [`ca65b918`](https://github.com/talos-systems/talos/commit/ca65b918a7292ae53d40e410cca4e89be91e4261) docs: add nocloud documentation
* [`59437d6d`](https://github.com/talos-systems/talos/commit/59437d6d8360ad7dd8f801797ab91ac0791270f7) fix: filter down nameservers for docker-based cluster create
* [`194eaa6f`](https://github.com/talos-systems/talos/commit/194eaa6f22249fe4f43958bd897744a2cc57279f) chore: clean up /usr/bin from unneeded files
* [`74e72724`](https://github.com/talos-systems/talos/commit/74e7272401ccb75464dd42ed0427d73842af74e1) docs: update office office
* [`539af338`](https://github.com/talos-systems/talos/commit/539af338c4b8f6e4291654f66628c81022aeda72) docs: update vmware docs
* [`279a3fda`](https://github.com/talos-systems/talos/commit/279a3fda7ba24037e06377f01cc495207722caa9) feat: update Go to 1.17.6, containerd to 1.5.9
* [`3d308894`](https://github.com/talos-systems/talos/commit/3d308894120092fe095b41970d6341362ab80a6b) chore: bump Go dependencies
* [`d02d944e`](https://github.com/talos-systems/talos/commit/d02d944ec767441612b84c164af31bc27c0c0659) chore: provide umarshal from YAML methods for network resource specs
* [`2e735714`](https://github.com/talos-systems/talos/commit/2e735714d9218cbc335d9c418730c146821fb8d4) fix: derive machine-id from node identity
* [`d8a2721e`](https://github.com/talos-systems/talos/commit/d8a2721e129be33f4a3c37be1bf5b89a1cd91685) test: update CAPI components to latest
* [`7dff8a53`](https://github.com/talos-systems/talos/commit/7dff8a53ee7bc37afe9dc216ca8a9113718d76af) fix: ignore missing init.yaml for cluster create
* [`f4516c7d`](https://github.com/talos-systems/talos/commit/f4516c7d847d905b49b4e2127eb86a1f38156d53) chore: bump dependencies
* [`944f1322`](https://github.com/talos-systems/talos/commit/944f13221d50694d5c59ace1c12f8769d7ade9ae) chore: fix release pipeline
* [`cb548a36`](https://github.com/talos-systems/talos/commit/cb548a368a75ca379209213948518c880b242b0c) release(v0.15.0-alpha.0): prepare release
* [`da0b36e6`](https://github.com/talos-systems/talos/commit/da0b36e616f7da7eb0c6791b9cf5e4ee2757f08f) feat: introduce `talos.exp.wipe` kernel param to wipe system disk
* [`c079eb32`](https://github.com/talos-systems/talos/commit/c079eb32bd7fc19d506146e2a9edf5b406e25e02) refactor: use AWS SDK to access AWS metadata service
* [`2f4b9d8d`](https://github.com/talos-systems/talos/commit/2f4b9d8d6d10c0aa753f405282aa99696b923bb4) feat: make machine configuration read-only in Talos (almost)
* [`524f83d3`](https://github.com/talos-systems/talos/commit/524f83d3d8af3857f178c179a9552a5f32b70f47) feat: use official Go SDK to fetch GCP instance metadata
* [`d2a7e082`](https://github.com/talos-systems/talos/commit/d2a7e082c24d0b42820b3ea454329a19178ba0a4) test: retry in discovery tests
* [`f4219e53`](https://github.com/talos-systems/talos/commit/f4219e530ca7635ada666ae69071746d698939a8) chore: remove unused methods in AWS platform
* [`35bc2940`](https://github.com/talos-systems/talos/commit/35bc2940e375b99e0d6e22a26a05c25d642bf35a) fix: kexec on RPI4
* [`f235cfba`](https://github.com/talos-systems/talos/commit/f235cfbaed8b5254e19616bfaaa8b48fd7d32e64) fix: multiple usability fixes
* [`b3fbb2f3`](https://github.com/talos-systems/talos/commit/b3fbb2f312d5de0c14ffee567956b868a317aba7) test: don't build all images in the default CI pipeline
* [`dac550a5`](https://github.com/talos-systems/talos/commit/dac550a50f4793194e4aeee98702a052925a0e88) docs: fix troubleshooting guide
* [`83e8bec6`](https://github.com/talos-systems/talos/commit/83e8bec6b9d4c0ecc689f45b15d7203bbf9bf0cc) feat: update Linux to 5.15.11
* [`d5a82b37`](https://github.com/talos-systems/talos/commit/d5a82b37eb147a68ffd08fc8ec800edc92da9f9c) feat: remove `ApplyDynamicConfig`
* [`3623da13`](https://github.com/talos-systems/talos/commit/3623da136bde51422ba1aec06e22dea2e3dfa756) feat: provide a way to load Linux kernel modules
* [`4d1514ad`](https://github.com/talos-systems/talos/commit/4d1514add6e0b972aee26a8ad63ef8f972050d46) docs: update Mayastor deployment process
* [`cff1ff6d`](https://github.com/talos-systems/talos/commit/cff1ff6d5c3a68063ed2c0c063daadf2474cc43f) feat: shell completion for `list`, `read`
* [`19728437`](https://github.com/talos-systems/talos/commit/19728437ead7ab6e95afc8bd7f70be3f861c9a6e) feat: output IPs when etcd needs to be bootstrapped
* [`c297d66a`](https://github.com/talos-systems/talos/commit/c297d66a130cba708fcb42f8f2e6b356c36f5109) test: attempt number on two on proper retries in CLI time tests
* [`dc299da9`](https://github.com/talos-systems/talos/commit/dc299da9e8e885b7a44c184ef3d251726aa934a8) docs: add arm64 option to talosctl download
* [`f49f40a3`](https://github.com/talos-systems/talos/commit/f49f40a3361381e51d6986547be12ec3b4a3f24a) fix: pass path to conformance retrieve results
* [`942c8074`](https://github.com/talos-systems/talos/commit/942c8074fd14478089769e2b8132ea2796109721) docs: fork docs for 0.15
* [`880a7782`](https://github.com/talos-systems/talos/commit/880a7782cbc703b38a2ff2b3d76c1eda621524ba) docs: update documentation for 0.14.0 release
* [`dc9a0cfe`](https://github.com/talos-systems/talos/commit/dc9a0cfe94b59c688d65ef74ebc04f273b8a72fb) chore: bump Go dependencies
* [`77349693`](https://github.com/talos-systems/talos/commit/7734969356abac8355a31da08d47fafd4000e814) fix: config apply immediate
* [`17c14748`](https://github.com/talos-systems/talos/commit/17c14748815e2ab928a9c0c8a079f65a63f0194e) test: retry `talosctl time` call in the tests
* [`acf1ac0f`](https://github.com/talos-systems/talos/commit/acf1ac0f1aff929ae9bf66b1c0322b4f83c0fef1) feat: show human-readable aliases in `talosctl get rd`
* [`5532867b`](https://github.com/talos-systems/talos/commit/5532867b05bb596f42516ff121b0a3a97176b3d1) refactor: rewrite the implementation of Processes API
* [`80350861`](https://github.com/talos-systems/talos/commit/80350861a2c1cee234d2f3a571d3993841c554d9) feat: update Kubernetes to 1.23.1
* [`4c96e936`](https://github.com/talos-systems/talos/commit/4c96e936ed467ae7838258699bdd83fd6da15ae6) docs: add cilium guide
* [`e3f2acb5`](https://github.com/talos-systems/talos/commit/e3f2acb5e57f9b3e7b11986f180e287f1f693079) refactor: rewrite the check for unknown keys in the machine configuration
* [`4175396a`](https://github.com/talos-systems/talos/commit/4175396a89f836bb1835d201b59224b286eeb62a) refactor: use update go-blockdevice library with allocation fixes
* [`b58f567a`](https://github.com/talos-systems/talos/commit/b58f567a133b661cc045a995dd29ab5090dfe194) refactor: optimize Runtime config interface to avoid config marshaling
* [`bb355c9a`](https://github.com/talos-systems/talos/commit/bb355c9ab38a417ed471bf3ce7b1879609f5e806) chore: remove govalidator library
* [`3af56bd2`](https://github.com/talos-systems/talos/commit/3af56bd2e70e8964cc48b430b1e67e48052af682) test: update capi templates to v1beta1
* [`936b4c4c`](https://github.com/talos-systems/talos/commit/936b4c4cee87697b3f08d51f22208b44b8a02db5) fix: update DHCP library with the panic fix
* [`ab42886b`](https://github.com/talos-systems/talos/commit/ab42886bf333dcaa9d3a1b765781ab19354de397) fix: allow kubelet to be started via the API
* [`ec641f72`](https://github.com/talos-systems/talos/commit/ec641f7296ce62b2f9ba1353ff2eba70c2287c08) fix: use default time servers in time API if none are configured
* [`79f213ee`](https://github.com/talos-systems/talos/commit/79f213eec65af46c4a3a4c4494d67ffc1b0a53ec) fix: cleanup affiliates
* [`2dd0b5b6`](https://github.com/talos-systems/talos/commit/2dd0b5b68aa5b8efbc9b0bc4f8ebc159e2d991ab) chore: update Go to 1.17.5
* [`97ffa7a6`](https://github.com/talos-systems/talos/commit/97ffa7a645d7db93ee58032795f91131f6950e89) feat: upgrade kubelet version in `talosctl upgrade-k8s`
* [`5bc5123e`](https://github.com/talos-systems/talos/commit/5bc5123eb91386ca12e7e7f9fc0f66637343a642) docs: document `ip=` kernel argument
* [`8e1d0bfb`](https://github.com/talos-systems/talos/commit/8e1d0bfb5fbaf0849bdd07b73a8e3bda4e8c3b75) feat: update Kubernetes to 1.23.0
* [`1d6f140d`](https://github.com/talos-systems/talos/commit/1d6f140d76f53b12f40c07ef11ced8aebc6fc003) fix: make `apply-config` work reliably in any Talos state
* [`a5a6c720`](https://github.com/talos-systems/talos/commit/a5a6c720e96a3c64b1f3126f1bfa4014ac00a85b) chore: remove boot-{arch}.tar.gz artifact
* [`fc5ec500`](https://github.com/talos-systems/talos/commit/fc5ec500731b4593d2b2735e0b616e9825cf4f4f) fix: relax validation for wireguard endpoints
* [`cdbd5cff`](https://github.com/talos-systems/talos/commit/cdbd5cff40eb521d98fa8f9ad1469740b5b60542) docs: vlan VIP
* [`149ffa97`](https://github.com/talos-systems/talos/commit/149ffa9774bc3fbea1a69afc01f5da4ac311f085) fix: increase boot and etcd join timeouts
* [`dc9db214`](https://github.com/talos-systems/talos/commit/dc9db2141967603aaf2855e5a6874465e207d7b1) feat: autocomplete nodes, context and resource definitions
* [`b4b3e213`](https://github.com/talos-systems/talos/commit/b4b3e21333c54cff3559fcc3464327fc23e673ee) chore: bump tools/pkgs/extra to final released versions
* [`d225cf91`](https://github.com/talos-systems/talos/commit/d225cf91e83077857b386e5131e74980d3aef476) fix: tmpfs default permissions
* [`8f3e1a4a`](https://github.com/talos-systems/talos/commit/8f3e1a4ad6af61e75c26fffd496c9a4b7fca313e) fix: drop unpacked layers from containerd image store
* [`1fc43619`](https://github.com/talos-systems/talos/commit/1fc43619d2e80088540fdf8fa99f0cfcdd36bab0) docs: improve clarity for users
* [`36c9a65a`](https://github.com/talos-systems/talos/commit/36c9a65ac083e975c27a22e198213c55899f1f93) feat: update deps and Kubernetes to 1.23.0-rc.1
* [`64a4f6e7`](https://github.com/talos-systems/talos/commit/64a4f6e77c52dde4068659129c52b3b00bd9a6fd) test: bump Talos versions in upgrade tests
* [`d2ebda78`](https://github.com/talos-systems/talos/commit/d2ebda78cc592afca57aea51cdd3e343329d4b10) feat: update runc to 1.0.3
* [`adf05072`](https://github.com/talos-systems/talos/commit/adf05072ac9bc8090bd83bf3fdfceb2d988f5bb7) chore: drop unused package
* [`961d1567`](https://github.com/talos-systems/talos/commit/961d1567d9124069d047a1d44b9afbfdec365120) chore: update Go to 1.17.4
* [`d2fd7c21`](https://github.com/talos-systems/talos/commit/d2fd7c217015405a28cf3564a6916508425d48ef) feat: make kubelet service apply changes immediately
* [`4f5d9da9`](https://github.com/talos-systems/talos/commit/4f5d9da922bc3ca29ff9e834863471f0d2b830fd) feat: allow overriding KSPP kernel parameters
* [`6377f3df`](https://github.com/talos-systems/talos/commit/6377f3df7bf8017d764c3311c664f97a9b90b8a2) test: uplift capi versions and templates
* [`2a0da062`](https://github.com/talos-systems/talos/commit/2a0da062475edd80c2f4aa7a26da433d5fdc6d5a) feat: split installer and imager images
* [`1a13aaa2`](https://github.com/talos-systems/talos/commit/1a13aaa239d8afa5f7d2bfd3096762eb70e5fab7) feat: update Linux to 5.15.6
* [`73293bc2`](https://github.com/talos-systems/talos/commit/73293bc2a76cbb40f29b0767784461f186c0f1b2) feat: can disable controlmanager and scheduler
* [`7f992229`](https://github.com/talos-systems/talos/commit/7f9922296a6a19019c2bf0299d16f2b84f41c38e) feat: add powercycle mode in reboot
* [`bc69f6ec`](https://github.com/talos-systems/talos/commit/bc69f6ec84418000e6397c887a5a01a99948c5da) feat: vip for VLANs
* [`99338e5f`](https://github.com/talos-systems/talos/commit/99338e5ffde0e9bb87f948935633861a23858720) feat: update Flannel to 0.15.1
* [`8370dde1`](https://github.com/talos-systems/talos/commit/8370dde1fd17d7f1a4c91fd3360835e527dc1d4f) docs: fix typos
* [`a5646db2`](https://github.com/talos-systems/talos/commit/a5646db297f382274dbf02eed7a4fa3ed4f2e950) feat: support MTU for VLAN's
* [`4aad0ebf`](https://github.com/talos-systems/talos/commit/4aad0ebf91387b21fe430f77d8cc4111e05294d2) docs: expand logging documentation
* [`400225c8`](https://github.com/talos-systems/talos/commit/400225c886d1115ffc61ceac07c882a34e16a8df) docs: fix GCP docs
* [`f7c87d1d`](https://github.com/talos-systems/talos/commit/f7c87d1d9d8ec5bf7bd8277c0502ea76563e65b1) release(v0.14.0-alpha.2): prepare release
* [`e9f4b7b2`](https://github.com/talos-systems/talos/commit/e9f4b7b2041223309467227fa8b99cf35b797c72) feat: update Linux to 5.15.5
* [`4d0a75a3`](https://github.com/talos-systems/talos/commit/4d0a75a3f0795d5a0537c3b59007f97423c072ab) docs: add documentation about logging
* [`8d1cbeef`](https://github.com/talos-systems/talos/commit/8d1cbeef9f2ae95d04035f5d999aa181fb88e9fc) chore: add API breaking changes detector
* [`ed7fb9db`](https://github.com/talos-systems/talos/commit/ed7fb9db14554ccc191cc0c989aba38021a59690) feat: move kubelet proccesses to /podruntime cgroup
* [`2cd3f9be`](https://github.com/talos-systems/talos/commit/2cd3f9be1f36dd3389ee528fa8f0b2548032c2f7) feat: filter out SideroLink addresses by default
* [`0f169bf9`](https://github.com/talos-systems/talos/commit/0f169bf9b15239bfd35f371832211c42caf4349c) chore: add API deprecations mechanism
* [`eaf6d472`](https://github.com/talos-systems/talos/commit/eaf6d4720383881c0dcf967dbc4e960d5ef49dd8) refactor: use random port listener in kernel log delivery tests
* [`bf4c81e7`](https://github.com/talos-systems/talos/commit/bf4c81e7da854b7e9491f4ecb6fce89b026f4a9f) feat: kernel log (kmsg) delivery controller
* [`f3149780`](https://github.com/talos-systems/talos/commit/f3149780e6663f7dc0fd0091cd6e3df605eac848) feat: update Kubernetes to 1.23.0-rc.0
* [`b824909d`](https://github.com/talos-systems/talos/commit/b824909d686b1f5a8cd20afe9ca5a4f291a6f12d) fix: disable kexec on RPi4
* [`3257751b`](https://github.com/talos-systems/talos/commit/3257751bc0a18e0d3bb7097191989440ae473ee6) fix: initialize Drainer properly
* [`e4bc68bf`](https://github.com/talos-systems/talos/commit/e4bc68bf026966a3326872a1d342ef3b9c05cc9d) fix: leave only a single IPv4/IPv6 address as kubelet's node IP
* [`e6d00741`](https://github.com/talos-systems/talos/commit/e6d007418efeb5d7f82eb82a35cddacc64ec99ba) feat: update pkgs - Linux 5.15.4, LibreSSL 3.2.7
* [`d5cbc364`](https://github.com/talos-systems/talos/commit/d5cbc3640256090e354b3896ffea72b8e58874bb) feat: add GCP ccm
* [`7433150f`](https://github.com/talos-systems/talos/commit/7433150fd84ef0935e1aad91ca654892dc522806) feat: implement events sink controller
* [`b4a406ae`](https://github.com/talos-systems/talos/commit/b4a406ae7c72e30ba488493682045495cd31dc4e) test: pin cluster API templates version to tag v1alpha4
* [`9427e78d`](https://github.com/talos-systems/talos/commit/9427e78dc6d581e752bf41a20f1e0379cc99d92d) fix: catch panics in network operator runs
* [`d1f55f90`](https://github.com/talos-systems/talos/commit/d1f55f90128859d41ada63159d6b2d12e83fabac) fix: update blockdevice library to properly handle absent GPT
* [`5ac64b2d`](https://github.com/talos-systems/talos/commit/5ac64b2d97c6e013c83a6618c6bece2e70dedd98) chore: set version in unit-tests
* [`20d39c0b`](https://github.com/talos-systems/talos/commit/20d39c0b48b64f237270e13df7f277abd262d10b) chore: format .proto files
* [`852bf4a7`](https://github.com/talos-systems/talos/commit/852bf4a7de815b75e2e632de18fae30bd1bc22be) feat: talosctl fish completion support
* [`6bb75150`](https://github.com/talos-systems/talos/commit/6bb75150a394ee1ef4a3677ab4d8e73f27172209) fix: allow add_key and request_key in kubelet seccomp profile
* [`6487b21f`](https://github.com/talos-systems/talos/commit/6487b21feb12291419c6fd1f6635a051b0a60afc) feat: update pkgs for u-boot, containerd, etc
* [`f7d1e777`](https://github.com/talos-systems/talos/commit/f7d1e7776917475507aa99847f88b9c22c9f7b95) feat: provide SideroLink client implementation
* [`58892cd6`](https://github.com/talos-systems/talos/commit/58892cd697676c19f830f55e8ba1d84cd6000621) fix: unblock events watch on context cancel
* [`caa76be2`](https://github.com/talos-systems/talos/commit/caa76be2c982d9d6bc8d3103f16b5915796f76b1) fix: containerd failed to load plugin
* [`1ffa8e04`](https://github.com/talos-systems/talos/commit/1ffa8e0480084264eee551ad177b2443ddb02ead) feat: add ULA prefix for SideroLink
* [`c6a67b86`](https://github.com/talos-systems/talos/commit/c6a67b8662bb3c6efbe912b19699ace19e70dd3f) fix: ignore not existing nodes on cordoning
* [`f7302525`](https://github.com/talos-systems/talos/commit/f730252579879df2e95878de292f17f791740804) feat: add new event types
* [`7c9b082f`](https://github.com/talos-systems/talos/commit/7c9b082f74f26349a0e309d9818d5bc55e672378) feat: update Kubernetes to 1.23.0-beta.0
* [`750e31c4`](https://github.com/talos-systems/talos/commit/750e31c4a46f2835eca9fc9a085d2bb64e582e40) fix: ignore EBUSY from `kexec_file_load`
* [`2d11b595`](https://github.com/talos-systems/talos/commit/2d11b59558c98f4cd07a50b25be29b5c355a4495) fix: ignore virtual IP as kubelet node IPs
* [`030fd349`](https://github.com/talos-systems/talos/commit/030fd349b1c0669d7059f8c6883c85096f6f9ef5) fix: don't run kexec prepare on shutdown and reset
* [`6dcce20e`](https://github.com/talos-systems/talos/commit/6dcce20e6fa088c3063aab728912731f5e827eb7) test: set proper pod CIDR for Cilium tests
* [`695300da`](https://github.com/talos-systems/talos/commit/695300dac46c114b8e7e40abdaeece25f7079c88) release(v0.14.0-alpha.1): prepare release
* [`753a8218`](https://github.com/talos-systems/talos/commit/753a82188f227da4f2f40da5f4d46ebe45774455) refactor: move pkg/resources to machinery
* [`0102a64a`](https://github.com/talos-systems/talos/commit/0102a64a5f6de2c3fe5d7792c2c5845fc737edff) refactor: remove pkg/resources dependencies on wgtypes, netx
* [`7462733b`](https://github.com/talos-systems/talos/commit/7462733bcb075b923b8c7ba4a763308c641c49a2) chore: update golangci-lint
* [`032c99a0`](https://github.com/talos-systems/talos/commit/032c99a0300ccb09105a07434884d2b1f57e537d) refactor: remove pkg/resources dependencies on k8s and base62
* [`4a5cff45`](https://github.com/talos-systems/talos/commit/4a5cff45f397ac29b7bfc390f11691c32d8615b2) perf: raspberry PIs clockspeed as fast as firmware allows
* [`a76f6d69`](https://github.com/talos-systems/talos/commit/a76f6d69dbfdf34e4383dd5d2ee9f8cca4661e87) feat: allow kubelet to be restarted and provide negative nodeIP subnets
* [`189221d5`](https://github.com/talos-systems/talos/commit/189221d589c1c9d4fc012dd9e31fd6d142d88dde) chore: update dependencies
* [`41f0aecc`](https://github.com/talos-systems/talos/commit/41f0aecc1d3c4afce96d034f160fa9f120c67e85) docs: update partition info
* [`95105071`](https://github.com/talos-systems/talos/commit/95105071de29f70552bd7c0881c2cc2e7c78c0ac) chore: fix simple issues found by golangci-lint
* [`d4b0ca21`](https://github.com/talos-systems/talos/commit/d4b0ca21a1ee1183b28738bb3d9ca251e1968fe7) test: retry upgrade mutex lock failures
* [`4357e9a8`](https://github.com/talos-systems/talos/commit/4357e9a849fcb7fb66378bdd767a926dde0c4318) docs: add Talos partions info
* [`8e8687d7`](https://github.com/talos-systems/talos/commit/8e8687d7592d4bc071981478491d70489e7dd4a9) fix: use temporary sonobuoy version
* [`e4e8e873`](https://github.com/talos-systems/talos/commit/e4e8e8737f564be47098e284706a63ef84636890) test: disable e2e-misc test with Canal CNI
* [`897da2f6`](https://github.com/talos-systems/talos/commit/897da2f6efc571a66d14722a67bbc401bad31887) docs: common typos
* [`a50483dd`](https://github.com/talos-systems/talos/commit/a50483dddfd9a742b998f509ee713af996a2484e) feat: update Linux to 5.15.1
* [`a2233bfe`](https://github.com/talos-systems/talos/commit/a2233bfe46bfb55d71cfc07174f6f22aee6d2651) fix: improve NTP sync process
* [`7efc1238`](https://github.com/talos-systems/talos/commit/7efc1238ee285d55c4619b6a40190b54ff953a66) fix: parse partition size correctly
* [`d6147eb1`](https://github.com/talos-systems/talos/commit/d6147eb17d2ebf263ca0537068bbbba6d3ced061) chore: update sonobuoy
* [`efbae785`](https://github.com/talos-systems/talos/commit/efbae7857d09aa7e5e704d5989efced5aa655259) fix: use etc folder for du cli tests
* [`198eea51`](https://github.com/talos-systems/talos/commit/198eea51a81bf041470c3c88cb6cb97af3a4e203) fix: wait for follow reader to start before writing to the file
* [`e7f715eb`](https://github.com/talos-systems/talos/commit/e7f715eb0ca0587a05949910cafdeb486654b577) chore: log KubeSpan IPs overlaps
* [`82a1ad16`](https://github.com/talos-systems/talos/commit/82a1ad1681bf262dcc68fc9cbac71ff2eb5639af) chore: bump dependencies
* [`e8fccbf5`](https://github.com/talos-systems/talos/commit/e8fccbf5351ec2481813553181cb73b8f16c915a) fix: clear time adjustment error when setting time to specific value
* [`e6f90bb4`](https://github.com/talos-systems/talos/commit/e6f90bb41a757b5173bbbf7554b6f85c08aaf58e) chore: remove unused parameters
* [`785161d1`](https://github.com/talos-systems/talos/commit/785161d19f68fb64451cf3d887b67f85a8bcb952) feat: update k8s to 1.23.0-alpha.4
* [`fe228d7c`](https://github.com/talos-systems/talos/commit/fe228d7c85a1f8437398061b18c090962adc9f29) fix: do not use yaml.v2 in the support cmd
* [`9b48ca21`](https://github.com/talos-systems/talos/commit/9b48ca21731cce53f0a61f05f74dcd264417d784) fix: endpoints and nodes in generated talosconfig
* [`6e16fd2f`](https://github.com/talos-systems/talos/commit/6e16fd2feeb3f8bf0b99e6cbe21047b7a5c1f05c) chore: update tools, pkgs, and extras
* [`261c497c`](https://github.com/talos-systems/talos/commit/261c497c71eb5ab5197bef05d8c209dbeb770d3f) feat: implement `talosctl support` command
* [`fc7dc454`](https://github.com/talos-systems/talos/commit/fc7dc454840e100d82bb036a7f065293234593f7) chore: check our API idiosyncrasies
* [`b1584429`](https://github.com/talos-systems/talos/commit/b15844298a6bfedca5acc0cc27061666481eb94b) feat: use GCP deployment manager
* [`3e7d4df9`](https://github.com/talos-systems/talos/commit/3e7d4df99019e3cc6d9a90920d377c73a76ac577) chore: bump dependencies
* [`88f24229`](https://github.com/talos-systems/talos/commit/88f2422955690d1eca1e21cd60a35e1d49141e3d) refactor: get rid of prometheus/procfs dependency in pkg/resources
* [`dd196d30`](https://github.com/talos-systems/talos/commit/dd196d3006d29ae5cae5d43b648da1ca2e5af236) refactor: prepare for move of pkg/resources to machinery
* [`f6110f80`](https://github.com/talos-systems/talos/commit/f6110f8036bc176188abb583bfa51296c4d3897d) fix: remove listening socket to fix Talos in a container restart
* [`53bbb13e`](https://github.com/talos-systems/talos/commit/53bbb13ed8592978dc27578fa79b3a2018941427) docs: update docs with emmc boot guide
* [`8329d211`](https://github.com/talos-systems/talos/commit/8329d21114abf841788be64765378343c12eaf69) chore: split polymorphic RootSecret resource into specific types
* [`c97becdd`](https://github.com/talos-systems/talos/commit/c97becdd9548d85b2b894a05765f93dcdf9ad803) chore: remove interfaces and routes APIs
* [`d798635d`](https://github.com/talos-systems/talos/commit/d798635d993a21392b8a7972a689c4be0728db32) feat: automatically limit kubelet node IP family based on service CIDRs
* [`205a8d6d`](https://github.com/talos-systems/talos/commit/205a8d6dc495e25af87bf0b920d0f55b8a27bbfd) chore: make nethelpers build on all OSes
* [`5b5dd49f`](https://github.com/talos-systems/talos/commit/5b5dd49f64bef584000655687e5b9c5d25af6a93) feat: extract JSON fields from more log messages
* [`eb4f1182`](https://github.com/talos-systems/talos/commit/eb4f11822dc0b35541e0576a75ca263ca96d4981) docs: create cluster in hetzner cloud
* [`728164e2`](https://github.com/talos-systems/talos/commit/728164e25a5705ae5194b416941f3607d592b140) docs: fix kexec_load_disabled param name in release notes
* [`f6328f09`](https://github.com/talos-systems/talos/commit/f6328f09a2bf8d233a48354dd548fb740e509341) fix: fix filename typo
* [`01b0f0ab`](https://github.com/talos-systems/talos/commit/01b0f0abb341b387f16d9b3a142af742f36c8c2b) release(v0.14.0-alpha.0): prepare release
* [`8b620653`](https://github.com/talos-systems/talos/commit/8b6206537a30be049f74f8c4c7350028e6e56c74) fix: skip generating empty `.machine.logging`
* [`60ad0063`](https://github.com/talos-systems/talos/commit/60ad006367e73f56fd69726e0044f1ce48f18a8b) fix: don't drop ability to use ambient capabilities
* [`b6b78e7f`](https://github.com/talos-systems/talos/commit/b6b78e7fef3f6ef0c566e1815d1e28f16f868c93) test: add cluster discovery integration tests
* [`97d64d16`](https://github.com/talos-systems/talos/commit/97d64d160ce7e71c3107adbd31404853f543f7cc) fix: hcloud network config changes
* [`4c76865d`](https://github.com/talos-systems/talos/commit/4c76865d0ecec726e801a4b8f87e09476481d808) feat: multiple logging improvements
* [`1d1e1df6`](https://github.com/talos-systems/talos/commit/1d1e1df643832478aaa715aea5f51ad2e61e2880) fix: handle skipped mounts correctly
* [`0a964d92`](https://github.com/talos-systems/talos/commit/0a964d921922a247293e36b5fecaab466b91d924) test: fix openstack unit-test stability
* [`72f62ac2`](https://github.com/talos-systems/talos/commit/72f62ac27b5d0a72db409fd003a7cf9c41a03d7c) chore: bump Go and Docker dependencies
* [`9c48ebe8`](https://github.com/talos-systems/talos/commit/9c48ebe8f94afa85921ee5f1c1e9315201905a92) fix: gcp fetching externalIP
* [`6c297268`](https://github.com/talos-systems/talos/commit/6c297268ce596c2a875b7c419c85317dc24d9f4f) test: fix e2e k8s version
* [`ae5af9d3`](https://github.com/talos-systems/talos/commit/ae5af9d3fad399dea95c316d94e3e66b124bfb24) feat: update Kubernetes to 1.23.0-alpha.3
* [`28d3a69e`](https://github.com/talos-systems/talos/commit/28d3a69e9d4ae7ffa231804e26af6d1f39c07afd) feat: openstack config-drive support
* [`2258bc49`](https://github.com/talos-systems/talos/commit/2258bc4918e89b3d6fcb841b2ad677f114ddba7e) test: update GCP e2e script to work with new templates
* [`36b6ace2`](https://github.com/talos-systems/talos/commit/36b6ace25378e8c4a607de6efb6b89a2d52f5cea) feat: update Linux to 5.10.75
* [`38516a54`](https://github.com/talos-systems/talos/commit/38516a5499d933a8038ce6768946ff096e7c6f98) test: update Talos versions in upgrade tests
* [`cff20ec7`](https://github.com/talos-systems/talos/commit/cff20ec78340b3855751e13f2ad0e54bd47e9989) fix: change services OOM score
* [`666a2b62`](https://github.com/talos-systems/talos/commit/666a2b6207d257edda20c9e0411b0d4cd4112aa6) feat: azure platform ipv6 support
* [`d32814e3`](https://github.com/talos-systems/talos/commit/d32814e302c370ec1e82aa2879186a034cd2a905) feat: extract JSON fields from log lines
* [`e77d81ff`](https://github.com/talos-systems/talos/commit/e77d81fff31d68f762da3741846f95a6d2303903) fix: treat literal 'unknown' as a valid machine type
* [`c8e404e3`](https://github.com/talos-systems/talos/commit/c8e404e356878f6cd819a33386b351c1c152c3f5) test: update vars for AWS cluster
* [`ad23891b`](https://github.com/talos-systems/talos/commit/ad23891b1f6b33409721528c6771304b7ab94b2c) feat: update CoreDNS version 1.8.6
* [`41299cae`](https://github.com/talos-systems/talos/commit/41299cae9961665c2bf2a642290f8309683f040d) feat: udev rules support
* [`5237fdc9`](https://github.com/talos-systems/talos/commit/5237fdc957efbb018649b866bfb756f280f589a2) feat: send JSON logs over UDP
* [`6d44587a`](https://github.com/talos-systems/talos/commit/6d44587a4d4c16defa6bb06329cdfc6e39c95188) feat: coredns service dualstack
* [`12f7888b`](https://github.com/talos-systems/talos/commit/12f7888b75fa2498e0f8305f5d6910cecad5c65c) feat: feed control plane endpoints on workers from cluster discovery
* [`431e4fb4`](https://github.com/talos-systems/talos/commit/431e4fb4b690fa4955c407d8dd8156bdecd9a2c5) chore: bump Go and Docker dependencies
* [`89f3b9f8`](https://github.com/talos-systems/talos/commit/89f3b9f8d41e33c4cb736917f418ab5cfb9edd83) feat: update etcd to 3.5.1
* [`e60469a3`](https://github.com/talos-systems/talos/commit/e60469a38cb81ace2039bae1927eb6c5f1f0ad1f) feat: initial support for JSON logging
* [`68c420e3`](https://github.com/talos-systems/talos/commit/68c420e3c96a0fdc3b3e6cd75be24cc797c48e09) feat: enable cluster discovery by default
* [`3e100aa9`](https://github.com/talos-systems/talos/commit/3e100aa97734ea809563e23fc36e19bdd3df1920) test: workaround EventsWatch test flakiness
* [`9bd4838a`](https://github.com/talos-systems/talos/commit/9bd4838ac10abbd4760da4fb905d7639a1c26f9f) chore: stop using sonobuoy CLI
* [`6ad45951`](https://github.com/talos-systems/talos/commit/6ad45951975aac48fdcc282e5a0e31344058d07e) docs: fix field names for bonding configuration
* [`d7a3b7b5`](https://github.com/talos-systems/talos/commit/d7a3b7b5b70293884d2e19c6a59b14ebcfa24397) chore: use discovery-client and discovery-api modules
* [`d6309eed`](https://github.com/talos-systems/talos/commit/d6309eed6618abd1b4efd0e3cd18a6c0df39378f) docs: create docs for Talos 0.14
* [`c0fda643`](https://github.com/talos-systems/talos/commit/c0fda6436ae27d8bbc210ee74a1128968108f6a6) fix: attempt to clean up tasks in containerd runner
* [`8cf442da`](https://github.com/talos-systems/talos/commit/8cf442daa60d911caff59d1c2c05dd77652c8b51) chore: bump tools, pkgs, extras
* [`0dad5f4d`](https://github.com/talos-systems/talos/commit/0dad5f4d7846f3fb41ff4ba27395023d33796a61) chore: small cleanup
* [`e3e2113a`](https://github.com/talos-systems/talos/commit/e3e2113adc058940725b1041827d7adb8895c6cf) feat: upgrade CoreDNS during `upgrade-k8s` call
* [`d92c98e1`](https://github.com/talos-systems/talos/commit/d92c98e19a054472bff3e0d646756f16c5e65bbf) docs: fix discovery service documentation link
* [`e44b11c5`](https://github.com/talos-systems/talos/commit/e44b11c595e4cab796128a932843b90734ff6d1d) feat: update containerd to 1.5.7, bump Go dependencies
* [`24129307`](https://github.com/talos-systems/talos/commit/24129307a14d6e59c6bc0d3586c0c95969bde679) docs: make Talos 0.13 docs latest, update documentation
* [`31b6e39e`](https://github.com/talos-systems/talos/commit/31b6e39e58a27e1f2c1be500fca8636971bfa5c6) fix: delete expired affiliates from the discovery service
* [`877a2b6f`](https://github.com/talos-systems/talos/commit/877a2b6fc00eaa7574349f9086d78c04df163840) test: bump CAPI components to v1alpha4
* [`2ba0e0ac`](https://github.com/talos-systems/talos/commit/2ba0e0ac4ad460409101f5f2374e66698adbba4c) docs: add KubeSpan documentation
* [`997873b6`](https://github.com/talos-systems/talos/commit/997873b6d3116b59ebb46df66b8aa1cee06df92f) fix: use ECDSA-SHA512 when generating certs for Talos < 0.13
* [`7137166d`](https://github.com/talos-systems/talos/commit/7137166d1d5817e2d44ead4a01796275f92a9d4a) fix: allow overriding `audit-policy-file` in `kube-apiserver` static pod
* [`8fcd4219`](https://github.com/talos-systems/talos/commit/8fcd4219671a9359880ba344a2ec7fd65dfe5e2a) chore: fix integration-qemu-race
* [`91a858b5`](https://github.com/talos-systems/talos/commit/91a858b53704ede86392fe3c155ce9ab3c2d406f) fix: sort output of the argument builder
* [`657f7a56`](https://github.com/talos-systems/talos/commit/657f7a56b10089e0dc551e178bc85b28d8003243) fix: use ECDSA-SHA256 signature algorithm for Kubernetes certs
* [`983d2459`](https://github.com/talos-systems/talos/commit/983d2459e2aa036774828f773bbaba5697665ae7) feat: suppress logging NTP sync to the console
* [`022c7335`](https://github.com/talos-systems/talos/commit/022c7335f3063675ab744454a2ad4b2c0c19bfbc) fix: add interface route if DHCP4 router is not directly routeable
* [`66a1579e`](https://github.com/talos-systems/talos/commit/66a1579ea7d2a9c4fdf15b762cd024c54b3e8ffb) fix: don't enable 'no new privs' on the system level
* [`423861cf`](https://github.com/talos-systems/talos/commit/423861cf9f99eaf034a4f0cb243d73d1275c3f38) feat: don't drop capabilities if kexec is disabled
* [`facc8c38`](https://github.com/talos-systems/talos/commit/facc8c38a021610da900a45f397aea8ddfc74f1c) docs: fix documentation for cluster discovery
* [`ce65ca4e`](https://github.com/talos-systems/talos/commit/ce65ca4e4a2994f901f01ce5ca269d6df86f0de8) chore: build using only amd64 builders
* [`e9b0f010`](https://github.com/talos-systems/talos/commit/e9b0f010d2855b968a5d8b8b5fbcd268e06ba302) chore: update docker image in the pipeline
* [`5f277713`](https://github.com/talos-systems/talos/commit/5f277713f0f63d04f2817ec852b995dc7e681c52) chore: prepare for 0.13-beta release
* [`5e41dd4a`](https://github.com/talos-systems/talos/commit/5e41dd4a65d74544adf0a91a267df5eb9b0441fa) feat: add an option to configure kubelet node IP based on subnets
* [`72e49029`](https://github.com/talos-systems/talos/commit/72e49029e79b743811667362a6b9797fdb248553) chore: allow insecure discovery in debug builds
* [`d52befd1`](https://github.com/talos-systems/talos/commit/d52befd1acb7bd612e603cf108bb6ece89e3b5f7) fix: ignore 404 for AWS external IPs
* [`44a63e9a`](https://github.com/talos-systems/talos/commit/44a63e9a4d2b26935404e34a474c7df0651fe2ee) feat: update containerd to 1.5.6
* [`0e0fb684`](https://github.com/talos-systems/talos/commit/0e0fb68478d93bcabeccfafe055ebab38e040135) release(v0.13.0-alpha.3): prepare release
* [`4044372e`](https://github.com/talos-systems/talos/commit/4044372e12ff5308ba9cb9178a7e6b3b32955aab) feat: harvest discovered endpoints and push them via discovery svc
* [`9a51aa83`](https://github.com/talos-systems/talos/commit/9a51aa83581b25bdb0604904027a4cedf21b8123) feat: add an option to skip downed peers in KubeSpan
* [`cbbd7c68`](https://github.com/talos-systems/talos/commit/cbbd7c68219808a4f4b0d805203326019ce14ec9) feat: publish node's ExternalIPs as node addresses
* [`0f60ef6d`](https://github.com/talos-systems/talos/commit/0f60ef6d38f9f5978a19e0ca4c6729af03a11f0e) fix: reset inputs back to initial state in secrets.APIController
* [`64cb873e`](https://github.com/talos-systems/talos/commit/64cb873ec4421d43b291acb8afe75f65728d5732) feat: override static pods default args by extra Args
* [`ecdd7757`](https://github.com/talos-systems/talos/commit/ecdd7757fb5906d6fa904581efff74a16b22ae4b) test: workaround race in the tests with zaptest package
* [`9c67fde7`](https://github.com/talos-systems/talos/commit/9c67fde759de1e2a9f2b4406d85485d3d71c3d99) release(v0.13.0-alpha.2): prepare release
* [`30ae7142`](https://github.com/talos-systems/talos/commit/30ae714243379aaa3fb1e93023c2249ff3c3b4e3) feat: implement integration with Discovery Service
* [`353d632a`](https://github.com/talos-systems/talos/commit/353d632ae5d944a8662f0746ff8e757a67ffca53) feat: add nocloud platform support
* [`628fbf9b`](https://github.com/talos-systems/talos/commit/628fbf9b48d98df1063285b14958c94d246ce102) chore: update Linux to 5.10.69
* [`62acd625`](https://github.com/talos-systems/talos/commit/62acd6251637250dbea7d408d8cd4d5eb1f18713) fix: check trustd API CA on worker nodes
* [`ba27bc36`](https://github.com/talos-systems/talos/commit/ba27bc366fb3166b22f1bda909b9ede486ad8c7d) feat: implement Hetzner Cloud support for virtual (shared) IP
* [`95f440ea`](https://github.com/talos-systems/talos/commit/95f440eaa06d2a558fc828c11b451b6aed8d5855) test: add fuzz test for configloader
* [`d2cf021d`](https://github.com/talos-systems/talos/commit/d2cf021d8ffb6d6188b2d50f1f7b9c24df0aac84) chore: remove deprecated "join" term
* [`0e18e280`](https://github.com/talos-systems/talos/commit/0e18e2800fc038a86ed2fd9b042278ae29070bb5) chore: bump dependencies
* [`b450b7ce`](https://github.com/talos-systems/talos/commit/b450b7cef0d84a9ad975d8b50b93854bb0645173) chore: deprecate Interfaces and Routes APIs
* [`cddcb962`](https://github.com/talos-systems/talos/commit/cddcb9622bce7ae3626b8b9dce8c622a0e30ba66) fix: find devices without partition table
* [`b1b6d613`](https://github.com/talos-systems/talos/commit/b1b6d61365c900c4ebfc377b86067ddbe4fe8353) fix: check for existence of dhcp6 FQDN first
* [`519999b8`](https://github.com/talos-systems/talos/commit/519999b8462ff4931ed12323417b9a9c8c20b369) fix: use readonly mode when probing devices with `All` lookup
* [`2b520420`](https://github.com/talos-systems/talos/commit/2b5204200a4bd22aa78245b201c471136016ce3a) feat: enable resource API in the maintenance mode
* [`452893c2`](https://github.com/talos-systems/talos/commit/452893c260b920c601b0fc22ff018dc2d4341fca) fix: make probe open blockdevice in readonly mode
* [`96bccdd3`](https://github.com/talos-systems/talos/commit/96bccdd3b625f0edefd685cadf5f2cd46e3111f5) test: update CABPT provider to 0.3 release
* [`d9eb18bf`](https://github.com/talos-systems/talos/commit/d9eb18bfddf69a61712d930b53aec489a806394a) fix: containerd log symlink
* [`efa7f48e`](https://github.com/talos-systems/talos/commit/efa7f48e08382249609e0ecd3241c01a2e46df73) docs: quicklinks on landing page
* [`1cb9f282`](https://github.com/talos-systems/talos/commit/1cb9f282b541505f2d61ae0a57655cba9ae62843) fix: don't marshal clock with SecretsBundle
* [`b27c75b3`](https://github.com/talos-systems/talos/commit/b27c75b30f689dafa7d4effd0c2eaf8f0f3f8caf) release(v0.13.0-alpha.1): prepare release
* [`9d803d75`](https://github.com/talos-systems/talos/commit/9d803d75bfbe788fa5c2ef2ae0639de31e172c7b) chore: bump dependencies and drop firecracker support
* [`50a24104`](https://github.com/talos-systems/talos/commit/50a24104820e26bb99e66ab68be2bd9a6c17b0be) feat: add operating system version field to discovery
* [`085c61b2`](https://github.com/talos-systems/talos/commit/085c61b2ec432c586daa77464910e967a223ebe0) chore: add a special condition to check for kubeconfig readiness
* [`21cdd854`](https://github.com/talos-systems/talos/commit/21cdd854036498fbeb9f6e4d058a0edd55ed4856) fix: add node address to the list of allowed IPs (kubespan)
* [`fdd80a12`](https://github.com/talos-systems/talos/commit/fdd80a1234dc993cc01daa7764ba5a9db2fdc275) feat: add an option to continue booting on NTP timeout
* [`ef368498`](https://github.com/talos-systems/talos/commit/ef36849899b18bbb35c6116fdf35aa580a50a5e5) feat: add routes, routing rules and nftables rules for KubeSpan
* [`ed12379f`](https://github.com/talos-systems/talos/commit/ed12379f2f49fcbca84080f1066cf52dc202bd2d) fix: patch multi nodes support
* [`d943bb0e`](https://github.com/talos-systems/talos/commit/d943bb0e280e90f3592d9f7b67813b7a15818c84) feat: update Kubernetes to 1.22.2
* [`d0585fb6`](https://github.com/talos-systems/talos/commit/d0585fb6b303dfdd7fc80a76024915df31c72389) feat: reboot via kexec
* [`3de505c8`](https://github.com/talos-systems/talos/commit/3de505c894274bfd5248b6c597f6e3a53f873ba1) fix: skip bad cloud-config in OpenStack platform
* [`a394d1e2`](https://github.com/talos-systems/talos/commit/a394d1e20ba82de7d05e4d3f91823a98362ac9ee) fix: tear down control plane static pods when etcd is stopped
* [`1c05089b`](https://github.com/talos-systems/talos/commit/1c05089bb22c7c1050e95cf8d7bea8b763a0e86f) feat: implement KubeSpan manager for Wireguard peer state
* [`ec7f44ef`](https://github.com/talos-systems/talos/commit/ec7f44efe4f89e7ed207cbd5fe3748953ccfdf28) fix: completely prevent editing resources other than mc
* [`19a8ae97`](https://github.com/talos-systems/talos/commit/19a8ae97c69949f7c2421154b2ae4e52a905ff63) feat: add vultr.com cloud support
* [`0ff4c7cd`](https://github.com/talos-systems/talos/commit/0ff4c7cdb2b9505823f4c4504ec9bf4d7fddf5c5) fix: write KubernetesCACert chmodded 0400 instead of 0500
* [`a1c9d649`](https://github.com/talos-systems/talos/commit/a1c9d64907cce75bcb566f3ee394734e29b3932d) fix: update the way results are retrieved for certified conformance
* [`a0594540`](https://github.com/talos-systems/talos/commit/a0594540451a7636f8cd4bbe835913d31f66d0de) chore: build using Go 1.17
* [`7c5045bd`](https://github.com/talos-systems/talos/commit/7c5045bd929fcf5028cae3840970e692ef3bc7c9) release(v0.13.0-alpha.0): prepare release
* [`ee2dce6c`](https://github.com/talos-systems/talos/commit/ee2dce6c1a0e8838e587a9136afd1b7381000432) chore: bump dependencies
* [`ef022959`](https://github.com/talos-systems/talos/commit/ef022959280f156d6311836ef9cc2d01e5e3ae7d) fix: print etcd member ID in hex
* [`5ca1fb82`](https://github.com/talos-systems/talos/commit/5ca1fb822125483be290e79d8828bba246fda51c) fix: multiple fixes for KubeSpan and Wireguard implementation
* [`b1bd6425`](https://github.com/talos-systems/talos/commit/b1bd64250820df3fcb5214368ce9c8cf4634970a) fix: build platform images
* [`3b5f4038`](https://github.com/talos-systems/talos/commit/3b5f4038de2f855b3b634e4abb1c564da624e2fc) feat: add scaleway.com cloud support
* [`f156ab18`](https://github.com/talos-systems/talos/commit/f156ab1847f2ad1ca2a2548b299a713ee5fe0fcd) feat: add upcloud.com cloud support
* [`c3b2429c`](https://github.com/talos-systems/talos/commit/c3b2429ce91edc4f8f9e720a4b144bc941046fc3) fix: suppress spurious Kubernetes API server cert updates
* [`ff90b575`](https://github.com/talos-systems/talos/commit/ff90b5751e17a60fc6ca4274f35da7ddcca44fea) feat: implement KubeSpan peer generation controller
* [`14c69df5`](https://github.com/talos-systems/talos/commit/14c69df5063e71765b9316ae37657fda2388c60e) fix: correctly parse multiple pod/service CIDRs
* [`69897dbb`](https://github.com/talos-systems/talos/commit/69897dbba402812403c0c15d6cb8d2a771ea5a88) feat: drop some capabilities to be never available
* [`51e9836b`](https://github.com/talos-systems/talos/commit/51e9836b01926d1619d662e6e08df29210ff94e5) docs: promote 0.12 docs to be the latest
* [`812d59c7`](https://github.com/talos-systems/talos/commit/812d59c70085b54136e3b56127b0efea7ddb60af) feat: add hetzner.com cloud support
* [`d53e9e89`](https://github.com/talos-systems/talos/commit/d53e9e89633258d85c2232b85855535ebb42c417) chore: use named constants
* [`2dfe7f1f`](https://github.com/talos-systems/talos/commit/2dfe7f1fc654c8bec83b632a98dbaa8d1b90a521) chore: bump tools to the latest version
* [`82b130e7`](https://github.com/talos-systems/talos/commit/82b130e789aa4376e1f0e2d086233e630b410f74) docs: document required options for extraMounts
* [`af662210`](https://github.com/talos-systems/talos/commit/af6622109faecdf03aed43b047035904110c7580) feat: implement Kubernetes cluster discovery registry
* [`2c66e1b3`](https://github.com/talos-systems/talos/commit/2c66e1b3c5d4c34c5d4cdc155c32f2808a5f1c69) feat: provide building of local `Affiliate` structure (for the node)
* [`d69bd2af`](https://github.com/talos-systems/talos/commit/d69bd2af3e3d3bf12b6d74078e9eedf3dc8752fc) chore: enable GPG identity check for Talos
* [`8dbd851f`](https://github.com/talos-systems/talos/commit/8dbd851fde3febb5999df694a079121b43519aa9) chore: update tools/pkgs/extras to the new version
* [`0b347570`](https://github.com/talos-systems/talos/commit/0b347570a7aca0a133d6b6e6cc8d3e0355630480) feat: use dynamic NodeAddresses/HostnameStatus in Kubernetes certs
* [`bd5b9c96`](https://github.com/talos-systems/talos/commit/bd5b9c96e2563249a5633433703493b292b83ee9) fix: correctly define example for `extraMounts`
* [`01cca099`](https://github.com/talos-systems/talos/commit/01cca099f40ec75d1e047a84c89692eb254e8adf) docs: update docs for Talos 0.12 release
* [`668627d5`](https://github.com/talos-systems/talos/commit/668627d5b8ec79ec955eb1254732b1cc031d3aec) feat: add subnet filter for etcd address
* [`3c3c281b`](https://github.com/talos-systems/talos/commit/3c3c281bff8481f680feca9cf01af413a38e6973) chore: bump dependencies via dependabot
* [`f8bebba2`](https://github.com/talos-systems/talos/commit/f8bebba2de3999b7a36fecb2d6b90e583372c98f) fix: ignore error on duplicate for `MountStatus`
* [`6956edd0`](https://github.com/talos-systems/talos/commit/6956edd0bfae6c6c5d6eba00a22bc3a4cb7f54ea) feat: add node address filters, filter out k8s addresses for Talos API
* [`caee24bf`](https://github.com/talos-systems/talos/commit/caee24bf61136daecb095991a6e439f7fbf40da2) feat: implement KubeSpan identity controller
* [`da0f6e7e`](https://github.com/talos-systems/talos/commit/da0f6e7e1d295dce0c44c1854363528a6ffedde1) fix: allow updating diskSelector option
* [`761ccaf3`](https://github.com/talos-systems/talos/commit/761ccaf32348d8664eb0d5d1a51f6abb19ca52a6) feat: provide machine configuration for KubeSpan and cluster discovery
* [`a81e30cb`](https://github.com/talos-systems/talos/commit/a81e30cb46326fbdd433f37dc37549b588a2bc7a) docs: add bootstrap command to VMware docs
* [`97da354c`](https://github.com/talos-systems/talos/commit/97da354cc0e4a965e14b8939c426150d5c12f228) fix: do not panic on invalid machine configs
* [`c4048e26`](https://github.com/talos-systems/talos/commit/c4048e263d22682142f12fc4af6ac58c679273f0) fix: don't extract nil IPs in the GCP platform
* [`ba169c6f`](https://github.com/talos-systems/talos/commit/ba169c6f91948cf057251236fa7a727a05253639) feat: provide talosctl.exe for Windows
* [`6312f473`](https://github.com/talos-systems/talos/commit/6312f473e63df50287e6801c079242e2311a23e6) fix: properly handle omitempty fields in the validator
* [`7f22879a`](https://github.com/talos-systems/talos/commit/7f22879af0882af4cdebe9c84afb96ae68eb9f20) feat: provide random node identity
* [`032e7c6b`](https://github.com/talos-systems/talos/commit/032e7c6b863b5ca02cfa16df79c88950544dbffb) chore: import yaml.v3 consistently
* [`80b5f0e7`](https://github.com/talos-systems/talos/commit/80b5f0e7f78f09a11ed249f9f1dc7b05ea275ab0) fix: validate IP address returned as HTTP response in platform code
* [`c9af8f7f`](https://github.com/talos-systems/talos/commit/c9af8f7ff17facc18f10675879ed04982a000f6f) docs: fork docs for 0.13
* [`85cda1b9`](https://github.com/talos-systems/talos/commit/85cda1b956b042ba20696637248999d46f63ccc9) feat: provide MountStatus resource for system partition mounts
* [`950f122c`](https://github.com/talos-systems/talos/commit/950f122c95e225858e77083f2490481ed8d21aef) chore: update versions in upgrade tests
* [`83fdb772`](https://github.com/talos-systems/talos/commit/83fdb7721f45aa075898caf05a4b6856d3c5f330) feat: provide first NIC hardware addr as a resource
* [`5f5ac12f`](https://github.com/talos-systems/talos/commit/5f5ac12f1dc8aeb3a8598e57d965471e93fe3724) fix: properly case the VMware name
* [`0a6048f4`](https://github.com/talos-systems/talos/commit/0a6048f469da02efad7e84eb237e6fdeb85b7e33) fix: don't allow bootstrap if etcd data directory is not empty
* [`e24b93b4`](https://github.com/talos-systems/talos/commit/e24b93b4e120448f37109599f3e9eb15954b147a) fix: cgroup delegate
* [`751f64f9`](https://github.com/talos-systems/talos/commit/751f64f9bc10e9ad8508ade9e3a6a14aaaa54d57) docs: add release notes for 0.12, support matrix
* [`57a77696`](https://github.com/talos-systems/talos/commit/57a77696ef2b255a59ee4ed213a1a3971a5e2943) feat: update Kubernetes to 1.22.1
* [`244b08cc`](https://github.com/talos-systems/talos/commit/244b08cc198a8ba676bb9acadcbdd23a161b0876) chore: bump dependencies
* [`576ba195`](https://github.com/talos-systems/talos/commit/576ba195784abf275256c861d5f811ab1f7b1102) fix: do not set KSPP kernel params in container mode
* [`b8c92ede`](https://github.com/talos-systems/talos/commit/b8c92ede52ed515dba68abf4fb1cc6494d510827) fix: don't support cgroups nesting in process runner
* [`9bb0b797`](https://github.com/talos-systems/talos/commit/9bb0b79709a502ab49ea9bacd7e54617554d4cc3) test: adapt tests to the cgroupsv2
* [`1abc12be`](https://github.com/talos-systems/talos/commit/1abc12be13208ad1da03492a1b88d2c1ec0d5d33) fix: extramount should have `yaml:",inline"` tag
* [`2b614e43`](https://github.com/talos-systems/talos/commit/2b614e430e478cc111db018996ab2c8f763e4f92) feat: check if cluster has deprecated resources versions
* [`0b86edab`](https://github.com/talos-systems/talos/commit/0b86edab80cf4dd01f330d7721b130f5017d84a5) fix: don't panic if the machine config doesn't have network (EM)
* [`8bef41e4`](https://github.com/talos-systems/talos/commit/8bef41e4bacc4190976657ae5021afecd2d6e001) fix: make sure file mode is same (reproducibility issue)
* [`fcfca55a`](https://github.com/talos-systems/talos/commit/fcfca55a059e92fcda198baa321c4c63bda1f0a4) chore: do not check that go mod tidy gives empty output
* [`5ce92ca5`](https://github.com/talos-systems/talos/commit/5ce92ca5163616fcd7abe16c4efc3a100953b246) docs: ensure azure VMs are 0 indexed
* [`c601dc73`](https://github.com/talos-systems/talos/commit/c601dc73f6d08c031afaf4193c2fe5740b9f29c5) chore: update versions to final release tags
* [`82731124`](https://github.com/talos-systems/talos/commit/82731124b2c7ce08e740fbcd350abaceeb08b103) chore: run e2e-qemu test against Talos with race-detector enabled
* [`37ea2c9c`](https://github.com/talos-systems/talos/commit/37ea2c9ca240c92f93c61ca640e9b4bb27bf91ec) feat: support for route source addresses in the configuration
* [`0ef8f83a`](https://github.com/talos-systems/talos/commit/0ef8f83acfa509700b241e86ebdaf79b5b9a517d) chore: bump dependencies via dependabot
* [`2108fd7b`](https://github.com/talos-systems/talos/commit/2108fd7b6c90c4266518a0c28398f9b74a53968b) feat: update Linux to 5.10.58 and many pkgs updates
* [`6ee690d9`](https://github.com/talos-systems/talos/commit/6ee690d9a778c559b5cc528147bb0db5e808914e) release(v0.12.0-alpha.1): prepare release
* [`1ed5e545`](https://github.com/talos-systems/talos/commit/1ed5e545385e160fe3b61e6dbbcaa8a701437b62) feat: add ClusterID and ClusterSecret
* [`228b3761`](https://github.com/talos-systems/talos/commit/228b376163597cd825e4a142e6b4bdea0f870365) chore: run etcd as non-root user
* [`3518219b`](https://github.com/talos-systems/talos/commit/3518219bff44f71a60ad8e448e518844d1b933fd) chore: drop deprecated `--no-reboot` param and KernelCurrentRoot const
* [`33d1c3e4`](https://github.com/talos-systems/talos/commit/33d1c3e42582649f25a44fc3c86007bcebbc80b3) chore: run apid and trustd services as non-root user
* [`dadaa65d`](https://github.com/talos-systems/talos/commit/dadaa65d542171d25317840fcf35fa3979cf0632) feat: print uid/gid for the files in `ls -l`
* [`e6fa401b`](https://github.com/talos-systems/talos/commit/e6fa401b663d0ebd4374c9e47a7ca6150a4756cd) fix: enable seccomp default profile by default
* [`8ddbcc96`](https://github.com/talos-systems/talos/commit/8ddbcc9643113c15de538fc070b7053d1c6efdfc) feat: validate if extra fields present in the decoder
* [`5b57a980`](https://github.com/talos-systems/talos/commit/5b57a98008c64d7cb07729fd9b31a0e3493c289c) chore: update Go to 1.16.7, Linux to 5.10.57
* [`eefe1c21`](https://github.com/talos-systems/talos/commit/eefe1c21c30fa2cd281fc5524b2e88553f6fdfcc) feat: add new etcd members in learner mode
* [`b1c66fba`](https://github.com/talos-systems/talos/commit/b1c66fbad113400729cf4db806e30192bf7e0462) feat: implement Equinix Metal support for virtual (shared) IP
* [`62242f97`](https://github.com/talos-systems/talos/commit/62242f979e1921ed8abfa06a26564ea0bf8a5fb3) chore: require GPG signatures
* [`faecae44`](https://github.com/talos-systems/talos/commit/faecae44fde60fc626ccb01da3b221519a9d41d7) feat: make ISO builds reproducible
* [`887c2326`](https://github.com/talos-systems/talos/commit/887c2326a4f81c846e3aa3bd1787bc840877e494) release(v0.12.0-alpha.0): prepare release
* [`a15f0184`](https://github.com/talos-systems/talos/commit/a15f01844fdaf0d3e2dad2750d9353d03e18dea2) fix: move etcd PKI under /system/secrets
* [`eb02afe1`](https://github.com/talos-systems/talos/commit/eb02afe18be63bf483a0467f655611561aef10f6) fix: match correctly routes on the address family
* [`cb948acc`](https://github.com/talos-systems/talos/commit/cb948accfeca13c57b3b512dc8a06425989294f9) feat: allow multiple addresses per interface
* [`e030b2e8`](https://github.com/talos-systems/talos/commit/e030b2e8bb0a65abf4e1f7b5f27348631210ebc4) chore: use k8s 1.21.3 in CAPI tests for now
* [`e08b4f8f`](https://github.com/talos-systems/talos/commit/e08b4f8f9e72f8db1116b4bbe395d49b4bccb460) feat: implement sysctl controllers
* [`fdf6b243`](https://github.com/talos-systems/talos/commit/fdf6b2433c40613bcb039852a96196dbe9b7b5e2) chore: revert "improve artifacts generation reproducibility"
* [`b68ed1eb`](https://github.com/talos-systems/talos/commit/b68ed1eb896039ec1319db2e3d6d364034c86863) fix: make route resources ID match closer routing table primary key
* [`585f6337`](https://github.com/talos-systems/talos/commit/585f633710abb7a6d863b54c37aa65c50a3c7312) fix: correctly handle nodoc for struct fields
* [`f2d394dc`](https://github.com/talos-systems/talos/commit/f2d394dc42f9ec704050db0a8a928a889483ce3e) docs: add AMIs for v0.11.5
* [`d0970cbf`](https://github.com/talos-systems/talos/commit/d0970cbfd696b28b201b232a03da2119f664afbd) feat: bootstrap token limit
* [`5285a46d`](https://github.com/talos-systems/talos/commit/5285a46d78ef2fc76594aad4ad4acb75312bc0a7) fix: maintenance mode reason message
* [`009d15e8`](https://github.com/talos-systems/talos/commit/009d15e8dc6e75eca6b5963dddf8063941099f14) chore: use etcd client TryLock function on upgrade
* [`4dae9ea5`](https://github.com/talos-systems/talos/commit/4dae9ea55c087c28a9d7a8d241e0ec3a7a1b8ca3) chore: use vtprotobuf compiled marshaling in Talos API
* [`7ca5749a`](https://github.com/talos-systems/talos/commit/7ca5749ad4267701ce639d0f0d91c10a7f9c1d3d) chore: bump dependencies via dependabot
* [`b2507b41`](https://github.com/talos-systems/talos/commit/b2507b41d250b989b9c13ad23e16202cd53a18d2) chore: improve artifacts generation reproducibility
* [`1f7dad23`](https://github.com/talos-systems/talos/commit/1f7dad234b480c7a5e3484ccf10180747c979036) chore: update PKGS version (512 cpus, new ca-certficates)
* [`1a2e78a2`](https://github.com/talos-systems/talos/commit/1a2e78a24e997241c4cd18dfac3c2d971ba78116) fix: update go-blockdevice
* [`6d6ed117`](https://github.com/talos-systems/talos/commit/6d6ed1170f3f28e7f559ccdf64e7c34dfee022a0) chore: use parallel xz with higher compression level
* [`571f7db1`](https://github.com/talos-systems/talos/commit/571f7db1bb44a0dcb5e373f9c37396d50eb0e8f4) chore: workaround GitHub new release notes limit
* [`09d70b7e`](https://github.com/talos-systems/talos/commit/09d70b7eafb18343eb4ca57d7f8b84e4ccd2fcfb) feat: update Kubernetes to v1.22.0
* [`f25f10e7`](https://github.com/talos-systems/talos/commit/f25f10e73ec534acd7cc483f254d612d8a7c1858) feat: add an option to disable PSP
* [`7c6e4cf2`](https://github.com/talos-systems/talos/commit/7c6e4cf230ba1f30da664374c41c934d1e6620bc) feat: allow both DHCP and static addressing for the interface
* [`3c566dbc`](https://github.com/talos-systems/talos/commit/3c566dbc30595467a3789707c6e993aa92f36df6) fix: remove admission plugins enabled by default from the list
* [`69ead373`](https://github.com/talos-systems/talos/commit/69ead37353b7e3aa7f089c70073037a6eba37767) fix: preserve PMBR bootable flag correctly
* [`dee63051`](https://github.com/talos-systems/talos/commit/dee63051702d49f495bfb28b4be74ed8b39143ad) fix: align partitions with minimal I/O size
* [`62890229`](https://github.com/talos-systems/talos/commit/628902297d2efe93e6388377b2ea6d4beda83095) feat: update GRUB to 2.06
* [`b9d04928`](https://github.com/talos-systems/talos/commit/b9d04928d960f9d576671c6f3511cf242ff31cb7) feat: move system processes to cgroups
* [`0b8681b4`](https://github.com/talos-systems/talos/commit/0b8681b4b49ab109b8863792d48c2f551d1ceeb5) fix: resolve several issues with Wireguard link specs
* [`f8f4bf3b`](https://github.com/talos-systems/talos/commit/f8f4bf3baef31d4ac957ec68cd869adea1e931cd) docs: add disk encryptions examples
* [`79b8fa64`](https://github.com/talos-systems/talos/commit/79b8fa64b9453917860faae3df5d14647186b9ba) feat: update containerd to 1.5.5
* [`539f4209`](https://github.com/talos-systems/talos/commit/539f42090e436921a23087296cde6eaf7e495b5e) chore: bump dependencies via dependabot
* [`0c7ce1cd`](https://github.com/talos-systems/talos/commit/0c7ce1cd814354213a1a6c7a9251b166ee58c493) feat: remove remnants of bootkube support
* [`d4f9804f`](https://github.com/talos-systems/talos/commit/d4f9804f8659562f6152ae73cb1788f6f6d6ad89) chore: fix typos
* [`5f027615`](https://github.com/talos-systems/talos/commit/5f027615ffac68e0a484a5da4827a6589bae3880) feat: expose more encryption options to the machine config
* [`585152a0`](https://github.com/talos-systems/talos/commit/585152a0be051accd4cb8b7c2f130c5a92dfd32d) chore: bump dependencies
* [`fc66ec59`](https://github.com/talos-systems/talos/commit/fc66ec59691fb1b9d00b27e1f7b34c870a09d717) feat: set oom score for main processes
* [`df54584a`](https://github.com/talos-systems/talos/commit/df54584a33d88de13deadcb87a5cfa9c1f9b3961) fix: drop linux capabilities
* [`f65d0b73`](https://github.com/talos-systems/talos/commit/f65d0b739bd36a57979f9bf26c3092ac544e607c) docs: add 0.11.3 AMIs
* [`7332d636`](https://github.com/talos-systems/talos/commit/7332d63695074dd5eef35ad545d48aff857fbde8) fix: bump pkgs for new kernel 5.10.52
</p>
</details>

### Dependency Changes

* **github.com/cosi-project/runtime**               25f235cd0682 -> 264f8fcd1a4f
* **github.com/pkg/errors**                         v0.9.1 **_new_**
* **github.com/spf13/cobra**                        v1.2.1 -> v1.3.0
* **github.com/talos-systems/capi-utils**           e994250edede **_new_**
* **github.com/talos-systems/go-retry**             v0.3.1 **_new_**
* **github.com/talos-systems/talos**                70d2505b7c88 -> v1.0.0-beta.1
* **github.com/talos-systems/talos/pkg/machinery**  2e463348b26f -> v1.0.0-beta.1
* **go.uber.org/zap**                               v1.18.1 -> v1.21.0
* **golang.org/x/oauth2**                           a8dc77f794b6 -> d3ed0bb246c8
* **google.golang.org/grpc**                        v1.39.0 -> v1.44.0
* **k8s.io/api**                                    v0.21.3 -> v0.23.4
* **k8s.io/apiextensions-apiserver**                v0.19.1 -> v0.23.0
* **k8s.io/apimachinery**                           v0.21.3 -> v0.23.4
* **k8s.io/client-go**                              v0.21.3 -> v0.23.4
* **sigs.k8s.io/cluster-api**                       v0.3.20 -> v1.1.2
* **sigs.k8s.io/controller-runtime**                v0.6.3 -> v0.11.1

Previous release can be found at [v0.1.1](https://github.com/siderolabs/theila/releases/tag/v0.1.1)

## [theila 0.1.0-alpha.2](https://github.com/talos-systems/theila/releases/tag/v0.1.0-alpha.2) (2021-07-23)

Welcome to the v0.1.0-alpha.2 release of theila!  
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
- reset the node EPHEMERAL partition.


### Contributors

* Artem Chernyshev
* Andrew Rynhard
* Andrew Rynhard

### Changes
<details><summary>48 commits</summary>
<p>

* [`e5b6f29`](https://github.com/talos-systems/theila/commit/e5b6f29fd298904e06284a67681cc0ce5135145f) feat: implement node Reset
* [`bcb7d23`](https://github.com/talos-systems/theila/commit/bcb7d237c31f42a35f5c3b53e7615ddae1ce0a8b) fix: node IP not being truncated
* [`e576d33`](https://github.com/talos-systems/theila/commit/e576d33ba40f629eed14668f2d9bf77d7fef62c2) feat: add upgrade UI for CAPI clusters
* [`10cdce7`](https://github.com/talos-systems/theila/commit/10cdce7fcc219af969a85a41d18fb904936faa0a) fix: server labels key/value order and chevron orientation
* [`4007177`](https://github.com/talos-systems/theila/commit/40071775d6de1eea697f67e55441c384c86e75d9) feat: implement Kubernetes upgrade UI components
* [`f4917ee`](https://github.com/talos-systems/theila/commit/f4917eecfb3173acf7518883c738118c8537d657) fix: accumulate chart updates into a single update
* [`414d76c`](https://github.com/talos-systems/theila/commit/414d76c1c926695e5d66787b34decae92e151b45) feat: implement upgrade controller
* [`36742ea`](https://github.com/talos-systems/theila/commit/36742ea5ab1e8a983b73f73443c1cf122a90d054) feat: introduce create, delete and update gRPC APIs
* [`2b3d314`](https://github.com/talos-systems/theila/commit/2b3d314a460b385d8c13bdd025fadb37b5508bdc) feat: install internal COSI runtime alongside with K8s and Talos
* [`ae7f784`](https://github.com/talos-systems/theila/commit/ae7f784d08621d18075b1763f026a7513d9d9dcb) refactor: move all generated TypeScript files under `frontend/src/api`
* [`61bad64`](https://github.com/talos-systems/theila/commit/61bad64540c28fb0520a39a6c64d64c3e9353361) release(v0.1.0-alpha.1): prepare release
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

### Changes since v0.1.0-alpha.1
<details><summary>10 commits</summary>
<p>

* [`e5b6f29`](https://github.com/talos-systems/theila/commit/e5b6f29fd298904e06284a67681cc0ce5135145f) feat: implement node Reset
* [`bcb7d23`](https://github.com/talos-systems/theila/commit/bcb7d237c31f42a35f5c3b53e7615ddae1ce0a8b) fix: node IP not being truncated
* [`e576d33`](https://github.com/talos-systems/theila/commit/e576d33ba40f629eed14668f2d9bf77d7fef62c2) feat: add upgrade UI for CAPI clusters
* [`10cdce7`](https://github.com/talos-systems/theila/commit/10cdce7fcc219af969a85a41d18fb904936faa0a) fix: server labels key/value order and chevron orientation
* [`4007177`](https://github.com/talos-systems/theila/commit/40071775d6de1eea697f67e55441c384c86e75d9) feat: implement Kubernetes upgrade UI components
* [`f4917ee`](https://github.com/talos-systems/theila/commit/f4917eecfb3173acf7518883c738118c8537d657) fix: accumulate chart updates into a single update
* [`414d76c`](https://github.com/talos-systems/theila/commit/414d76c1c926695e5d66787b34decae92e151b45) feat: implement upgrade controller
* [`36742ea`](https://github.com/talos-systems/theila/commit/36742ea5ab1e8a983b73f73443c1cf122a90d054) feat: introduce create, delete and update gRPC APIs
* [`2b3d314`](https://github.com/talos-systems/theila/commit/2b3d314a460b385d8c13bdd025fadb37b5508bdc) feat: install internal COSI runtime alongside with K8s and Talos
* [`ae7f784`](https://github.com/talos-systems/theila/commit/ae7f784d08621d18075b1763f026a7513d9d9dcb) refactor: move all generated TypeScript files under `frontend/src/api`
</p>
</details>

### Dependency Changes

This release has no dependency changes

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

