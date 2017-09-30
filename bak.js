import path from 'path';

export default {
    entry: './src/index.js',

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },

    module: {
        loaders: [
            {test: /\.js$/, loader: 'babel'}
        ]
    }
}