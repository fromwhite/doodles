/*
*   create by vincent 31 dec 2016
*   underscore shell
*   @ queue 
*   @ before/after	
*   @   
*   @
*
*/

//山寨underscore笔记
;(function(){
	
    var root = this;
	//深圳underscore别名
    var szUnderscore = root._;
    var Ctor = function(){};    
    var _ = function(obj){                  
        if(obj instanceof _ ) return obj;
        if(!(this instanceof _ )) return new _(obj);
        this._wrapped = obj;
    };  
    //释放 _ 的控制权 要在_ 声明的后面
    _.noConflict = function(){
        root._ = szUnderscore;
        return this;
    }
	
	
    if(typeof exports !== 'undefined'){
        if(typeof module !== 'undefined'&& module.exports){
            exports = module.exports = _;
        }
        exports._  = _;
    }else{
        root._ = _;
    }
	
    _.VERSION ='0.01'
	
}).call(this)