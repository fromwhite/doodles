#!/usr/bin/env node


const   http = require("http"),
        url  = require("url"),
        fs   = require("fs"),
        path = require("path"),
        zlib = require("zlib"),
        c = require('child_process');

const port  = parseInt(process.argv[2] || 8888, 10);
const server = require('./server.js');

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

const mlList = ['app'];


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
        function getColor(){
            var color = ['#87C4A3','#EF9F64','#9B7FE6','#E794AE','#F4696B','#63C5AB','#F4C3C5','#FEC54F','#98BFF6','#de89ac','#9B7AD5','#FD9372','#ccc5e3','#F68F6F','#3CCAD1','#DFBC94','#FDACB4','#FDACB4','#79BBB5','#A0CADB','#a09de5','#785ebb','#84A5DD'];
            var r = Math.floor(Math.random()*color.length);
            return color[r];
        }
        array.forEach(function(p) {
            const title = /<title>(.*)<\/title>/.test(fs.readFileSync(p[0]).toString()) ? RegExp.$1 : 'Document';
            const tiAtl = /<meta name="description" content="(.*)" \/>/.test(fs.readFileSync(p[0]).toString()) ? RegExp.$1 : 'Null';

            ul_html += `<li><a href='${p[0]}?${setDate()}' style='color:${getColor()}' target='_blank'>${tiAtl}</a></li>`;
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