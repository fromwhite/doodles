/*
*   create by vinc 31 dec 2016
*   canvas tiny process
*   @ cache 
*   @	
*   @   
*   @
*
*/

;(function(root, fn){
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = fn.call(root) :
	typeof define === 'function' && define.amd ? define(function(){ return fn.call(root) }) :
	(root.Meg = fn());
}(this, function(){
	
    //公共方法
    var util = {
		//query
		find : function(selector){
			return document.querySelector(selector);
		},
		finds : function(selectors){
			return Array.prototype.slice.call(document.querySelectorAll(selectors));
		},

		//raf
		raf : function(){
			return window.requestAnimationFrame || window.webkitRequestAnimationFrame ||  window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback){window.setTimeout(callback, 1000 / 60); };
    		},
		
		//判断是否数组
		isArray : function(arr){
				return toString.apply(arr) === '[object Array]';
		},
		
		//判断是否函数 typeof == 'function'
		isFunction : function(f){
				return Object.prototype.toString.call(f) === '[object Function]';
		},
  		
		//一致性
		adler32 : function(data){
					var MOD = 65521;
					var a = 1;
					var b = 0;
					for (var i = 0; i < data.length >>> 0 ; i++) {
						a = (a + data.charCodeAt(i)) % MOD;
						b = (b + a) % MOD;
					}
					return a | (b << 16);
		}
      
    }
	
    //常量
    var CONSTANT = {
		//背景图片base64
		BACKIMG :  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAAHmWi9wAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAMBJREFUeNpinDFjemBgIAMaePv2zX8MwMSADdBKFCCAGF++fIEuBHQEYb3UFAIIIOwBQWzQEOvVwaMOIICwBDoWRZjRQKaNo4rorQgggBiBCVpISJiBGoCJgXpg1KxRs0aiWQABxPj79+93795SbhAwUxNVLo+G/ahZo2aNmjVq1qhZI8wsgADt1zERADAMAsD6t5B4bRHRgeGj4I8FctKPM3ObLp6fk7w1eSwsLCwsLCwsLCwsrE5WvrHdrTLF8wBDaPAHu14WwgAAAABJRU5ErkJggg=="
    };
	
	
	
    function Meg(options) {
		if ( !(this instanceof Meg)) return new Meg(options);  
      	this.init(options);
    }
	
	var mg = Meg.prototype;
	
    mg.init = function(options){
	options = options || {};
//        this.methods = {};
//        this.maps = {};
//        this.cache = {};
        
        var defaults = {
            el: '',         	// 根节点
            maps: {},           // 初始化命中表
            cache: true,        // 是否使用缓存
	    rcWidth: '1000',	// 默认限制最大宽度
	    rcHeight: '600',	// 默认限制最大高度
			    
            //debug: false,       // 如果开启debug模式，则进入自动检索当前目录文件模式
        };
		
        for (var key in defaults) {
           	this[key] = options.hasOwnProperty(key) ? options[key] : defaults[key];
        }

	//节点
	this.fragment();		
		
        return this;
    }
	
	mg.fragment = function(){
		var width,height;
		
		if(!!this.el){
			fragment = util.find(this.el);
			width = fragment.width < this.rcWidth ? fragment.width : this.rcWidth;
			height = fragment.height < this.rcHeight ? fragment.height : this.rcHeight;
		}else{
			fragment = document.createDocumentFragment();
			document.body.style.cssText = "margin:0;padding:0;background-image:url("+ CONSTANT.BACKIMG +");background-position: center center;background-repeat: repeat;background-size: 20px 20px;overflow: hidden";
		}
		
		var container = document.createElement("div");
				container.id = 'pixel';
				container.style.cssText = window.innerWidth < this.rcWidth ? "margin:0;padding:0;width:100%;height:100%;position:absolute;overflow:hidden"
				:"width:"+ this.rcWidth +"px;height:"+ this.rcHeight +"px;margin:0 auto;top:50%;transform:translate(0,-50%);;position:relative;overflow:hidden";
				
			var canvas = document.createElement("canvas");  
			var ctx = canvas.getContext("2d");  console.log(window.innerWidth,window.innerHeight);
				canvas.width = width || (window.innerWidth < this.rcWidth ? window.innerWidth : this.rcWidth);  
				canvas.height = height || (window.innerHeight < this.rcHeight ? window.innerHeight : this.rcHeight);  
				container.appendChild(canvas);  

			console.log(window.innerWidth,window.innerHeight)
			
			
			fragment.appendChild(container);
			document.body.appendChild(fragment);
	};
	
	
	
	return Meg;
	
}))
