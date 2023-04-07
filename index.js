const AggregateError = require("aggregate-error");
const verify = require("./src/verify.js");
const preparePPM = require("./src/prepare.js");
const publishPPM = require("./publish.js");
const getPkg = require("./get-pkg.js");

let verified, prepared;

/**
  * @desc Called by semantic-release during the verification step.
  * @param {*} pluginConfig - The semantic-release plugin config.
  * @param {*} context - The context provided by semantic-release.
  * @see {@link https://github.com/semantic-release/semantic-release/blob/master/docs/developer-guide/plugin.md}
 */
async function verifyConditions(pluginConfig, context) {
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

async function prepare(pluginConfig, context) {
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
async function publish(pluginConfig, context) {
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

module.exports = {
  verifyConditions,
  prepare,
  publish,
};
