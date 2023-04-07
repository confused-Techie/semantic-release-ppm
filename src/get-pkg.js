const readPkg = require("read-pkg");
const AggregateError = require("aggregate-error");
const getError = require("./get-error.js");

module.exports = async(pluginConfig, context) => {
  try {
    const pkg = await readPkg({ context.cwd });

    if (!pkg.name) {
      throw getError("ENOPKGNAME");
    }

    return pkg;
  } catch(err) {
    const error = err.code === "ENOENT" ? new AggregateError([getError("ENOPKG")]) : new AggregateError([err]);
    throw error;
  }
};
