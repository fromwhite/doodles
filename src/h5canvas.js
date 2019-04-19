import { Event, rAF, getType } from "_";
import "master.css";

document.addEventListener("DOMContentLoaded", main, false);

// 主循环
async function main() {
    let dpr = window.devicePixelRatio || 1;
    let wrapper = document.getElementById("gl").parentNode;
    let ctx = document.getElementById("gl");
    ctx._width = wrapper.clientWidth;
    ctx._height = wrapper.clientHeight;
    ctx.width = ~~dpr * ctx._width;
    ctx.height = ~~dpr * ctx._height;
    ctx.style.width = `${ctx._width}px`;
    ctx.style.height = `${ctx._height}px`;
    let c = ctx.getContext("2d");
    let textureInfos = await loader([
        "../assets/tex.jpg",
        "../assets/hero.jpg",
        "../assets/ji.jpg"
    ]);

    let drawInfos = [];
    let numToDraw = 3;
    let speed = 60;
    for (let ii = 0; ii < numToDraw; ++ii) {
        let drawInfo = {
            x: Math.random() * ctx.width,
            y: Math.random() * ctx.height,
            dx: Math.random() > 0.5 ? -1 : 1,
            dy: Math.random() > 0.5 ? -1 : 1,
            xScale: Math.random() * 0.25 + 0.25,
            yScale: Math.random() * 0.25 + 0.25,
            offX: Math.random() * 0.75,
            offY: Math.random() * 0.75,
            offX: 0,
            offY: 0,
            rotation: Math.random() * Math.PI * 2,
            deltaRotation:
                (0.5 + Math.random() * 0.5) * (Math.random() > 0.5 ? -1 : 1),
            width: 1,
            height: 1,
            textureInfo: textureInfos[(Math.random() * textureInfos.length) | 0]
        };
        drawInfos.push(drawInfo);
    }
    function update(deltaTime) {
        drawInfos.forEach(function(drawInfo) {
            drawInfo.x += drawInfo.dx * speed * deltaTime;
            drawInfo.y += drawInfo.dy * speed * deltaTime;
            if (drawInfo.x < 0) {
                drawInfo.dx = 1;
            }
            if (drawInfo.x >= ctx.width) {
                drawInfo.dx = -1;
            }
            if (drawInfo.y < 0) {
                drawInfo.dy = 1;
            }
            if (drawInfo.y >= ctx.height) {
                drawInfo.dy = -1;
            }
            // drawInfo.rotation += drawInfo.deltaRotation * deltaTime;
        });
    }
    function draw() {
        drawInfos.forEach(function(drawInfo, i) {
            let dstX = drawInfo.x;
            let dstY = drawInfo.y;
            let dstWidth = drawInfo.textureInfo.width * drawInfo.xScale;
            let dstHeight = drawInfo.textureInfo.height * drawInfo.yScale;

            let srcX = drawInfo.textureInfo.width * drawInfo.offX;
            let srcY = drawInfo.textureInfo.height * drawInfo.offY;
            let srcWidth = drawInfo.textureInfo.width;
            let srcHeight = drawInfo.textureInfo.height;
            c.drawImage(
                drawInfo.textureInfo,
                srcX,
                srcY,
                srcWidth,
                srcHeight,
                dstX,
                dstY,
                dstWidth,
                dstHeight
            );
        });
    }

    let then = 0;
    function render(time) {
        let now = time * 0.001;
        let deltaTime = Math.min(0.1, now - then);
        then = now;
        update(deltaTime);
        c.clearRect(0, 0, c.width, c.height);
        draw();
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

// 舞台
class Satge extends Event {}

// 精灵
class Sprite extends Event {}

// 图片资源
let Texture = new Map();
async function loader(resources) {
    if (typeof resources === "string") {
        return await loadImage(resources);
    }
    if (Array.isArray(resources)) {
        const ret = [];
        for (let i = 0; i < resources.length; i++) {
            const res = resources[i];
            if (typeof res === "string") {
                ret.push(await loadImage(res));
            } else {
                throw new Error(`loadTexs faild in progress:${i}`);
            }
        }
        return ret;
    }
}
function loadImage(url, timeout = 30000) {
    if (typeof url !== "string") throw new Error("loadTexture faild");
    const mapKey = url;
    if (!Texture.has(mapKey)) {
        return new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
                reject(new Error("loadTexture timeout"));
            }, timeout);
            let img = new Image();
            img.addEventListener("load", function() {
                resolve(img);
                Texture.set(mapKey, img);
                clearTimeout(timer);
            });
            img.src = url;
        });
        return Promise.resolve(Texture.get(mapKey));
    }
}
