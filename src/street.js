import Stats from 'stats.min'
import { queue } from '_'


//资源加载
class Loader {
    constructor(){
        this._images = [];
    }
}

//舞台基类
class Stage {
    constructor(options){
        this.context = options.el.getContext('2d');
        this.update();
    }
    clear() {
        this.context.clearRect(0, 0, this.width, this.height);
    }
    update(){
        this.clear();
        this._width = options.el.parentNode.offsetWidth;
        this._height = options.el.parentNode.offsetHeight;
        this.dpr = window.devicePixelRatio || 1;
        this.width = dpr * this._width;
        this.height = dpr * this._height;
    }
    draw(){

    }
}

//缓存ctx

const stats = new Stats();
stats.setMode(0);
stats.domElement.style.position = 'absolute';
stats.domElement.style.right = '0px';
stats.domElement.style.top = '0px';
document.body.appendChild( stats.domElement );
//stats.update()

const canvas = document.querySelector('#ctx');

window.addEventListener('resize', () => {
    
});

                


if (module.hot) {
    module.hot.accept();
}