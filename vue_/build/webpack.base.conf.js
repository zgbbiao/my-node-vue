var path = require('path');
var utils = require('./utils');
var config = require('../config');
var vueLoaderConfig = require('./vue-loader.conf');

// 获取绝对路径
function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

var src = path.resolve(__dirname, '../src');

/*
配置webpack编译入口
配置webpack输出路径和命名规则
配置模块resolve规则
配置不同类型模块的处理规则
*/
module.exports = {
    entry: {
        app: './src/main.js'
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        // webpack编译输出的发布路径（例如'//cdn.xxx.com/app/'）
        publicPath: process.env.NODE_ENV !== 'development' ?  config.build.assetsPublicPath: config.dev.assetsPublicPath
    },
   // 模块解析；
    resolve: {
        //文件内具有的拓展名；
        extensions: ['.js', '.vue', '.json'],
        // 路径的别名；
        // 别名，方便引用模块，例如有了别名之后，
        // import Vue from 'vue/dist/vue.common.js'可以写成 import Vue from 'vue'
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
            'src': path.resolve(__dirname, '../src'),
            'assets': path.resolve(__dirname, '../src/assets'),
            'components': path.resolve(__dirname, '../src/components'),
            'views': path.resolve(__dirname, '../src/views'),
            'styles': path.resolve(__dirname, '../src/styles'),
            'api': path.resolve(__dirname, '../src/api'),
            'utils': path.resolve(__dirname, '../src/utils'),
            'store': path.resolve(__dirname, '../src/store'),
            'router': path.resolve(__dirname, '../src/router'),
            'mock': path.resolve(__dirname, '../src/mock'),
            'vendor': path.resolve(__dirname, '../src/vendor'),
            'static': path.resolve(__dirname, '../static'),

        }
    },
    externals: {
        jquery: 'jQuery'
    },
    module: {
        rules: [
            // {
            //     test: /\.(js|vue)$/,
            //     loader: 'eslint-loader',
            //     enforce: "pre",
            //     include: [resolve('src'), resolve('test')],
            //     options: {
            //         formatter: require('eslint-friendly-formatter')
            //     }
            // },
            // 对src和test文件夹下的.js和.vue文件使用eslint-loader进行代码规范检查
            { test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader?cacheDirectory',
                include: [resolve('src'), resolve('test')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {// 对字体资源文件使用url-loader
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,// 小于10K的资源转成base64编码的dataURL字符串写到代码中
                    name: utils.assetsPath('fonts/[name].[ext]')  // 其他的资源转移到静态资源文件夹
                }
            }
        ]
    },
    //注入全局mixin
    // sassResources: path.join(__dirname, '../src/styles/mixin.scss'),
    // sassLoader: {
    //     data:  path.join(__dirname, '../src/styles/index.scss')
    // },
}
