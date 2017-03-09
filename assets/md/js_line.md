### Javascript notes	
Create on Feb 22 2017 with match Mar.mid 2017
***

#### 基本数据类型
`Undefined、Null、Boolean、Number、String`

#### 内置对象
`Object 是 JavaScript 中所有对象的父对象
数据封装类对象：Object、Array、Boolean、Number、String
其他对象：Function、Argument、Math、Date、RegExp、Error`

#### JavaScript 的基本代码规范
（1）不要在同一行声明多个变量  
（2）如果你不知道数组的长度，使用 push  
（3）请使用 ===/!== 来比较 true/false 或者数值  
（4）对字符串使用单引号 ''(因为大多时候我们的字符串。特别html会出现")  
（5）使用对象字面量替代 new Array 这种形式  
（6）绝对不要在一个非函数块里声明一个函数，把那个函数赋给一个变量。浏览器允许你这么做，但是它们解析不同  
（7）不要使用全局函数  
（8）总是使用 var 来声明变量，如果不这么做将导致产生全局变量，我们要避免污染全局命名空间  
（9）Switch 语句必须带有 default 分支  
（10）使用 /**...*/ 进行多行注释，包括描述，指定类型以及参数值和返回值  
（11）函数不应该有时候有返回值，有时候没有返回值  
（12）语句结束一定要加分号  
（13）for 循环必须使用大括号  
（14）if 语句必须使用大括号  
（15）for-in 循环中的变量应该使用 var 关键字明确限定作用域，从而避免作用域污染  
（16）避免单个字符名，让你的变量名有描述意义  
（17）当命名对象、函数和实例时使用驼峰命名规则  
（18）给对象原型分配方法，而不是用一个新的对象覆盖原型，覆盖原型会使继承出现问题  
（19）当给事件附加数据时，传入一个哈希而不是原始值，这可以让后面的贡献者加入更多数据到事件数据里，而不用找出并更新那个事件的事件处理器

#### bind/call/apply
功能基本相同，都是实现继承或者转换对象指针的作用  
.bind(this,arg1,arg2);   
.call(对象[,参数1，参数2,....]);   
.apply(对象,参数数组);   
fun2.call.apply(fun.bind,[123,12,67]); //fun.bind(123).call(null,12,67)   

#### 媒体查询css
`@media screen and (max-width: 300px) {
    body {
        background-color:lightblue;
    }
}`

####  原型/原型链
每个对象都会在其内部初始化一个属性，就是prototype(原型)，当我们访问一个对象的属性时，如果这个对象内部不存在这个属性，那么他就会去prototype里找这个属性，这个prototype又会有自己的prototype，于是就这样一直找下去，也就是我们平时所说的原型链的概念。

关系：instance.constructor.prototype = instance.__proto__

特点：JavaScript对象是通过引用来传递的，我们创建的每个新对象实体中并没有一份属于自己的原型副本，当我们修改原型时，与之相关的对象也会继承这一改变。Object实时传递，Function传递改变后的实例。
当我们需要一个属性时，JavaScript引擎会先看当前对象中是否有这个属性，如果没有的话，就会查找它的prototype对象是否有这个属性，如此递推下去，一致检索到Object内建对象。  

function Func(){}  
Func.prototype.name = "Man";  
Func.prototype.getInfo = function() {  
	return this.name;  
}  
var person = new Func();  
console.log(person.getInfo());//"Man"  
console.log(Func.prototype);//Func { name = "Man", getInfo = function() }

#### JavaScript 有几种类型的值？能否画一下它们的内存图？
栈：原始数据类型（Undefined，Null，Boolean，Number，String）

堆：引用数据类型（对象、数组、函数）

两种类型的区别：
//存储位置不同

原始数据类型直接存储在栈(stack)中的简单数据段，占据空间小、大小固定，属于被频繁使用数据，所以放入栈中存储；

引用数据类型存储在堆(heap)中的对象,占据空间大、大小不固定,如果存储在栈中，将会影响程序运行的性能；引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址。当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体。

#### 面向对象特性javascript实现 封装继承多态抽象

JS函数不支持多态函数重载,本身无状态 原生支持多态
封装就是把抽象出来的数据和对数据的操作封装在一起，数据被保护在内部，程序的其它部分只有通过被授权的操作(成员方法)，才能对数据进行操作，JS封装只有两种状态，一种是公开的，一种是私有的。  
function Master(name){  
	// 公开  
	this.name = name;  
	// 私有  
	var salary = sal;  
}  
//原型添加成员方法  
Master.prototype.feed = function(animal,food){}  
  
通过构造函数添加成员方法和通过原型法添加成员方法的区别  
1、通过原型法分配的函数是所有对象共享的.  
2、通过原型法分配的属性是独立.(如果你不修改属性，他们是共享)  
3、建议，如果我们希望所有的对象使用同一一个函数，最好使用原型法添加函数，这样比较节省内存.  
通过prototype给所有的对象添加方法，但是这种方式不能去访问类的私有变量


#### null 和 undefined 区别
null 表示一个对象被定义了，值为“空值”；  
undefined 表示不存在这个值。  
typeof undefined //"undefined"  
undefined :是一个表示"无"的原始值或者说表示"缺少值"，就是此处应该有一个值，但是还没有定义。当尝试读取时会返回 undefined  
例如变量被声明了，但没有赋值时，就等于undefined。    
typeof null //"object"     
null : 是一个对象(空对象, 没有任何属性和方法)；     
例如作为函数的参数，表示该函数的参数不是对象；    
注意： 在验证null时，一定要使用　=== ，因为 == 无法分别 null 和　undefined

#### 判断二维数组是否存在值
```
function isContains(arr,str) {  

        for(var i = 0;i < arr.length >>> 0;i++){    

            if(arr[i] instanceof Array){ 

                binIndex = binIndex + 1;    
                isContains(arr[i],str);    

            }else{      

                if(new RegExp(arr[i]).test(str)){    

                    bankBinName = {'0':'邮政储蓄银行','1':'浦发银行'}[binIndex] || null;    
                    console.log('banBin'+ binIndex,bankBinName,'console绑卡bin');   

                    return binHandle = true ;

                }  

            }    
        }
            
        return -1;  
}
```

#### 通用的事件侦听器函数
``` 
var Event = {

	addHandler: function(){
		 if (element.addEventListener) { //事件类型、需要执行的函数、是否捕捉   
             element.addEventListener(type,handler,false); 
        }else if (element.attachEvent) { 
            element.attachEvent('on' + type, function() {
                  handler.call(element);
             }); 
        }else { 
            element['on' + type] = handler; 
        }
	},
	removeHandler: function(element,type,handler){
        if (element.removeEventListener) {
             element.removeEventListener(type,handler,false); 
        }else if (element.datachEvent) { 
             element.datachEvent('on' + type,handler); 
        }else{
             element['on' + type] = null;
        }
    },
	getEvent: function(event) {
        return event ? event : window.event;
    },
    getTarget: function(event) {
        return event.target || event.srcElement;
    },
    preventDefault: function(event){
        if(event.preventDefault) {
            event.preventDefault();
        }else {
            event.returnValue = false;
        }
    },
    stopPropagation: function(event) {
        if(event.stopPropagation) {
            event.stopPropagation();
        }else {
            event.cancelBubble = true;
        }
    }

}
还有很多暂未实习
```

### 转行的滑稽
`
function main(){}
window.onload = main;
`

#### pubsub发布/订阅者模式
```
function EventHandle() {

    var events = {};

    this.on = function (event, callback) {
        callback = callback || function () { };
        if (typeof events[event] === 'undefined') {
            events[event] = [callback];
        } else {
            events[event].push(callback);
        }
    };

    this.emit = function (event, args) {
      events[event].forEach(function (fn) {
            fn(args);
        });
    };

    this.off = function (event) {
        delete events[event];
    };

}
```

#### 闭包(closure) 作用域(scope)
`有权访问另一个函数作用域中变量的函数，创建闭包的最常见的方式就是在一个函数内创建另一个函数，通过另一个函数访问这个函数的局部变量，利用闭包可以突破作用链域，将函数内部的变量和方法传递到外部。实现私有。隔离作用域。

//闭包特性：  
(1)函数内再嵌套函数  
(2)内部函数可以引用外层的参数和变量  
(3)参数和变量不会被垃圾回收机制回收  
常见for循序取index`


#### ECMAScript 6 写 class
```
ES6的class可以看作只是一个语法糖，它的绝大部分功能，ES5都可以做到，新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。

//定义类
class Point { 

  constructor(x,y) { 
      //构造方法  
      this.x = x; //this关键字代表实例对象  
      this.y = y; 
  } 
  toString() {  
      return '(' + this.x + ',' + this.y + ')'; 
  }

}
```

#### 代码效率 习惯性（部分尚未验证）

1.缩小dom修改范围/频率，常见DocumentFragment/节流timer  
2.使用 Array 做为 StringBuffer ，代替字符串拼接的操作,浏览器在对字符串拼接的时候，会创建临时的 String 对象  
```
template: [  
    '<div>',  
        '<a href="#" data-action="close-dialog">×</a>',  
        '<h2><%= data.title %></h2>',  
        '<div><%- data.html %></div>',  
        '</div>'  
    ].join('')
``` 
3.循环控制，高频率解构，取index，查询获取dom。length 保存到局部变量，减少循环开关，i--。无关顺序时使用while取代for，避免for in。递归控制尾递归特例。  
4.巧用 || 和 && 布尔运算符  
5.对象/哈希表比数组快得多  
6.javascript 创建的 dom 对象，必须 append 到页面中，否则手动销毁，null。


#### JavaScript 中的模块规范 CommonJS、AMD、CMD 
`
| CommonJS |   AMD   | CMD     |
|----------|---------|---------|
| Node.js  |RequireJS| SeaJS   |
`

#### HTTP协议的状态消息

协议是指计算机通信网络中两台计算机之间进行通信所必须共同遵守的规定或规则，超文本传输协议(HTTP)是一种通信协议，它允许将超文本标记语言(HTML)文档从Web服务器传送到客户端的浏览器，  
• “100″ : Continue（继续） 初始的请求已经接受，客户应当继续发送请求的其余部分。（HTTP 1.1新）  
•  “101″ : Switching Protocols（切换协议） 请求者已要求服务器切换协议，服务器已确认并准备进行切换。（HTTP 1.1新）  
•  “200″ : OK（成功） 一切正常，对GET和POST请求的应答文档跟在后面。  
•  “201″ : Created（已创建）服务器已经创建了文档，Location头给出了它的URL。  
•  “202″ : Accepted（已接受）服务器已接受了请求，但尚未对其进行处理。  
•  “203″ : Non-Authoritative Information（非授权信息） 文档已经正常地返回，但一些应答头可能不正确，可能来自另一来源 。（HTTP 1.1新）。  
•  “204″ : No Content（无内容）未返回任何内容，浏览器应该继续显示原来的文档。  
•  “205″ : Reset Content（重置内容）没有新的内容，但浏览器应该重置它所显示的内容。用来强制浏览器清除表单输入内容（HTTP 1.1新）。  
•  “206″ : Partial Content（部分内容）服务器成功处理了部分 GET 请求。（HTTP 1.1新）  
•  “300″ : Multiple Choices（多种选择）客户请求的文档可以在多个位置找到，这些位置已经在返回的文档内列出。如果服务器要提出优先选择，则应该在Location应答头指明。  
•  “301″ : Moved Permanently（永久移动）请求的网页已被永久移动到新位置。服务器返回此响应（作为对 GET 或 HEAD 请求的响应）时，会自动将请求者转到新位置。  
•  “302″ : Found（临时移动）类似于301，但新的URL应该被视为临时性的替代，而不是永久性的。注意，在HTTP1.0中对应的状态信息是“Moved Temporatily”，出现该状态代码时，浏览器能够自动访问新的URL，因此它是一个很有用的状态代码。注意这个状态代码有时候可以和301替换使用。例如，如果浏览器错误地请求http://host/~user（缺少了后面的斜杠），有的服务器返回301，有的则返回302。严格地说，我们只能假定只有当原来的请求是GET时浏览器才会自动重定向。请参见307。  
•  “303″ : See Other（查看其他位置）类似于301/302，不同之处在于，如果原来的请求是POST，Location头指定的重定向目标文档应该通过GET提取（HTTP 1.1新）。  
•  “304″ : Not Modified（未修改）自从上次请求后，请求的网页未被修改过。原来缓冲的文档还可以继续使用，不会返回网页内容。  
•  “305″ : Use Proxy（使用代理）只能使用代理访问请求的网页。如果服务器返回此响应，那么，服务器还会指明请求者应当使用的代理。（HTTP 1.1新）  
•  “307″ : Temporary Redirect（临时重定向）和 302（Found）相同。许多浏览器会错误地响应302应答进行重定向，即使原来的请求是POST，即使它实际上只能在POST请求的应答是303时才能重定向。由于这个原因，HTTP 1.1新增了307，以便更加清除地区分几个状态代码：当出现303应答时，浏览器可以跟随重定向的GET和POST请求；如果是307应答，则浏览器只能跟随对GET请求的重定向。（HTTP 1.1新）  
•  “400″ : Bad Request（错误请求）请求出现语法错误。  
•  “401″ : Unauthorized（未授权）客户试图未经授权访问受密码保护的页面。应答中会包含一个WWW-Authenticate头，浏览器据此显示用户名字/密码对话框，然后在填写合适的Authorization头后再次发出请求。  
•  “403″ : Forbidden（已禁止） 资源不可用。服务器理解客户的请求，但拒绝处理它。通常由于服务器上文件或目录的权限设置导致。  
•  “404″ : Not Found（未找到）无法找到指定位置的资源。  
•  “405″ : Method Not Allowed（方法禁用）请求方法（GET、POST、HEAD、DELETE、PUT、TRACE等）禁用。（HTTP 1.1新）  
•  “406″ : Not Acceptable（不接受）指定的资源已经找到，但它的MIME类型和客户在Accpet头中所指定的不兼容（HTTP 1.1新）。  
•  “407″ : Proxy Authentication Required（需要代理授权）类似于401，表示客户必须先经过代理服务器的授权。（HTTP 1.1新）  
•  “408″ : Request Time-out（请求超时）服务器等候请求时超时。（HTTP 1.1新）  
•  “409″ : Conflict（冲突）通常和PUT请求有关。由于请求和资源的当前状态相冲突，因此请求不能成功。（HTTP 1.1新）  
•  “410″ : Gone（已删除）如果请求的资源已被永久删除，那么，服务器会返回此响应。该代码与 404（未找到）代码类似，但在资源以前有但现在已经不复存在的情况下，有时会替代 404 代码出现。如果资源已被永久删除，那么，您应当使用 301 代码指定该资源的新位置。（HTTP 1.1新）  
•  “411″ : Length Required（需要有效长度）不会接受包含无效内容长度标头字段的请求。（HTTP 1.1新）  
•  “412″ : Precondition Failed（未满足前提条件）服务器未满足请求者在请求中设置的其中一个前提条件。（HTTP 1.1新）  
•  “413″ : Request Entity Too Large（请求实体过大）请求实体过大，已超出服务器的处理能力。如果服务器认为自己能够稍后再处理该请求，则应该提供一个Retry-After头。（HTTP 1.1新）  
•  “414″ : Request-URI Too Large（请求的 URI 过长）请求的 URI（通常为网址）过长，服务器无法进行处理。  
•  “415″ : Unsupported Media Type（不支持的媒体类型）请求的格式不受请求页面的支持。  
•  “416″ : Requested range not satisfiable（请求范围不符合要求）服务器不能满足客户在请求中指定的Range头。（HTTP 1.1新）  
•  “417″ : Expectation Failed（未满足期望值）服务器未满足”期望”请求标头字段的要求。  
•  “500″ : Internal Server Error（服务器内部错误）服务器遇到错误，无法完成请求。  
•  “501″ : Not Implemented（尚未实施） 服务器不具备完成请求的功能。例如，当服务器无法识别请求方法时，服务器可能会返回此代码。  
•  “502″ : Bad Gateway（错误网关）服务器作为网关或者代理时，为了完成请求访问下一个服务器，但该服务器返回了非法的应答。  
•  “503″ : Service Unavailable（服务不可用）服务器由于维护或者负载过重未能应答。通常，这只是一种暂时的状态。  
•  “504″ : Gateway Time-out（网关超时） 由作为代理或网关的服务器使用，表示不能及时地从远程服务器获得应答。（HTTP 1.1新）  
•  “505″ : HTTP Version not supported（HTTP 版本不受支持）不支持请求中所使用的 HTTP 协议版本。


#### 编写一个JavaScript函数 parseQueryString，它的用途是把URL参数解析为一个对象，如：
var url = “http://witmax.cn/index.php?key0=0&key1=1&key2=2″;

```
function parseQueryString(url){

  var params = {},
      arr = url.split("?");

  if (arr.length <= 1) return params;

  arr = arr[1].split("&");
  for(var i=0, l=arr.length; i<l; i++){
      var a = arr[i].split("=");
      params[a[0]] = a[1];
  } 

  return params;
}

var url = "http://witmax.cn/index.php?key0=0&key1=1&key2=2",
    ps = parseQueryString(url);
console.log(ps["key1"]);
```

#### 前端开发有哪些优化
减少http请求次数：cssspirit,data uri  
JS，CSS源码压缩  
前端模板JS+数据，减少由于HTML标签导致的带宽浪费，前端用变量保存AJAX请求结果，每次操作本地变量，不用请求，减少请求次数  
用innerHTML代替DOM操作，减少DOM操作次数，优化javascript性能  
用setTimeout来避免页面失去响应  
用hash-table来优化查找  
当需要设置的样式很多时设置className而不是直接操作style  
少用全局变量  
缓存DOM节点查找的结果  
避免使用CSS Expression  
图片预载  
避免在页面的主体布局中使用table，table要等其中的内容完全下载之后才会显示出来，显示比div+css布局慢  

#### 重复
```
var repeat=(function(){
     var join=Array.prototype.join,obj={};
     return function(target,n){
          obj.length=n+1;
          return join.call(obj,target);
     }
```

#### assign ， extend ， merge 函数
```
assign(object, [sources]) 函数会忽略原型链上的属性 会修改原来的对象
extend(object, [sources]) 把原型链上的属性合并到目标对象(hasOwnProperty过滤)
merge(object, [sources])  merge 遇到相同属性的时候，如果属性值为纯对象(plain object)或者集合(collection)时，不是用后面的属性值去覆盖前面的属性值，而是会把前后两个属性值合并 如果源对象的属性值为 undefined ，则会忽略该属性
相同之处 都可以用来合并对象,都会修改原来的对象 (如果原来的对象是作为函数的第一个参数的话)
var extend = function(target, source) {
     for (var p in source) {
         if (source.hasOwnProperty(p)) {
              target[p] = source[p];
         }
     }
     return target;
};
```

#### 数组去重（哈希表）
```
var unique = Array.prototype.unique || function(){
 var res = [];
 var json = {};
 for(var i = 0; i < this.length; i++){
  if(!json[this[i]]){
   res.push(this[i]);
   json[this[i]] = 1;
  }
 }
 return res;
}
```

#### 冒泡排序
```
function bubbleSort(arr){
  var i = j = 0;
  for(i=1; i<arr.length; i++){
    for(j=0; j<=arr.length-i; j++){
      var temp = 0;
      // ">" 从小到大排序
      // "<" 从大到小排序
      if(arr[j] > arr[j+1]){
        temp = arr[j]
        arr[j] = arr[j+1]
        arr[j+1] = temp
      }
    }
  }
  return arr
}
```

#### 插入排序
```
var arr=[2,4,1,5,3];
  function insertSort(arr){
    //遍历arr中每个元素(i从1开始)
    for(var i=1;i<arr.length;i++){
      //将当前元素临时保存在变量t中
      var t=arr[i];
      var p=i-1;//声明变量p=i-1
      //循环:(arr[p]>t&&p>=0){
      while(arr[p]>t&&p>=0){
     //将p位置的值，赋值给p+1位置
        arr[p+1]=arr[p];
        p--;//p--
      }//(循环结束)
      arr[p+1]=t;//将t放在p+1的位置上
    }//(循环结束)
  }
}
insertSort(arr);
console.log(String(arr));
```

#### 快速排序
```
method 1
function quickSort(arr){
    //如果arr的length<=1
    if(arr.length<=1){
      return arr;//就直接返回arr
    }
    //计算参照位p
    var p=Math.floor(arr.length/2);
    var left=[];
    var right=[];
    //删除p位置的元素
    var center=arr.splice(p,1)[0];
    //遍历arr中每个元素
    for(var i=0;i<arr.length;i++){
      if(arr[i]>=center){
        right.push(arr[i]);
      }else{
        left.push(arr[i]);
      }
    }
    return quickSort(left) .concat(center,quickSort(right))
}
var sortedArr=quickSort(arr);
console.log(String(sortedArr));

method 2
function quickSort(arr,l,r){
  if(l < r){
    var i = l, j = r, x = arr[i];
    while(i<j){
      while(i<j && arr[j]>x)
        j--;
      
      if(i<j)
        //这里用i++，被换过来的必然比x小，赋值后直接让i自加，不用再比较，可以提高效率
        arr[i++] = arr[j];
      
      while(i<j && arr[i]<x)
        i++;
      
      if(i<j)
        //这里用j--，被换过来的必然比x大，赋值后直接让j自减，不用再比较，可以提高效率
        arr[j--] = arr[i];
    }
    arr[i] = x;
    
    quickSort(arr, l, i-1);
    quickSort(arr, i+1, r);
  }
}
```

#### 数组中最大差值
```
function getMaxProfit(arr){
  var min = arr[0],
      max = arr[0];
  for(var i = 0; i < arr.length; i++){
    if(arr[i] < min) min = arr[i];
    if(arr[i] > max) max = arr[i];
  }
  return max - min;
}
```

#### 阶乘
```
非递归实现
function factorialize(num) {
  var result = 1;
    if(num < 0) return -1;
    if(num == 0 || num == 1) return 1;
    while(num>1) {
      result *= num--;
    }
    return result;
}

递归实现
function factorialize(num) {
  var result = 1;
  if(num < 0) return -1;
  if(num == 0 || num == 1) return 1;
  if(num > 1) return num*factorialize(num-1);
}
```

#### 生成菲波那切数列
```
强行递归实现
function getfib(n){
  if(n == 0) return 0;
  if(n == 1) return 1;
  if(n > 1) return getfib(n-1) + getfib(n-2);
}
function fibo(len){
    var fibo = [];
    for(var i = 0; i < len; i++){
      fibo.push(getfib(i));
    }
    return fibo;
}

简约非递归实现
function getFibonacci(n) {
  var fibarr = [];
  var i = 0;
  while(i < n) {
    if(i <= 1) {
      fibarr.push(i);
    } else {
      fibarr.push(fibarr[i - 1] + fibarr[i - 2])
    }
    i++;
  }
  return fibarr;
}
```

#### 二分查找
```
非递归实现
function binary_search(arr, key) {
  var low = 0,
      high = arr.length - 1;
  while(low <= high){
    var mid = parseInt((high + low) / 2);
    if(key == arr[mid]){
      return mid;
    }else if(key > arr[mid]){
      low = mid + 1;
    }else if(key < arr[mid]){
      high = mid -1;
    }
  }
  return -1;
}

递归实现
function binary_search2(arr, low, high, key) {
  if(low > high) return -1;
  var mid = parseInt((low + high)/2);
  if(key == arr[mid]) {
    return mid;
  } else if(key > arr[mid]) {
    return binary_search2(arr, mid+1, high, key);
  } else if(key < arr[mid]) {
    return binary_search2(arr, low, mid-1, key);
  }
}
```

#### 二路归并
```
function merge(left, right) {
    var result = [],
        il = 0,
        ir = 0;

    while (il < left.length && ir < right.length) {
        if (left[il] < right[ir]) {
            result.push(left[il++]);
        } else {
            result.push(right[ir++]);
        }
    }
    while(left[il]){
        result.push(left[il++]);
    }
    while(right[ir]){
        result.push(right[ir++]);
    }
    return result;
}
```

#### 统计字符串中每种字符出现的次数(hash)
```
var str="helloworld";
for(var i=0,hash={};i<str.length;i++){
    if(hash[str[i]]){
      hash[str[i]]++
    }else{
      hash[str[i]]=1;
    }
}
console.dir(hash);
```

#### 数组降维
```
var arr=[
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
];
//method 1:
for(var r=0,arr1=[];r<arr.length;r++){
    for(var c=0;c<arr[r].length;c++){
      arr1.push(arr[r][c]);
    }
}
console.dir(arr1);
//method 2: 
for(var r=0,arr2=[];r<arr.length;r++){
    arr2=arr2.concat(arr[r]);
}
console.dir(arr2);
//method 3:
var arr2=[].concat.apply([],arr);
console.dir(arr2);
```

#### 深克隆
```
Object.clone=function(obj){//深克隆
if(typeof(obj)=="object"){//如果obj是对象
  var o=//有必要区分数组和普通对象
  Object.prototype.toString.call(obj)=="[object Array]"?[]:{};
      for(var key in obj){//遍历obj的自有属性
          //如果key是obj的自有属性
          if(obj.hasOwnProperty(key)){
              o[key]=arguments.callee(obj[key]);//arguments.callee调的是当前的Object.clone函数
              }
      }
      return o;
      }else{//如果obj是原始类型的值，就直接返回副本
          return obj;
      }
}
```

#### every
```
if(Array.prototype.every===undefined){
     Array.prototype.every=function(fun){
      //遍历当前数组中每个元素
      for(var i=0;i<this.length;i++){
          if(this[i]!==undefined){
//调用fun,依次传入当前元素值,位置i,当前数组作为参数  ，将返回值，保存在变量r中
          var r=fun(this[i],i,this);
          if(r==false){//如果r为false
             return false;//返回false
          }
          }
           }//(遍历结束)
       return true;//返回true
     }
}
```

#### some
```
if(Array.prototype.some===undefined){
     Array.prototype.some=function(fun){
        for(var i=0;i<this.length;i++){
        if(this[i]!==unefined){
          var r=fun(this[i],i,this);
              if(r==true){ return true; }
                }
            }
        return false;
     }    
  }
```

#### map
```
if(Array.prototype.map===undefined){
     Array.prototype.map=function(fun){
      //创建空数组: newArr
      var newArr=[];
      //遍历当前数组中每个元素
      for(var i=0;i<this.length;i++){
         //如果当前元素不是undefined
         if(this[i]!==undefined){//判断稀疏数组
//调用fun传入当前元素值，位置i，当前数组，将结果保存在r中
              //将newArr的i位置赋值为r
          var r=fun(this[i],i,this);
                  newArr[i]=r;
         }
      }//(遍历结束)
      return newArr;//返回newArr
     }
}
```

#### reduce
```
if(Array.prototype.reduce===undefined){
     Array.prototype.reduce=function(fun,base){
       base===undefined&&(base=0);
       for(var i=0;i<this.length;i++){
      if(this[i]!==undefined){
         base=fun(base,this[i],i,this);
      }
           }
       return base;
         }
}
```

#### bind
```
if(Function.prototype.bind===undefined){
     Function.prototype.bind=function(obj/*，参数列表*/){
      var fun=this;//留住this
              //*****将类数组对象，转化为普通数组
      var args=Array.prototype.slice.call(arguments,1);
      //args保存的就是提前绑定的参数列表
      /*function slice(1){
         var sub=[];
         for(var i=0;i<length;i++){
          sub.push(arguments[i]);
         }
         return sub;
      }*/
      return function(){
                 //将后传入的参数值，转为普通数组      
         var innerArgs=Array.prototype.slice.call(arguments);//将之前绑定的参数值和新传入的参数值，拼接为完整参数之列表
         var allArgs=args.concat(innerArgs)
        //调用原始函数fun，替换this为obj，传入所有参数
        fun.apply(obj,allArgs);
      }
     }
}
```

#### adler32
```
adler32 : function(data){
		var MOD = 65521;
		var a = 1;
		var b = 0;
		for (var i = 0; i < data.length; i++) {
			a = (a + data.charCodeAt(i)) % MOD;
			b = (b + a) % MOD;
		}
		return a | (b << 16);
}
```
