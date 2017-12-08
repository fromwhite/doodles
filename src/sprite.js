import {Stage} from 'stage'


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