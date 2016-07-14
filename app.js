var router = require('./lib/router.js');
var port = 4000;

var _=require('./lib/util.js');
var handle=require('./handle.js');

router({debug:true}).setMap('**/*' , '**/*').listen(port);
//if(_.isObject(handle)) console.log('1yes');
console.log("http://127.0.0.1:"+port+"/index.html");
