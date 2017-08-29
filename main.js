#!/usr/bin/env node


const   http = require("http"),
        url  = require("url"),
        fs   = require("fs"),
        path = require("path"),
        zlib = require("zlib"),
        c = require('child_process');

const port  = parseInt(process.argv[2] || 8888, 10);
const server = require('./servlet.js');

const base = './';

// build menu
const files = fs.readdirSync(base);
// 对文件夹更改进行排序
files.sort(function(a, b) {
  let astat = fs.lstatSync(base + a);
  let bstat = fs.lstatSync(base + b);

  return bstat.mtime - astat.mtime;
});

let html = fs.readFileSync('./index.html').toString();

let ul_html = '<div class="main">';

const mlList = ['src'];


// 添加列表内容
mlList.forEach(function(f) {
    let npath = path.join(base, f);
    let array = findHtml(npath);

  array.sort(function(a, b) {
        return b[2].mtime - a[2].mtime
  });

  if (array.length > 0) {
    
        ul_html += `<ul class='list'>`;
        function setDate(){
            return +new Date()
        }
        array.forEach(function(p) {
            const title = /<title>(.*)<\/title>/.test(fs.readFileSync(p[0]).toString()) ? RegExp.$1 : 'Document';
            const tiAtl = /<meta name="description" content="(.*)" \/>/.test(fs.readFileSync(p[0]).toString()) ? RegExp.$1 : 'Null';

            ul_html += `<li><a href='${p[0]}?${setDate()}' target='_blank'>${tiAtl}</a></li>`;
        });

        ul_html += '</ul>';
    }
});

ul_html += '</div>';
html = html.replace(/(<body>)[\s\S]*?(<\/body>)/, '$1' + ul_html + '$2');

fs.writeFileSync('./index.html', html);


//打开浏览器
let cmd = null;
if (process.platform == 'win32') {
    cmd = 'start';
} else if (process.platform == 'linux') {
    cmd = 'xdg-open';
} else if (process.platform == 'darwin') {
    cmd = 'open';
}

cmd && c.exec (cmd + ' ' + 'http://localhost:' + port + '/' );


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