/*  
*   router(config).listen(port) config两个参数debug默认true setMap设置文档路径 默认asstes
*   router({debug:true,setMap:'asstes'}).listen(port);
*/

"use strict";
var http = require('http');
var fs = require("fs");
var url = require("url");
var events = require("events");
var util = require("util");
var path = require("path");
var zlib = require("zlib");

var mimes=  {
  "css": "text/css",
  "gif": "image/gif",
  "html": "text/html",
  "ico": "image/x-icon",
  "jpeg": "image/jpeg",
  "jpg": "image/jpeg",
  "js": "text/javascript",
  "json": "application/json",
  "pdf": "application/pdf",
  "png": "image/png",
  "svg": "image/svg+xml",
  "swf": "application/x-shockwave-flash",
  "tiff": "image/tiff",
  "txt": "text/plain",
  "wav": "audio/x-wav",
  "wma": "audio/x-ms-wma",
  "wmv": "video/x-ms-wmv",
  "xml": "text/xml"
};

var cache = {};

//logger.log('服务启动，监听' + logger.color(port, 'green') + '端口中...');
var COLORS = {
      black:   30,
      red:     31,
      green:   32,
      yellow:  33,
      blue:    34,
      magenta: 35,
      cyan:    36,
      white:   37,
      gray:    90
    };
//logger.debug('路由转换： ' + filepath + '\n');
var logger = {
    log: function(){
        if(process.env.NODE_ENV !== 'test') {
            console.log.apply(console, arguments)
        }
    },

    debug: function(){
        var args = [].slice.call(arguments);
        var msg = '[DEBUG] ' + (args.shift() || '');

        if(process.env.NODE_DEBUG) {
            this.log.apply(this, [msg].concat(args));
        }
    },

    color: function(str, type){
        str = (str + '').replace(/\x1B\[\d+m/g, '');

        var color = COLORS[type];

        if (!color) return str;

        return '\x1B[' + color + 'm' + str + '\x1B[0m';
    }
}


var Router = function (config) {
    if (!(this instanceof Router))
        return new Router(config);
    this._init(config);
};

util.inherits(Router, events.EventEmitter);
var c = Router.prototype;

c._init = function(config){
    config = config || {};
    this.methods = {};
    
    var defaults = {
        root: './assets',   // 项目根目录
        maps: 'index.html', // 默认索引
        debug: true,       // 如果开启debug模式，则进入自动检索当前目录文件模式
        useZlib: true,      // 是否使用gzip压缩
        useCache: false,    // 如果设为true，则使用http缓存
        maxCacheSize: 0.5   // 凡是小于maxCacheSize的资源将以文件内容的md5值作为Etag，单位为MB
    }

    for (var key in defaults) {
        this[key] = config.hasOwnProperty(key)
        ? config[key]
        : defaults[key];
    }
    
    return this;
}

c.listen = function(port, callback) {
  var that = this;
  var server = http.createServer(function(req, res) {
    //引导路由
    that.route(req, res);
  });

  server.on('error', function(err) {
    if (callback && typeof callback == 'function') {
      callback.apply(that, arguments);
    } else {
      throw new Error(err);
    }
  });

  if (port) {
    server.listen(port);

    server.on('listening', function() {
      port = server.address().port;

      logger.log('服务启动，监听' + logger.color(port, 'green') + '端口中...');

      if (process.send) {
        process.send({ port: port }); // 如果与父进程建立了通信, 则通知父进程, 最终监听的端口号
      }
    });
  }

  return this.server = server;
}

c.route = function (request, response) {
    var that = this;
    var urlobj = url.parse(request.url);
    var pathname = urlobj.pathname;

    response.setHeader("Server","Node/V8");
    if(pathname.slice(-1) === "/"){
        pathname = pathname + that.maps;   //默认取当前默认下的index.html
    }
   
    var realPath = path.join(that.root, path.normalize(pathname.replace(/\.\./g, "")));
    logger.debug(realPath)
    var pathHandle=function(realPath){
        //用fs.stat方法获取文件
        fs.stat(realPath,function(err,stats){
            if(err){
                response.writeHead(404,"not found",{'Content-Type':'text/plain'});
                response.write("the request "+realPath+" is not found");
                response.end();
            }else{
                if(stats.isDirectory()){
                }else{
                    var ext = path.extname(realPath);
                    ext = ext ? ext.slice(1) : 'unknown';
                    var contentType = mimes[ext] || "text/plain";
                    response.setHeader("Content-Type", contentType);
                    var lastModified = stats.mtime.toUTCString();
                    var ifModifiedSince = "If-Modified-Since".toLowerCase();
                    response.setHeader("Last-Modified", lastModified);
                    if (ext.match(/^(gif|png|jpg|js|css)$/ig)) {
                        var expires = new Date();
                        expires.setTime(expires.getTime() + 60 * 60 * 24 * 365 * 1000);
                        response.setHeader("Expires", expires.toUTCString());
                        response.setHeader("Cache-Control", "max-age=" + config.Expires.maxAge);
                    }
                    if (request.headers[ifModifiedSince] && lastModified == request.headers[ifModifiedSince]) {
                        console.log("从浏览器cache里取")
                        response.writeHead(304, "Not Modified");
                        response.end();
                    } else {
                        var raw = fs.createReadStream(realPath);
                        var acceptEncoding = request.headers['accept-encoding'] || "";
                        var matched = ext.match(/css|js|html/ig);
                        if (matched && acceptEncoding.match(/\bgzip\b/)) {
                            response.writeHead(200, "Ok", {'Content-Encoding': 'gzip'});
                            raw.pipe(zlib.createGzip()).pipe(response);
                        } else if (matched && acceptEncoding.match(/\bdeflate\b/)) {
                            response.writeHead(200, "Ok", {'Content-Encoding': 'deflate'});
                            raw.pipe(zlib.createDeflate()).pipe(response);
                        } else {
                            response.writeHead(200, "Ok");
                            raw.pipe(response);
                        }
                    }
                }
            }
        });
    }
    pathHandle(realPath);
}

module.exports = Router;