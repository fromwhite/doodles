/*
 *   create by vincent 31 Dec 2016
 */

const raf = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };

const log = function() {
    console.log.apply(console, arguments);
}

const queue = function(funcs, scope) {
    (function next() {
        if (funcs.length > 0) {
            funcs.shift().apply(scope || {}, [next].concat(Array.prototype.slice.call(arguments, 0)));
        }
    })();
}

const adler32 = function(str) {
    let MOD = 65521;
    let a = 1;
    let b = 0;
    for (let i = 0; i < str.length >>> 0; i++) {
        a = (a + str.charCodeAt(i)) % MOD;
        b = (b + a) % MOD;
    }
    return a | (b << 16);
}

const getType = function (obj) {
    var type = Object.prototype.toString.call(obj).match(/^\[object (.*)\]$/)[1].toLowerCase();
    if(type === 'string' && typeof obj === 'object') return 'object'; // Let "new String('')" return 'object'
    if (obj === null) return 'null'; // PhantomJS has type "DOMWindow" for null
    if (obj === undefined) return 'undefined'; // PhantomJS has type "DOMWindow" for undefined
    return type;
}

class Event {
    constructor() {
        this.subscribers = new Map([
            []
        ]);
    }

    on(type, fn) {
        let subs = this.subscribers;
        if (!subs.get(type)) return subs.set(type, [fn]);
        subs.set(type, (subs.get(type).push(fn)));
    }

    emit(type, content) {
        let handlers = this.subscribers.get(type);
        if (!handlers) return
        for (let fn of handlers) {
            fn.apply(this, [].slice.call(arguments, 1));
        }
    }
}

class Loader {
    constructor(arr) {
        this._images = {};
        this.task = [];
    }
    load(arr,callback) {
        let self = this;
        for(let i = 0;i<arr.length;i++) {        
            return queue(self.task,this)
        }	   
    }
    pick(src) {
        let self = this;	
        if ( typeof this._images[src] != 'undefined' ){
            return  this._images[src];	           
        } else {	      
            new Error('image not found')	           
        }	        
    }	    
}

export {
    queue,
    Event,
    raf,
    Loader,
    getType
}