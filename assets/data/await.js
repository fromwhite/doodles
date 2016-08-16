'use strict';
var main = (function () {

  var id=Math.floor((Math.random()*1000000)+1);

  var queue = function(funcs, scope) {  
    (function next() {  
          if(funcs.length > 0) {  
              funcs.shift().apply(scope || {}, [next].concat(Array.prototype.slice.call(arguments, null)));  
          }  
    })();  
  };  

  Function.prototype.after=function(func){
    var __self=this;
    return function(){
      var ret=__self.apply(this,arguments);
      if(ret==false){
        return false;
      }
      func.apply(this,arguments);
      return ret;
    }
  };



  function start() {

      var config = {  
            value: null
          }; 

          function s1(callback){
                console.log(1);
                setTimeout(function(){
                  console.log('await:');
                  s2();
                },5000);
              }; 
          function s2(callback){
                console.log(2);
                setTimeout(function(){
                  console.log('then:');
                  s3();
                },5000)
              };
          function s3(){
                console.log(3);
              };

      queue([  
              function(callback) {  
                  var self = this;  
                  setTimeout(function() {  
                      self.value = 10;  
                      callback(20);  
                  }, 200);  
              },  
              function(callback, add) {  
                  console.log(this.value + add);  
                  callback();  
              },  
              function(callback) {  
                  console.log(config.value);
                  callback('ss');
           
              },
              function(callback,ss){
                  console.log(ss);
                  callback();
              },
              function(){
                  console.log(101010);
              } 
              
          ], config);

  }

  window.addEventListener("load", start); 
  return {};
  
}());