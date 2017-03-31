const Webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');


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
            '.css',
            '.ttf',
            '.dtd',
            '.svg',
            '.eot',
            '.woff2',
            '.woff'
        ],
        alias: {
            jquery: 'jquery/src/jquery'
        }
    },
    module: {

        loaders: [

            { test: /\.tsx?$/, loader: 'ts-loader' },
            {
                test: /\.(ttf|svg|eot)$/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[hash].[ext]',
                }
            },
            {
                test: /\.woff2?$/,
                loader: 'url-loader',
                options: {
                    name: 'fonts/[hash].[ext]',
                    limit: 50000,
                    mimetype: 'application/font-woff',
                },
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.scss$/,
                loaders: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!sass-loader'
                })
            }
        ],

    },
    plugins: [
        new Webpack.optimize.AggressiveMergingPlugin(),
        new Webpack.optimize.OccurrenceOrderPlugin(),
        new Webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                dead_code: true,
                unused: true,
                drop_console: true,
                drop_debugger: true,                
                booleans: true,
                sequences: true,
                conditionals: true
            }
        }),
        new ExtractTextPlugin({
            filename: 'style.css',
            allChunks: true
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/
        })
    ]
};

module.exports = config;