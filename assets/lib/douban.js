var http = require('https');
var cheerio = require('cheerio');
var url = 'https://movie.douban.com/top250?start=0';
var start=0;
function fliterhtml(html){
var $ = cheerio.load(html);
var stars = $('.item');
var anws =[];
stars.each(function(item){
var star = $(this);
var stitle = star.find('.title').text();
var fen = star.find('.rating_num').text();
var stitleData = {
            stitle : stitle,
            fen:fen
        }
anws.push(stitleData);
    })
return anws;
}
function printanwsinfo(anws){
var i=1;
anws.forEach(function(item){
var stitle = item.stitle;
var fen = item.fen;
console.log(stitle);
        i++
    })
    start += 25;
if(start<250)
    {
        url = 'https://movie.douban.com/top250?start=' + start;
again();
    }
}
function again() {
http.get(url, function (res) {
var html = '';
res.on('data', function (data) {
            html += data;
        })
res.on('end', function () {
var anws = fliterhtml(html);
printanwsinfo(anws);
        })
    }).on('error', function () {
console.log('error!!!')
    })
}
again();