
export function ENOPPMKEY() {
  return {
    message: "No PPM token specified.",
    details: "A ppm token must be created and set in the environment variables on your CI environment."
  };
}

export function ENOPKGNAME() {
  return {
    message: "Missing `name` property in `package.json`.",
    details: "Them `package.json` name property is required in order to publish a Pulsar package."
  };
}

export function ENOPKG() {
  return {
    message: "Missing `package.json` file.",
    details: "A `package.json` at the root of your project is required to publish a Pulsar package."
  };
}
