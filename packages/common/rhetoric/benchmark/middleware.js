require("babel-polyfill");
const Benchmark = require("benchmark");
const chalk = require("chalk");
const { Middleware, EmitterwareB } = require("../dist/main");
const kCompose = require("koa-compose");
const compose = require("../profiler/compose");

const methods = [
  (ctx, next) => {
    ctx.foo++;
    next();
  },
  (ctx, next) => {
    ctx.bar += 2;
    next();
  }
];

/**
 * Middleware Suite
 */
const middlewareSuite = async () => {
  const ctx = { foo: 0, bar: 0 };
  const composed = Middleware.compose(methods);

  for (let i = 0; i < 100; i++) {
    await composed(ctx);
  }
};

/**
 * Emitterware Suite
 */
const emitterwareSuite = async () => {
  const ctx = { foo: 0, bar: 0 };
  const em = new EmitterwareB();
  methods.map(m => em.use(m));
  const composed = em.compose(methods);

  for (let i = 0; i < 100; i++) {
    await composed(ctx);
  }
};

/**
 * Compose Suite
 */
const composeSuite = async () => {
  const ctx = { foo: 0, bar: 0 };
  const composed = compose(methods);

  for (let i = 0; i < 100; i++) {
    await composed(ctx);
  }
};

/**
 * Koa Suite
 */
const koaSuite = async () => {
  const ctx = { foo: 0, bar: 0 };
  const composed = kCompose(methods);
  for (let i = 0; i < 100; i++) {
    await composed(ctx);
  }
};

const assertEqualSuites = async suites => {
  let ctx = -1;
  let last = -1;
  for (let index in suites) {
    const suite = suites[index];
    last = ctx;
    ctx = JSON.stringify(await suite());
    if (last !== -1 && ctx !== last) {
      console.log("Mismatched test suite results", index, ctx, last);
      process.exit();
    }
  }
};

assertEqualSuites([
  composeSuite,
  emitterwareSuite,
  middlewareSuite,
  koaSuite
]).then(() => {
  setTimeout(() => {
    console.log(chalk.blue("==> Starting Middleware Benchmarks"));
    console.log(
      chalk.yellow(
        "==============================================================="
      )
    );

    const suite = new Benchmark.Suite();
    suite
      .add("Emitterware", emitterwareSuite)
      .add("Middleware", middlewareSuite)
      .add("compose", composeSuite)
      .add("koa-compose", koaSuite)
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
    process.exit();
  }, 1000);
});
