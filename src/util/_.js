/*
*   create by vincent 31 dec 2016
*   
*/

const raf = window.requestAnimationFrame
|| window.webkitRequestAnimationFrame
|| window.mozRequestAnimationFrame
|| window.oRequestAnimationFrame
|| window.msRequestAnimationFrame
|| function(callback) {
  window.setTimeout(callback, 1000 / 60);
};

const retinaFy = function (canvas) {
    const height = document.body.clientHeight;
    const width = document.body.clientWidth;
  
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
  
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
}

const log = function (){
    //console.clear();
    console.log.apply(console, arguments);
}

const queue = function(funcs, scope){
    (function next() {  
        if(funcs.length > 0) {  
            funcs.shift().apply(scope || {}, [next].concat(Array.prototype.slice.call(arguments, 0)));  
        }  
  })();
}

const adler32 = function(str){
    var MOD = 65521;
    var a = 1;
    var b = 0;
    for (var i = 0; i < data.length >>> 0 ; i++) {
        a = (a + data.charCodeAt(i)) % MOD;
        b = (b + a) % MOD;
    }
    return a | (b << 16);
}

const observer = function(observer, key, fn) {
    if (observer[key]) {
      observer.__[key] = {}
    }
  
    Object.defineProperty(observer, key, {
      get: () => {
        return observer.__[key]
      },
      set: value => {
        fn(value, observer.__[key])
        observer.__[key] = value
      }
    })
}


class Event {
    constructor() {
      this.subscribers = new Map([[]]);
    }
  
    on(fn, type = 'any') {
      let subs = this.subscribers;
      if (!subs.get(type)) return subs.set(type, [fn]);
      subs.set(type, (subs.get(type).push(fn)));
    }
  
    emit(content, type = 'any') {
      let fns = this.subscribers.get(type);
      this.subscribers.delete(type);
      for (let fn of fns) {
        fn.apply(this, arguments);
      }
    }
}

class EventEmitter {
  constructor (){
    this.list = {};
  }
  on ( fn, type = 'any') {
    if(!this.list[type]){
      this.list[type] = [];
    }
    this.list[type].push(fn);
  }
  emit ( content, type = 'any'){
    let cb = this.list[type];
    if (!cb || cb.length === 0) {
      return;
    }
    for (let i = 0; i < cb.length; i++) {
      cb[i].apply(this, arguments);
    }
    delete this.list[type]
  }
}


export { queue,Event,raf }