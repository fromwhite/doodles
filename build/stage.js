/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules, executeModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [], result;
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules, executeModules);
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/ 		if(executeModules) {
/******/ 			for(i=0; i < executeModules.length; i++) {
/******/ 				result = __webpack_require__(__webpack_require__.s = executeModules[i]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	};
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// objects to store loaded and loading chunks
/******/ 	var installedChunks = {
/******/ 		1: 0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData === 0) {
/******/ 			return new Promise(function(resolve) { resolve(); });
/******/ 		}
/******/
/******/ 		// a Promise means "currently loading".
/******/ 		if(installedChunkData) {
/******/ 			return installedChunkData[2];
/******/ 		}
/******/
/******/ 		// setup Promise in chunk cache
/******/ 		var promise = new Promise(function(resolve, reject) {
/******/ 			installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 		});
/******/ 		installedChunkData[2] = promise;
/******/
/******/ 		// start chunk loading
/******/ 		var head = document.getElementsByTagName('head')[0];
/******/ 		var script = document.createElement('script');
/******/ 		script.type = 'text/javascript';
/******/ 		script.charset = 'utf-8';
/******/ 		script.async = true;
/******/ 		script.timeout = 120000;
/******/
/******/ 		if (__webpack_require__.nc) {
/******/ 			script.setAttribute("nonce", __webpack_require__.nc);
/******/ 		}
/******/ 		script.src = __webpack_require__.p + "build/" + ({"0":"sprite"}[chunkId]||chunkId) + ".js";
/******/ 		var timeout = setTimeout(onScriptComplete, 120000);
/******/ 		script.onerror = script.onload = onScriptComplete;
/******/ 		function onScriptComplete() {
/******/ 			// avoid mem leaks in IE.
/******/ 			script.onerror = script.onload = null;
/******/ 			clearTimeout(timeout);
/******/ 			var chunk = installedChunks[chunkId];
/******/ 			if(chunk !== 0) {
/******/ 				if(chunk) {
/******/ 					chunk[1](new Error('Loading chunk ' + chunkId + ' failed.'));
/******/ 				}
/******/ 				installedChunks[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		head.appendChild(script);
/******/
/******/ 		return promise;
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ = __webpack_require__(3);

var _glsl = __webpack_require__(4);

var _glsl2 = _interopRequireDefault(_glsl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//舞台
var _Stage = function (_Event) {
    _inherits(_Stage, _Event);

    function _Stage(canvas) {
        _classCallCheck(this, _Stage);

        var _this = _possibleConstructorReturn(this, (_Stage.__proto__ || Object.getPrototypeOf(_Stage)).call(this));

        _this.dpr = window.devicePixelRatio || 1;

        _this.container = canvas || null;
        // context
        _this.gl = null;
        // image matting
        _this.im = null;

        // ticker
        _this.then = 0;

        //el设置为空或者为父节点
        if (!_this.container || _this.container.nodeName !== 'CANVAS') {
            var _canvas = document.createElement('canvas');
            _canvas.id = 'gl';
            _canvas.oncontextmenu = function () {
                return false;
            };

            if (!_this.container) {
                document.body.appendChild(_canvas);
            }
            if (_this.container.nodeName !== 'CANVAS') {
                _this.container.appendChild(_canvas);
            }

            //重置
            _this.container = document.querySelector('#gl');
        }

        _this.init();
        return _this;
    }

    _createClass(_Stage, [{
        key: 'init',
        value: function init() {
            //event测试
            this.on(function (content) {
                return console.log('get published content: ' + content);
            }, 'Event test');
            this.on(function (content) {
                return console.log('get content: ' + content);
            }, 'sss');

            //canvas外层容器宽高 利用css响应布局
            this._width = this.container.parentNode.clientWidth;
            this._height = this.container.parentNode.clientHeight;
            //真实宽高
            this.width = this.dpr * this._width;
            this.height = this.dpr * this._height;
            //初始化canvas元素
            this.container.style.width = this._width + 'px';
            this.container.style.height = this._height + 'px';

            this.container.width = ~~this.width;
            this.container.height = ~~this.height;

            // Sprite Painter
            this.im = (0, _glsl2.default)(this.container);
            // target
            this.gl = this.im.gl;

            this.initEvent();
        }
    }, {
        key: 'dp',
        value: function dp(px) {
            return ~~px * this.dpr;
        }
        //single bus

    }, {
        key: 'initEvent',
        value: function initEvent() {
            var _this2 = this;

            var events = ['mousedown', 'mouseup', 'mousemove', 'touchstart', 'touchend', 'touchmove', 'click'];
            events.forEach(function (event) {

                _this2.container.addEventListener(event, function (e) {
                    var _e$target$getBounding = e.target.getBoundingClientRect(),
                        left = _e$target$getBounding.left,
                        top = _e$target$getBounding.top;

                    var originalX = void 0,
                        originalY = void 0;
                    var evtArgs = {
                        originalEvent: e,
                        type: event
                    };
                    if (e.changedTouches) {
                        var _e$changedTouches$ = e.changedTouches[0],
                            clientX = _e$changedTouches$.clientX,
                            clientY = _e$changedTouches$.clientY;


                        originalX = Math.round(clientX - left);
                        originalY = Math.round(clientY - top);
                    } else {
                        originalX = Math.round(e.clientX - left);
                        originalY = Math.round(e.clientY - top);
                    }
                    Object.assign(evtArgs, { originalX: originalX, originalY: originalY });
                    _this2.emit('native', event, evtArgs);
                }, true);
            });
        }
    }, {
        key: 'viewport',
        value: function viewport() {
            var gl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.gl;

            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        }
    }, {
        key: 'clear',
        value: function clear() {
            var gl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.gl;

            gl.clear(gl.COLOR_BUFFER_BIT);
        }
    }, {
        key: 'update',
        value: function update() {}
    }, {
        key: 'draw',
        value: function draw() {}
    }, {
        key: 'render',
        value: function render(time) {
            var _this3 = this;

            console.log('render');
            (0, _.raf)(function () {
                return _this3.loop();
            });
        }
    }, {
        key: 'loop',
        value: function loop(time) {
            var _this4 = this;

            var now = time * 0.001;
            this.deltaTime = Math.min(0.1, now - this.then);
            this.then = now;
            console.log('loop');
            this.update();
            this.draw();
            (0, _.raf)(function () {
                return _this4.loop();
            });
        }
    }]);

    return _Stage;
}(_.Event);

var Stage = {
    create: function create() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return new (Function.prototype.bind.apply(_Stage, [null].concat(args)))();
    }
};

exports.default = Stage;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var mat3 = {
  identity: [1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0],

  multiply: function multiply(m1, m2) {
    var m10 = m1[0],
        m11 = m1[1],
        m12 = m1[2],
        m13 = m1[3],
        m14 = m1[4],
        m15 = m1[5],
        m16 = m1[6],
        m17 = m1[7],
        m18 = m1[8],
        m20 = m2[0],
        m21 = m2[1],
        m22 = m2[2],
        m23 = m2[3],
        m24 = m2[4],
        m25 = m2[5],
        m26 = m2[6],
        m27 = m2[7],
        m28 = m2[8];

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

  vec2_multiply: function vec2_multiply(m1, m2) {
    var mOut = [];
    mOut[0] = m2[0] * m1[0] + m2[3] * m1[1] + m2[6];
    mOut[1] = m2[1] * m1[0] + m2[4] * m1[1] + m2[7];
    return mOut;
  },

  transpose: function transpose(m) {
    return [m[0], m[3], m[6], m[1], m[4], m[7], m[2], m[5], m[8]];
  }
};

var vec3 = {
  length: function length(pt) {
    return Math.sqrt(pt[0] * pt[0] + pt[1] * pt[1] + pt[2] * pt[2]);
  },

  normalize: function normalize(pt) {
    var d = Math.sqrt(pt[0] * pt[0] + pt[1] * pt[1] + pt[2] * pt[2]);
    if (d === 0) {
      return [0, 0, 0];
    }
    return [pt[0] / d, pt[1] / d, pt[2] / d];
  },

  dot: function dot(v1, v2) {
    return v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2];
  },

  angle: function angle(v1, v2) {
    return Math.acos((v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2]) / (Math.sqrt(v1[0] * v1[0] + v1[1] * v1[1] + v1[2] * v1[2]) * Math.sqrt(v2[0] * v2[0] + v2[1] * v2[1] + v2[2] * v2[2])));
  },

  cross: function cross(vectA, vectB) {
    return [vectA[1] * vectB[2] - vectB[1] * vectA[2], vectA[2] * vectB[0] - vectB[2] * vectA[0], vectA[0] * vectB[1] - vectB[0] * vectA[1]];
  },

  multiply: function multiply(vectA, constB) {
    return [vectA[0] * constB, vectA[1] * constB, vectA[2] * constB];
  },

  add: function add(vectA, vectB) {
    return [vectA[0] + vectB[0], vectA[1] + vectB[1], vectA[2] + vectB[2]];
  },

  subtract: function subtract(vectA, vectB) {
    return [vectA[0] - vectB[0], vectA[1] - vectB[1], vectA[2] - vectB[2]];
  },

  equal: function equal(a, b) {
    var epsilon = 0.0000001;
    if (a === undefined && b === undefined) {
      return true;
    }
    if (a === undefined || b === undefined) {
      return false;
    }
    return Math.abs(a[0] - b[0]) < epsilon && Math.abs(a[1] - b[1]) < epsilon && Math.abs(a[2] - b[2]) < epsilon;
  }
};

var m4 = {
  multiply: function multiply(a, b, dst) {
    dst = dst || new Float32Array(16);
    var b00 = b[0 * 4 + 0];
    var b01 = b[0 * 4 + 1];
    var b02 = b[0 * 4 + 2];
    var b03 = b[0 * 4 + 3];
    var b10 = b[1 * 4 + 0];
    var b11 = b[1 * 4 + 1];
    var b12 = b[1 * 4 + 2];
    var b13 = b[1 * 4 + 3];
    var b20 = b[2 * 4 + 0];
    var b21 = b[2 * 4 + 1];
    var b22 = b[2 * 4 + 2];
    var b23 = b[2 * 4 + 3];
    var b30 = b[3 * 4 + 0];
    var b31 = b[3 * 4 + 1];
    var b32 = b[3 * 4 + 2];
    var b33 = b[3 * 4 + 3];
    var a00 = a[0 * 4 + 0];
    var a01 = a[0 * 4 + 1];
    var a02 = a[0 * 4 + 2];
    var a03 = a[0 * 4 + 3];
    var a10 = a[1 * 4 + 0];
    var a11 = a[1 * 4 + 1];
    var a12 = a[1 * 4 + 2];
    var a13 = a[1 * 4 + 3];
    var a20 = a[2 * 4 + 0];
    var a21 = a[2 * 4 + 1];
    var a22 = a[2 * 4 + 2];
    var a23 = a[2 * 4 + 3];
    var a30 = a[3 * 4 + 0];
    var a31 = a[3 * 4 + 1];
    var a32 = a[3 * 4 + 2];
    var a33 = a[3 * 4 + 3];
    dst[0] = b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30;
    dst[1] = b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31;
    dst[2] = b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32;
    dst[3] = b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33;
    dst[4] = b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30;
    dst[5] = b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31;
    dst[6] = b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32;
    dst[7] = b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33;
    dst[8] = b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30;
    dst[9] = b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31;
    dst[10] = b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32;
    dst[11] = b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33;
    dst[12] = b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30;
    dst[13] = b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31;
    dst[14] = b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32;
    dst[15] = b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33;
    return dst;
  },

  addVectors: function addVectors(a, b, dst) {
    dst = dst || new Float32Array(3);
    dst[0] = a[0] + b[0];
    dst[1] = a[1] + b[1];
    dst[2] = a[2] + b[2];
    return dst;
  },

  subtractVectors: function subtractVectors(a, b, dst) {
    dst = dst || new Float32Array(3);
    dst[0] = a[0] - b[0];
    dst[1] = a[1] - b[1];
    dst[2] = a[2] - b[2];
    return dst;
  },

  normalize: function normalize(v, dst) {
    dst = dst || new Float32Array(3);
    var length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
    if (length > 0.00001) {
      dst[0] = v[0] / length;
      dst[1] = v[1] / length;
      dst[2] = v[2] / length;
    }
    return dst;
  },

  cross: function cross(a, b, dst) {
    dst = dst || new Float32Array(3);
    dst[0] = a[1] * b[2] - a[2] * b[1];
    dst[1] = a[2] * b[0] - a[0] * b[2];
    dst[2] = a[0] * b[1] - a[1] * b[0];
    return dst;
  },

  dot: function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  },

  distanceSq: function distanceSq(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    var dz = a[2] - b[2];
    return dx * dx + dy * dy + dz * dz;
  },

  distance: function distance(a, b) {
    return Math.sqrt(distanceSq(a, b));
  },

  identity: function identity(dst) {
    dst = dst || new Float32Array(16);

    dst[0] = 1;
    dst[1] = 0;
    dst[2] = 0;
    dst[3] = 0;
    dst[4] = 0;
    dst[5] = 1;
    dst[6] = 0;
    dst[7] = 0;
    dst[8] = 0;
    dst[9] = 0;
    dst[10] = 1;
    dst[11] = 0;
    dst[12] = 0;
    dst[13] = 0;
    dst[14] = 0;
    dst[15] = 1;

    return dst;
  },

  transpose: function transpose(m, dst) {
    dst = dst || new Float32Array(16);

    dst[0] = m[0];
    dst[1] = m[4];
    dst[2] = m[8];
    dst[3] = m[12];
    dst[4] = m[1];
    dst[5] = m[5];
    dst[6] = m[9];
    dst[7] = m[13];
    dst[8] = m[2];
    dst[9] = m[6];
    dst[10] = m[10];
    dst[11] = m[14];
    dst[12] = m[3];
    dst[13] = m[7];
    dst[14] = m[11];
    dst[15] = m[15];

    return dst;
  },

  lookAt: function lookAt(cameraPosition, target, up, dst) {
    dst = dst || new Float32Array(16);
    var zAxis = normalize(subtractVectors(cameraPosition, target));
    var xAxis = normalize(cross(up, zAxis));
    var yAxis = normalize(cross(zAxis, xAxis));

    dst[0] = xAxis[0];
    dst[1] = xAxis[1];
    dst[2] = xAxis[2];
    dst[3] = 0;
    dst[4] = yAxis[0];
    dst[5] = yAxis[1];
    dst[6] = yAxis[2];
    dst[7] = 0;
    dst[8] = zAxis[0];
    dst[9] = zAxis[1];
    dst[10] = zAxis[2];
    dst[11] = 0;
    dst[12] = cameraPosition[0];
    dst[13] = cameraPosition[1];
    dst[14] = cameraPosition[2];
    dst[15] = 1;

    return dst;
  },

  perspective: function perspective(fieldOfViewInRadians, aspect, near, far, dst) {
    dst = dst || new Float32Array(16);
    var f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewInRadians);
    var rangeInv = 1.0 / (near - far);

    dst[0] = f / aspect;
    dst[1] = 0;
    dst[2] = 0;
    dst[3] = 0;
    dst[4] = 0;
    dst[5] = f;
    dst[6] = 0;
    dst[7] = 0;
    dst[8] = 0;
    dst[9] = 0;
    dst[10] = (near + far) * rangeInv;
    dst[11] = -1;
    dst[12] = 0;
    dst[13] = 0;
    dst[14] = near * far * rangeInv * 2;
    dst[15] = 0;

    return dst;
  },

  orthographic: function orthographic(left, right, bottom, top, near, far, dst) {
    dst = dst || new Float32Array(16);

    dst[0] = 2 / (right - left);
    dst[1] = 0;
    dst[2] = 0;
    dst[3] = 0;
    dst[4] = 0;
    dst[5] = 2 / (top - bottom);
    dst[6] = 0;
    dst[7] = 0;
    dst[8] = 0;
    dst[9] = 0;
    dst[10] = 2 / (near - far);
    dst[11] = 0;
    dst[12] = (left + right) / (left - right);
    dst[13] = (bottom + top) / (bottom - top);
    dst[14] = (near + far) / (near - far);
    dst[15] = 1;

    return dst;
  },

  frustum: function frustum(left, right, bottom, top, near, far) {
    var dx = right - left;
    var dy = top - bottom;
    var dz = far - near;

    dst[0] = 2 * near / dx;
    dst[1] = 0;
    dst[2] = 0;
    dst[3] = 0;
    dst[4] = 0;
    dst[5] = 2 * near / dy;
    dst[6] = 0;
    dst[7] = 0;
    dst[8] = (left + right) / dx;
    dst[9] = (top + bottom) / dy;
    dst[10] = -(far + near) / dz;
    dst[11] = -1;
    dst[12] = 0;
    dst[13] = 0;
    dst[14] = -2 * near * far / dz;
    dst[15] = 0;

    return dst;
  },

  translation: function translation(tx, ty, tz, dst) {
    dst = dst || new Float32Array(16);

    dst[0] = 1;
    dst[1] = 0;
    dst[2] = 0;
    dst[3] = 0;
    dst[4] = 0;
    dst[5] = 1;
    dst[6] = 0;
    dst[7] = 0;
    dst[8] = 0;
    dst[9] = 0;
    dst[10] = 1;
    dst[11] = 0;
    dst[12] = tx;
    dst[13] = ty;
    dst[14] = tz;
    dst[15] = 1;

    return dst;
  },

  translate: function translate(m, tx, ty, tz, dst) {
    dst = dst || new Float32Array(16);

    var m00 = m[0];
    var m01 = m[1];
    var m02 = m[2];
    var m03 = m[3];
    var m10 = m[1 * 4 + 0];
    var m11 = m[1 * 4 + 1];
    var m12 = m[1 * 4 + 2];
    var m13 = m[1 * 4 + 3];
    var m20 = m[2 * 4 + 0];
    var m21 = m[2 * 4 + 1];
    var m22 = m[2 * 4 + 2];
    var m23 = m[2 * 4 + 3];
    var m30 = m[3 * 4 + 0];
    var m31 = m[3 * 4 + 1];
    var m32 = m[3 * 4 + 2];
    var m33 = m[3 * 4 + 3];

    if (m !== dst) {
      dst[0] = m00;
      dst[1] = m01;
      dst[2] = m02;
      dst[3] = m03;
      dst[4] = m10;
      dst[5] = m11;
      dst[6] = m12;
      dst[7] = m13;
      dst[8] = m20;
      dst[9] = m21;
      dst[10] = m22;
      dst[11] = m23;
    }

    dst[12] = m00 * tx + m10 * ty + m20 * tz + m30;
    dst[13] = m01 * tx + m11 * ty + m21 * tz + m31;
    dst[14] = m02 * tx + m12 * ty + m22 * tz + m32;
    dst[15] = m03 * tx + m13 * ty + m23 * tz + m33;

    return dst;
  },

  xRotation: function xRotation(angleInRadians, dst) {
    dst = dst || new Float32Array(16);
    var c = Math.cos(angleInRadians);
    var s = Math.sin(angleInRadians);

    dst[0] = 1;
    dst[1] = 0;
    dst[2] = 0;
    dst[3] = 0;
    dst[4] = 0;
    dst[5] = c;
    dst[6] = s;
    dst[7] = 0;
    dst[8] = 0;
    dst[9] = -s;
    dst[10] = c;
    dst[11] = 0;
    dst[12] = 0;
    dst[13] = 0;
    dst[14] = 0;
    dst[15] = 1;

    return dst;
  },

  xRotate: function xRotate(m, angleInRadians, dst) {
    dst = dst || new Float32Array(16);

    var m10 = m[4];
    var m11 = m[5];
    var m12 = m[6];
    var m13 = m[7];
    var m20 = m[8];
    var m21 = m[9];
    var m22 = m[10];
    var m23 = m[11];
    var c = Math.cos(angleInRadians);
    var s = Math.sin(angleInRadians);

    dst[4] = c * m10 + s * m20;
    dst[5] = c * m11 + s * m21;
    dst[6] = c * m12 + s * m22;
    dst[7] = c * m13 + s * m23;
    dst[8] = c * m20 - s * m10;
    dst[9] = c * m21 - s * m11;
    dst[10] = c * m22 - s * m12;
    dst[11] = c * m23 - s * m13;

    if (m !== dst) {
      dst[0] = m[0];
      dst[1] = m[1];
      dst[2] = m[2];
      dst[3] = m[3];
      dst[12] = m[12];
      dst[13] = m[13];
      dst[14] = m[14];
      dst[15] = m[15];
    }

    return dst;
  },

  yRotation: function yRotation(angleInRadians, dst) {
    dst = dst || new Float32Array(16);
    var c = Math.cos(angleInRadians);
    var s = Math.sin(angleInRadians);

    dst[0] = c;
    dst[1] = 0;
    dst[2] = -s;
    dst[3] = 0;
    dst[4] = 0;
    dst[5] = 1;
    dst[6] = 0;
    dst[7] = 0;
    dst[8] = s;
    dst[9] = 0;
    dst[10] = c;
    dst[11] = 0;
    dst[12] = 0;
    dst[13] = 0;
    dst[14] = 0;
    dst[15] = 1;

    return dst;
  },

  yRotate: function yRotate(m, angleInRadians, dst) {
    dst = dst || new Float32Array(16);

    var m00 = m[0 * 4 + 0];
    var m01 = m[0 * 4 + 1];
    var m02 = m[0 * 4 + 2];
    var m03 = m[0 * 4 + 3];
    var m20 = m[2 * 4 + 0];
    var m21 = m[2 * 4 + 1];
    var m22 = m[2 * 4 + 2];
    var m23 = m[2 * 4 + 3];
    var c = Math.cos(angleInRadians);
    var s = Math.sin(angleInRadians);

    dst[0] = c * m00 - s * m20;
    dst[1] = c * m01 - s * m21;
    dst[2] = c * m02 - s * m22;
    dst[3] = c * m03 - s * m23;
    dst[8] = c * m20 + s * m00;
    dst[9] = c * m21 + s * m01;
    dst[10] = c * m22 + s * m02;
    dst[11] = c * m23 + s * m03;

    if (m !== dst) {
      dst[4] = m[4];
      dst[5] = m[5];
      dst[6] = m[6];
      dst[7] = m[7];
      dst[12] = m[12];
      dst[13] = m[13];
      dst[14] = m[14];
      dst[15] = m[15];
    }

    return dst;
  },

  zRotation: function zRotation(angleInRadians, dst) {
    dst = dst || new Float32Array(16);
    var c = Math.cos(angleInRadians);
    var s = Math.sin(angleInRadians);

    dst[0] = c;
    dst[1] = s;
    dst[2] = 0;
    dst[3] = 0;
    dst[4] = -s;
    dst[5] = c;
    dst[6] = 0;
    dst[7] = 0;
    dst[8] = 0;
    dst[9] = 0;
    dst[10] = 1;
    dst[11] = 0;
    dst[12] = 0;
    dst[13] = 0;
    dst[14] = 0;
    dst[15] = 1;

    return dst;
  },

  zRotate: function zRotate(m, angleInRadians, dst) {
    dst = dst || new Float32Array(16);

    var m00 = m[0 * 4 + 0];
    var m01 = m[0 * 4 + 1];
    var m02 = m[0 * 4 + 2];
    var m03 = m[0 * 4 + 3];
    var m10 = m[1 * 4 + 0];
    var m11 = m[1 * 4 + 1];
    var m12 = m[1 * 4 + 2];
    var m13 = m[1 * 4 + 3];
    var c = Math.cos(angleInRadians);
    var s = Math.sin(angleInRadians);

    dst[0] = c * m00 + s * m10;
    dst[1] = c * m01 + s * m11;
    dst[2] = c * m02 + s * m12;
    dst[3] = c * m03 + s * m13;
    dst[4] = c * m10 - s * m00;
    dst[5] = c * m11 - s * m01;
    dst[6] = c * m12 - s * m02;
    dst[7] = c * m13 - s * m03;

    if (m !== dst) {
      dst[8] = m[8];
      dst[9] = m[9];
      dst[10] = m[10];
      dst[11] = m[11];
      dst[12] = m[12];
      dst[13] = m[13];
      dst[14] = m[14];
      dst[15] = m[15];
    }

    return dst;
  },

  axisRotation: function axisRotation(axis, angleInRadians, dst) {
    dst = dst || new Float32Array(16);

    var x = axis[0];
    var y = axis[1];
    var z = axis[2];
    var n = Math.sqrt(x * x + y * y + z * z);
    x /= n;
    y /= n;
    z /= n;
    var xx = x * x;
    var yy = y * y;
    var zz = z * z;
    var c = Math.cos(angleInRadians);
    var s = Math.sin(angleInRadians);
    var oneMinusCosine = 1 - c;

    dst[0] = xx + (1 - xx) * c;
    dst[1] = x * y * oneMinusCosine + z * s;
    dst[2] = x * z * oneMinusCosine - y * s;
    dst[3] = 0;
    dst[4] = x * y * oneMinusCosine - z * s;
    dst[5] = yy + (1 - yy) * c;
    dst[6] = y * z * oneMinusCosine + x * s;
    dst[7] = 0;
    dst[8] = x * z * oneMinusCosine + y * s;
    dst[9] = y * z * oneMinusCosine - x * s;
    dst[10] = zz + (1 - zz) * c;
    dst[11] = 0;
    dst[12] = 0;
    dst[13] = 0;
    dst[14] = 0;
    dst[15] = 1;

    return dst;
  },

  axisRotate: function axisRotate(m, axis, angleInRadians, dst) {
    dst = dst || new Float32Array(16);

    var x = axis[0];
    var y = axis[1];
    var z = axis[2];
    var n = Math.sqrt(x * x + y * y + z * z);
    x /= n;
    y /= n;
    z /= n;
    var xx = x * x;
    var yy = y * y;
    var zz = z * z;
    var c = Math.cos(angleInRadians);
    var s = Math.sin(angleInRadians);
    var oneMinusCosine = 1 - c;

    var r00 = xx + (1 - xx) * c;
    var r01 = x * y * oneMinusCosine + z * s;
    var r02 = x * z * oneMinusCosine - y * s;
    var r10 = x * y * oneMinusCosine - z * s;
    var r11 = yy + (1 - yy) * c;
    var r12 = y * z * oneMinusCosine + x * s;
    var r20 = x * z * oneMinusCosine + y * s;
    var r21 = y * z * oneMinusCosine - x * s;
    var r22 = zz + (1 - zz) * c;

    var m00 = m[0];
    var m01 = m[1];
    var m02 = m[2];
    var m03 = m[3];
    var m10 = m[4];
    var m11 = m[5];
    var m12 = m[6];
    var m13 = m[7];
    var m20 = m[8];
    var m21 = m[9];
    var m22 = m[10];
    var m23 = m[11];

    dst[0] = r00 * m00 + r01 * m10 + r02 * m20;
    dst[1] = r00 * m01 + r01 * m11 + r02 * m21;
    dst[2] = r00 * m02 + r01 * m12 + r02 * m22;
    dst[3] = r00 * m03 + r01 * m13 + r02 * m23;
    dst[4] = r10 * m00 + r11 * m10 + r12 * m20;
    dst[5] = r10 * m01 + r11 * m11 + r12 * m21;
    dst[6] = r10 * m02 + r11 * m12 + r12 * m22;
    dst[7] = r10 * m03 + r11 * m13 + r12 * m23;
    dst[8] = r20 * m00 + r21 * m10 + r22 * m20;
    dst[9] = r20 * m01 + r21 * m11 + r22 * m21;
    dst[10] = r20 * m02 + r21 * m12 + r22 * m22;
    dst[11] = r20 * m03 + r21 * m13 + r22 * m23;

    if (m !== dst) {
      dst[12] = m[12];
      dst[13] = m[13];
      dst[14] = m[14];
      dst[15] = m[15];
    }

    return dst;
  },

  scaling: function scaling(sx, sy, sz, dst) {
    dst = dst || new Float32Array(16);

    dst[0] = sx;
    dst[1] = 0;
    dst[2] = 0;
    dst[3] = 0;
    dst[4] = 0;
    dst[5] = sy;
    dst[6] = 0;
    dst[7] = 0;
    dst[8] = 0;
    dst[9] = 0;
    dst[10] = sz;
    dst[11] = 0;
    dst[12] = 0;
    dst[13] = 0;
    dst[14] = 0;
    dst[15] = 1;

    return dst;
  },

  scale: function scale(m, sx, sy, sz, dst) {
    dst = dst || new Float32Array(16);

    dst[0] = sx * m[0 * 4 + 0];
    dst[1] = sx * m[0 * 4 + 1];
    dst[2] = sx * m[0 * 4 + 2];
    dst[3] = sx * m[0 * 4 + 3];
    dst[4] = sy * m[1 * 4 + 0];
    dst[5] = sy * m[1 * 4 + 1];
    dst[6] = sy * m[1 * 4 + 2];
    dst[7] = sy * m[1 * 4 + 3];
    dst[8] = sz * m[2 * 4 + 0];
    dst[9] = sz * m[2 * 4 + 1];
    dst[10] = sz * m[2 * 4 + 2];
    dst[11] = sz * m[2 * 4 + 3];

    if (m !== dst) {
      dst[12] = m[12];
      dst[13] = m[13];
      dst[14] = m[14];
      dst[15] = m[15];
    }

    return dst;
  },

  inverse: function inverse(m, dst) {
    dst = dst || new Float32Array(16);
    var m00 = m[0 * 4 + 0];
    var m01 = m[0 * 4 + 1];
    var m02 = m[0 * 4 + 2];
    var m03 = m[0 * 4 + 3];
    var m10 = m[1 * 4 + 0];
    var m11 = m[1 * 4 + 1];
    var m12 = m[1 * 4 + 2];
    var m13 = m[1 * 4 + 3];
    var m20 = m[2 * 4 + 0];
    var m21 = m[2 * 4 + 1];
    var m22 = m[2 * 4 + 2];
    var m23 = m[2 * 4 + 3];
    var m30 = m[3 * 4 + 0];
    var m31 = m[3 * 4 + 1];
    var m32 = m[3 * 4 + 2];
    var m33 = m[3 * 4 + 3];
    var tmp_0 = m22 * m33;
    var tmp_1 = m32 * m23;
    var tmp_2 = m12 * m33;
    var tmp_3 = m32 * m13;
    var tmp_4 = m12 * m23;
    var tmp_5 = m22 * m13;
    var tmp_6 = m02 * m33;
    var tmp_7 = m32 * m03;
    var tmp_8 = m02 * m23;
    var tmp_9 = m22 * m03;
    var tmp_10 = m02 * m13;
    var tmp_11 = m12 * m03;
    var tmp_12 = m20 * m31;
    var tmp_13 = m30 * m21;
    var tmp_14 = m10 * m31;
    var tmp_15 = m30 * m11;
    var tmp_16 = m10 * m21;
    var tmp_17 = m20 * m11;
    var tmp_18 = m00 * m31;
    var tmp_19 = m30 * m01;
    var tmp_20 = m00 * m21;
    var tmp_21 = m20 * m01;
    var tmp_22 = m00 * m11;
    var tmp_23 = m10 * m01;

    var t0 = tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31 - (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
    var t1 = tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31 - (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
    var t2 = tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31 - (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
    var t3 = tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21 - (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);

    var d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);

    dst[0] = d * t0;
    dst[1] = d * t1;
    dst[2] = d * t2;
    dst[3] = d * t3;
    dst[4] = d * (tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30 - (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30));
    dst[5] = d * (tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30 - (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30));
    dst[6] = d * (tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30 - (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30));
    dst[7] = d * (tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20 - (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20));
    dst[8] = d * (tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33 - (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33));
    dst[9] = d * (tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33 - (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33));
    dst[10] = d * (tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33 - (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33));
    dst[11] = d * (tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23 - (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23));
    dst[12] = d * (tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12 - (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22));
    dst[13] = d * (tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22 - (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02));
    dst[14] = d * (tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02 - (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12));
    dst[15] = d * (tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12 - (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02));

    return dst;
  },

  transformVector: function transformVector(m, v, dst) {
    dst = dst || new Float32Array(4);
    for (var i = 0; i < 4; ++i) {
      dst[i] = 0.0;
      for (var j = 0; j < 4; ++j) {
        dst[i] += v[j] * m[j * 4 + i];
      }
    }
    return dst;
  },

  transformPoint: function transformPoint(m, v, dst) {
    dst = dst || new Float32Array(3);
    var v0 = v[0];
    var v1 = v[1];
    var v2 = v[2];
    var d = v0 * m[0 * 4 + 3] + v1 * m[1 * 4 + 3] + v2 * m[2 * 4 + 3] + m[3 * 4 + 3];

    dst[0] = (v0 * m[0 * 4 + 0] + v1 * m[1 * 4 + 0] + v2 * m[2 * 4 + 0] + m[3 * 4 + 0]) / d;
    dst[1] = (v0 * m[0 * 4 + 1] + v1 * m[1 * 4 + 1] + v2 * m[2 * 4 + 1] + m[3 * 4 + 1]) / d;
    dst[2] = (v0 * m[0 * 4 + 2] + v1 * m[1 * 4 + 2] + v2 * m[2 * 4 + 2] + m[3 * 4 + 2]) / d;

    return dst;
  },

  transformDirection: function transformDirection(m, v, dst) {
    dst = dst || new Float32Array(3);

    var v0 = v[0];
    var v1 = v[1];
    var v2 = v[2];

    dst[0] = v0 * m[0 * 4 + 0] + v1 * m[1 * 4 + 0] + v2 * m[2 * 4 + 0];
    dst[1] = v0 * m[0 * 4 + 1] + v1 * m[1 * 4 + 1] + v2 * m[2 * 4 + 1];
    dst[2] = v0 * m[0 * 4 + 2] + v1 * m[1 * 4 + 2] + v2 * m[2 * 4 + 2];

    return dst;
  },

  transformNormal: function transformNormal(m, v, dst) {
    dst = dst || new Float32Array(3);
    var mi = inverse(m);
    var v0 = v[0];
    var v1 = v[1];
    var v2 = v[2];

    dst[0] = v0 * mi[0 * 4 + 0] + v1 * mi[0 * 4 + 1] + v2 * mi[0 * 4 + 2];
    dst[1] = v0 * mi[1 * 4 + 0] + v1 * mi[1 * 4 + 1] + v2 * mi[1 * 4 + 2];
    dst[2] = v0 * mi[2 * 4 + 0] + v1 * mi[2 * 4 + 1] + v2 * mi[2 * 4 + 2];

    return dst;
  },

  copy: function copy(src, dst) {
    dst = dst || new Float32Array(16);

    dst[0] = src[0];
    dst[1] = src[1];
    dst[2] = src[2];
    dst[3] = src[3];
    dst[4] = src[4];
    dst[5] = src[5];
    dst[6] = src[6];
    dst[7] = src[7];
    dst[8] = src[8];
    dst[9] = src[9];
    dst[10] = src[10];
    dst[11] = src[11];
    dst[12] = src[12];
    dst[13] = src[13];
    dst[14] = src[14];
    dst[15] = src[15];

    return dst;
  }
};

exports.mat3 = mat3;
exports.vec3 = vec3;
exports.m4 = m4;

/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
*   create by vincent 31 Dec 2016
*/

var raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
  window.setTimeout(callback, 1000 / 60);
};

var log = function log() {
  console.log.apply(console, arguments);
};

var queue = function queue(funcs, scope) {
  (function next() {
    if (funcs.length > 0) {
      funcs.shift().apply(scope || {}, [next].concat(Array.prototype.slice.call(arguments, 0)));
    }
  })();
};

var adler32 = function adler32(str) {
  var MOD = 65521;
  var a = 1;
  var b = 0;
  for (var i = 0; i < data.length >>> 0; i++) {
    a = (a + data.charCodeAt(i)) % MOD;
    b = (b + a) % MOD;
  }
  return a | b << 16;
};

var observer = function observer(_observer, key, fn) {
  if (_observer[key]) {
    _observer.__[key] = {};
  }

  Object.defineProperty(_observer, key, {
    get: function get() {
      return _observer.__[key];
    },
    set: function set(value) {
      fn(value, _observer.__[key]);
      _observer.__[key] = value;
    }
  });
};

var Event = function () {
  function Event() {
    _classCallCheck(this, Event);

    this.subscribers = new Map([[]]);
  }

  _createClass(Event, [{
    key: 'on',
    value: function on(type, fn) {
      var subs = this.subscribers;
      if (!subs.get(type)) return subs.set(type, [fn]);
      subs.set(type, subs.get(type).push(fn));
    }
  }, {
    key: 'emit',
    value: function emit(type, content) {
      var handlers = this.subscribers.get(type);
      if (!handlers) return;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = handlers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var fn = _step.value;

          fn.apply(this, [].slice.call(arguments, 1));
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }]);

  return Event;
}();

var EventEmitter = function () {
  function EventEmitter() {
    _classCallCheck(this, EventEmitter);

    this.list = {};
  }

  _createClass(EventEmitter, [{
    key: 'on',
    value: function on(fn) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'any';

      if (!this.list[type]) {
        this.list[type] = [];
      }
      this.list[type].push(fn);
    }
  }, {
    key: 'emit',
    value: function emit(content) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'any';

      var cb = this.list[type];
      if (!cb || cb.length === 0) {
        return;
      }
      for (var i = 0; i < cb.length; i++) {
        cb[i].apply(this, arguments);
      }
      delete this.list[type];
    }
  }]);

  return EventEmitter;
}();

exports.queue = queue;
exports.Event = Event;
exports.raf = raf;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _transform = __webpack_require__(5);

var _transform2 = _interopRequireDefault(_transform);

var _math = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Gl = function () {
    function Gl(canvas) {
        _classCallCheck(this, Gl);

        this.canvas = canvas;
        this.gl = undefined;
        this.transform = new _transform2.default();
        this._resources = new Map();
        this.init();
    }

    _createClass(Gl, [{
        key: 'init',
        value: function init() {
            this.gl = this.canvas.getContext("webgl") || this.canvas.getContext("experimental-webgl");
            var gl = this.gl;
            if (!gl) throw new Error('connot get gl context!');

            var program = this.createProgram(gl);
            this.positionLocation = gl.getAttribLocation(program, "a_position");
            this.texcoordLocation = gl.getAttribLocation(program, "a_texcoord");

            this.matrixLocation = gl.getUniformLocation(program, "u_matrix");
            this.textureMatrixLocation = gl.getUniformLocation(program, "u_textureMatrix");
            var textureLocation = gl.getUniformLocation(program, "u_texture");

            // Create a buffer.
            var positionBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            this.positionBuffer = positionBuffer;
            // Put a unit quad in the buffer
            var positions = [0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1];

            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

            // Create a buffer for texture coords
            var texcoordBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
            this.texcoordBuffer = texcoordBuffer;

            // Put texcoords in the buffer
            var texcoords = [0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1];

            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texcoords), gl.STATIC_DRAW);

            //gl.tex = this.loadTexture.bind(this,arguments);
            //gl.draw = this.drawImage.bind(this,arguments);

            // gl.draw = function (){
            //     drawImage
            // }
        }
    }, {
        key: 'getFragmentShaderSource',
        value: function getFragmentShaderSource() {
            var source = 'precision mediump float;\n        \n        varying vec2 v_texcoord;\n        \n        uniform sampler2D u_texture;\n        \n        void main() {\n           gl_FragColor = texture2D(u_texture, v_texcoord);\n        }';
            return source;
        }
    }, {
        key: 'getVertexShaderSource',
        value: function getVertexShaderSource() {
            var source = 'attribute vec4 a_position;\n        attribute vec2 a_texcoord;\n        \n        uniform mat4 u_matrix;\n        uniform mat4 u_textureMatrix;\n        \n        varying vec2 v_texcoord;\n        \n        void main() {\n           gl_Position = u_matrix * a_position;\n           v_texcoord = (u_textureMatrix * vec4(a_texcoord, 0, 1)).xy;\n        }';
            return source;
        }
    }, {
        key: 'getFragmentShader',
        value: function getFragmentShader(gl) {
            return this.getShader(gl, gl.FRAGMENT_SHADER, this.getFragmentShaderSource());
        }
    }, {
        key: 'getVertexShader',
        value: function getVertexShader(gl) {
            return this.getShader(gl, gl.VERTEX_SHADER, this.getVertexShaderSource());
        }
    }, {
        key: 'getShader',
        value: function getShader(gl, type, source) {
            var shader = gl.createShader(type);

            gl.shaderSource(shader, source);
            gl.compileShader(shader);

            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.log(gl.getShaderInfoLog(shader));
                return null;
            }

            return shader;
        }
    }, {
        key: 'createProgram',
        value: function createProgram(gl) {
            var fragmentShader = this.getFragmentShader(gl);
            var vertexShader = this.getVertexShader(gl);
            var shaderProgram = gl.createProgram();

            gl.attachShader(shaderProgram, vertexShader);
            gl.attachShader(shaderProgram, fragmentShader);
            gl.linkProgram(shaderProgram);

            var lineStatus = gl.getProgramParameter(shaderProgram, gl.LINK_STATUS);
            if (!lineStatus) {
                console.log("Could not initialise shaders:" + gl.getProgramInfoLog(shaderProgram));
            }

            gl.useProgram(shaderProgram);
            return shaderProgram;
        }
    }, {
        key: 'loadTexture',
        value: function loadTexture(url) {
            var _this = this;

            var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 30000;


            if (typeof url !== 'string') throw new Error('loadTexture faild');
            var loadedTex = this._resources;
            var mapKey = url;

            if (!loadedTex.has(mapKey)) {
                return new Promise(function (resolve, reject) {
                    var gl = _this.gl;
                    var tex = gl.createTexture();

                    gl.bindTexture(gl.TEXTURE_2D, tex);
                    // Fill the texture with a 1x1 blue pixel.
                    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));
                    // let's assume all images are not a power of 2
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

                    var textureInfo = {
                        width: 1,
                        height: 1,
                        texture: tex
                    };
                    var timer = setTimeout(function () {
                        reject(new Error('loadTexture timeout'));
                    }, timeout);
                    var img = new Image();
                    img.addEventListener('load', function () {
                        textureInfo.width = img.width;
                        textureInfo.height = img.height;

                        gl.bindTexture(gl.TEXTURE_2D, textureInfo.texture);
                        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);

                        resolve(textureInfo);
                        loadedTex.set(mapKey, textureInfo);
                        clearTimeout(timer);
                    });
                    img.src = url;
                    //return textureInfo;
                });
                return Promise.resolve(loadedTex.get(mapKey));
            }
        }
    }, {
        key: 'loadTex',
        value: async function loadTex(resources) {
            if (typeof resources === 'string') {
                return await this.loadTexture(resources);
            }
            if (Array.isArray(resources)) {
                var ret = [];
                for (var i = 0; i < resources.length; i++) {
                    var res = resources[i];
                    if (typeof res === 'string') {
                        ret.push((await this.loadTexture(res)));
                    } else {
                        throw new Error('loadTexs faild in progress:' + i);
                    }
                }
                console.log(ret);
                return ret;
            }
        }
    }, {
        key: 'drawImage',
        value: function drawImage(tex, texWidth, texHeight, srcX, srcY, srcWidth, srcHeight, dstX, dstY, dstWidth, dstHeight, srcRotation) {
            var gl = this.gl;
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

            var matrix = _math.m4.orthographic(0, gl.canvas.width, gl.canvas.height, 0, -1, 1);
            matrix = _math.m4.translate(matrix, dstX, dstY, 0);
            matrix = _math.m4.scale(matrix, dstWidth, dstHeight, 1);

            gl.uniformMatrix4fv(this.matrixLocation, false, matrix);

            var texMatrix = _math.m4.scaling(1 / texWidth, 1 / texHeight, 1);

            texMatrix = _math.m4.translate(texMatrix, texWidth * 0.5, texHeight * 0.5, 0);
            texMatrix = _math.m4.zRotate(texMatrix, srcRotation);
            texMatrix = _math.m4.translate(texMatrix, texWidth * -0.5, texHeight * -0.5, 0);

            texMatrix = _math.m4.translate(texMatrix, srcX, srcY, 0);
            texMatrix = _math.m4.scale(texMatrix, srcWidth, srcHeight, 1);

            gl.uniformMatrix4fv(this.textureMatrixLocation, false, texMatrix);

            gl.uniform1i(this.textureLocation, 0);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
        }
    }]);

    return Gl;
}();

var gl2d = function gl2d() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    return new (Function.prototype.bind.apply(Gl, [null].concat(args)))();
};

exports.default = gl2d;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _math = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Transform = function () {
    function Transform() {
        _classCallCheck(this, Transform);

        this.stack = [];
        // 因为栈是空的，需要放入一个初始化矩阵
        this.restore();
    }
    // 抛出顶部的矩阵，重置为前一个矩阵


    _createClass(Transform, [{
        key: 'restore',
        value: function restore() {
            this.stack.pop();
            // 永远不要让栈为空
            if (this.stack.length < 1) {
                this.stack[0] = _math.m4.identity();
            }
        }
        // 讲当前矩阵备份到栈中

    }, {
        key: 'save',
        value: function save() {
            this.stack.push(this.getCurrentMatrix());
        }
        // 获取当前矩阵（栈顶的矩阵）

    }, {
        key: 'getCurrentMatrix',
        value: function getCurrentMatrix() {
            return this.stack[this.stack.length - 1].slice();
        }
        // 设置当前矩阵

    }, {
        key: 'setCurrentMatrix',
        value: function setCurrentMatrix() {
            return this.stack[this.stack.length - 1] = m;
        }
        // 平移当前矩阵

    }, {
        key: 'translate',
        value: function translate(x, y) {
            var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

            var m = this.getCurrentMatrix();
            this.setCurrentMatrix(_math.m4.translate(m, x, y, z));
        }
        // 旋转当前矩阵

    }, {
        key: 'rotateZ',
        value: function rotateZ(angleInRadians) {
            var m = this.getCurrentMatrix();
            this.setCurrentMatrix(_math.m4.zRotate(m, angleInRadians));
        }
    }, {
        key: 'scale',
        value: function scale(x, y) {
            var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

            var m = this.getCurrentMatrix();
            this.setCurrentMatrix(_math.m4.scale(m, x, y, z));
        }
    }]);

    return Transform;
}();

exports.default = Transform;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);
//# sourceMappingURL=stage.js.map