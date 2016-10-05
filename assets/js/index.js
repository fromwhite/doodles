var http=require('https');
var url='https://movie.douban.com/top250';

http.get(url,function(res){
    var html='';
    res.on('data',function(data){
        html+=data;
    })
    res.on('end',function(){
        console.log(html);
    })
}).on('error',function(error){
    console.log(error);
})