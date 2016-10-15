var http=require('http')
var fs=require('fs')
var server=new  http.Server()
server.listen(8000)

server.on('request',function(req,res){
    //console.dir("req"+req.url)
    var url=require('url').parse(req.url)

    //console.dir("res"+res)
    if(url.pathname==='/test/delay'){
        var delay=parseInt(url.query)||2000
        res.writeHead(200,{"Content-Type":"text/plain;charset=UTF-8"})
        res.write("Sleeping for "+delay+"milliseconds....")
        setTimeOut(function(){
            res.write("done.")
            res.end()
        },delay)
    }
    else if(url.pathname==="/test/mirror"){
        res.writeHead(200,{"Content-Type":"text/plain;charset=UTF-8"})
        res.write(req.method+""+req.url+"HTTP/"+req.httpVersion+"\r\n")
        for(var h in req.headers){
            res.write(h+":"+req.headers[h]+'\r\n')
        }
        res.write("\r\n")
    }
    else{
        var filename=url.pathname.substring(1)
        console.log("pathname:"+url.pathname)
        console.log("filenamee:"+filename)
        var type
        switch(filename.substring(filename.lastIndexOf(".")+1)){
            case "html":
            case "htm":type="text/html; charset=UTF-8";break
            case"js":type="application/javascript;charset=UTF-8";break
            case"css":type="text/css; charset=UTF-8";break
            case"txt":type="text/plain; charset=UTF-8";break
            case "manifest":type="text/cache-manifest; charset=UTF-8";break
            default :type="application/octet-stream;charset=UTF-8";break
        }
        fs.readFile(filename,function(err,content){
            if(err){
                res.writeHead(404,{
                    "content-Type":"text/plain;charset=UTF-8"
                })
                res.write(err.message)
                res.end()
            }
            else{
                res.writeHead(200,{
                    "content-Type":type
                })
                res.write(content)
                res.end()
            }
        })
    }
})