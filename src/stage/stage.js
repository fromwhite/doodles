import { Event, rAF, getType } from "_";
import gl2d from "gl2d";

class _Stage extends Event {
    constructor(element, ...args) {
        super();

        this.scene = element || null;
        this.gl = null;
        this.context = null;
        this._shadow = null;
        this._context = null;
        this.events = new Set();
        this.shapes = new Set();

        this.init(...args);
    }

    init(...args) {
        // 接收canvas element对象 或者 在容器插入element
        if (!this.scene || this.scene.nodeName !== "CANVAS") {
            let c = document.createElement("canvas");
            c.id = "gl";
            c.oncontextmenu = function() {
                return false;
            };
            if (!this.scene) {
                document.body.appendChild(c);
            }
            if (this.scene && this.scene.nodeName !== "CANVAS") {
                this.scene.appendChild(c);
            }
            this.scene = c;
        }

        this.context = gl2d(this.scene, ...args);
        this.gl = this.context.gl;

        this.dpr = this.context.dpr;

        this._shadow = document.createElement("canvas");
        this._shadow.width = this.context.width / 10;
        this._shadow.height = this.context.height / 10;
        this._context = this._shadow.getContext("2d");

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
            "touchmove"
        ];
        events.forEach(event => {
            let that = this;
            this.scene.addEventListener(
                event,
                e => {
                    const { left, top } = e.target.getBoundingClientRect();
                    let originalX, originalY;
                    const evtArgs = {
                        originalEvent: e,
                        type: event
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
                    x = that.dp(originalX);
                    y = that.dp(originalY);
                    Object.assign(evtArgs, { originalX, originalY }, { x, y });

                    // stage handler
                    if (this.events.has(event)) {
                        this.emit(event, evtArgs);
                    }

                    // shape handler
                    this.shapes.forEach(shape => {});

                    // shape event
                },
                true
            );
        });
    }

    dp(px) {
        return ~~px * this.dpr;
    }

    pixel2shadow(x, y) {
        return [x / 10, y / 10];
    }

    shadow2pixel(x, y) {
        return [x * 10, y * 10];
    }

    isPathIn() {}

    viewport(gl = this.gl) {
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    }

    clear(gl = this.gl) {
        gl.clear(gl.COLOR_BUFFER_BIT);
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
    add() {}

    remove() {}

    render(time) {
        console.log("render");
        rAF(() => this.loop());
    }
    loop(time) {
        let now = time * 0.001;
        this.deltaTime = Math.min(0.1, now - this.then);
        this.then = now;
        console.log("loop");
        this.update();
        this.draw();
        rAF(() => this.loop());
    }
}

const Stage = {
    create: function(...args) {
        return new _Stage(...args);
    }
};

export { Stage };
