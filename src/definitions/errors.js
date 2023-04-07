
module.exports = {
  ENOPPMKEY: () => ({
    message: "No PPM token specified.",
    details: `A ppm token must be created and set in the environment variables on your CI environment.`
  }),
  ENOPKGNAME: () => ({
    message: "Missing `name` property in `package.json`.",
    details: "Them `package.json` name property is required in order to publish a Pulsar package."
  }),
  ENOPKG: () => ({
    message: "Missing `package.json` file.",
    details: "A `package.json` at the root of your project is required to publish a Pulsar package."
  })
};
