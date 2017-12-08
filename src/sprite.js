import Stats from 'stats.min'
import {Stage} from 'stage'


const stats = new Stats();
stats.setMode(0);
stats.domElement.style.position = 'absolute';
stats.domElement.style.right = '0px';
stats.domElement.style.top = '0px';
document.body.appendChild( stats.domElement );
//stats.update()

window.onload = function(){
    new Stage({
        el:document.querySelector('#stage'),
        list:['../assets/ji.jpg']
    },function(){
        console.log('su!!')
    });
}

window.addEventListener('resize', () => {
    // s.init();
    // s.load(true);
});
      

if (module.hot) module.hot.accept();