const   path = require('path');
const   webpack = require('webpack');
const   ExtractTextPlugin = require('extract-text-webpack-plugin');
const   HtmlWebpackPlugin = require('html-webpack-plugin');

let DEV = process.env.NODE_ENV === 'DEV'; //开发
let PROD = process.env.NODE_ENV === 'PROD'; //生产

//项目
const 
    chname='street',
    chdescription='canvas绘制测试(canvas,canvas buffer,webgl 2d)'
;

let entry = PROD 
    ?   {
        street:'./src/'+ chname +'.js'
    }
    :   [
        './src/'+ chname +'.js',
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server'
    ];

let plugins = PROD
    ?   [
        new webpack.optimize.UglifyJsPlugin({
            //comments: true,
            //mangle: false,
            compress: {
                warnings: false
            }
        }),
        //new ExtractTextPlugin('css/[name].css'),
        new HtmlWebpackPlugin(
            {
                filename: "app/"+ chname +".html",
                title: chname,
                description:chdescription,
                template: 'tpl/canvas.html'
            }
        ),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        })
    ]
    :   [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            DEVELOPMENT: JSON.stringify(DEV),
            PRODUCTION: JSON.stringify(PROD)
        }),
        new HtmlWebpackPlugin(
            {
                filename: "index.html",
                title: chname,
                description:chdescription,
                template: 'tpl/canvas.html'
            }
        )
    ];



module.exports = {
    devtool: "source-map",
    //入口文件
    entry: entry,
    //输出打包的文件
    output: {
        //打包文件名
        filename: 'build/[name].js',
        //bundle.js输出路径,是一个绝对路径
        path: path.join(__dirname),
        //在html页面中需要的导入资源的路径
        chunkFilename: "build/[name].js"
    },
    plugins: plugins,
    module: {
        loaders:[
            {
                test: /(\.js$|\.jsx$)/,
                exclude: '/node_modules/',
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.(jpg|gif|png)$/,
                exclude: '/node_modules/',
                // loader: 'file-loader'
                loader: 'url-loader?limit=512&name=[path][name].[ext]?[hash]'
            },
            // {
            //     test: /\.css$/,
            //     exclude: '/node_modules/',
            //     loader: cssLoader
            // }
        ]
    },
    resolve:{
        modules: [
            "node_modules",
            path.join(__dirname, "src")
        ],
        extensions: [".js", ".json", ".jsx", ".css", ".gif"],
    },
    devServer: {
        hot: true,
        publicPath: '/',
        stats: {
            colors: true
        },
        
    },
    performance: {
        hints: false
    }
};