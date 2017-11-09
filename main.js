#!/usr/bin/env node

const   http    = require("http"),
        url     = require("url"),
        fs      = require("fs"),
        path    = require("path"),
        zlib    = require("zlib"),
        c       = require('child_process');

const   port    = parseInt(process.argv[2] || 8888, 10);
const   server  = require('./server.js');

const   base    = './app/';
const   color   = ['#87C4A3','#EF9F64','#9B7FE6','#E794AE','#F4696B','#63C5AB','#F4C3C5','#FEC54F','#98BFF6','#de89ac','#9B7AD5','#FD9372','#ccc5e3','#F68F6F','#3CCAD1','#DFBC94','#FDACB4','#FDACB4','#79BBB5','#A0CADB','#a09de5','#785ebb','#84A5DD'];
const   files   = fs.readdirSync(base);

files.sort(function(a, b) {
    let astat = fs.lstatSync(base + a);
    let bstat = fs.lstatSync(base + b);
    return bstat.mtime - astat.mtime;
});

let html = fs.readFileSync('./index.html').toString();
let ul_html = '<div class="main"><ul class="list">';

files.forEach(function(f) {
    let npath = path.join(base, f);

    if (/^[^_].+\.html/.test(f)) {
    
        //const title = /<title>(.*)<\/title>/.test(fs.readFileSync(path.join(base,f)).toString()) ? RegExp.$1 : 'Document';
        const title = /<meta name="description" content="(.*)" \/>/.test(fs.readFileSync(path.join(base,f)).toString()) ? RegExp.$1 : 'Null';

        ul_html += `<li><a href='${path.join(base,f)}?${+new Date()}' style='color:${color[Math.floor(Math.random()*color.length)]}' target='_blank'>${title}</a></li>`;
    }
});

ul_html += '</ul></div>';
html = html.replace(/(<body>)[\s\S]*?(<\/body>)/, '$1' + ul_html + '$2');
fs.writeFileSync('./index.html', html);


let cmd = null;
if (process.platform == 'win32') {
    cmd = 'start';
} else if (process.platform == 'linux') {
    cmd = 'xdg-open';
} else if (process.platform == 'darwin') {
    cmd = 'open';
}
cmd && c.exec (cmd + ' ' + 'http://localhost:' + port + '/' );