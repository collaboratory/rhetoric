import { Emitterware as EmitterwareStack } from "rhetoric";
export class Emitterware {
  constructor(options = {}) {
    this.options = options;
    this.providers = new Map();
    this.stack = new EmitterwareStack();
  }

  addProvider(name, provider) {
    if (this.providers.has(name)) {
      throw new Error(
        "Emitterware already has a provider registered for '" + name + "'"
      );
    }

    this.providers.set(
      name,
      provider(request => this.onRequest(request, name))
    );
  }

  addMiddleware(method, emitter = "*") {
    this.stack.on(emitter, method);
  }

  removeMiddleware(method, emitter = "*") {
    this.stack.off(emitter, method);
  }

  onRequest(ctx, provider) {
    this.stack.emit(provider, ctx);
  }
}
export default Emitterware;
