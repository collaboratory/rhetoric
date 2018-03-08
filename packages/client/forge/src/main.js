const fs = require("fs");
const path = require("path");
const { FuseBox } = require("fuse-box");

function isValidPreset(preset) {
  if (typeof preset !== "function") {
    throw new Error(
      "Invalid preset result. Expected a function, got '" + typeof preset + "'."
    );
  }
  return true;
}

function loadPreset(preset) {
  const filename = `${preset}.js`;

  let hasPreset = false;
  const presets = [
    path.resolve("./", filename),
    path.resolve(__dirname, "presets", filename),
    path.resolve("./", "node_modules", `craft-forge-preset-${preset}`)
  ]
    .map(filename => {
      if (!hasPreset && fs.existsSync(filename)) {
        hasPreset = true;
        const imported = require(filename);
        if (isValidPreset(imported)) {
          return imported;
        }
      }
    })
    .filter(preset => {
      return !!preset;
    });

  if (!presets.length) {
    throw new Error(`Preset "${preset}" not found.`);
  }

  return presets.shift();
}

async function forge(configuration = {}) {
  const { preset = "default", ...config } = configuration;

  const presetMethod = loadPreset(preset);
  const presetOutput = presetMethod(config);
  if (presetOutput) {
    const { bundles = {}, config = {}, dev = false } = presetOutput;
    const app = FuseBox.init(config);

    Object.keys(bundles).forEach(name => {
      if (bundles[name] !== false) {
        const { instruction = "", hmr = false, watch = false } = bundles[name];
        const bundle = app.bundle(name).instructions(instruction);
        hmr && bundle.hmr();
        watch && bundle.watch();
      }
    });

    if (dev) {
      // Dev should contain an array of parameters to allow overloading the server method
      app.dev(...dev);
    }

    return app.run();
  }

  throw new Error("Invalid preset output.");
}
module.exports = forge;
