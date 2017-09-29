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
    //拦截器 获取已存在图片<str>src  todo:不存在则立即加载 拦截当前加载队列
    im(src,callback) {
        let self = this;
        if ( typeof this._images[src] != 'undefined' ){
            return  this._images[src];
        } else {
            let ret = [];
            ret.push(src);
            self.load(ret,callback)
        }
    }
}

// {
//     font-family: "Lato", "Lucida Grande", "Lucida Sans Unicode", Tahoma, Sans-Serif;
//     line-height: 1.5;
//     font-size: 15px;
//     font-weight: 400;
//     color: #ccc;
//  Loading...

// }

//舞台基类
class Stage {
    constructor(options) {
        this.context = options.stg.getContext('2d');
        this.load = null;
        this.reload();
    }
    reload() {
        this._width = options.stg.parentNode.offsetWidth;
        this._height = options.stg.parentNode.offsetHeight;
        this.dpr = window.devicePixelRatio || 1;
        this.width = dpr * this._width;
        this.height = dpr * this._height;
    }
    clear() {
        this.context.clearRect(0, 0, this.width, this.height);
    }
    update() {
        //clear loading
        this.clear();
        
    }
    draw() {

    }
}

//缓存ctx
class Buffer {
    constructor() {
        this.ctx = null;
    }
}

const stats = new Stats();
stats.setMode(0);
stats.domElement.style.position = 'absolute';
stats.domElement.style.right = '0px';
stats.domElement.style.top = '0px';
document.body.appendChild( stats.domElement );
//stats.update()

const canvas = document.querySelector('#stage');

window.addEventListener('resize', () => {
    
});

                


if (module.hot) {
    module.hot.accept();
}