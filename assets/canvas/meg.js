/*
*   create by vinc 31 Dec 2016
*   canvas tiny process
*   @core   def extend 暴露合并api
*   @cache  缓存对象 参数:str/array/obj/REG str缓存图片 array缓存图片队列 obj缓存自建对象并初始化对象池 REG正则对象替换路径
*   @events maps初始化命中表     
*   @draw   主线程循环
*   @await  异步流程控制
*
*/

( function() {

    //Util 公共方法
    var util = {
        //判断是否数组
        isArray : function(v){
                    return toString.apply(v) === '[object Array]';
        }
        
    }
    
        
    //判断是用函数创建的还是用new创建的
    //Meg(config) 或者  new Meg(config)
    function Meg(options) {
      if ( !(this instanceof Meg) )   return new Meg(options);
        
        //参数合并 
        this._init(options);
        //暴露合并接口
        this.options = this.extend({},options); 
    }
    
    var mg = Meg.prototype;
    
    //初始化
    mg._init = function(options){
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
    
    mg.raf = (function(){
			return window.requestAnimationFrame ||
                   window.webkitRequestAnimationFrame || 
                   window.mozRequestAnimationFrame || 
                   window.oRequestAnimationFrame || 
                   window.msRequestAnimationFrame || 
                   function (callback) {window.setTimeout(callback, 1000 / 60); 
                };
		})();
    
    
    
    

} )( window, Meg || {} )
