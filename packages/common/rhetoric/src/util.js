export function forAny(thing, cb = null) {
  const callback = safeCallback(cb, true, true, "forAny");
  return Array.isArray(thing) ? thing.map(callback) : callback(thing);
}

const safeCallbackError = (type = false, source = false) =>
  `
    ${source || "safeCallback"} requires a callback as the first parameter. 
    ${!source && "... imagine that."} 
    ${type && `(${type} provided.)`} 
  `.replace(/[\t\n]/g, "");

export function safeCallback(
  from,
  shouldThrow = false,
  shouldError = true,
  source = false
) {
  const fromType = typeof from;
  if (fromType !== "function") {
    if (shouldError && console && console.error) {
      console.error(safeCallbackError(fromType, source));
    }

    if (shouldThrow) {
      throw new TypeError(safeCallbackError(fromType, source));
    }

    return () => from;
  }

  return from;
}
