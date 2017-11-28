import Stats from 'util/stats.min'
import { queue,EventEmitter } from 'util/_'

//资源加载
class Loader {
    constructor(arr) {
        this._images = {};
        this.task = [];
    }
    //加载图片
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
    //获取图片
    pick(src) {
        if ( typeof this._images[src] != 'undefined' ){
            return  this._images[src];
        } else {
            throw new Error('请传入图片对象')
        }
    }
}

//舞台
class Stage extends EventEmitter {
    constructor(options) {
        super();
        this.dpr = window.devicePixelRatio || 1;
        //资源列表
        this.assets = options.list || null;
        //dom节点
        this.el = options.el;
        this.context = options.el.getContext('2d');
        //精灵字典
        this.sprites = [];
        //世界地图
        this.map = options.map || null;

        this.init();
    }
    init () {
        //event测试
        //this.on((content) => console.log(`get published content: ${content}`), 'myEvent')
        
        //canvas外层容器宽高 利用css响应布局
        this._width = this.el.parentNode.clientWidth;
        this._height = this.el.parentNode.clientHeight;
        //真实宽高
        this.width = this.dpr * this._width;
        this.height = this.dpr * this._height;
        //初始化canvas元素
        this.el.style.width = `${this._width}px`;
        this.el.style.height = `${this._height}px`;
        this.el.width = ~~ this.width;
        this.el.height = ~~ this.height;
        //初始化loader
        this.im = new Loader(this.assets);

        //加载资源
        this.load();
    }
    dp (px) {
        return ~~ px * this.dpr
    }
    load () {
        //判断是否需要加载资源
        if( this.assets ){

            //加载周期
            this.on(()=>{this.update()},'load');
            //加载回调
            this.im.load(this.assets,()=>{this.emit(console.log('load success'),'load')});

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
    //主loop
    update(type,obj,x,y,rx,ry) {
        //event测试
        //this.emit('jaja', 'myEvent');

        this.clear();
        //todo MAP
        let t = this.im.pick('../assets/this.jpg')
        this.context.drawImage(t,0,0,t.width,t.height);
    }
    //收集并重写精灵的行为
    draw() {
        //update type:text,filltext;image,drawImage 封装常用方法 保留坐标到this.store
    }
    //map
    //添加精灵元素
    addSprite (name,sprite) {
        this.sprites[name]=sprite; 
    }
    //移除精灵元素
    removeSprite (name) {
        if ( this.sprites[name] ){
            delete this.sprites[name];
        }
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

window.onload = function(){
    new Stage({
        el:document.querySelector('#stage'),
        list:['../assets/this.jpg']
    },function(){
        console.log('sucess')
    });
}

window.addEventListener('resize', () => {
    // s.init();
    // s.load(true);
});
      

if (module.hot) module.hot.accept();
