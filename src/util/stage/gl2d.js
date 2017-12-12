//import Transform from 'transfor'

const mat3 = {
    create : function() {
        let out = new Float32Array(9);
        out[0] = 1;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 1;
        out[5] = 0;
        out[6] = 0;
        out[7] = 0;
        out[8] = 1;
        return out;
    },

    copy : function (out, a){
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[3];
        out[4] = a[4];
        out[5] = a[5];
        out[6] = a[6];
        out[7] = a[7];
        out[8] = a[8];
        return out;
    },

    identity: [1.0, 0.0, 0.0,
               0.0, 1.0, 0.0,
               0.0, 0.0, 1.0],

    multiply: function (m1, m2) {
      let m10 = m1[0], m11 = m1[1], m12 = m1[2], m13 = m1[3], m14 = m1[4], m15 = m1[5], m16 = m1[6], m17 = m1[7], m18 = m1[8],
          m20 = m2[0], m21 = m2[1], m22 = m2[2], m23 = m2[3], m24 = m2[4], m25 = m2[5], m26 = m2[6], m27 = m2[7], m28 = m2[8];

      m2[0] = m20 * m10 + m23 * m11 + m26 * m12;
      m2[1] = m21 * m10 + m24 * m11 + m27 * m12;
      m2[2] = m22 * m10 + m25 * m11 + m28 * m12;
      m2[3] = m20 * m13 + m23 * m14 + m26 * m15;
      m2[4] = m21 * m13 + m24 * m14 + m27 * m15;
      m2[5] = m22 * m13 + m25 * m14 + m28 * m15;
      m2[6] = m20 * m16 + m23 * m17 + m26 * m18;
      m2[7] = m21 * m16 + m24 * m17 + m27 * m18;
      m2[8] = m22 * m16 + m25 * m17 + m28 * m18;
    },

    vec2_multiply: function (m1, m2) {
      let mOut = [];
      mOut[0] = m2[0] * m1[0] + m2[3] * m1[1] + m2[6];
      mOut[1] = m2[1] * m1[0] + m2[4] * m1[1] + m2[7];
      return mOut;
    },

    transpose: function (m) {
      return [m[0], m[3], m[6], m[1], m[4], m[7], m[2], m[5], m[8]];
    },

    translate: function(out, a, v){
        let a00 = a[0], a01 = a[1], a02 = a[2],
            a10 = a[3], a11 = a[4], a12 = a[5],
            a20 = a[6], a21 = a[7], a22 = a[8],
            x = v[0], y = v[1];

        out[0] = a00;
        out[1] = a01;
        out[2] = a02;

        out[3] = a10;
        out[4] = a11;
        out[5] = a12;

        out[6] = x * a00 + y * a10 + a20;
        out[7] = x * a01 + y * a11 + a21;
        out[8] = x * a02 + y * a12 + a22;
        return out;
    }
  }; 

class Gl {
    constructor (canvas) {
        this.shaderProgram  = undefined;
        //this.transform      = new Transform();
        this.shaderPool     = [];
        this.maxTextureSize = undefined;

        this.matrix = mat3.create();
        this.mvMatrixStack = [this.matrix];  
        this.mat3Cache = [];
        for(let i = 0; i<20;i++) {
            this.mat3Cache.push(mat3.create());
        }

        this.gl = null;
        this.init(canvas);
    }
    init (canvas) {
        this.gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        if ( this.gl ){
            this.gl.bufferCache = [];
        } else {
            throw new Error("Failed to get the rendering context for WebGL.");
        }

        this.gl.cullFace(this.gl.BACK);
        this.gl.frontFace(this.gl.CW);
        this.gl.enable(this.gl.BLEND);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.disable(this.gl.DEPTH_TEST);
        this.gl.blendFunc(this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA);

        this.gl.viewport(0, 0, canvas.width, canvas.height);
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        this.shaderProgram = this.createProgram(this.gl)
    }
    getFragmentShaderSource () {
        let source = `precision mediump float;
        varying vec2 vTextureCoord;
        uniform sampler2D uSampler;
        uniform vec4 vtSize;
        uniform vec4 color;
        void main(void) {
            if(vtSize.z > 0.0) {
                gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, 1.0-vTextureCoord.t));
            }
            else
            {
                gl_FragColor = color;
            }
        }`;
        return source;
    }
    getVertexShaderSource () {
        let source = `precision mediump float;
        attribute vec4 vtVetex;
        uniform mat3 uMVMatrix;
        uniform vec4 vtSize;
        varying vec2 vTextureCoord;
        void main(void) {
            vec2 aVertexPosition = vtVetex.xy;
            vec2 aTextureCoord = vtVetex.zw;
            vec2 viewSize = vtSize.xy;
            vec2 textureSize = vtSize.zw;
            vec3 pos = uMVMatrix * vec3(aVertexPosition, 1.0);
            vec2 pos2 = (vec2(pos.x, viewSize.y-pos.y)/ viewSize) * 2.0 - 1.0;
            gl_Position = vec4(pos2, 0, 1.0);
            if(textureSize.x > 1.0) {
                vTextureCoord = aTextureCoord/textureSize;
            }
            else
            {
                textureSize = vec2(0.0, 0.0);
            }
        }`;
        return source;
    }
    getVertexShader (gl) {
        return this.getShader(gl, gl.VERTEX_SHADER, this.getVertexShaderSource());
    }
    getFragmentShader (gl) {
        return this.getShader(gl, gl.FRAGMENT_SHADER, this.getFragmentShaderSource());
    }
    getShader (gl, type, source) {
        let shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
    
        if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.log(gl.getShaderInfoLog(shader));
            return 
        }
    
        return shader;
    }
    createProgram (gl) {
        let fragmentShader = this.getFragmentShader(gl);
        let vertexShader = this.getVertexShader(gl); 
        let shaderProgram = gl.createProgram();
        
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);

        let lineStatus = gl.getProgramParameter(shaderProgram, gl.LINK_STATUS);
        if(!lineStatus) {
            console.log("Could not initialise shaders:" + gl.getProgramInfoLog(shaderProgram));
        }

        gl.useProgram(shaderProgram);
        shaderProgram.vtVetex = gl.getAttribLocation(shaderProgram, "vtVetex");
        gl.enableVertexAttribArray(shaderProgram.vtVetex);
        shaderProgram.color = gl.getUniformLocation(shaderProgram, "color");
        shaderProgram.vtSize = gl.getUniformLocation(shaderProgram, "vtSize");
        shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
        shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
    
        return shaderProgram;
    }
    loadTextureWithImage (gl, image) {
        let texture = gl.createTexture();
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        
        image.texture = texture;
        texture.w = image.width;
        texture.h = image.height;
        texture.src = image.src;
    
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    
        gl.bindTexture(gl.TEXTURE_2D, null);
    
        return image;
    }
    createBuffer (gl) {
        if(gl.bufferCache.length) {
            return gl.bufferCache.pop();
        }
    
        return gl.createBuffer(); 
    }
    releaseBuffer (gl,buffer) {
        gl.bufferCache.push(buffer);
        
        return;
    }
    createBufferWithData (gl, data) {
        let buffer = this.createBuffer(gl);
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    
        return buffer;
    }
    loadTexture (gl, src, onSuccess, onFail) {
        let image = new Image();
        let that = this
        image.onload = function() {
            that.loadTextureWithImage(gl, image);
            if(image.texture) {
                if(onSuccess) {
                    onSuccess(image);
                }
            }
            else {
                if(onFail) {
                    onFail();
                }
            }
        }
        
        image.onerror = function(e) {
            if(onFail) {
                onFail();
            }
            console.log("Load Image Failed:" + src);
        }
        
        image.src = src;
        
        return image;
    }
    save () {
        let mvMatrix = this.matrix;
        let newMatrix = this.mat3Cache.pop();
        
        this.matrix = newMatrix;
        this.mvMatrixStack.push(mat3.copy(newMatrix, mvMatrix));
    }
    restore () {
        let mvMatrixStack = this.mvMatrixStack;
        
        if(mvMatrixStack.length <= 1) {
            console.log("restore failed.");
            return 
        }
        
        this.mat3Cache.push(mvMatrixStack.pop());
        this.matrix = mvMatrixStack[mvMatrixStack.length-1];
    }
    translate (x,y) {
       let mvMatrix = this.matrix;
        
        mat3.translate(mvMatrix, mvMatrix, [x, y, 0]);
    }
    rotate (angle) {
        let mvMatrix = this.matrix;
        
        mat3.rotate(mvMatrix, mvMatrix, angle, [0, 0, 1]);
    }
    scale (x, y) {
        let mvMatrix = this.matrix;
        
        mat3.scale(mvMatrix, mvMatrix, [x, y, 1]);
    }
    //transfor
    drawImage (image, p1, p2, p3, p4, p5, p6, p7, p8) {
        let len = arguments.length;
        if(!image.texture) {
            console.log("Invalid image for webgl:" + image.src + " " + image.width + "x" + image.height);
            return;
        }
    
        if(len === 3) {
            this.drawImage3(image, p1, p2);
        }
        else if(len === 5) {
            this.drawImage5(image, p1, p2, p3, p4);
        }
        else if(len === 9) {
            this.drawImage9(image, p1, p2, p3, p4, p5, p6, p7, p8);
        }
        else {
            console.log("invalid arguments for drawImage");
        }
    }
    drawImage3 (image, dx, dy) {
        return this.drawImage9(image, 0, 0, image.width, image.height, dx, dy, image.width, image.height);
    }
    drawImage5 (image, dx, dy, dw, dh) {
        return this.drawImage9(image, 0, 0, image.width, image.height, dx, dy, dw, dh);
    }
    drawImage9 (image, sx, sy, sw, sh, dx, dy, dw, dh) {
        let gl = this.gl;
        let dr = dx + dw;
        let db = dy + dh;
        let sr = sx + sw;
        let sb = sy + sh;
        let shaderProgram = this.shaderProgram;
        let mvMatrix = this.mvMatrixStack[this.mvMatrixStack.length-1];
    
        let texture = image.texture;
        let buffer = texture.buffer;
    
        if(!buffer) {
            let data = new Float32Array([dx,dy, sx,sy, dr,dy, sr,sy, dr,db, sr,sb, dx,db, sx,sb]);
            buffer = this.createBufferWithData(gl, data);
            texture.buffer = buffer;
            gl.buffer = buffer;
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        }
    
        if(gl.buffer !== buffer) {
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        }
        gl.vertexAttribPointer(shaderProgram.vtVetexAttribute, 4, gl.FLOAT, false, 0, 0);
    
        if(gl.currentTexture !== texture) {
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.uniform1i(shaderProgram.samplerUniform, 0);
            gl.currentTexture = texture;
        }
    
        gl.uniform4f(shaderProgram.vtSize, gl.w, gl.h, texture.w, texture.h);
        gl.uniformMatrix3fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
    
        gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
        
    //	this.releaseBuffer(gl, buffer);
    }
}

export default Gl