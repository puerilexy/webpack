# webpack
#### webpack 是遵循commonjs
> entry
> output
> module  loader
> devServer 起服务
> plugins   
> resolve
> mode
> devtool 
#### 为了顺利配置好webpack，有如下坑点需要避免：
1. 建项目时不可用webpack命名，否则npm init 会报错
2. extract-text-webpack-plugin@next
3. 抽离css和sass时为了能生成不同的文件名，新new了ExtCssPlugin和ExtSassPlugin都需要在plugins里配置
4. 成功解析.vue的文件需要如下操作：
   npm install vue-loader vue-template-compiler -D
   loader中配置vue
   plugins中配置 new VueLoaderPlugin()
   "vue$":'vue/dist/vue.esm.js' 修改vue包文件路径

> webpack.config.js 是webpack的基本配置
> build文件夹将webpack的公共部分抽离出来(webpack.base.conf.js)，并分别配置了开发环境(webpack.dev.conf.js)和线上环境(webpack.prod.conf.js)