import { Event } from "_";

class _Shape extends Event {
    constructor(resources, options) {
        super();
        this.texture = resources.texture || null;
        this.rect = null;
        this.width = resources.width || null;
        this.height = resources.height || null;
        this.events = new Set();
        Object.assign(this, options);
    }

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

    _update(...args) {
        !!this.update && this.update(...args);
    }
}

const Shape = {
    create: function(...args) {
        return new _Shape(...args);
    }
};
export { Shape };
