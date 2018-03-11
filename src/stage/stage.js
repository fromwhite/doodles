import { Event,raf } from '_'
import gl2d from 'glsl'

//舞台
class _Stage extends Event {
    constructor(canvas) {
        super();
        this.dpr = window.devicePixelRatio || 1;
  
        this.container = canvas || null;

        this.gl = null;
        this.im = null;

        // ticker
        this.then = 0;

        if ( !this.container || this.container.nodeName !== 'CANVAS' ){
            let c = document.createElement('canvas');
            c.id = 'gl';
            c.oncontextmenu = function (){
                return false;
            }

            if (!this.container){
                document.body.appendChild(c); 
            }
            if (this.container && this.container.nodeName !== 'CANVAS'){
                this.container.appendChild(c)
            }
            
            this.container = c;
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
        
        // Sprite Painter
        this.im = gl2d(this.container);
        // target
        this.gl = this.im.gl;

        this.initEvent();
    }
    dp (px) {
        return ~~ px * this.dpr
    }
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
    viewport (gl = this.gl){
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    }
    clear (gl = this.gl) {
        gl.clear(gl.COLOR_BUFFER_BIT);
    }
    update() {}
    draw() {}
    render (time){
        console.log('render');
        raf(()=>this.loop()); 
    }
    loop (time){
        let now = time * 0.001;
        this.deltaTime = Math.min(0.1, now - this.then);
        this.then = now;
        console.log('loop');
        this.update();
        this.draw();
        raf(()=>this.loop());
    }
}

const Stage = {
    create: function(...args){
        return new _Stage(...args);
    }
}

export default Stage