/*
 *   create by vincent 31 Dec 2016
 */

export const requestAnimationFrame =
  window.requestAnimationFrame ||
  function (callback) {
    window.Timer = () => setTimeout(callback, 1000 / 60);
  };

export const cancelAnimationFrame =
  window.cancelAnimationFrame || clearTimeout(window.Timer);

export const log = function () {
  console.log.apply(console, arguments);
};

export const queue = function (funcs, scope) {
  (function next() {
    if (funcs.length > 0) {
      funcs
        .shift()
        .apply(
          scope || {},
          [next].concat(Array.prototype.slice.call(arguments, 0))
        );
    }
  })();
};

export const adler32 = function (str) {
  let MOD = 65521;
  let a = 1;
  let b = 0;
  for (let i = 0; i < str.length >>> 0; i++) {
    a = (a + str.charCodeAt(i)) % MOD;
    b = (b + a) % MOD;
  }
  return a | (b << 16);
};

export const getType = function (obj) {
  var type = Object.prototype.toString
    .call(obj)
    .match(/^\[object (.*)\]$/)[1]
    .toLowerCase();
  if (type === "string" && typeof obj === "object") return "object"; // Let "new String('')" return 'object'
  if (obj === null) return "null"; // PhantomJS has type "DOMWindow" for null
  if (obj === undefined) return "undefined"; // PhantomJS has type "DOMWindow" for undefined
  return type;
};

export class Event {
  constructor() {
    this.subscribers = new Map([["any", []]]);
  }

  on(type = "any", fn) {
    let subs = this.subscribers;
    if (!subs.get(type)) return subs.set(type, [fn]);
    subs.set(type, [...subs.get(type), fn]);
  }

  emit(type = "any", ...content) {
    let handlers = this.subscribers.get(type);
    if (!handlers) return console.log(`%c⚡ ${type}`, `color:#f4696b`);
    for (let fn of handlers) {
      fn.apply(this, content);
    }
  }

  off(type = "any", fn = "any") {
    type == "any"
      ? this.subscribers.set("any", [])
      : fn == "any"
      ? this.subscribers.delete(type)
      : this.subscribers.set(type, [
          ...this.subscribers.get(type).filter((item) => item !== fn),
        ]);
  }

  once(...args) {
    this.emit(...args);
    this.off(...args);
  }
}
