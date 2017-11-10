import Stats from 'util/stats.min'
import { queue,Event } from 'util/_'

//资源加载
class Loader {
    constructor(arr) {
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
    pick(src) {
        let self = this;
        if ( typeof this._images[src] != 'undefined' ){
            return  this._images[src];
        } else {
            new Error('image not found')
        }
    }
}

//舞台
class Stage extends Event {
    constructor(options) {
        super();
        this.ops = options;
        this.stg = options.stg;
        this.context = options.stg.getContext('2d');
        this.im = new Loader(options.list);
        this.store = null;
        this.init();
    }
    init () {
        this.on((content) => console.log(`get published content: ${content}`), 'myEvent')
        this._width = this.stg.parentNode.clientWidth;
        this._height = this.stg.parentNode.clientHeight;
        this.dpr = window.devicePixelRatio || 1;
        this.width = this.dpr * this._width;
        this.height = this.dpr * this._height;

        this.stg.style.width = `${this._width}px`;
        this.stg.style.height = `${this._height}px`;
        this.stg.width = ~~ this.width;
        this.stg.height = ~~ this.height;
         
        //加载资源
        this.load();
    }
    dp (px) {
        return ~~ px * this.dpr
    }
    load () {
        //判断是否需要加载资源
        if( this.ops.list ){

            //加载周期
            this.on(()=>{this.update()},'load');

            this.im.load(this.ops.list,()=>{this.emit(console.log('load success'),'load')});

            let loadTxt = 'Loading..';
            let textWidth = ~~ this.context.measureText(loadTxt).width * this.dpr;
            let textHeight =  15*this.dpr;
            
            let rx = ~~ ( this._width - textWidth ) / 2;
            let ry = ~~ ( this._height - textHeight ) / 2;
            
            let loadPx = 15;
            this.textAlign="center";
            this.context.font = `400 ${loadPx*this.dpr}px 微软雅黑,Sans-Serif`;
    
            this.context.fillStyle = '#ccc';
            
            this.context.fillText(loadTxt,rx*this.dpr,ry*this.dpr);

        } else {
            this.update();
        }

    }
    clear(x = 0, y = 0,width = this.width , height = this.height) {
        this.context.clearRect(x, y, width, height);
    }
    update(type,obj,x,y,rx,ry) {
        this.emit('jaja', 'myEvent');
       //drawImage
       //this.context[type].call(this.context,[].slice.call(arguments,1));
       //this.context[type]('111',10,20);
       //this.store = [].slice.call(arguments,2);
       //console.log(this.store,arguments,[].slice.call(arguments,1));
       this.clear();
       //todo MAP
       let t = this.im.pick('../image/this.jpg')
       this.context.drawImage(t,0,0,t.width,t.height);
        console.log(t)
    }
    draw() {
        //update type:text,filltext;image,drawImage 封装常用方法 保村坐标到this.store
    }
}

//精灵类
class Sprite {
    constructor (){

    }
}


const stats = new Stats();
stats.setMode(0);
stats.domElement.style.position = 'absolute';
stats.domElement.style.right = '0px';
stats.domElement.style.top = '0px';
document.body.appendChild( stats.domElement );
//stats.update()

var s = new Stage({stg:document.querySelector('#stage'),list:['../image/this.jpg']});

window.addEventListener('resize', () => {
    s.init();
    s.load(true);
});
      
console.log('333')
if (module.hot) {
    module.hot.accept();
}