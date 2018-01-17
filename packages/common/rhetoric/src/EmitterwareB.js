import Emitter from "./Emitter";

export class EmitterwareB {
  stack = [];

  use(cb) {
    this.stack.push(cb);
  }

  remove(cb) {
    this.stack.splice(this.stack.indexOf(cb) >>> 0, 1);
  }

  compose() {
    return compose(this.stack);
  }

  static compose(stack = []) {
    return compose(stack);
  }
}
export default EmitterwareB;

export function compose(methods = []) {
  return ctx => {
    const emitter = new Emitter();
    let lastCycle = -1;
    emitter.on("cycle", i => {
      if (i <= lastCycle) {
        throw new Error("next() called more than once");
      }

      if (methods[i]) {
        return methods[i](ctx, () => {
          lastCycle = i;
          emitter.emit("cycle", i + 1);
        });
      } else {
        emitter.off("cycle");
      }
    });
    emitter.emit("cycle", 0);
  };
}

/*
const test = new Middleware();
test.use((ctx, next) => {
  ctx.test++;
  next();
  return 1;
});

test.use((ctx, next) => {
  ctx.test += 5;
  next();
  return 2;
});

test.use(async (ctx, next) => {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });

  ctx.test += 5;
  next();
  return 3;
});

const composed = test.compose();
const ctx = { test: 0 };

composed(ctx).then(res => {
  ctx;
  res;
});

ctx;
*/
