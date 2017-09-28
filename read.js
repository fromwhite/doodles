var file_path, file_size, file_tmp_size, line_obj, end_line, getLine, last_line, fs,readline;
fs = require("fs");
readline = require("readline");
file_path = "wiki";
// 如果文件存在
fs.exists(file_path, function (exists) {
    if (exists) {
        // 获取文件信息
        fs.stat(file_path, function(err, stats) {
            file_size = stats.size;//文件总字节数
            file_tmp_size = stats.size;//文件总字节数

            getLine = function() {
                file_tmp_size--;//每次减一，从后往前读

                if (file_tmp_size < 0) {//已经遍历完文件则跳出递归
                    return;
                }

                // 创建读行实例
                line_obj = readline.createInterface({
                    input: fs.createReadStream(file_path, {start: file_tmp_size, end: file_size})//创建文件流作为输入
                });

                // 监听读行
                line_obj.on('line', function(line){

                    // 一个字节一个字节读的情况下，在读最后一行的过程中，通常当前行会比上一行长度要大
                    // 只有开始读倒数第二行的第一个字节时，当前行会比上一行（文件的最后一行）长度要小
                    if ((last_line && line) && last_line.length > line.length) {

                        end_line = last_line;//我们想要的结果
                        console.log("最后一行：", end_line);
                        line_obj && line_obj.close && line_obj.close();//关闭本次读行实例

                    } else if (!end_line) {//未获得结果时

                        last_line = line || '';//将当前行作为上一行
                        line_obj && line_obj.close && line_obj.close();//关闭本次读行实例
                        getLine && getLine();//递归执行该方法

                    }

                });

            };
            getLine();

        });
    }
});