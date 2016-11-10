/**
 * User: vinc
 * Date: 2015 11 9
 * Time: 18:12
 * To change this template use File | Settings | File Templates.
 */
const port=4000;
const http = require("http");
const url  = require("url");
const fs   = require("fs");
const path = require("path");
const zlib = require("zlib");

const c = require('child_process');
const base = 'assets/';

const mime = {
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

const config = {
    Expires:{
        fileMatch: /^(gif|png|jpg|js|css)$/ig,
        maxAge: 60 * 60 * 24 * 365
    },
    Compress:{
        match: /css|js|html/ig
    },
    filename:{
        file: "index.html"
    }
}


//创建http服务端
let server=http.createServer(function(request,response){
    let obj= url.parse(request.url);
    response.setHeader("Server","Node/V8");
    //console.log(obj);
    let pathname=obj.pathname;
    if(pathname.slice(-1)==="/"){
        pathname=pathname+config.filename.file;   //默认取当前默认下的index.html
    }
    let realPath = path.join("./", path.normalize(pathname.replace(/\.\./g, "")));
    //console.log(realPath) ;
    let pathHandle=function(realPath){
    //用fs.stat方法获取文件
        fs.stat(realPath,function(err,stats){
            if(err){
                response.writeHead(404,"not found",{'Content-Type':'text/plain'});
                response.write("the request "+realPath+" is not found");
                response.end();
            }else{
                if(stats.isDirectory()){
                }else{
                    let ext = path.extname(realPath);
                    ext = ext ? ext.slice(1) : 'unknown';
                    let contentType = mime[ext] || "text/plain";
                    response.setHeader("Content-Type", contentType);
                    let lastModified = stats.mtime.toUTCString();
                    let ifModifiedSince = "If-Modified-Since".toLowerCase();
                    response.setHeader("Last-Modified", lastModified);
                    if (ext.match(config.Expires.fileMatch)) {
                        let expires = new Date();
                        expires.setTime(expires.getTime() + config.Expires.maxAge * 1000);
                        response.setHeader("Expires", expires.toUTCString());
                        response.setHeader("Cache-Control", "max-age=" + config.Expires.maxAge);
                    }
                    if (request.headers[ifModifiedSince] && lastModified == request.headers[ifModifiedSince]) {
                        console.log("从浏览器cache里取")
                        response.writeHead(304, "Not Modified");
                        response.end();
                    } else {
                        let raw = fs.createReadStream(realPath);
                        let acceptEncoding = request.headers['accept-encoding'] || "";
                        let matched = ext.match(config.Compress.match);
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
});

// build menu
const files = fs.readdirSync(base);
// 对文件夹更改进行排序
files.sort(function(a, b) {
  let astat = fs.lstatSync(base + a);
  let bstat = fs.lstatSync(base + b);

  return bstat.mtime - astat.mtime;
});


const pagePreFix = '';
const sourcePrefix = 'https://github.com/shui14/notes/tree/master/';

let html = fs.readFileSync('./index.html').toString();

let ul_html = '<div class="view">';
let md_value = '| 标题 |  |\n| :-------- | :--------:|\n';

const mlList = [
    'layout',
    'JsCV'
];

// 添加列表内容
mlList.forEach(function(f) {
    let npath = path.join(base, f);
    let array = findHtml(npath);

  array.sort(function(a, b) {
        return b[2].mtime - a[2].mtime
  });

  if (array.length > 0) {
        ul_html += `<p>${f}</p><ul class='main'>`;

        array.forEach(function(p) {
        const title = /<title>(.*)<\/title>/.test(fs.readFileSync(p[0]).toString()) ? RegExp.$1 : 'Document';

        const address = pagePreFix + p[0];
        const filedir = path.dirname(sourcePrefix + p[0]);

        ul_html += `<li>
                        <a href='${p[0]}' target='_blank' class='demo-name' title='效果预览'>${title}</a><a href='${filedir}' class='demo-source' target='_blank' title='点击查看源码'>源码</a>
                    </li>
        `;
    });

    ul_html += '</ul>';
  }
});

ul_html += '</div>';
html = html.replace(/(<body>)[\s\S]*?(<\/body>)/, '$1' + ul_html + '$2');

fs.writeFileSync('./index.html', html);
//fs.writeFileSync('./README.md', readme);
server.listen(port);
console.log("http server run in port:"+port);


//打开浏览器
let cmd;
if (process.platform == 'win32') {
    cmd = 'start';
} else if (process.platform == 'linux') {
    cmd = 'xdg-open';
} else if (process.platform == 'darwin') {
    cmd = 'open';
}

function copen (url) {
  c.exec( cmd + ' ' + url );
};
copen('http://localhost:4000/');


function findHtml(folder_path, collector) {
    collector = collector || [];

    let files = fs.readdirSync(folder_path += '/');
    let npath, stat;

    files.forEach(function(f) {
    npath = folder_path + f;
    stat = fs.lstatSync(npath);

    if (stat.isDirectory()) {
        findHtml(npath, collector);
        return;
    }

    if (/^[^_].+\.html/.test(f)) {
        collector.push([npath, f, stat]);
    }
  });

  return collector;
}

