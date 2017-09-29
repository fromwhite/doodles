import Stats from 'stats.min'
import { queue } from '_'


//资源加载
class Loader {
    constructor() {
        this._images = {};
        this.task = [];
    }
    //加载器
    load(arr,callback) {
        let self = this;
        for(let i = 0;i<arr.length;i++) {
            if( i == arr.length - 1 ){
                self.task.push(function(){
                    self._images[arr[i]] = new Image();
                    self._images[arr[i]].onload = function(){
                        callback();
                        return
                    }
                    self._images[arr[i]].src = arr[i];
                })
            } else {
                self.task.push(function(cb){
                    self._images[arr[i]] = new Image();
                    self._images[arr[i]].onload = function(){
                        cb();
                    }
                    self._images[arr[i]].src = arr[i];
                })
            }
        }
        
        return queue(self.task,this)
    }
    //拦截器 获取已存在图片 <arr:>src  todo:不存在则立即加载 拦截当前加载队列
    loadImg(src){
        //return typeof imgArray[src] != 'undefined' ? imgArray[src] : (_images[src] = new Image(), _images[src].src = src, _images[src])
    }
}

// var s = new Loader()
// s.load(['../image/favico.ico','../image/corner.svg','../image/border.svg'],function(){
//     console.log('complete')
// })
// console.log(s,11,s._images['../image/favico.ico'])


//舞台基类
class Stage {
    constructor(options) {
        this.context = options.el.getContext('2d');
        this.update();
    }
    clear() {
        this.context.clearRect(0, 0, this.width, this.height);
    }
    update() {
        this.clear();
        this._width = options.el.parentNode.offsetWidth;
        this._height = options.el.parentNode.offsetHeight;
        this.dpr = window.devicePixelRatio || 1;
        this.width = dpr * this._width;
        this.height = dpr * this._height;
    }
    draw() {

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