import readPkg from "read-pkg";
import AggregateError from "aggregate-error";
import getError from "./get-error.js";

export default async function (pluginConfig, context) {
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
}
