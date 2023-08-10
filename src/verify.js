import getError from "./get-error.js";

export default async function (pluginConfig, context) {
  let errors = [];

  let apmToken = context.env.ATOM_ACCESS_TOKEN;
  let ppmToken = context.env.PULSAR_ACCESS_TOKEN;
  let ppmKey = context.env.PULSAR_API_TOKEN;

  if (!apmToken && !ppmToken && !ppmKey) {
    errors.push(getError("ENOPPMKEY"));
  }

  return errors;
}
