# theila

Cluster management UI which relies on local `~/.talos/config` and provides OS level hooks
by connecting to Talos gRPC API.
Then Kubernetes credentials are requested from the Talos API.

`TALOSCONFIG` environment variable can be used to alter the lookup path for the Talos configuration.

## Compatibility Matrix

Theila versions are compatible with the following versions of Talos:

|               | v0.11 | v0.12  | v0.13 | v0.14 | v1.0  |
| ------------- | ----- | ------ | ----- | ----- | ----- |
| Theila (v0.1) | ✓     | ✓      | ✓     | ✓     |       |
| Theila (v0.2) | ✓     | ✓      | ✓     | ✓     | ✓     |

CAPI compatibility matrix:

|               | v1alpha3 (v0.3) | v1alpha4 (v0.4) | v1beta1 (v1.x) |
| ------------- | --------------- | --------------- | -------------- |
| Theila (v0.1) | ✓               | ✓               |                |
| Theila (v0.2) |                 |                 | ✓              |

## Documentation

For instructions on deploying and managing Talos, see the [Documentation](https://www.talos.dev/docs/latest/).

Theila is delivered in a [single file binary](https://github.com/talos-systems/theila/releases/latest).
All you need to do is to download the file for your OS and run it.
By default it binds `localhost:8080` address.

## Community

- Slack: Join our [slack channel](https://slack.dev.talos-systems.io)
- Support: Questions, bugs, feature requests [GitHub Discussions](https://github.com/siderolabs/talos/discussions)
- Forum: [community](https://groups.google.com/a/talos-systems.com/forum/#!forum/community)
- Twitter: [@SideroLabs](https://twitter.com/SideroLabs)
- Email: [info@SideroLabs.com](mailto:info@SideroLabs.com)

If you're interested in this project and would like to help in engineering efforts, or have general usage questions, we are happy to have you!
We hold a weekly meeting that all audiences are welcome to attend.

## Contributing

Contributions are welcomed and appreciated!
See [Contributing](CONTRIBUTING.md) for our guidelines.

## License

<a href="https://github.com/talos-systems/talos/blob/master/LICENSE">
  <img alt="GitHub" src="https://img.shields.io/github/license/talos-systems/talos?style=flat-square">
</a>
