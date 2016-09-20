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
    }
})()