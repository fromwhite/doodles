import { Event, rAF, getType } from "_";
import gl2d from "glsl";

// loop
export default class extends Event {
    constructor(element) {
        super();
        this.container = element || null;

        this.gl = null;
        this.im = null;

        // ticker
        this.then = 0;

        // 接收canvas element对象或者在容器插入element
        if (!this.container || this.container.nodeName !== "CANVAS") {
            let c = document.createElement("canvas");
            c.id = "gl";
            c.oncontextmenu = function() {
                return false;
            };
            if (!this.container) {
                document.body.appendChild(c);
            }
            if (this.container && this.container.nodeName !== "CANVAS") {
                this.container.appendChild(c);
            }
            this.container = c;
        }

        this.init();
    }
    init() {
        //event测试
        this.on(
            content => console.log(`get published content: ${content}`),
            "Event test"
        );
        this.on(content => console.log(`get content: ${content}`), "sss");

        // Sprite Painter
        this.im = gl2d(this.container);
        // target
        this.gl = this.im.gl;

        //处理多余参数 再回调初始事件
        this.hook();
        this.initEvent();
    }
    dp(px) {
        return ~~px * this.dpr;
    }
    hook() {
        console.log(this.args, 111);
        // 字符串 加载单个图像 await im.loadTexture('../assets/tex.jpg') 数组 加载图片队列 await
        // im.loadTex(['../assets/tex.jpg']) function 回调loading处理 glsl 加载着色器
        switch (getType(this.args)) {
            case "string":
                console.log("string");
                this.load();
                break;
            case "array":
                console.log("array");
                break;
            case "function":
                console.log("function");
                break;
            case "null":
                console.log("null");
                break;
            default:
                console.log("unkonw argments!");
        }
        // switch 执行代码块无法异步promise 此处可以利用queue，因为loader已经用promise改写 暂不处理
    }
    load() {
        this.im.loadTexture("../assets/tex.jpg");
        console.log("swith");
    }
    initEvent() {
        const events = [
            "mousedown",
            "mouseup",
            "mousemove",
            "touchstart",
            "touchend",
            "touchmove",
            "click"
        ];
        events.forEach(event => {
            this.container.addEventListener(
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
                    Object.assign(evtArgs, { originalX, originalY });
                    this.emit("native", event, evtArgs);
                },
                true
            );
        });
    }
    viewport(gl = this.gl) {
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    }
    clear(gl = this.gl) {
        gl.clear(gl.COLOR_BUFFER_BIT);
    }
    update() {}
    draw() {}
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
