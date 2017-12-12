import {Stage} from 'stage'

document.addEventListener("DOMContentLoaded", main, false);
function main(){
    var s=new Stage({
        el:document.querySelector('#gl'),
        list:['../assets/ji.jpg','../assets/grain.png','../assets/hero.jpg']
    });
    s.on(function(msg,type,target){
        console.log(target);
        console.log(this.gl)
        s.gl.drawImage(s.im.pick('../assets/ji.jpg'),100,200)
    },'click')
    
    //s.gl.loadTexture('../assets/ji.jpg');
    //
    //var imgdata = s.gl.loadTextureWithImage(s.gl.gl,s.im.pick('../assets/ji.jpg'))

    


}
window.addEventListener('resize', () => {
    // s.init();
    // s.load(true);
});
      

if (module.hot) module.hot.accept();