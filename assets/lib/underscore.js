// underscore的代码包裹在一个匿名自执行函数中
(function() {
    // 创建一个全局对象, 在浏览器中表示为window对象, 在Node.js中表示global对象
     var root = this;

     // 保存"_"(下划线变量)被覆盖之前的值
     // 如果出现命名冲突或考虑到规范, 可通过_.noConflict()方法恢复"_"被Underscore占用之前的值, 并返回Underscore对象以便重新命名
     var previousUnderscore = root._;

     // 创建一个空的对象常量, 便于内部共享使用
     var breaker = {};

     // 将内置对象的原型链缓存在局部变量
     var ArrayProto = Array.prototype,
     ObjProto = Object.prototype,
     FuncProto = Function.prototype;

     // 将内置对象原型中的常用方法缓存在局部变量
     var slice = ArrayProto.slice,
     unshift = ArrayProto.unshift,
     toString = ObjProto.toString,
     hasOwnProperty = ObjProto.hasOwnProperty;

     // 这里定义了一些JavaScript 1.6提供的新方法
     // 如果宿主环境中支持这些方法则优先调用, 如果宿主环境中没有提供, 则会由Underscore实现
     var nativeForEach = ArrayProto.forEach,
     nativeMap = ArrayProto.map,
     nativeReduce = ArrayProto.reduce,
     nativeReduceRight = ArrayProto.reduceRight,
     nativeFilter = ArrayProto.filter,
     nativeEvery = ArrayProto.every,
     nativeSome = ArrayProto.some,
     nativeIndexOf = ArrayProto.indexOf,
     nativeLastIndexOf = ArrayProto.lastIndexOf,
     nativeIsArray = Array.isArray,
     nativeKeys = Object.keys,
     nativeBind = FuncProto.bind;

     // 创建对象式的调用方式, 将返回一个Underscore包装器, 包装器对象的原型中包含Underscore所有方法(类似与将DOM对象包装为一个jQuery对象)
     var _ = function(obj) {
         // 所有Underscore对象在内部均通过wrapper对象进行构造
         return new wrapper(obj);
     };

     // 针对不同的宿主环境, 将Undersocre的命名变量存放到不同的对象中
     if( typeof exports !== 'undefined') {// Node.js环境
         if( typeof module !== 'undefined' && module.exports) {
             exports = module.exports = _;
         }
         exports._ = _;
     } else {// 浏览器环境中Underscore的命名变量被挂在window对象中
         root['_'] = _;
     }

     // 版本声明
     _.VERSION = '1.3.3';

    //在_对象上定义各种方法
    . . . . . .

     // underscore对象的包装函数
     var wrapper = function(obj) {
         // 原始数据存放在包装对象的_wrapped属性中
         this._wrapped = obj;
     };

     // 将Underscore的原型对象指向wrapper的原型, 因此通过像wrapper原型中添加方法, Underscore对象也会具备同样的方法
     _.prototype = wrapper.prototype;

     // 返回一个对象, 如果当前Underscore调用了chain()方法(即_chain属性为true), 则返回一个被包装的Underscore对象, 否则返回对象本身
    // result函数用于在构造方法链时返回Underscore的包装对象
     var result = function(obj, chain) {
         return chain ? _(obj).chain() : obj;
     };

     // 将一个自定义方法添加到Underscore对象中(实际是添加到wrapper的原型中, 而Underscore对象的原型指向了wrapper的原型)
     var addToWrapper = function(name, func) {
         // 向wrapper原型中添加一个name函数, 该函数调用func函数, 并支持了方法链的处理
         wrapper.prototype[name] = function() {
             // 获取func函数的参数, 并将当前的原始数据添加到第一个参数
             var args = slice.call(arguments);
             unshift.call(args, this._wrapped);
             // 执行函数并返回结果, 并通过result函数对方法链进行封装, 如果当前调用了chain()方法, 则返回封装后的Underscore对象, 否则返回对象本身
             return result(func.apply(_, args), this._chain);
         };
     };

     // 将内部定义的_(即Underscore方法集合对象)中的方法复制到wrapper的原型链中(即Underscore的原型链中)
     // 这是为了在构造对象式调用的Underscore对象时, 这些对象也会具有内部定义的Underscore方法
     _.mixin(_);

     // 将Array.prototype中的相关方法添加到Underscore对象中, 因此在封装后的Underscore对象中也可以直接调用Array.prototype中的方法
     // 如: _([]).push()
     each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
         // 获取Array.prototype中对应方法的引用
         var method = ArrayProto[name];
         // 将该方法添加到Underscore对象中(实际是添加到wrapper的原型对象, 因此在创建Underscore对象时同时具备了该方法)
         wrapper.prototype[name] = function() {
             // _wrapped变量中存储Underscore对象的原始值
             var wrapped = this._wrapped;
            // 调用Array对应的方法并返回结果
             method.apply(wrapped, arguments);
             var length = wrapped.length;
             if((name == 'shift' || name == 'splice') && length === 0)
                 delete wrapped[0];
             // 即使是对于Array中的方法, Underscore同样支持方法链操作
             return result(wrapped, this._chain);
         };
     });

     // 作用同于上一段代码, 将数组中的一些方法添加到Underscore对象, 并支持了方法链操作
     // 区别在于上一段代码所添加的函数, 均返回Array对象本身(也可能是封装后的Array), concat, join, slice方法将返回一个新的Array对象(也可能是封装后的Array)
     each(['concat', 'join', 'slice'], function(name) {
         var method = ArrayProto[name];
         wrapper.prototype[name] = function() {
             return result(method.apply(this._wrapped, arguments), this._chain);
         };
     });

     // 对Underscore对象进行链式操作的声明方法
     wrapper.prototype.chain = function() {
         // this._chain用来标示当前对象是否使用链式操作
         // 对于支持方法链操作的数据, 一般在具体方法中会返回一个Underscore对象, 并将原始值存放在_wrapped属性中, 也可以通过value()方法获取原始值
         this._chain = true;
         return this;
     };

     // 返回被封装的Underscore对象的原始值(存放在_wrapped属性中)
     wrapper.prototype.value = function() {
         return this._wrapped;
    };

}).call(this);
