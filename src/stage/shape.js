import { Event } from "_";

class _Shape extends Event {
    // img :tofix path2d
    constructor(resources) {
        super();

        this.texture = resources.texture || null;
        this._pos = null;
        this.width = resources.width || null;
        this.height = resources.height || null;
        this.events = new Set();
    }
    set pos([x, y]) {
        this._pos = [x, y];
    }

    get pos() {
        return this._pos;
    }

    on(type = "any", fn) {
        this.events.add(type);
        super.on(type, fn);
    }

    off(type = "any", fn = "any") {
        this.event.delete(type);
        super.off(type, fn);
    }
}

const Shape = {
    create: function(...args) {
        return new _Shape(...args);
    }
};
export { Shape };
