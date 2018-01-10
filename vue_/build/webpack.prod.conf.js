var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
// copy-webpack-plugin，用于将static中的静态文件复制到产品文件夹dist
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
// optimize-css-assets-webpack-plugin，用于优化和最小化css资源
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')


/*
*
* 合并基础的webpack配置
 配置样式文件的处理规则，styleLoaders
 配置webpack的输出
 配置webpack插件
 gzip模式下的webpack插件配置
 webpack-bundle分析*/

var env = process.env.NODE_ENV === 'production' ? config.build.prodEnv : config.build.sitEnv

function resolveApp(relativePath) {
    return path.resolve(relativePath);
}

var webpackConfig = merge(baseWebpackConfig, {
    module: {
        // 样式文件的处理规则，对css/sass/scss等不同内容使用相应的styleLoaders
        // 由utils配置出各种类型的预处理语言所需要使用的loader，例如sass需要使用sass-loader
        rules: utils.styleLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true
        })
    },
    // 是否使用source-map
    devtool: config.build.productionSourceMap ? '#source-map' : false,
    // webpack输出路径和命名规则
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    },
    plugins: [
        // http://vuejs.github.io/vue-loader/en/workflow/production.html
        new webpack.DefinePlugin({
            'process.env': env
        }),
        // 丑化压缩JS代码
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true
        }),
        // extract css into its own file
        new ExtractTextPlugin({
            filename: utils.assetsPath('css/[name].[contenthash].css')
        }),
        // Compress extracted CSS. We are using this plugin so that possible
        // duplicated CSS from different components can be deduped.
        new OptimizeCSSPlugin(),
        // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /index.html
        // see https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: process.env.NODE_ENV === 'testing'
                ? 'index.html'
                : config.build.index,
            template: 'index.html',
            inject: true,
            favicon: resolveApp('favicon.ico'),
            minify: {
                // 删除index.html中的注释
                removeComments: true,
                // 删除index.html中的空格
                collapseWhitespace: true,
                // 删除各种html标签属性值的双引号
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
             path:config.build.staticPath,
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            // 注入依赖的时候按照依赖先后顺序进行注入，比如，需要先注入vendor.js，再注入app.js
            chunksSortMode: 'dependency'
        }),
        // split vendor js into its own file
        // 将所有从node_modules中引入的js提取到vendor.js，即抽取库文件
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module, count) {
                // any required modules inside node_modules are extracted to vendor
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, '../node_modules')
                    ) === 0
                )
            }
        }),
        // split echarts into its own file
        new webpack.optimize.CommonsChunkPlugin({
            async:'echarts',
            minChunks (module) {
                var context = module.context;
                return context && (context.indexOf('echarts') >= 0 || context.indexOf('zrender') >= 0);
            }
        }),
        // extract webpack runtime and module manifest to its own file in order to
        // prevent vendor hash from being updated whenever app bundle is updated
        // 从vendor中提取出manifest，原因如上
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        }),
        // copy custom static assets
        // 将static文件夹里面的静态资源复制到dist/static
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),
                to: config.build.assetsSubDirectory,
                ignore: ['.*']
            }
        ]),
        new webpack.ProvidePlugin({
            $: 'jquery',
            'jQuery': 'jquery'
        })
    ]
})
// 如果启动了report，则通过插件给出webpack构建打包后的产品文件分析报告
if (config.build.bundleAnalyzerReport) {
    var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}
module.exports = webpackConfig
