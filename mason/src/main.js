import { isNull } from "util";

// Please CLI
const Emitterware = require("emitterware");
const { isArray, isPlainObject, isString, merge, forEach } = require("lodash");

const INVALID_COMMAND_EXCEPTION = new Error("Invalid command provided.");
export default class Please {
  constructor({
    options = {},
    handlers = {},
    args = [],
    colors = {},
    logger = console
  }) {
    this.emitter = new Emitterware();
  }

  on(named, handledBy = false) {
    if (isPlainObject(named)) {
      return forEach(named, (cb, name) => this.onEvent(name, cb));
    } else if (isString(named)) {
      if (isArray(handledBy)) {
        return handledBy.forEach(cb => this.onEvent(named, cb));
      } else if (isFunction(handledBy)) {
        return this.onEvent(named, handledBy);
      }
    }

    throw new Error("Invalid arguments supplied to `Please::on`");
  }

  onEvent(event, callback) {
    return this.emitter.on(event, callback);
  }

  offEvent(event, callback) {
    return this.emitter.off(event, callback);
  }

  exec()
}
