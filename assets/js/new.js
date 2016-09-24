(function(){
    
    var root=this;
    
    
}).call(this);

(new function() {
    var element = Element.prototype;
//    var array = Array.prototype;
//    var node = Node.prototype;
//    var nodelist = NodeList.prototype;
//    var set_to = function(obj1, obj2, key, alias) {
//        obj2[key] = obj1[key];
//        if (alias) {
//            obj2[alias] = obj1[alias] = obj1[key];
//        }
//    }
//    var set_alias = function(obj, key, alias) {
//        obj[alias] = obj[key];
//    }
//    /** 方法别名 ***/
//    set_alias(element, ‘querySelectorAll’, ‘find’);
//    set_alias(document, ‘querySelectorAll’, ‘find’);
//    set_to(array, nodelist, ‘forEach’, ‘each’);
//    set_to(array, nodelist, ‘map’);
//    set_to(array, nodelist, ‘fliter’);
//    set_to(array, nodelist, ‘connect’);
//    set_to(array, nodelist, ‘join’);
//    set_to(array, nodelist, ‘every’);
//    set_to(array, nodelist, ‘reduce’);
//    set_to(array, nodelist, ‘reduceRight’);
//    set_to(array, nodelist, ‘slice’);
//    set_to(array, nodelist, ‘some’);
//    set_to(array, nodelist, ‘splice’);
    
    NodeList.prototype.forEach = Array.prototype.forEach;
    NodeList.prototype.map = Array.prototype.map;
    NodeList.prototype.filter = Array.prototype.filter;
    NodeList.prototype.connect = Array.prototype.connect;
    NodeList.prototype.join = Array.prototype.join;
    NodeList.prototype.every = Array.prototype.every;
    NodeList.prototype.reduce = Array.prototype.reduce;
    NodeList.prototype.slice = Array.prototype.slice;
    NodeList.prototype.indexOf = Array.prototype.indexOf;

var find = document.querySelectorAll；
    /** 串操作 **/
    element.html = function(html) {
        if(!html) return this.innerHTML;
        this.innerHTML = html;
        return this;
    };
var addEvent = function(elem, type, handler) {
        if (window.addEventListener) {
           addEvent = function(elem, type, handler) {
               elem.addEventListener(type, handler, false);
           }
        } else if (window.attachEvent) {
            addEvent = function(elem, type, handler) {
                elem.attachEvent('on' + type, handler);
            }
        }
        addEvent(elem, type, handler);
    };
window.evt={
    // 页面加载完成后
    readyEvent : function(fn) {
        if (fn==null) {
            fn=document;
        }
        var oldonload = window.onload;
        if (typeof window.onload != 'function') {
            window.onload = fn;
        } else {
            window.onload = function() {
                oldonload();
                fn();
            };
        }
    },
    // 视能力分别使用dom0||dom2||IE方式 来绑定事件
    // 参数： 操作的元素,事件名称 ,事件处理程序
    addEvent : function(element, type, handler) {
        if (element.addEventListener) {
            //事件类型、需要执行的函数、是否捕捉
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, function() {
                handler.call(element);
            });
        } else {
            element['on' + type] = handler;
        }
    },
    // 移除事件
    removeEvent : function(element, type, handler) {
        if (element.removeEnentListener) {
            element.removeEnentListener(type, handler, false);
        } else if (element.datachEvent) {
            element.detachEvent('on' + type, handler);
        } else {
            element['on' + type] = null;
        }
    }, 
    // 阻止事件 (主要是事件冒泡，因为IE不支持事件捕获)
    stopPropagation : function(ev) {
        if (ev.stopPropagation) {
            ev.stopPropagation();
        } else {
            ev.cancelBubble = true;
        }
    },
    // 取消事件的默认行为
    preventDefault : function(event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    // 获取事件目标
    getTarget : function(event) {
        return event.target || event.srcElement;
    },
    // 获取event对象的引用，取到事件的所有信息，确保随时能使用event；
    getEvent : function(e) {
        var ev = e || window.event;
        if (!ev) {
            var c = this.getEvent.caller;
            while (c) {
                ev = c.arguments[0];
                if (ev && Event == ev.constructor) {
                    break;
                }
                c = c.caller;
            }
        }
        return ev;
    }
};
    function extend(Child, Parent) {

　　　　var F = function(){};

　　　　F.prototype = Parent.prototype;

　　　　Child.prototype = new F();

　　　　Child.prototype.constructor = Child;

　　　　Child.uber = Parent.prototype;

　　}
    var sendAjax = (function() {
    var getXHR = (function() {
        var xhr;
        if(window.XHRHttpRequest){
            xhr = new XMLHttpRequest();
        }else{
            xhr = new ActiveObject("Microsoft.XMLHTTP");
        }
        return xhr;
    })();
    return function(url,opts){ //url为目标地址
        var xhr = getXHR(),
        data;
        xhr.onreadystatechange = function(){
            if(xhr.readyState===4||xhr.status===200){
                data = JSON.parse(xhr.responseText);  //将data解析为json对象
                opts.callback(data);
            }
        }
        xhr.setRequestHeader('Content-Type','application/json');
        xhr.open(opts.method,url);  //写入参数
        xhr.send(JSON.stringify(opts.data));  //将参数json字符化
    }
})();
//调用执行
sendAjax('www.example.com',{
    callback:function(data){
        //...
    },
    data:{
        name:'JIMMY',
        age:18
    }
})

})()