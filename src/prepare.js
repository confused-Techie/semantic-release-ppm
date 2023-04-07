const execa = require("execa");
const path = require("path");

/**
  * @desc Handles the logic of writing the new version to the `package.json`
  * @param {*} pluginConfig - The semantic-release plugin config.
  * @param {*} context - The context provided by semantic-release.
  * @see {@link https://github.com/semantic-release/npm/ }
 */
module.exports = async(pluginConfig, context) => {
  // The below is borrowed heavily from `@semantic-release/npm`
  const basePath = pluginConfig.pkgRoot ? path.resolve(context.cwd, pluginConfig.pkgRoot) : context.cwd;
  const version = context.nextRelease.version;

  context.logger.log(`Write version: ${version} to package.json in ${basePath}`);

  const versionResult = execa(
    "npm",
    ["version", version, "--no-git-tag-version" ],
    {
      cwd: basePath,
      env: context.env,
      preferLocal: true,
    }
  );

  versionResult.stdout.pipe(context.stdout, { end: false });
  versionResult.stderr.pipe(context.stderr, { end: false });

  await versionResult;
};
