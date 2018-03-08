const { safeCallback, forAny } = require("./util");
describe("safeCallback", () => {
  it("should just return valid callbacks", () => {
    const cb = () => {};
    expect(safeCallback(cb)).toBe(cb);
  });

  it("should throw when requested", () => {
    const cb = false;
    expect(() => safeCallback(cb, true, false)).toThrow();
  });

  it("should log errors when requested", () => {
    let errored = false;
    // eslint-disable-next-line
    console = {
      error: () => {
        errored = true;
      }
    };
    const cb = safeCallback(42, false, true);
    expect(errored).toBe(true);
    expect(cb()).toBe(42);
  });
});

describe("forAny", () => {
  it("should support working with an array", () => {
    let sum = 0;
    forAny([1, 2, 3], e => {
      sum += e;
    });
    expect(sum).toBe(6);
  });

  it("should supprt working with a single item", () => {
    let sum = 0;
    forAny(42, e => {
      sum += e;
    });
    expect(sum).toBe(42);
  });
});
