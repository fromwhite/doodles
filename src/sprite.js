// import {Stage} from 'stage'
import gl2d from 'glsl'

document.addEventListener("DOMContentLoaded", main, false);
function main(){
    // var s=new Stage({
    //     el:document.querySelector('#gl'),
    //     list:['../assets/4.jpg','../assets/grain.png','../assets/hero.jpg']
    // });
    // // s.on(function(msg,type,target){
    // //     console.log(target);
    // //     console.log(this.gl)
    // //     s.gl.drawImage(s.im.pick('../assets/4.jpg'),100,200)
    // //     s.gl.fillText('ssssd',10,10)
    // // },'click')

    // //s.gl.drawImage(s.im.pick('../assets/4.jpg'),10,20)
    // var img = new Image()
    // img.src = '../assets/4.jpg'
    // img.onload = function () {
    //     s.gl.drawImage(img,10,10)
    // }
    // s.gl.fillText('ss',10,10)
    // console.log(s.gl,11)
    var c = document.querySelector('#gl')
    c = gl2d(c)
    console.log(c,123)
    c.fillText('ss',10,20)
}

window.addEventListener('resize', () => {
    // s.init();
    // s.load(true);
});
      

if (module.hot) module.hot.accept();