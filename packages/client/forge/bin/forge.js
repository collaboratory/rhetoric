#!/usr/bin/env node
require("dotenv").config();
const forge = require("../src/main");
const chalk = require("chalk");
const argv = require("minimist")(process.argv.slice(2));
const preset = argv._.length ? argv._.shift() : "default";
const nodeEnv = argv._.length
  ? argv._.shift()
  : process.env.NODE_ENV || "development";

const env = {
  NODE_ENV: nodeEnv
};

console.log();
console.log(
  chalk.yellow("-->"),
  chalk.blue("Forging " + preset + " bundles for " + nodeEnv + "."),
  chalk.yellow("<--")
);
console.log();
console.log(chalk.cyan(JSON.stringify(env)));
console.log();
forge({
  env,
  preset
}).then(res => {
  console.log();
  console.log(chalk.green("-->"), chalk.yellow("Done."));
});
