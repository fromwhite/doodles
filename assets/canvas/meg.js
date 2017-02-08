/*
*   create by vinc 31 dec 2016
*   canvas tiny process
*   @ 
*   @
*   @cache      imgloader diffctx memony
*   @events
*   @init
*   @draw
*
*/

;(function(root, fn){
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = fn.call(root) :
	typeof define === 'function' && define.amd ? define(function(){ return fn.call(root) }) :
	(root.Meg = fn());
}(this, function(){

	
    //Util 公共方法
    var util = {
        //判断是否数组
        isArray : function(v){
                  	return toString.apply(v) === '[object Array]';
        },
		
	//判断是否函数 typeof == 'function'
	isFunction : function(f){
			return Object.prototype.toString.call(f) === '[object Function]';
	},
		
	//数据一致性
	adler32 : function(data) {
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
	var constant = {
		var raf = (function(){
			return window.requestAnimationFrame || window.webkitRequestAnimationFrame ||  window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback){window.setTimeout(callback, 1000 / 60); };
    })();
  		
	}
	
	
	
	
	//Meg(config) || new Meg(config)
    function Meg(options) {
      if ( !(this instanceof Meg)) return new Meg(options);    
        //参数合并 
        this.init(options);
    }
	
	
    var mg = Meg.prototype;
	
    //初始化
    mg.init = function(options){
        options = options || {};
        this.methods = {};
        this.maps = {};
        this.cache = {};
        
        var defaults = {
            root: './',         // 根节点
            maps: {},           // 初始化命中表
            debug: false,       // 如果开启debug模式，则进入自动检索当前目录文件模式
            cache: true,        // 是否使用缓存
            noop: true,         // 是否创建对象池
            sprit: true,        // 是否创建精灵图
            diffMatrix: true,   // 是否开启二值化像素矩阵
            
            useCache: false,    // 如果设为true，则使用http缓存
            maxCacheSize: 0.5   // 小于maxCacheSize的资源将以本地文件内容的md5值作为Etag，单位为MB
        };

        for (var key in defaults) {
            this[key] = options.hasOwnProperty(key) ? options[key] : defaults[key];
        }

        this.handleMap();

        return this;
    }
	
})
