#!/usr/bin/env node

const   webpack = require('webpack');
const   webpackDevMiddleware = require("webpack-dev-middleware");
const   WebpackDevServer = require('webpack-dev-server');
const   config = require("./webpack.config.js");

//after building => ci
const   http    = require("http"),
        url     = require("url"),
        fs      = require("fs"),
        path    = require("path"),
        zlib    = require("zlib"),
        c       = require('child_process');
const   port    = parseInt(process.argv[2] || 8080, 10);


let DEV = process.env.NODE_ENV === 'DEV'; //开发模式
let PROD = process.env.NODE_ENV === 'PROD'; //生产

let entry = {
    
}


Object.assign(config, {
    devServer: {
      hot: true,
      inline: true
    }
});

webpack(config, (err, stats) => {
    //处理webpack本身的error
    if (err) return console.error(err.stack || err);

    const info = stats.toJson();
    //处理代码编译中产生的error
    if (stats.hasErrors()) {
        console.error(info.errors);
    }
    //处理代码编译中产生的warning
    if (stats.hasWarnings()) {
        console.warn(info.warnings)
    }

    console.log('Done processing.');


//dev
DEV && function(){
    console.log('dev..');
}();

//release
PROD && function(){

    var compiler = webpack(config);

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

    //server
    var server = new WebpackDevServer(compiler, {
        hot: true,
        publicPath: '/',
        //inline: true,
        // stats: {
        //     colors: true
        // },
        stats: "errors-only" 
    });
    server.listen(8080,'localhost', () => {
        console.log('dev server listening on port 8080');
    });



    let cmd = null;
    if (process.platform == 'win32') {
        cmd = 'start';
    } else if (process.platform == 'linux') {
        cmd = 'xdg-open';
    } else if (process.platform == 'darwin') {
        cmd = 'open';
    }
    cmd && c.exec (cmd + ' ' + 'http://localhost:' + port + '/' );

    console.log('release');
}();


//lsof -i:8080 => pkill node
process.on('SIGINT', function () {
    console.log("Closing things");
    process.exit(0);
})


});