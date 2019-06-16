const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './src/js/index.js'
    },
    output: {
        filename: 'js/[name].[hash].js',
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',   //es6 --> es5
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 1234,
                        name: 'css/[name].[ext]',
                        publicPath: '/'
                    }
                }
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: ['img:src']
                    }
                }
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 1234,
                        name: 'imgs/[name].[hash].[ext]',
                        publicPath: '/'
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            chunks: ['index'],
            filename: 'index.html',
            template: './src/index.html',
            title: '首页'
        }),
    ],
    resolve:{
        alias:{
            '@':path.resolve(__dirname,'../src/scss'),
            'indSass$':path.resolve(__dirname,'../src/scss/index.scss')
        },
        extensions: [".js", ".scss"]
    }
}