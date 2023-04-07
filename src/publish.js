const execa = require("execa");
const superagent = require("superagent");

module.exports = async(pkg, pluginConfig, context) => {

  // Since we will allow users to either use PPM if they've installed CI or prefer
  // it for whatever reason we will check for a PPM option in their config.

  context.logger.log(`Publishing version: ${context.nextRelease.version} to the Pulsar Package Registry.`);

  if (pluginConfig.USE_PPM || context.env.USE_PPM) {

    let result = execa(
      "apm",
      ["publish", "--tag", context.nextRelease.gitTag],
      {
        cwd: context.cwd,
        env: context.env,
      }
    );

    result.stdout.pipe(context.stdout, { end: false });
    result.stderr.pipe(context.stderr, { end: false });

    await result;

    context.logger.log(`Published ${pkg.name}@${context.nextRelease.version}`);
    return { name: pkg.name, url: `https://web.pulsar-edit.dev/packages/${pkg.name}` };

  } else {
    // Then we will use our preffered handling

    const useToken = context.env.ATOM_ACCESS_TOKEN ?? context.env.PULSAR_ACCESS_TOKEN ?? context.env.PULSAR_API_TOKEN;

    const packOrThemePath = getPackTypePath(pkg);

    let result = await superagent
      .post(`https://api.pulsar-edit.dev/api/${packOrThemePath}/${name}/versions`)
      .set("Authorization", useToken);

    context.logger.log(result.body);
    context.logger.log(`Published ${pkg.name}@${context.nextRelease.version}`);
    return { name: pkg.name, url: `https://web.pulsar-edit.dev/packages/${pkg.name}` };
  }
};

function getPackTypePath(pkg) {
  const packPath = "packages";
  const themePath = "themes";
  if (typeof pkg.theme === "string") {

    if (pkg.theme === "ui" || pkg.theme === "syntax") {
      return themePath;
    } else {
      return packpath;
    }
  } else {
    return packPath;
  }
}
