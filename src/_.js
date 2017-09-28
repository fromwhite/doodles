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

const retinaFy = function retinaFy (canvas) {
    const height = document.body.clientHeight;
    const width = document.body.clientWidth;
  
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
  
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
}

const log = function log(){
    //console.clear();
    console.log.apply(console, arguments);
}