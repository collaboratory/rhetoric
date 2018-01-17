const { get } = require("lodash");
const isDev = (process.env.NODE_ENV || "development") === "development";
const {
  BabelPlugin,
  EnvPlugin,
  WebIndexPlugin,
  UglifyJSPlugin,
  QuantumPlugin
} = require("fuse-box");
const chalk = require("chalk");

/**
 * isTruthy - Check an argument for truthiness
 * @param {any} thing - The thing to check for truthiness
 */
function isTruthy(thing) {
  return [1, "1", true, "true"].indexOf(thing) !== -1;
}
module.exports.isTruthy = isTruthy;

/**
 * envFlag - Check an env flag status (defaults or false)
 * @param {string} name - The name of the env flag to check for
 * @param {boolean} fallback - The default value to assume
 * @return {boolean}
 */
function envFlag(name, fallback = true) {
  return isTruthy(get(process.env, name, fallback));
}
module.exports.envFlag = envFlag;

/**
 *
 * @param {object} config - The user-provided configuration options
 * @param {object} defaults - The preset-provided configuration defaults
 */
function preparePreset(userConfig = {}, presetDefaults = {}) {
  // Extract the standard config
  const config = prepareConfig(userConfig, presetDefaults);
  const {
    homeDir,
    output,
    babel,
    env,
    web,
    dev,
    uglify,
    proxies,
    target,
    bundles,
    quantum,
    ...etc
  } = config;

  // Prepare the dev environment
  const devConfig =
    dev === null && isDev ? prepareDevEnvironment(proxies) : dev || false;

  // Prepare the exposed ENV variables
  const mergedEnv = Object.assign({}, prepareEnv(config), env);
  console.log(chalk.magenta(`FORGE ENV:`));
  console.log(chalk.cyan(JSON.stringify(mergedEnv)));
  console.log();

  // Allow .env overrides
  const useWebIndexPlugin = web !== false && envFlag("FORGE_PLUGIN_WEBINDEX");
  const useBabelPlugin = babel !== false && envFlag("FORGE_PLUGIN_BABEL");
  const useEnvPlugin = env !== false && envFlag("FORGE_PLUGIN_ENV");
  const useQuantumPlugin =
    !isDev && quantum !== false && envFlag("FORGE_PLUGIN_QUANTUM");
  const useUglifyPlugin =
    !isDev &&
    uglify !== false &&
    !useQuantumPlugin &&
    envFlag("FORGE_PLUGIN_UGLIFY");

  // Prepare the required plugins
  const plugins = get(config, "plugins", [
    useBabelPlugin && BabelPlugin(babel),
    useEnvPlugin && EnvPlugin(mergedEnv),
    useWebIndexPlugin && WebIndexPlugin(web),
    useUglifyPlugin && UglifyJSPlugin(uglify),
    useQuantumPlugin && QuantumPlugin(quantum)
  ]);

  // Return PresetOutput
  return {
    config: { plugins, homeDir, output, target, ...etc },
    bundles,
    dev: devConfig
  };
}
module.exports.preparePreset = preparePreset;

function prepareEnv(config) {
  const env = {};
  // Extract BROWSER_ vars from env
  if (!config.excludeBrowserEnv) {
    Object.keys(process.env)
      .map(key => (key.substr(0, 8) === "BROWSER_" ? key : false))
      .filter(key => key !== false)
      .forEach(key => (env[key] = process.env[key]));
  }

  return env;
}
module.exports.prepareEnv = prepareEnv;

function prepareDevEnvironment(proxies) {
  // Handle dev & proxies
  let dev = false;
  const path = require("path");

  let express, proxy;

  let canStatic = false;
  let canProxy = false;

  // We need express to enable static directory features
  try {
    express = require(path.resolve(process.cwd(), "node_modules", "express"));
    canStatic = true;
  } catch (e) {
    console.log();
    console.log(
      chalk.yellow(
        "==> WARNING ==> The 'express' package is required to enable static directory features."
      )
    );
    console.log();
  }

  // We need http-proxy-middleware to enable proxy features
  try {
    proxy = require(path.resolve(
      process.cwd(),
      "node_modules",
      "http-proxy-middleware"
    ));
    canProxy = true;
  } catch (e) {
    console.log(
      chalk.yellow(
        "==> WARNING ==> The 'http-proxy-middleware' package is required to enable proxy features."
      )
    );
    console.log();
  }

  if (canStatic && canProxy) {
    dev = [
      { root: false },
      server => {
        const app = server.httpServer.app;
        const distDir = `${process.cwd()}/dist`;
        const staticPaths = [`${process.cwd()}/static`, distDir];

        Object.keys(proxies).forEach(path => {
          app.use(path, proxy({ target: proxies[path], changeOrigin: true }));
        });

        Object.keys(staticPaths).forEach(path => {
          app.use("/", express.static(path));
        });

        app.get("*", function(req, res) {
          res.sendFile(path.join(distDir, "index.html"));
        });
      }
    ];
  } else if (canProxy) {
    dev = [
      { root: false },
      server => {
        const app = server.httpServer.app;
        const distDir = `${process.cwd()}/dist`;

        Object.keys(proxies).forEach(path => {
          app.use(path, proxy({ target: proxies[path], changeOrigin: true }));
        });

        app.get("*", function(req, res) {
          res.sendFile(path.join(distDir, "index.html"));
        });
      }
    ];
  } else if (canStatic) {
    dev = [
      { root: false },
      server => {
        const app = server.httpServer.app;
        const distDir = `${process.cwd()}/dist`;
        const staticPaths = [`${process.cwd()}/static`, distDir];

        Object.keys(staticPaths).forEach(path => {
          app.use("/", express.static(path));
        });

        app.get("*", function(req, res) {
          res.sendFile(path.join(distDir, "index.html"));
        });
      }
    ];
  } else {
    // We don't have what we need to extend the server
    dev = [
      {
        proxy: proxies
      }
    ];
  }
  return dev;
}
module.exports.prepareDevEnvironment = prepareDevEnvironment;

function prepareConfig(config = {}, presetDefaults = {}) {
  // Determine what to name the default bundle
  const main = config.main || presetDefaults.main || "app";

  const bundles = {};

  // Determine whether or not to assemble a vendor bundle
  const bundleVendor = get(
    config,
    "bundleVendor",
    get(presetDefaults, "bundleVendor", true)
  );

  // Determine if we should bundle vendor libs separately
  let bundledVendor = false;
  if (
    isTruthy(bundleVendor) &&
    (!presetDefaults.bundles ||
      !presetDefaults.bundles.hasOwnProperty("vendor")) &&
    (!config.bundles || !config.bundles.hasOwnProperty("vendor"))
  ) {
    bundledVendor = true;
    bundles["vendor"] = {
      instruction: `~ ${main}.js`,
      hmr: isDev,
      watch: isDev
    };
  }

  // If we don't already have a definition for the main bundle, create one
  if (
    (!presetDefaults.bundles || !presetDefaults.bundles.hasOwnProperty(main)) &&
    (!config.bundles || !config.bundles.hasOwnProperty(main))
  ) {
    // Prepare the primary bundle
    bundles[main] = {
      // If we've bundled a vendor, bundle this separately
      instruction: bundledVendor ? `>! [${main}.js]` : `> ${main}.js`,
      hmr: isDev,
      watch: isDev
    };
  }

  const prepared = Object.assign(
    {},
    {
      homeDir: `${process.cwd()}/src`,
      output: `${process.cwd()}/dist/$name.js`,
      babel: {
        presets: [
          require.resolve(`babel-preset-env`),
          require.resolve(`babel-preset-react`)
        ],
        plugins: [
          require.resolve(`babel-plugin-transform-class-properties`),
          require.resolve(`babel-plugin-transform-object-rest-spread`),
          require.resolve(`babel-plugin-transform-export-extensions`),
          require.resolve(`babel-plugin-transform-runtime`),
          require.resolve(`babel-plugin-transform-react-jsx`)
        ],
        ignore: ["**/*.test.js", "**/__tests__"]
      },
      web: {
        template: `${process.cwd()}/src/index.html`
      },
      dev: null,
      quantum: false,
      jsNext: true,
      removeInteropRequireDefault: true,
      sourceMaps: isDev,
      cache: !isDev,
      uglify: {},
      proxies: {},
      target: "browser",
      modulesFolder: `${process.cwd()}/node_modules`,
      bundles
    },
    presetDefaults,
    config
  );
  return prepared;
}
module.exports.prepareConfig = prepareConfig;
