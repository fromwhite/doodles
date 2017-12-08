const   path = require('path');
const   webpack = require('webpack');
const   ExtractTextPlugin = require('extract-text-webpack-plugin');
const   HtmlWebpackPlugin = require('html-webpack-plugin');

let DEV = process.env.NODE_ENV === 'DEV'; //开发
let PROD = process.env.NODE_ENV === 'PROD'; //生产

//项目描述 @_name @_description @template
const 
    _name='sprite',
    _description='canvas2d精灵动画'
;

let entry = PROD 
    ?   {
        sprite:'./src/'+ _name +'.js',
        stage:['stage']
    }
    :   [
        './src/'+ _name +'.js',
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
                filename: "app/"+ _name +".html",
                title: _name,
                description:_description,
                template: 'assets/canvas_tpl.html'
            }
        ),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
        //common
        new webpack.optimize.CommonsChunkPlugin({
            name:['stage'],
            minChunks:Infinity
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
                title: _name,
                description:_description,
                template: 'assets/canvas_tpl.html'
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
            //"node_modules",
            //path.join(__dirname, "src"),
            path.resolve('./src'),
            path.resolve('./src/util'),
            path.resolve('./node_modules')
        ],
        extensions: [".js", ".json", ".jsx", ".css", ".gif"],
    },
    devServer: {
        hot: true,
        publicPath: '/',
        stats: {
            colors: true
        }
    },
    performance: {
        hints: false
    }
};