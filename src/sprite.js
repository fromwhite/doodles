import Stage from 'stage'

document.addEventListener("DOMContentLoaded", main, false);
function main(){
    
    let s = Stage.create(document.getElementById('gl'));

    var textureInfos = [
        s.gl.loadTexture('../assets/tex.jpg')
      ];
      
      
var gl = s.gl.gl
      var drawInfos = [];
      var numToDraw = 1;
      var speed = 60;
      for (var ii = 0; ii < numToDraw; ++ii) {
        var drawInfo = {
          x: Math.random() * gl.canvas.width,
          y: Math.random() * gl.canvas.height,
          dx: Math.random() > 0.5 ? -1 : 1,
          dy: Math.random() > 0.5 ? -1 : 1,
          xScale: Math.random() * 0.25 + 0.25,
          yScale: Math.random() * 0.25 + 0.25,
          offX: Math.random() * 0.75,
          offY: Math.random() * 0.75,
          offX: 0,
          offY: 0,
          rotation: Math.random() * Math.PI * 2,
          deltaRotation: (0.5 + Math.random() * 0.5) * (Math.random() > 0.5 ? -1 : 1),
          width:  1,
          height: 1,
          textureInfo: textureInfos[Math.random() * textureInfos.length | 0],
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
          if (drawInfo.x >= gl.canvas.width) {
            drawInfo.dx = -1;
          }
          if (drawInfo.y < 0) {
            drawInfo.dy = 1;
          }
          if (drawInfo.y >= gl.canvas.height) {
            drawInfo.dy = -1;
          }
          drawInfo.rotation += drawInfo.deltaRotation * deltaTime;
        });
      }

      function draw() {
        
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        
            gl.clear(gl.COLOR_BUFFER_BIT);
        
            drawInfos.forEach(function(drawInfo,i) {
              let dstX      = drawInfo.x;
              let dstY      = drawInfo.y;
              let dstWidth  = drawInfo.textureInfo.width  * drawInfo.xScale;
              let dstHeight = drawInfo.textureInfo.height * drawInfo.yScale;
        
              let srcX      = drawInfo.textureInfo.width  * drawInfo.offX;
              let srcY      = drawInfo.textureInfo.height * drawInfo.offY;
              let srcWidth  = drawInfo.textureInfo.width  * drawInfo.width;
              let srcHeight = drawInfo.textureInfo.height * drawInfo.height;
        
              s.gl.drawImage(
                drawInfo.textureInfo.texture,
                drawInfo.textureInfo.width,
                drawInfo.textureInfo.height,
                srcX, srcY, srcWidth, srcHeight,
                dstX, dstY, dstWidth, dstHeight,
                drawInfo.rotation);
            });
          }


          var then = 0;
          function render(time) {
            var now = time * 0.001;
            var deltaTime = Math.min(0.1, now - then);
            then = now;
        
            update(deltaTime);
            draw();
            //drawImage(textureInfos[0][0])
        
            requestAnimationFrame(render);
          }
          requestAnimationFrame(render);
}

if (module.hot) module.hot.accept();