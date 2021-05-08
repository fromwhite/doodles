import { Stage, Shape } from "./stage/stage";
import "master.css";

document.addEventListener("DOMContentLoaded", main, false);
async function main() {
  let stage = Stage.create(document.getElementById("canvas"), {
    draw() {
      this.shapes.forEach((item) => {
        this.context.drawImage(
          item.textureInfo.texture,
          item.textureInfo.width,
          item.textureInfo.height,
          item.srcX,
          item.srcY,
          item.srcWidth,
          item.srcHeight,
          item.dstX,
          item.dstY,
          item.dstWidth,
          item.dstHeight,
          item.rotation
        );
      });
    },
  });
  let scene = stage.context;
  let textures = await scene.loadTex([
    "../assets/tex.jpg",
    "../assets/hero.jpg",
    "../assets/ji.jpg",
  ]);

  // let shape_list = Array.from({length:3}, (v,k) => k);
  let speed = 60;

  textures.forEach((item) => {
    let shape = Shape.create(item, {
      x: Math.random() * scene.width,
      y: Math.random() * scene.height,
      dx: Math.random() > 0.5 ? -1 : 1,
      dy: Math.random() > 0.5 ? -1 : 1,
      xScale: Math.random() * 0.25 + 0.25,
      yScale: Math.random() * 0.25 + 0.25,
      offX: Math.random() * 0.75,
      offY: Math.random() * 0.75,
      rotation: Math.random() * Math.PI * 2,
      deltaRotation:
        (0.5 + Math.random() * 0.5) * (Math.random() > 0.5 ? -1 : 1),
      width: 1,
      height: 1,
      textureInfo: textures[(Math.random() * textures.length) | 0],
      update(deltaTime) {
        this.x = this.x + this.dx * speed * deltaTime;
        this.y = this.y + this.dy * speed * deltaTime;
        if (this.x < 0) {
          this.dx = 1;
        }
        if (this.x >= scene.width) {
          this.dx = -1;
        }
        if (this.y < 0) {
          this.dy = 1;
        }
        if (this.y >= scene.height) {
          this.dy = -1;
        }
        this.rotation = this.rotation + this.deltaRotation * deltaTime;

        this.dstX = this.x;
        this.dstY = this.y;
        this.dstWidth = this.textureInfo.width * this.xScale;
        this.dstHeight = this.textureInfo.height * this.yScale;
        this.srcX = this.textureInfo.width * this.offX;
        this.srcY = this.textureInfo.height * this.offY;
        this.srcWidth = this.textureInfo.width * this.width;
        this.srcHeight = this.textureInfo.height * this.height;

        let x, y, width, height;
        x = this.dstX;
        y = this.dstY;
        width = this.dstWidth;
        height = this.dstHeight;

        this.rect = { x, y, width, height };
      },
    });

    shape.on("click", function (e) {
      console.log("click", e, this);
    });

    stage.add(shape);
  });

  stage.on("click", function () {
    console.log("pause");
    stage.pause();
  });
  stage.on("dblclick", function () {
    console.log("reloop");
    stage.loop();
  });
}
