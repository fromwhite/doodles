import { Event } from "_";

class _Shape extends Event {
    constructor(resources) {
        super();
        this.pos = null;
        this.texture = resources.texture || null;
        this.width = resources.width || null;
        this.height = resources.height || null;
        this.events = new Set();
    }
    // set pos([x, y]) {
    //     this.pos = [x, y];
    // }

    // get pos() {
    //     return this.pos;
    // }

    on(type = "any", fn) {
        this.events.add(type);
        super.on(type, fn);
    }

    off(type = "any", fn = "any") {
        this.event.delete(type);
        super.off(type, fn);
    }

    _draw(painter, ...args) {
        !!this.draw && this.draw.apply(painter, args);
    }

    _update() {
        !!this.update && this.update();
    }
}

const Shape = {
    create: function(...args) {
        return new _Shape(...args);
    }
};
export { Shape };
