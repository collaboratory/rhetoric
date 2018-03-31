// Emitterware
import { Middleware } from "./Middleware";

export class Emitterware {
  constructor() {
    this.store = Object.create(null);
    this._cache = {};
  }

  on(e, cb) {
    this.stack(e).push(cb);
    this.cache(e, true);
  }

  off(e, cb) {
    this.stack(e).splice(this.stack(e).indexOf(cb) >>> 0, 1);
    this.cache(e, true);
  }

  emit(e, ...p) {
    return this.cache(e)(...p);
  }

  eventProxy(e) {
    return (...p) => Middleware.compose(this.stack(e))(...p);
  }

  stack(named) {
    return this.store[named] || ((this.store[named] = []) && this.store[named]);
  }

  size() {
    return Object.values(this.store)
      .map(v => v.length)
      .reduce((a, b) => a + b, 0);
  }

  cache(e, forceReload = false) {
    if (!this._cache[e] || forceReload) {
      this._cache[e] = Middleware.compose([
        ...(e !== "*" && this.stack("*")),
        ...this.stack(e)
      ]);
    }
    return this._cache[e];
  }
}
export default Emitterware;
