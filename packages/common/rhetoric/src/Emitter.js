// Emitter
export class Emitter {
  constructor() {
    this.store = Object.create(null);
  }

  on(type, cb) {
    return this.type(type).push(cb);
  }

  off(type, cb = false) {
    const stack = this.type(type);
    if (cb === false) {
      return stack.splice(0, stack.length);
    }

    return stack.splice(stack.indexOf(cb) >>> 0, 1);
  }

  emit(type, data, isAsync = false) {
    const result = this.type(type).map(cb => cb(data));
    return isAsync ? Promise.all(result) : result;
  }

  type(named) {
    return !this.store[named]
      ? (this.store[named] = []) && this.store[named]
      : this.store[named];
  }

  size() {
    return Array.from(Object.values(this.store), s => s.length).reduce(
      (a, b) => a + b,
      0
    );
  }
}
export default Emitter;
