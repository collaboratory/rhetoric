require("babel-polyfill");
const watch = require("node-watch");

function loadMiddlewareBenchmarks() {
  try {
    return require("./middleware")();
  } catch (e) {}
}

function loadEmitterBenchmarks() {
  try {
    require("./emitters")();
  } catch (e) {}
}

loadMiddlewareBenchmarks();
loadEmitterBenchmarks();

watch("dist/Middleware.js", loadMiddlewareBenchmarks);
watch(["dist/Emitter.js", "dist/Emitterware.js"], loadEmitterBenchmarks);
