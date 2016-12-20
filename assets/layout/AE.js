//////////////////////////////////////////////////////////////////////
// animate queue AE          HTML5/CSS3 & tween                     //
// api:   transform  transitionend   animationend                   //
// Dec.18 2016 vinc                                                 //
//////////////////////////////////////////////////////////////////////


var AE = new function(){
    var config = {};
    var queue = function(funcs, scope) {  
        (function next() {  
          if(funcs.length > 0) {  
              funcs.shift().apply(scope || {}, [next].concat(Array.prototype.slice.call(arguments, null)));  
          }  
        })();  
    };
    
//    // Create the fragment
//    var dom = document.createDocumentFragment();
//    var arr = [].slice.call(dom);
//
//    //add this DOM to body
//    document.body.appendChild(spanNode);
    
    //transform、transitionend、animationend
    //获取浏览器前缀
    var vendor = function () {
      // 使用body是为了避免在还需要传入元素
      var body = document.body || document.documentElement,
            style = body.style,
            vendor = ['webkit', 'khtml', 'moz', 'ms', 'o'],
            transition="transition",
            transitionEnd,
            animationEnd,
            vendorPrefix; 
         
            transition=transition.charAt(0).toUpperCase() + transition.substr(1);
            i = 0;

              while (i < vendor.length) {
                // 此处进行判断是否有对应的内核前缀
                if (typeof style[vendor[i] + 'Transition'] === 'string') {
                  return "-" + vendor[i] + "-";
                }
                i++;
              }
        
    }()
    
    
    //
    
    
}