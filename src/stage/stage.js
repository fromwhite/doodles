import Core from "core";
import Sprite from "sprite";

const Stage = {
    create: function(...args) {
        return new Core(...args);
    }
};

export { Stage, Sprite };
