// Emitterware
import { Middleware } from "./Middleware";

export class Emitterware {
  constructor() {
    this.store = Object.create(null);
  }

  on(e, cb) {
    return this.stack(e).push(cb);
  }

  off(e, cb) {
    return this.stack(e).splice(this.stack(e).indexOf(cb) >>> 0, 1);
  }

  emit(e, ...p) {
    return Middleware.compose(this.stack(e))(...p);
  }

  stack(named) {
    return this.store[named]
      ? this.store[named]
      : (this.store[named] = []) && this.store[named];
  }

  size() {
    return Object.values(this.store)
      .map(v => v.length)
      .reduce((a, b) => a + b, 0);
  }
}
export default Emitterware;
