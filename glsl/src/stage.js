import { Event, requestAnimationFrame, cancelAnimationFrame } from "../../_";
import gl2d from "./gl2d";
import { Shape } from "./shape";

class _Stage extends Event {
  constructor(element, options) {
    super();

    this.element = element || null;
    this.context = null;
    this._shadow = null;
    this._context = null;
    this.events = new Set();
    this.shapes = new Set();

    this.then = 0;
    this.tick = null;
    this.statu = null;
    this.init(options);
  }

  init(options) {
    if (!this.element || this.element.nodeName !== "CANVAS") {
      let c = document.createElement("canvas");
      c.id = "canvas";
      c.oncontextmenu = function () {
        return false;
      };
      if (!this.element) {
        document.body.appendChild(c);
      }
      if (this.element && this.element.nodeName !== "CANVAS") {
        this.element.appendChild(c);
      }
      this.element = c;
    }

    Object.assign(this, options);
    this.context = gl2d(this.element, [this.width, this.height]);

    this.dpr = this.context.dpr;

    // this._shadow = document.createElement("canvas");
    // this._shadow.width = this.context.width / 10;
    // this._shadow.height = this.context.height / 10;
    // this._context = this._shadow.getContext("2d");

    // default events
    const events = [
      "mousedown",
      "mouseup",
      "mousemove",
      "mousewheel",
      "click",
      "dblclick",
      "touchstart",
      "touchend",
      "touchmove",
    ];
    events.forEach((event) => {
      this.element.addEventListener(
        event,
        (e) => {
          const { left, top } = e.target.getBoundingClientRect();
          let originalX, originalY;
          const evtArgs = {
            originalEvent: e,
            type: event,
          };
          if (e.changedTouches) {
            const { clientX, clientY } = e.changedTouches[0];

            originalX = Math.round(clientX - left);
            originalY = Math.round(clientY - top);
          } else {
            originalX = Math.round(e.clientX - left);
            originalY = Math.round(e.clientY - top);
          }
          let x, y;
          x = this.dp(originalX);
          y = this.dp(originalY);
          Object.assign(evtArgs, { originalX, originalY }, { x, y });

          // stage handler
          if (this.events.has(event)) {
            this.emit(event, evtArgs);
          }

          // shape handler
          this.shapes.forEach((shape) => {
            for (let item of shape.events.keys()) {
              item == event
                ? this.isInside(shape, { x, y })
                  ? this.emit.apply(shape, [event, evtArgs])
                  : 0
                : 0;
            }
          });
        },
        true
      );
    });
  }

  dp(px) {
    return ~~px * this.dpr;
  }

  //Function to check whether a point is inside a rectangle
  isInside(shape, pos) {
    return (
      pos.x > shape.rect.x &&
      pos.x < shape.rect.x + shape.rect.width &&
      pos.y < shape.rect.y + shape.rect.height &&
      pos.y > shape.rect.y
    );
  }

  // add event
  on(type = "any", fn) {
    this.events.add(type);
    super.on(type, fn);
  }

  off(type = "any", fn = "any") {
    this.event.delete(type);
    super.off(type, fn);
  }

  // add shape
  add(shape) {
    this.shapes.add(shape);
    this.shapes.size > 0 ? (this.statu != "LOOP" ? this.loop() : 0) : 0;
  }

  remove(shape) {
    this.shapes.delete(shape);
    this.shapes.size == 0 ? (this.statu != "END" ? this.end() : 0) : 0;
  }

  _draw(deltaTime) {
    // this.shapes.forEach(item => {
    //     item._draw.apply(context, args);
    // });
    !!this.draw && this.draw(deltaTime);
  }

  _update(...args) {
    this.shapes.forEach((item) => {
      item._update(...args);
    });
    !!this.update && this.update(...args);
  }

  render(time) {
    let now = time * 0.001;
    let then = this.then || 0;
    let deltaTime = Math.min(0.1, now - then);
    this.then = now;
    this._update(deltaTime);
    this._draw(deltaTime);
    this.tick = requestAnimationFrame((time) => this.render(time));
  }
  loop() {
    if (this.statu != "LOOP") this.statu = "LOOP";
    requestAnimationFrame((time) => this.render(time));
  }
  end() {
    if (this.statu != "END") this.statu = "END";
    cancelAnimationFrame(this.tick);
    this.then = 0;
    this.context.clear();
    this.shapes.clear();
    this.events.clear();
  }
  pause() {
    if (this.statu != "PAUSE") this.statu = "PAUSE";
    !!this.tick && cancelAnimationFrame(this.tick);
  }
}

const Stage = {
  create: function (...args) {
    return new _Stage(...args);
  },
};

export { Stage, Shape };
