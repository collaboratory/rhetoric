const { preparePreset } = require("../preset-util");

function componentPreset(config = {}) {
  const { name, main } = require(`${process.cwd()}/package.json`);
  return preparePreset(config, {
    web: false,
    dev: false,
    cache: false,
    package: { name, main },
    env: {
      NODE_ENV: "production"
    },
    main: "main",
    target: "browser",
    bundleVendor: false,
    bundles: {
      main: {
        instruction: ">[main.js]",
        hmr: false,
        watch: false
      },
      vendor: false
    }
  });
}

module.exports = componentPreset;
