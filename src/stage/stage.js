import { Event,raf } from '_'
import gl2d from 'glsl'

//舞台
class _Stage extends Event {
    constructor(canvas) {
        super();
        this.dpr = window.devicePixelRatio || 1;
        //dom节点
        this.container = canvas || null;
        this.gl = null;
        this.then = 0;

        //el设置为空或者为父节点
        if ( !this.container || this.container.nodeName !== 'CANVAS' ){
            let canvas = document.createElement('canvas');
            canvas.id = 'gl';
            canvas.oncontextmenu = function (){
                return false;
            }

            if (!this.container){
                document.body.appendChild(canvas); 
            }
            if (this.container.nodeName !== 'CANVAS'){
                this.container.appendChild(canvas)
            }
            
            //重置
            this.container = document.querySelector('#gl');
        }

        this.init();
    }
    init () {
        //event测试
        this.on((content) => console.log(`get published content: ${content}`), 'Event test')
        this.on((content) => console.log(`get content: ${content}`),'sss')
        
        //canvas外层容器宽高 利用css响应布局
        this._width = this.container.parentNode.clientWidth;
        this._height = this.container.parentNode.clientHeight;
        //真实宽高
        this.width = this.dpr * this._width;
        this.height = this.dpr * this._height;
        //初始化canvas元素
        this.container.style.width = `${this._width}px`;
        this.container.style.height = `${this._height}px`;
        
        this.container.width = ~~ this.width;
        this.container.height = ~~ this.height;
        
        this.gl = gl2d(this.container);

        this.initEvent();
    }
    dp (px) {
        return ~~ px * this.dpr
    }
    load () {
        //判断是否需要加载资源
        if( this.assets ){

            //加载周期
            this.on(()=>{this.initEvent()},'load');
            //加载回调
            this.im.load(this.assets,()=>{this.emit(console.log('load success'),'load')});

            //let loadTxt = 'Loading..';
            //let textWidth = ~~ this.context.measureText(loadTxt).width * this.dpr;
            //let textHeight =  15*this.dpr;
            
            //let rx = ~~ ( this._width - textWidth ) / 2;
            //let ry = ~~ ( this._height - textHeight ) / 2;
            
            //let loadPx = 14;
            //this.textAlign="center";
            //this.context.font = `400 ${loadPx*this.dpr}px 微软雅黑,Sans-Serif`;
            //this.context.font = `normal small-caps 400 ${loadPx*this.dpr}px 'Lato', sans-serif`;
    
            //this.context.fillStyle = '#ccc';
            
            //this.context.fillText(loadTxt,rx*this.dpr,ry*this.dpr);

        } else {
            this.initEvent();
        }

    }
    clear(x = 0, y = 0,width = this.width , height = this.height) {
        this.context.clearRect(x, y, width, height);
    }
    //single bus
    initEvent () {
        const events = ['mousedown', 'mouseup', 'mousemove',
        'touchstart', 'touchend', 'touchmove',
        'click'];
        events.forEach((event)=>{
            
            this.container.addEventListener(event,(e)=>{
            
                const {left, top} = e.target.getBoundingClientRect();
                let originalX, originalY;
                const evtArgs = {
                    originalEvent: e,
                    type:event
                }
                if(e.changedTouches) {
                    const {clientX, clientY} = e.changedTouches[0]
                    
                    originalX = Math.round(clientX - left)
                    originalY = Math.round(clientY - top)          
                } else {
                    originalX = Math.round(e.clientX - left)
                    originalY = Math.round(e.clientY - top)
                }
                Object.assign(evtArgs, {originalX, originalY});
                this.emit('native',event,evtArgs);
            },true);
        })
    }
    //sprite behaviors
    update(type,obj,x,y,rx,ry) {
        //event测试
        this.emit('pub', 'Event test');

        
        //todo MAP

        this.draw()

    }
    //sprite paint
    draw() {
        this.emit('clear')
        this.clear();
        let t = this.im.pick('../assets/ji.jpg')
        let t1 = this.im.pick('../assets/hero.jpg')
        let t2 = this.im.pick('../assets/grain.png')
        this.context.drawImage(t,0,0,t.width,t.height);
        setTimeout(() => {
            this.context.drawImage(t1,0,0,t1.width,t.height);
        }, 100);
        setTimeout(() => {
            this.context.drawImage(t2,0,0,t2.width,t.height);
        }, 500);
        

        //raf(stats.update)
        // setTimeout(() => {
        //     this.draw()
        //     stats.update()
        // }, 10);
    }
    render (time){
        let now = time * 0.001;
        let deltaTime = Math.min(0.1, now - then);
        then = now;
    
        //update(deltaTime);
        //draw();
    
        raf(render);
    }
    //raf(render);
}

const Stage = {
    create: function(...args){
        return new _Stage(...args);
    }
}

export default Stage