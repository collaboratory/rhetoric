const { preparePreset } = require("../preset-util");

function defaultPreset(config = {}) {
  return preparePreset(config);
}

module.exports = defaultPreset;
