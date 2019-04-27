import { Stage, Shape } from "stage";
import "master.css";

document.addEventListener("DOMContentLoaded", main, false);
async function main() {
    let s = Stage.create(document.getElementById("canvas"));
    let scene = s.context;
    let textureInfos = await scene.loadTex([
        "../assets/tex.jpg",
        "../assets/hero.jpg",
        "../assets/ji.jpg"
    ]);

    let cat = Shape.create(textureInfos[0]);
    // cat.on("click", function() {
    //     console.log("click");
    // });

    s.add(cat);

    s.loop();
    //console.log(s, cat);

    let drawInfos = [];
    let numToDraw = 3;
    let speed = 60;
    for (let ii = 0; ii < numToDraw; ++ii) {
        let drawInfo = {
            x: Math.random() * scene.width,
            y: Math.random() * scene.height,
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
            if (drawInfo.x >= scene.width) {
                drawInfo.dx = -1;
            }
            if (drawInfo.y < 0) {
                drawInfo.dy = 1;
            }
            if (drawInfo.y >= scene.height) {
                drawInfo.dy = -1;
            }
            drawInfo.rotation += drawInfo.deltaRotation * deltaTime;
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
            let srcWidth = drawInfo.textureInfo.width * drawInfo.width;
            let srcHeight = drawInfo.textureInfo.height * drawInfo.height;

            scene.drawImage(
                drawInfo.textureInfo.texture,
                drawInfo.textureInfo.width,
                drawInfo.textureInfo.height,
                srcX,
                srcY,
                srcWidth,
                srcHeight,
                dstX,
                dstY,
                dstWidth,
                dstHeight,
                drawInfo.rotation
            );
        });
    }

    // let then = 0;
    // let id;

    // function render(time = ctime) {
    //     let now = time * 0.001;
    //     let deltaTime = Math.min(0.1, now - then);
    //     then = now;
    //     update(deltaTime);
    //     draw();
    //     id = requestAnimationFrame(render);
    // }
    //requestAnimationFrame(render);
    // s.on("click", function() {
    //     console.log("click");
    //     cancelAnimationFrame(id);
    // });
}

if (module.hot) module.hot.accept();
