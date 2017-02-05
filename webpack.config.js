
var config = {
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
            { test: /\.tsx?$/, loader: 'ts-loader' }
        ]
    }
};

module.exports = config;