const m = require("microseconds");
const Schrodinger = {
  time: {
    now: m.now,
    since: m.since
  },
  diff: (a, b) => {
    if (typeof a !== typeof b) {
      return b;
    } else if (typeof a === "number") {
      return b - a;
    } else if (Array.isArray(a)) {
      return a.map((m, i) => Schrodinger.diff(a[i], b[i]));
    } else if (typeof a === "object") {
      const diff = {};
      for (let key in b) {
        diff[key] = a[key] ? Schrodinger.diff(a[key], b[key]) : b[key];
      }
      return diff;
    } else {
      throw new Error(`Unsupported type provided to diff: ${typeof a}`);
    }
  },
  average: values => {
    if (!Array.isArray(values)) {
      throw new TypeError("Schrodinger.average only works with arrays");
    }
    const total = Schrodinger.sum(values);
    if (typeof total === "number") {
      return total / values.length;
    } else if (Array.isArray(total)) {
      return total.map(t => t / values.length);
    } else if (typeof total === "object") {
      const avg = {};
      for (let key in total) {
        avg[key] = total[key] / values.length;
      }
      return avg;
    } else {
      throw new TypeError(
        `Unsupported type provided to Schrodinger.average: ${typeof total}`
      );
    }
  },
  sum: values => {
    if (!Array.isArray(values)) {
      return values;
    }

    let total;
    values.map(v => {
      if (!total) {
        total = v;
        return null;
      } else if (typeof total !== typeof v) {
        throw new TypeError(
          "All values passed to Schrodinger.sum must be of the same type"
        );
      } else if (typeof total === "number") {
        total += v;
      } else if (Array.isArray(total)) {
        total = Schrodinger.sum([...total, ...v]);
      } else if (typeof total === "object") {
        for (let key in v) {
          total[key] = Schrodinger.sum([total[key], v[key]]);
        }
      } else {
        throw new TypeError(
          `Unsupported type provided to sum: ${typeof total}`
        );
      }
    });
    return total;
  },
  memory: {
    now: () => {
      const env = Schrodinger.env();
      if (env === "node") {
        return process.memoryUsage();
      } else if (env === "modern") {
        return window.performance.memory;
      } else {
        return {};
      }
    },
    since: snapshot => {
      const now = Schrodinger.memory.now();
      return Schrodinger.diff(snapshot, now);
    }
  },
  profile: async cb => {
    const startTime = Schrodinger.time.now();
    const startMemory = Schrodinger.memory.now();
    await cb;
    return {
      start_time: startTime,
      start_memory: startMemory,
      diff_time: Schrodinger.time.since(startTime),
      diff_memory: Schrodinger.memory.since(startMemory),
      end_time: Schrodinger.time.now(),
      end_memory: Schrodinger.memory.now()
    };
  },
  env: () => {
    if (!Schrodinger._env) {
      if (process && process.hrtime) {
        Schrodinger._env = "node";
      } else if (
        window &&
        window.performance &&
        window.performance.now &&
        window.performance.memory
      ) {
        Schrodinger._env = "modern";
      } else {
        Schrodinger._env = "browser";
      }
    }
    return Schrodinger._env;
  }
};
module.exports = Schrodinger;
