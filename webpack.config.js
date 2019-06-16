const path = require('path');
// ********以下是plugins中的配置***********
// 安装extract-text-webpack-plugin@next 然后引入
const ExtractText = require('extract-text-webpack-plugin');
// 生成模板文件 install ->require->plugins中new
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 代码打包压缩
const Uglifyjs = require('uglifyjs-webpack-plugin');
// 将配置的loader一并应用的vue文件中，这个require路径在下载的vue-loader文件的lib文件夹中可查到
// 在plugins中new
const VueLoaderPlugin = require('vue-loader/lib/plugin');
//抽离css文件，并生成文件为style.css
const ExtCssPlugin = new ExtTextPlugin('style.css');
//抽离sass文件，并生成文件sass.css
const ExtSassPlugin = new ExtTextPlugin('sass.css');
// 引入webpack是配合模块热更新
const webpack = require('webpack');
// 打包生成dist文件前删除dist文件夹
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: { // entry: 入口起点，告诉webpack应该使用哪个模块  string|array|object
        index: './src/js/index.js',
        detail: './src/js/detail.js'
    },
    output: { // output: 出口,默认'./dist'
        filename: 'js/[name].[hash].js',
        path: path.resolve(__dirname, './dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,  // test值为正则,切记不能加引号
                use: {
                    loader: 'babel-loader',   //es6 --> es5
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: ['style-loader','css-loader','sass-loader']
                // use: ExtractText.extract({
                //     fallback: 'style-loader',
                //     use: ['css-loader', 'sass-loader']
                // })
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
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
                        name: 'imgs/[name].[ext]',
                        publicPath: '/'
                    }
                }
            }
        ]
    },
    plugins: [ // 插件
        new CleanWebpackPlugin('./dist'), 
        new ExtractText({
            filename: 'css/[name].css'
        }),
        // 模板文件
        new HtmlWebpackPlugin({
            chunks: ['index'],
            filename: 'index.html',
            template: './src/index.html',
            title: '首页'
        }),
        new Uglifyjs(),
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin(),   //模块热更新
        ExtCssPlugin,
        ExtSassPlugin
    ],
    devServer: { // 起服务
        host:'localhost', // 域名
        port: 9090, // 端口号
        open: true, // 为true时自动打开浏览器
        before(app){
            app.get('/api/getList',function(req, res){
                res.end(JSON.stringify({code: 1,data: 'success'}))
            })
        },
        proxy: { // 将请求代理到localhost:3000
            '/classify': 'http://localhost:3000'
        },
        hot: true
    },
    devtool:'cheap-module-eval-source-map',
    resolve:{
        alias:{ // 配置别名
            '@':path.resolve(__dirname,'./src/scss'), 
            'indSass$':path.resolve(__dirname,'./src/scss/index.scss')
        },
        extensions: [".js", ".scss"]  // 自动匹配有此后缀名的文件
    }
}