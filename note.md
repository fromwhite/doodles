## 目录备注
.
|____.babelrc
|____.gitignore
|____app
|____assets
|____build
|____index.html
|____note.md
|____package-lock.json
|____package.json
|____README.md
|____release.js
|____src
| |_____.js
| |____master.css
| |____stage
|____webpack.config.js


* app       展示页面集合文件夹
* assets    资源文件
* build     打包目录
* index     快速预览入口          
* release   打包脚本
* src       开发目录,stage库/master全局样式/工具库_



* stage
两种方式，通过Stage对象实例来绘制动画，stage实例提供一个loop环境。另外也可以通过stage暴露的一些方法，自己额外增加一个长循环来完成绘制，stage.im提供基本的drawImage和loadTex方法，已经必要的事件处理，这种方式主要是开发初期测试方便使用，也为自由不愿意受库束缚而维持这些api
如果不需要额外的状态时，单独使用glsl模块，接收一个canvas element对象，封装了loader和常用方法
void dpr 修复高清屏显示 对canvas本身不做样式处理，样式描述canvas的容器，方便做布局适配
void drawImage 类似canvas2d drawImage 增加transform
... todo: font

todo：打包glsl最小封装 stage包含loop与eventbus为库文件

core提供loop生命周期和事件
glsl封装webgl2d gl2d(element[,width,height])
math计算库
sprite精灵对象
transform状态栈

0.stage提供一个scene，sprite封装精灵行为并收集路径与坐标为事件判定准备
new Stage(element[,[tex]需要加载的图片资源,loading:function加载时 ...])
Sprite(行为)

1.增加事件处理，在documentElement增加侦听器，handler中响应自定义事件