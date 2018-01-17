const { MiddlewareB } = require("./MiddlewareB");

describe("MiddlewareB", () => {
  it("should allow addition of a single middleware method", () => {
    const stack = new MiddlewareB();
    const appended = stack.use(() => {});
    expect(appended).toBeTruthy();
  });

  it("should allow addition of multiple middleware methods", () => {
    const stack = new MiddlewareB();
    const appended = stack.use([() => {}, () => {}]);
    expect(appended).toBeTruthy();
  });

  it("should allow removal of a single middleware method", () => {
    const stack = new MiddlewareB();
    const method = () => {};
    stack.use(method);
    const removed = stack.remove(method);
    expect(removed).toBeTruthy();
    expect(stack.stack.length).toBe(0);
  });

  it("should allow removal of multiple middleware methods", () => {
    const stack = new MiddlewareB();
    const methods = [() => {}, () => {}, () => {}];
    stack.all(methods);
    expect(stack.stack.length).toBe(3);
    const removed = stack.removeAll(methods);
    expect(removed).toBeTruthy();
    expect(stack.stack.length).toBe(0);
  });

  it("should allow composition of the middleware stack", () => {
    const stack = new MiddlewareB();
    stack.use((ctx, next) => {
      ctx.test++;
    });

    const composed = stack.compose();
    expect(typeof composed).toBe("function");
  });

  it("should throw & reject on multiple next() calls", () => {
    const stack = new MiddlewareB();
    stack.use((ctx, next) => {
      next();
      expect(next()).rejects.toThrow();
    });

    expect(stack.compose()(true)).rejects.toThrow();
  });

  it("should handle middleware errors gracefully", () => {
    const stack = new MiddlewareB();
    stack.use((ctx, next) => {
      ctx.fail();
    });

    expect(stack.compose()()).rejects.toThrow();
  });

  it("should allow synchronous execution", async () => {
    const stack = new MiddlewareB();
    const o = { test: 0 };

    stack.use(async (ctx, next) => {
      console.log("First exec");
      ctx.test++;
      await next();
    });

    stack.use(async (ctx, next) => {
      console.log("Second exec");
      ctx.test += 2;
      await next();
    });

    stack.use(async (ctx, next) => {
      console.log("Third exec");
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          ctx.test += 4;
          resolve(true);
        }, 100);
      });
      await next();
    });

    const composition = stack.compose();
    composition(o);

    expect(o.test).toBe(3);
  });

  it("should allow asynchronous execution", async () => {
    const stack = new MiddlewareB();
    const o = { test: 0 };

    stack.use(async (ctx, next) => {
      ctx.test++;
      await next();
    });

    stack.use(async (ctx, next) => {
      ctx.test += 2;
      await next();
    });

    stack.use(async (ctx, next) => {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          ctx.test += 4;
          resolve(true);
        });
      });
      await next();
    });

    stack
      .compose()(o)
      .then(r => {
        expect(o.test).toBe(7);
      });

    expect(o.test).toBe(3);
  });
});
