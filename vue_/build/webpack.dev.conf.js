var utils = require('./utils')
var path = require('path')
var webpack = require('webpack')
var config = require('../config')
// webpack-merge是一个可以合并数组和对象的插件
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
// html-webpack-plugin用于将webpack编译打包后的产品文件注入到html模板中
// 即自动在index.html里面加上<link>和<script>标签引用webpack打包后的文件
var HtmlWebpackPlugin = require('html-webpack-plugin')
// friendly-errors-webpack-plugin用于更友好地输出webpack的警告、错误等信息
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
// 给每个入口页面(应用)加上dev-client，用于跟dev-server的热重载插件通信，实现热更新
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
    baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

function resolveApp(relativePath) {
    return path.resolve(relativePath);
}

// 合并base配置；
module.exports = merge(baseWebpackConfig, {
    module: {
        // 样式文件的处理规则，对css/sass/scss等不同内容使用相应的styleLoaders
        // 由utils配置出各种类型的预处理语言所需要使用的loader，例如sass需要使用sass-loader
        rules: utils.styleLoaders({sourceMap: config.dev.cssSourceMap})
    },
	// 例如当你设置 target:'node' 时，源代码中导入 Node.js 原生模块的语句 require('fs') 将会被保留，fs 模块的内容不会打包进 Chunk 里。
    // target : "web"
    // cheap-source-map is faster for development
    // 使用这种source-map更快
    devtool: '#cheap-source-map',
    cache: true,
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.dev.env
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            'jQuery': 'jquery'
        }),
        // 开启webpack热更新功能
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.HotModuleReplacementPlugin(),
        // webpack编译过程中出错的时候跳过报错阶段，不会阻塞编译，在编译结束后报错
        new webpack.NoEmitOnErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        // 自动将依赖注入html模板，并输出最终的html文件到目标文件夹
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            favicon: resolveApp('favicon.ico'),
            inject: true,
            path:config.dev.staticPath
        }),
        new FriendlyErrorsPlugin()
    ],
	watch: true,
		// 监听模式运行时的参数
	  // 在开启监听模式时，才有意义
	  watchOptions: {
		// 不监听的文件或文件夹，支持正则匹配
		// 默认为空
		ignored: /node_modules/,
		// 监听到变化发生后会等300ms再去执行动作，防止文件更新太快导致重新编译频率太高
		// 默认为 300ms  
		aggregateTimeout: 300,
		// 判断文件是否发生变化是通过不停的去询问系统指定文件有没有变化实现的
		// 默认每秒问 1000 次
		poll: 1000
	  },
	  // 通过 externals 可以告诉 Webpack JavaScript 运行环境已经内置了那些全局变量，针对这些全局变量不用打包进代码中而是直接使用全局变量。
	  externals: {
		// 把导入语句里的 jquery 替换成运行环境里的全局变量 jQuery
		jquery: 'jQuery'
	  }
	
})
