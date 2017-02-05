const Webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
    entry: './src/index.tsx',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist'
    },

    resolve: {
        extensions: [
            '.webpack.js',
            '.web.js',
            '.ts',
            '.tsx',
            '.js',
            '.scss',
            '.css'
        ],
        alias: {
            jquery: "jquery/src/jquery"
        }
    },
    module: {
        loaders: [

            { test: /\.tsx?$/, loader: 'ts-loader' },
            {
                test: /\.scss$/,
                loaders: ExtractTextPlugin.extract( {
                    fallback: 'style-loader',
                    use: 'css-loader!sass-loader'
                })
            }
        ]
    },
    plugins: [
        new Webpack.optimize.UglifyJsPlugin(),
        new Webpack.optimize.OccurrenceOrderPlugin(),
        new ExtractTextPlugin({
            filename: 'style.css',
            allChunks: true
        })
    ]
};

module.exports = config;