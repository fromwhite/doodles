const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let DEV = process.env.NODE_ENV === 'DEV'; //开发
let PROD = process.env.NODE_ENV === 'PROD'; //生产

// 任务描述 @name @description @template
const works = {
    sprite_stage: {
        name: 'sprite_stage',
        description: 'webgl2d Stage渲染',
        template: 'template.html',
        vendor: 'stage'
    },
    sprite_canvas:{
        name: 'sprite_canvas',
        description: 'canvas随机图片',
        template: 'template.html'
    },
    webgl2d:{
        name:"webgl2d",
        description:'webgl2d glsl渲染图片',
        template: 'template.html',
        vendor:'glsl'
    }
}
// 设定本任务 和入口文件
let task = works['sprite_stage'];
//let task = works['webgl2d']

let entry = PROD ? {
    // 'sprite': './src/' + task.name + '.js',
} : [
    './src/' + task.name + '.js',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server'
];

let plugins = PROD ? [
    new webpack.optimize.UglifyJsPlugin({
        //comments: true,
        //mangle: false,
        compress: {
            warnings: false
        }
    }),
    new HtmlWebpackPlugin({
        filename: "app/" + task.name + ".html",
        title: task.name,
        description: task.description,
        template: 'assets/' + task.template
    }),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('PROD'),
        },
    })
] : [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
        DEVELOPMENT: JSON.stringify(DEV),
        PRODUCTION: JSON.stringify(PROD)
    }),
    new HtmlWebpackPlugin({
        filename: "index.html",
        title: task.name,
        description: task.description,
        template: 'assets/' + task.template
    })
];

// 补充 CommonsChunk 依赖
if (PROD) {
    entry[task.name] = `./src/${task.name}.js`
    if(task.vendor){
    entry[task.vendor] = task.vendor;
    plugins.push(
        // 抽取 webpack loader 剥离 webpackJson 冗余
        new webpack.optimize.CommonsChunkPlugin({
            name: [task.name, task.vendor,'manifest'],
            minChunks: Infinity
        })
    )}
}

module.exports = {
    devtool: "source-map",
    entry: entry,
    output: {
        filename: 'build/[name].js',
        path: path.join(__dirname),
        chunkFilename: "build/[name].js",
        // library:task.vendor,
        // libraryTarget: "umd"
    },
    // externals: {
    //     stage:'stage'
    // },
    plugins: plugins,
    module: {
        loaders: [{
                test: /(\.js$|\.jsx$)/,
                exclude: '/node_modules/',
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', "stage-3"]
                }
            },
            {
                test: /\.(jpg|gif|png)$/,
                exclude: '/node_modules/',
                // loader: 'file-loader'
                loader: 'url-loader?limit=50000'
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            }
        ]
    },
    resolve: {
        modules: [
            path.resolve('./src'),
            path.resolve('./src/stage'),
            path.resolve('./node_modules')
        ],
        extensions: [".js", ".json", ".jsx", ".css", ".gif"],
    },
    devServer: {
        hot: true,
        publicPath: '/',
        stats: {
            colors: true
        },
        open: true
    },
    performance: {
        hints: false
    }
};