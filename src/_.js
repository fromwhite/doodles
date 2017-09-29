/*
*   create by vincent 31 dec 2016
*   underscore shell
*   @ queue 
*   @ before/after	
*   @   
*   @ raf
*   @ retinaFy
*   @ log
*
*/

const raf = window.requestAnimationFrame
|| window.webkitRequestAnimationFrame
|| window.mozRequestAnimationFrame
|| window.oRequestAnimationFrame
|| window.msRequestAnimationFrame
|| function(callback) {
  window.setTimeout(callback, 1000 / 60); //每帧1000/60ms
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

export { queue }