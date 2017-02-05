const Webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
    entry: './src/index.tsx',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist/js'
    },

    resolve: {
        extensions: [
            '',
            '.webpack.js',
            '.web.js',
            '.ts',
            '.tsx',
            '.js'
        ]
    },
    module: {
        loaders: [

            { test: /\.tsx?$/, loader: 'ts-loader' },
            {
                test: /\.scss$/,
                loaders: ExtractTextPlugin.extract('css!sass')
            }
        ]
    },
    plugins: [
        new Webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin({
            filename: 'dist/style.css',
            allChunks: true
        })
    ]
};

module.exports = config;