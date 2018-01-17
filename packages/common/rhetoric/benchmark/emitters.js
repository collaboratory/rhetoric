require("babel-polyfill");
const Benchmark = require("benchmark");
const chalk = require("chalk");
const { Emitter, Emitterware } = require("../dist/main");
const Mitt = require("mitt");

setTimeout(() => {
  console.log(chalk.blue("==> Starting Emitter Benchmarks"));
  console.log(
    chalk.yellow(
      "==============================================================="
    )
  );
  const suite = new Benchmark.Suite();
  suite
    .add("Emitterware", () => {
      const emitterWare = new Emitterware();
      emitterWare.on("test", (ctx, next) => {
        ctx.bar++;
        next();
      });
      emitterWare.on("test", (ctx, next) => {
        ctx.foo *= ctx.bar;
        next();
      });
      for (let i = 0; i < 1000; i++) {
        emitterWare.emit("test", { foo: 1, bar: 1 });
      }
    })
    .add("Emitter", () => {
      const emitter = new Emitter(false);
      emitter.on("test", ctx => {
        ctx.bar++;
      });
      emitter.on("test", ctx => {
        ctx.foo *= ctx.bar;
      });
      for (let i = 0; i < 1000; i++) {
        emitter.emit("test", { foo: 1, bar: 1 });
      }
    })
    .add("mitt", () => {
      const mitt = new Mitt();
      mitt.on("test", ctx => {
        ctx.bar++;
      });
      mitt.on("test", ctx => {
        ctx.foo *= ctx.bar;
      });
      for (let i = 0; i < 1000; i++) {
        mitt.emit("test", { foo: 1, bar: 1 });
      }
    })
    // add listeners
    .on("cycle", function(event) {
      console.log(String(event.target));
    })
    .on("complete", function() {
      console.log("Fastest is " + this.filter("fastest").map("name"));
    })
    .on("error", function(err) {
      console.log("Error", err);
      process.exit();
    })
    // run async
    .run();
  console.log(
    chalk.yellow(
      "==============================================================="
    )
  );
}, 1000);
