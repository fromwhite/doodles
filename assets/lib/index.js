var http=require('https');
var url='https://movie.douban.com/top250';
//var url='http://caipiao.163.com/award/'

http.get(url,function(res){
    var html=[];
    res.on('data',function(data){
        html.push(data);
    })
    res.on('end',function(){
        //html=Buffer.concat(html);
        html=Buffer.toString(html);
        console.log(html);
    })
}).on('error',function(error){
    console.log(error);
})