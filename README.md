# @pulsar-edit/semantic-release-ppm

An experimental plugin for [`semantic-release`](https://github.com/semantic-release/) to help publish packages to the Pulsar Package Registry.

| Step | Description |
| --- | --- |
| `verifyConditions` | Verify the presence of a compatible API token. And your `package.json` |
| `prepare` | Update the `package.json` version. |
| `publish` | Publish the Package to the PPR |

## Install

```bash
$ npm install @pulsar-edit/semantic-release-ppm -D
```

## Usage

Alright, now for the experimental part.

This package needs another plugin to handle actually publishing the tag of the package to GitHub, the [`github`](https://github.com/semantic-release/github) plugin is recommended.

Additionally this plugin tries to have broad support for many situations.

Firstly, your API key.

Your Pulsar API key can be defined as an environment variable under any of the following names:

* `ATOM_ACCESS_TOKEN`: The old way
* `PULSAR_ACCESS_TOKEN`: The rebrand way
* `PULSAR_API_TOKEN`: The recommended way

Then additionally, you can choose if you want to continue using the actual PPM CLI tool. Maybe it's already installed in your CI or you need it for you workflow.
To do so either set the option for this plugin of `USE_PPM: true` or set the env var `USE_PPM: true` either one, will make this plugin use the PPM CLI, which of course means you have to have it installed.

Otherwise by default, and in the absence of these values (there is no need to set them to false) then the API will be used, and no installation of PPM is needed.
