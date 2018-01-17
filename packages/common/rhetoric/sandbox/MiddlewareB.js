// MiddlewareB
const empty = () => {};
export class MiddlewareB {
  stack = [];
  use(cb) {
    return this.stack.push(cb);
  }

  all(cb) {
    return cb.map(m => this.stack.push(m));
  }

  remove(cb) {
    return this.stack.splice(this.stack.indexOf(cb) >>> 0, 1);
  }

  removeAll(cb) {
    return cb.map(m => this.remove(m));
  }

  compose() {
    return MiddlewareB.compose(this.stack);
  }

  static compose(stack = []) {
    return async ctx => {
      return stack.reverse().reduce((prev, fn) => {
        return async () => fn(ctx, prev || empty);
      }, empty)(ctx, empty);
    };
  }
}
export default MiddlewareB;
