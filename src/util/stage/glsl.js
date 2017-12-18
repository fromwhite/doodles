// glsl library from WebGL-2D.js
import Transform from 'transfor'

const   shaderMask = {
    texture: 1,
    crop: 2,
    path: 4
};
let rectVertexPositionBuffer,
    rectVertexColorBuffer,
    pathVertexPositionBuffer,
    pathVertexColorBuffer;
const rectVerts = new Float32Array([
    0,0, 0,0,
    0,1, 0,1,
    1,1, 1,1,
    1,0, 1,0
]);

function isPOT(value) {
    return value > 0 && ((value - 1) & value) === 0;
}

class Glsl {
	constructor (canvas,options) {
		this.canvas         = canvas;
        this.options        = options || {};
        this.gl             = undefined;
        this.fs             = undefined;
        this.vs             = undefined;
        this.shaderProgram  = undefined;
        this.transform      = new Transform();
        this.shaderPool     = [];
        this.maxTextureSize = undefined;

        this.init(canvas);
    }
    init (canvas) {
        this.gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        if ( this.gl ){
			//this.gl.bufferCache = [];
			console.log('Get gl context success!')
        } else {
            throw new Error("Failed to get the rendering context for WebGL.");
        }

        this.initShaders()
        this.initBuffers()
        this.initGl2DAPI()

        this.gl.viewport(0, 0, canvas.width, canvas.height);
        this.gl.clearColor(1, 1, 1, 1);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT); // | gl.DEPTH_BUFFER_BIT);

        this.gl.colorMask(1,1,1,0);
		this.gl.enable(this.gl.BLEND);
		this.gl.disable(this.gl.DEPTH_TEST);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
		this.maxTextureSize = this.gl.getParameter(this.gl.MAX_TEXTURE_SIZE);
    }
    initShaders (transformStackDepth,sMask) {
        let gl = this.gl;
        
        transformStackDepth = transformStackDepth || 1;
        sMask = sMask || 0;
        let storedShader = this.shaderPool[transformStackDepth];
        
        if (!storedShader) { storedShader = this.shaderPool[transformStackDepth] = []; }
        storedShader = storedShader[sMask];
        
        if (storedShader) {
            gl.useProgram(storedShader);
            this.shaderProgram = storedShader;
            return storedShader;
        } else {
            let fs = this.fs = gl.createShader(gl.FRAGMENT_SHADER);
            gl.shaderSource(this.fs, this.getFragmentShaderSource(sMask));
            gl.compileShader(this.fs);
        
            if (!gl.getShaderParameter(this.fs, gl.COMPILE_STATUS)) {
            	throw "fragment shader error: "+gl.getShaderInfoLog(this.fs);
            }
        
            let vs = this.vs = gl.createShader(gl.VERTEX_SHADER);
            gl.shaderSource(this.vs, this.getVertexShaderSource(transformStackDepth,sMask));
            gl.compileShader(this.vs);
        
            if (!gl.getShaderParameter(this.vs, gl.COMPILE_STATUS)) {
            	throw "vertex shader error: "+gl.getShaderInfoLog(this.vs);
            }
        
        
            let shaderProgram = this.shaderProgram = gl.createProgram();
            shaderProgram.stackDepth = transformStackDepth;
            gl.attachShader(shaderProgram, fs);
            gl.attachShader(shaderProgram, vs);
            gl.linkProgram(shaderProgram);
        
            if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            	throw "Could not initialise shaders.";
            }
        
            gl.useProgram(shaderProgram);
        
            shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
            gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
        
            shaderProgram.uColor   = gl.getUniformLocation(shaderProgram, 'uColor');
            shaderProgram.uSampler = gl.getUniformLocation(shaderProgram, 'uSampler');
            shaderProgram.uCropSource = gl.getUniformLocation(shaderProgram, 'uCropSource');
        
            shaderProgram.uTransforms = [];
            for (let i=0; i<transformStackDepth; ++i) {
                shaderProgram.uTransforms[i] = gl.getUniformLocation(shaderProgram, 'uTransforms[' + i + ']');
            }
            this.shaderPool[transformStackDepth][sMask] = shaderProgram;
            return shaderProgram;
        } 
    }
    initBuffers () {
        let gl = this.gl;
        
        rectVertexPositionBuffer  = gl.createBuffer();
        rectVertexColorBuffer     = gl.createBuffer();
        
        pathVertexPositionBuffer  = gl.createBuffer();
        pathVertexColorBuffer     = gl.createBuffer();
        
        gl.bindBuffer(gl.ARRAY_BUFFER, rectVertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, rectVerts, gl.STATIC_DRAW);
    }
    getFragmentShaderSource(sMask) {
        let fsSource =
        `#ifdef GL_ES
            precision highp float;
		#endif
		
        #define hasTexture ${(sMask&shaderMask.texture) ? 1 : 0}
		#define hasCrop ${(sMask&shaderMask.crop) ? 1 : 0}
		
		varying vec4 vColor;
		
        #if hasTexture
            varying vec2 vTextureCoord;
            uniform sampler2D uSampler;
            #if hasCrop
                uniform vec4 uCropSource;
            #endif
		#endif
		
        void main(void) {
            #if hasTexture
                #if hasCrop
                    gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x * uCropSource.z, vTextureCoord.y * uCropSource.w) + uCropSource.xy);
                #else
                    gl_FragColor = texture2D(uSampler, vTextureCoord);
                #endif
            #else
                gl_FragColor = vColor;
            #endif
        }`;
        return fsSource
    }
    getVertexShaderSource(stackDepth,sMask) {
        let w = 2 / this.canvas.width, h = -2 / this.canvas.height;
			stackDepth = stackDepth || 1;

        let vsSource =
        `#define hasTexture ${(sMask&shaderMask.texture) ? 1 : 0}
		attribute vec4 aVertexPosition;
		
        #if hasTexture
        varying vec2 vTextureCoord;
		#endif
		
        uniform vec4 uColor;
		uniform mat3 uTransforms[${stackDepth}];
		
		varying vec4 vColor;
		
		const mat4 pMatrix = mat4(${w},0,0,0, 0,${h},0,0, 0,0,1.0,1.0, -1.0,1.0,0,0);
		
        mat3 crunchStack(void) {
            mat3 result = uTransforms[0];
            for (int i = 1; i < ${stackDepth}; ++i) {
                result = uTransforms[i] * result;
            }
            return result;
		}
		
        void main(void) {
			vec3 position = crunchStack() * vec3(aVertexPosition.x, aVertexPosition.y, 1.0);
            gl_Position = pMatrix * vec4(position, 1.0);
            vColor = uColor;
            #if hasTexture
                vTextureCoord = aVertexPosition.zw;
            #endif
        }`;
        return vsSource;
    }
    initGl2DAPI (){
    	let	gl2d = this,
    		gl   = this.gl;


      	// Rendering Canvas for text fonts
      	let textCanvas    = document.createElement("canvas");
      	textCanvas.width  = gl2d.canvas.width;
      	textCanvas.height = gl2d.canvas.height;
      	let textCtx       = textCanvas.getContext("2d");

    	// Need a solution for drawing text that isnt stupid slow
    	gl.fillText = function fillText(text, x, y) {
      
			textCtx.clearRect(0, 0, gl2d.canvas.width, gl2d.canvas.height);
			textCtx.fillStyle = gl.fillStyle;
			textCtx.fillText(text, x, y);

			gl.drawImage(textCanvas, 0, 0);
      
    	};

		gl.measureText = function measureText() { return 1; };

		let tempCanvas = document.createElement('canvas');
		let tempCtx = tempCanvas.getContext('2d');

		gl.save = function save() {
			gl2d.transform.pushMatrix();
			saveDrawState();
		};

		gl.restore = function restore() {
			gl2d.transform.popMatrix();
			restoreDrawState();
		};

		gl.translate = function translate(x, y) {
			gl2d.transform.translate(x, y);
		};

		gl.rotate = function rotate(a) {
			gl2d.transform.rotate(a);
		};

		gl.scale = function scale(x, y) {
			gl2d.transform.scale(x, y);
		};

		gl.createImageData = function createImageData(width, height) {
			return tempCtx.createImageData(width, height);
		};

		gl.getImageData = function getImageData(x, y, width, height) {
			let data = tempCtx.createImageData(width, height);
			let buffer = new Uint8Array(width*height*4);
			gl.readPixels(x, y, width, height, gl.RGBA, gl.UNSIGNED_BYTE, buffer);
			let w=width*4, h=height;
			for (let i=0, maxI=h/2; i<maxI; ++i) {
				for (let j=0, maxJ=w; j<maxJ; ++j) {
				let index1 = i * w + j;
				let index2 = (h-i-1) * w + j;
				data.data[index1] = buffer[index2];
				data.data[index2] = buffer[index1];
				} //for
			} //for

			return data;
		};

		gl.putImageData = function putImageData(imageData, x, y) {
			gl.drawImage(imageData, x, y);
		};

		gl.transform = function transform(m11, m12, m21, m22, dx, dy) {
			let m = gl2d.transform.m_stack[gl2d.transform.c_stack];

			m[0] *= m11;
			m[1] *= m21;
			m[2] *= dx;
			m[3] *= m12;
			m[4] *= m22;
			m[5] *= dy;
			m[6] = 0;
			m[7] = 0;
		};

		function sendTransformStack(sp) {
		let stack = gl2d.transform.m_stack;
			for (let i = 0, maxI = gl2d.transform.c_stack + 1; i < maxI; ++i) {
				gl.uniformMatrix3fv(sp.uTransforms[i], false, stack[maxI-1-i]);
			}
		}

		gl.setTransform = function setTransform(m11, m12, m21, m22, dx, dy) {
			gl2d.transform.setIdentity();
			gl.transform.apply(this, arguments);
		};

		gl.fillRect = function fillRect(x, y, width, height) {
			let transform = gl2d.transform;
			let shaderProgram = gl2d.initShaders(transform.c_stack+2,0);

			gl.bindBuffer(gl.ARRAY_BUFFER, rectVertexPositionBuffer);
			gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 4, gl.FLOAT, false, 0, 0);

			transform.pushMatrix();

			transform.translate(x, y);
			transform.scale(width, height);

			sendTransformStack(shaderProgram);

			gl.uniform4f(shaderProgram.uColor, drawState.fillStyle[0], drawState.fillStyle[1], drawState.fillStyle[2], drawState.fillStyle[3]);

			gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

			transform.popMatrix();
		};

		gl.strokeRect = function strokeRect(x, y, width, height) {
			let transform = gl2d.transform;
			let shaderProgram = gl2d.initShaders(transform.c_stack + 2,0);

			gl.bindBuffer(gl.ARRAY_BUFFER, rectVertexPositionBuffer);
			gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 4, gl.FLOAT, false, 0, 0);

			transform.pushMatrix();

			transform.translate(x, y);
			transform.scale(width, height);

			sendTransformStack(shaderProgram);

			gl.uniform4f(shaderProgram.uColor, drawState.strokeStyle[0], drawState.strokeStyle[1], drawState.strokeStyle[2], drawState.strokeStyle[3]);

			gl.drawArrays(gl.LINE_LOOP, 0, 4);

			transform.popMatrix();
		};

		let subPaths = [];

		function SubPath(x, y) {
			this.closed = false;
			this.verts = [x, y, 0, 0];
		}

		gl.beginPath = function beginPath() {
			subPaths.length = 0;
		};

		gl.closePath = function closePath() {
			if (subPaths.length) {
				let prevPath = subPaths[subPaths.length -1], startX = prevPath.verts[0], startY = prevPath.verts[1];
				prevPath.closed = true;

				let newPath = new SubPath(startX, startY);
				subPaths.push(newPath);
			}
		};

		gl.moveTo = function moveTo(x, y) {
			subPaths.push(new SubPath(x, y));
		};

		gl.lineTo = function lineTo(x, y) {
			if (subPaths.length) {
				subPaths[subPaths.length -1].verts.push(x, y, 0, 0);
			} else {
				gl.moveTo(x, y);
			}
		};
		
		gl.rect = function rect(x, y, w, h) {
			gl.moveTo(x, y);
			gl.lineTo(x + w, y);
			gl.lineTo(x + w, y + h);
			gl.lineTo(x, y + h);
			gl.closePath();
		};


		let imageCache = [], textureCache = [];

		function Texture(image) {
			this.obj   = gl.createTexture();
			this.index = textureCache.push(this);

			imageCache.push(image);

			if (image.width > gl2d.maxTextureSize || image.height > gl2d.maxTextureSize) {
				let canvas = document.createElement("canvas");

				canvas.width  = (image.width  > gl2d.maxTextureSize) ? gl2d.maxTextureSize : image.width;
				canvas.height = (image.height > gl2d.maxTextureSize) ? gl2d.maxTextureSize : image.height;

				let ctx = canvas.getContext("2d");

				ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);

				image = canvas;
			}

			gl.bindTexture(gl.TEXTURE_2D, this.obj);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

			if (isPOT(image.width) && isPOT(image.height)) {
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
				gl.generateMipmap(gl.TEXTURE_2D);
			} else {
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
			}

			gl.bindTexture(gl.TEXTURE_2D, null);
		}

		gl.drawImage = function drawImage(image, a, b, c, d, e, f, g, h) {
			let transform = gl2d.transform;

			transform.pushMatrix();

			let sMask = shaderMask.texture;
			let doCrop = false;

			if (arguments.length === 3) {
				transform.translate(a, b);
				transform.scale(image.width, image.height);
			}

			else if (arguments.length === 5) {
				transform.translate(a, b);
				transform.scale(c, d);
			}

			else if (arguments.length === 9) {
				transform.translate(e, f);
				transform.scale(g, h);
				sMask = sMask|shaderMask.crop;
				doCrop = true;
			}

			let shaderProgram = gl2d.initShaders(transform.c_stack, sMask);

			let texture, cacheIndex = imageCache.indexOf(image);

			if (cacheIndex !== -1) {
				texture = textureCache[cacheIndex];
			} else {
				texture = new Texture(image);
			}

			if (doCrop) {
				gl.uniform4f(shaderProgram.uCropSource, a/image.width, b/image.height, c/image.width, d/image.height);
			}

			gl.bindBuffer(gl.ARRAY_BUFFER, rectVertexPositionBuffer);
			gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 4, gl.FLOAT, false, 0, 0);

			gl.bindTexture(gl.TEXTURE_2D, texture.obj);
			gl.activeTexture(gl.TEXTURE0);

			gl.uniform1i(shaderProgram.uSampler, 0);

			sendTransformStack(shaderProgram);
			gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

			transform.popMatrix();
		};
  	}
}

export default function gl2d(...args){
	let glsl2d = new Glsl(...args);
  	return glsl2d.gl
}