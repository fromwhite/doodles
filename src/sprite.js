import {Stage} from 'stage'

document.addEventListener("DOMContentLoaded", main, false);
function main(){
    var s=new Stage({
        el:document.querySelector('#pi'),
        list:['../assets/grain.png','../assets/ji.jpg','../assets/hero.jpg']
    });
    s.on(function(msg,type,target){
        console.log(target,11);
        console.log(this.gl)
    },'click')
    s.im.pick('../assets/ji.jpg')
    //s.gl.loadTexture('../assets/ji.jpg');
    //var imgdata = s.gl.loadTextureWithImage(s.gl.gl,s.im.pick('../assets/grain.png'))
    //s.gl.drawImage(imgdata,400,500)


}
window.addEventListener('resize', () => {
    // s.init();
    // s.load(true);
});
      

if (module.hot) module.hot.accept();