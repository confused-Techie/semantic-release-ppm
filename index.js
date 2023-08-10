import AggregateError from "aggregate-error";
import verify from "./src/verify.js";
import preparePPM from "./src/prepare.js";
import publishPPM from "./src/publish.js";
import getPkg from "./src/get-pkg.js";

let verified, prepared;

/**
  * @desc Called by semantic-release during the verification step.
  * @param {*} pluginConfig - The semantic-release plugin config.
  * @param {*} context - The context provided by semantic-release.
  * @see {@link https://github.com/semantic-release/semantic-release/blob/master/docs/developer-guide/plugin.md}
 */
export async function verifyConditions(pluginConfig, context) {
  let errors = await verify(pluginConfig, context);

  try {
    await getPkg(pluginConfig, context);
  } catch(err) {
    errors.push(...err);
  }

  if (errors.length > 0) {
    throw new AggregateError(errors);
  } else {
    verified = true;
  }
}

export async function prepare(pluginConfig, context) {
  const errors = verified ? [] : await verify(pluginConfig, context);

  try {
    await getPkg(pluginConfig, context);
  } catch(err) {
    errors.push(...err);
  }

  if (errors.length > 0) {
    throw new AggregateError(errors);
  }

  await preparePPM(pluginConfig, context);

  prepared = true;
};

/**
  * @desc Called by semantic-release during the publish step.
  * @param {*} pluginConfig - The semantic-release plugin config.
  * @param {*} context - The context provided by semantic-release.
  * @see {@link }
 */
export async function publish(pluginConfig, context) {
  let pkg;
  const errors = verified ? [] : await verifyPPM(pluginConfig, context);

  try {
    pkg = await getPkg(pluginConfig, context);
  } catch(err) {
    errors.push(...err);
  }

  if (errors.length > 0) {
    throw new AggregateError(errors);
  }

  if (!prepared) {
    await preparePPM(pluginConfig, context);
    prepared = true;
  }

  return publishPPM(pkg, pluginConfig, context);
}
