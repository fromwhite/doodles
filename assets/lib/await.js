'use strict';
var main = (function () {
    var EPSILON = 1.0 / 1048576.0;
    var id = ~~(Math.random()*(1<<24)));

    var queue = function(funcs, scope) {  
        (function next() {  
          if(funcs.length > 0) {  
              funcs.shift().apply(scope || {}, [next].concat(Array.prototype.slice.call(arguments, null)));  
          }  
        })();  
    };  

    function start() {

      var config = {  
            value: null
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
  
})();