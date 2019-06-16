const baseConfig = require('./webpack.base.conf');

const webpackMerge = require('webpack-merge');

const webpack = require('webpack');

const config = require('../config/index');

let devConfig = {
    mode: config.dev.mode,
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ['style-loader','css-loader','sass-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: webpackMerge({
        port: config.dev.port,
        host: config.dev.host,
        hot: true
    },config.dev.devServer),
    devtool: config.dev.devtool
}

module.exports = webpackMerge(devConfig,baseConfig);