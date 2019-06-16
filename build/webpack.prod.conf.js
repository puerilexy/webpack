const baseConfig = require('./webpack.base.conf');

const webpackMerge = require('webpack-merge');

const ExtractText = require('extract-text-webpack-plugin');

const cleanWebpackPlugin = require('clean-webpack-plugin');

let prodConfig = {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractText.extract({
                    fallback: 'style-loader',
                    use: ['css-loader','sass-loader']
                })
            },
            {
                test: /\.css$/,
                use: ExtractText.extract({
                    fallback: 'style-loader',
                    use: ['css-loader']
                })
            }
        ]
    },
    plugins: [
        new cleanWebpackPlugin('./dist'),
        new ExtractText({
            filename: 'css/[name].css'
        })
    ]
}

module.exports = webpackMerge(prodConfig,baseConfig)