const prettyBytes = require("pretty-bytes");
const MIDDLEWARE_RUN_COUNT = 5000;
const MIDDLEWARE_COMPOSE_COUNT = 10000;
const config = {
  methods: [
    (ctx, next) => {
      ctx.a++;
      next();
    },
    (ctx, next) => {
      ctx.b += 2;
      next();
    },
    (ctx, next) => {
      ctx.c *= 1.0001;
      next();
    }
  ],
  context: function() {
    return {
      a: 1,
      b: 1,
      c: 1
    };
  },
  perf: {
    instances: {},
    start: name => {
      config.perf.instances[name] = {
        start_time: process.hrtime(),
        start_mem: process.memoryUsage().heapUsed
      };
    },
    end: name => {
      const time = process.hrtime(config.perf.instances[name].start_time);
      const runtime = (time[0] * 1000 + time[1] / 1000000).toFixed(3);
      config.perf.instances[name].end_mem = process.memoryUsage().heapUsed;
      config.perf.instances[name].end_time = runtime;
      return config.perf.instances[name];
    },
    get: name => config.perf.instances[name]
  },
  profiler: composer => {
    config.perf.start("middleware");
    const subPerfArray = [];
    for (let x = 0; x < MIDDLEWARE_RUN_COUNT; x++) {
      config.perf.start("sub");
      const composed = composer(config.methods);
      const context = config.context();
      for (let i = 0; i < MIDDLEWARE_COMPOSE_COUNT; i++) {
        composed(context);
      }
      const subPerf = config.perf.end("sub");
      subPerfArray.push(subPerf);
    }

    const avgDiv = MIDDLEWARE_RUN_COUNT * MIDDLEWARE_COMPOSE_COUNT;
    let subRuntime = 0;
    let subMemChange = 0;
    for (let perf of subPerfArray) {
      const perfMem = parseInt(perf.end_mem) - parseInt(perf.start_mem);
      subRuntime += parseFloat(perf.end_time);
      subMemChange += perfMem;
    }
    const subAvg = (subRuntime / subPerfArray.length).toFixed(3);
    const profilePerf = config.perf.end("middleware");
    console.log(`Average subroutine execution time: ${subAvg}ms`);
    console.log(`Total subroutine execution time: ${subRuntime.toFixed(3)}ms`);
    console.log(
      `Average subroutine heap change: ${prettyBytes(
        Math.round(subMemChange / avgDiv)
      )}`
    );
    console.log(`Total subroutine heap change: ${prettyBytes(subMemChange)}`);
    console.log(
      `Average composition execution time: ${(subAvg / avgDiv).toFixed(6)}ms`
    );
    console.log(`Total execution time: ${profilePerf.end_time}ms`);
    console.log(
      `Total heap change: ${prettyBytes(
        profilePerf.end_mem - profilePerf.start_mem
      )}`
    );
  }
};
module.exports = config;
