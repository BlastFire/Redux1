var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        bundle: [
            path.resolve(__dirname, './main.js')
        ]
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
};