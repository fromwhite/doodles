var router=require('./router.js')
var port = 4000;

router({debug:true,setMap:'asstes'}).listen(port);
console.log("http://127.0.0.1:"+port+"/index.html");
