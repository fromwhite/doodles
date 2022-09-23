import Transform from "./transform";
import { m4 } from "./math";

class Gl2d {
  constructor(canvas, [width, height]) {
    this.canvas = canvas;
    this.gl = undefined;
    this.transform = new Transform();
    this._resources = new Map();
    this.init([width, height]);
  }
  init([width, height]) {
    // default
    this.canvas.oncontextmenu = function () {
      return false;
    };
    // dpr
    this.dpr = window.devicePixelRatio || 1;
    if (!!width && !!height) {
      // 入参 宽高
      this._width = width;
      this._height = height;
    } else {
      // 没有传入宽高 取父节点宽高初始化
      this._width = this.canvas.parentNode.clientWidth;
      this._height = this.canvas.parentNode.clientHeight;
    }
    this.width = this.dpr * this._width;
    this.height = this.dpr * this._height;
    this.canvas.style.width = `${this._width}px`;
    this.canvas.style.height = `${this._height}px`;
    this.canvas.width = ~~this.width;
    this.canvas.height = ~~this.height;

    this.gl =
      this.canvas.getContext("webgl") ||
      this.canvas.getContext("experimental-webgl");
    let gl = this.gl;

    if (!gl) throw new Error("cannot get gl context!");

    let program = this.createProgram(gl);
    this.positionLocation = gl.getAttribLocation(program, "a_position");
    this.texcoordLocation = gl.getAttribLocation(program, "a_texcoord");

    this.matrixLocation = gl.getUniformLocation(program, "u_matrix");
    this.textureMatrixLocation = gl.getUniformLocation(
      program,
      "u_textureMatrix"
    );

    let textureLocation = gl.getUniformLocation(program, "u_texture");

    // Create a buffer
    let positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    this.positionBuffer = positionBuffer;
    // Put a unit quad in the buffer
    let positions = [0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // Create a buffer for texture coords
    let texcoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
    this.texcoordBuffer = texcoordBuffer;

    // Put texcoords in the buffer
    let texcoords = [0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texcoords), gl.STATIC_DRAW);

    // gl.tex = this.loadTexture.bind(this,arguments); gl.draw =
    // this.drawImage.bind(this,arguments); gl.draw = function (){     drawImage }
  }
  viewport() {
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
  }

  clear() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }
  getFragmentShaderSource() {
    let source = `precision mediump float;
        
        varying vec2 v_texcoord;
        
        uniform sampler2D u_texture;
        
        void main() {
           gl_FragColor = texture2D(u_texture, v_texcoord);
        }`;
    return source;
  }
  getVertexShaderSource() {
    let source = `attribute vec4 a_position;
        attribute vec2 a_texcoord;
        
        uniform mat4 u_matrix;
        uniform mat4 u_textureMatrix;
        
        varying vec2 v_texcoord;
        
        void main() {
           gl_Position = u_matrix * a_position;
           v_texcoord = (u_textureMatrix * vec4(a_texcoord, 0, 1)).xy;
        }`;
    return source;
  }
  getFragmentShader(gl) {
    return this.getShader(
      gl,
      gl.FRAGMENT_SHADER,
      this.getFragmentShaderSource()
    );
  }
  getVertexShader(gl) {
    return this.getShader(gl, gl.VERTEX_SHADER, this.getVertexShaderSource());
  }
  getShader(gl, type, source) {
    let shader = gl.createShader(type);

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.log(gl.getShaderInfoLog(shader));
      return null;
    }

    return shader;
  }
  createProgram(gl) {
    let fragmentShader = this.getFragmentShader(gl);
    let vertexShader = this.getVertexShader(gl);
    let shaderProgram = gl.createProgram();

    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    let lineStatus = gl.getProgramParameter(shaderProgram, gl.LINK_STATUS);
    if (!lineStatus) {
      console.log(
        "Could not initialise shaders:" + gl.getProgramInfoLog(shaderProgram)
      );
    }

    gl.useProgram(shaderProgram);
    return shaderProgram;
  }
  loadTexture(url, timeout = 30000) {
    if (typeof url !== "string") throw new Error("loadTexture faild");
    let loadedTex = this._resources;
    const mapKey = url;

    if (!loadedTex.has(mapKey)) {
      return new Promise((resolve, reject) => {
        let gl = this.gl;
        let tex = gl.createTexture();

        gl.bindTexture(gl.TEXTURE_2D, tex);
        // Fill the texture with a 1x1 blue pixel.
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          1,
          1,
          0,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          new Uint8Array([0, 0, 255, 255])
        );
        // let's assume all images are not a power of 2
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

        let textureInfo = {
          width: 1,
          height: 1,
          texture: tex,
        };
        const timer = setTimeout(() => {
          reject(new Error("loadTexture timeout"));
        }, timeout);
        let img = new Image();
        img.addEventListener("load", function () {
          textureInfo.width = img.width;
          textureInfo.height = img.height;

          gl.bindTexture(gl.TEXTURE_2D, textureInfo.texture);
          gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.RGBA,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            img
          );

          resolve(textureInfo);
          loadedTex.set(mapKey, textureInfo);
          clearTimeout(timer);
        });
        img.src = url;
      });
      return Promise.resolve(loadedTex.get(mapKey));
    }
  }
  async loadTex(resources) {
    if (typeof resources === "string") {
      return await this.loadTexture(resources);
    }
    if (Array.isArray(resources)) {
      const ret = [];
      for (let i = 0; i < resources.length; i++) {
        const res = resources[i];
        if (typeof res === "string") {
          ret.push(await this.loadTexture(res));
        } else {
          throw new Error(`loadTexs faild in progress:${i}`);
        }
      }
      return ret;
    }
  }
  drawImage(
    tex,
    texWidth,
    texHeight,
    srcX,
    srcY,
    srcWidth,
    srcHeight,
    dstX,
    dstY,
    dstWidth,
    dstHeight,
    srcRotation
  ) {
    let gl = this.gl;
    if (dstX === undefined) {
      dstX = srcX;
      srcX = 0;
    }
    if (dstY === undefined) {
      dstY = srcY;
      srcY = 0;
    }
    if (srcWidth === undefined) {
      srcWidth = texWidth;
    }
    if (srcHeight === undefined) {
      srcHeight = texHeight;
    }
    if (dstWidth === undefined) {
      dstWidth = srcWidth;
      srcWidth = texWidth;
    }
    if (dstHeight === undefined) {
      dstHeight = srcHeight;
      srcHeight = texHeight;
    }
    if (srcRotation === undefined) {
      srcRotation = 0;
    }

    gl.bindTexture(gl.TEXTURE_2D, tex);
    //gl.useProgram(program);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    gl.enableVertexAttribArray(this.positionLocation);
    gl.vertexAttribPointer(this.positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.texcoordBuffer);
    gl.enableVertexAttribArray(this.texcoordLocation);
    gl.vertexAttribPointer(this.texcoordLocation, 2, gl.FLOAT, false, 0, 0);

    let matrix = m4.orthographic(
      0,
      gl.canvas.width,
      gl.canvas.height,
      0,
      -1,
      1
    );
    matrix = m4.translate(matrix, dstX, dstY, 0);
    matrix = m4.scale(matrix, dstWidth, dstHeight, 1);

    gl.uniformMatrix4fv(this.matrixLocation, false, matrix);

    let texMatrix = m4.scaling(1 / texWidth, 1 / texHeight, 1);

    texMatrix = m4.translate(texMatrix, texWidth * 0.5, texHeight * 0.5, 0);
    texMatrix = m4.zRotate(texMatrix, srcRotation);
    texMatrix = m4.translate(texMatrix, texWidth * -0.5, texHeight * -0.5, 0);

    texMatrix = m4.translate(texMatrix, srcX, srcY, 0);
    texMatrix = m4.scale(texMatrix, srcWidth, srcHeight, 1);

    gl.uniformMatrix4fv(this.textureMatrixLocation, false, texMatrix);

    gl.uniform1i(this.textureLocation, 0);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }
}

const gl2d = function (...args) {
  return new Gl2d(...args);
};

export default gl2d;
