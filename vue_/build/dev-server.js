require('./check-versions')(); // 检查 Node 和 npm 版本
var config = require('../config');// 获取基本配置

/*
 首先来看执行”npm run dev”时候最先执行的build/dev-server.js文件。该文件主要完成下面几件事情：
 检查node和npm的版本、引入相关插件和配置
 webpack对源码进行编译打包并返回compiler对象
 创建express服务器
 配置开发中间件（webpack-dev-middleware）和热重载中间件（webpack-hot-middleware）
 挂载代理服务和中间件
 配置静态资源
 启动服务器监听特定端口（8080）
 自动打开浏览器并打开特定网址（localhost:8080）
 说明： express服务器提供静态文件服务，不过它还使用了http-proxy-middleware，一个http请求代理的中间件。前端开发过程中需要使用到后台的API的话，可以通过配置proxyTable来将相应的后台请求代理到专用的API服务器。
*/



/*如果Node的环境变量中没有设置当前的环境（NODE_ENV），则使用config中的dev环境配置作为当前的环境*/
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

/*opn是一个可以调用默认软件打开网址、图片、文件等内容的插件
// 这里用它来调用默认浏览器打开dev-server监听的端口，例如：localhost:8080*/
var opn = require('opn')
var path = require('path');
var express = require('express');
var webpack = require('webpack');
var proxyMiddleware = require('http-proxy-middleware');
var webpackConfig = require('./webpack.dev.conf');

// dev-server 监听的端口，如果没有在命令行传入端口号，则使用config.dev.port设置的端口，例如8080
// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port;
// 用于判断是否要自动打开浏览器的布尔变量，当配置文件中没有设置自动打开浏览器的时候其值为 false
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser;
// HTTP代理表，指定规则，将某些API请求代理到相应的服务器
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable;
// 创建express服务器
var app = express();
// webpack根据配置开始编译打包源码并返回compiler对象
var compiler = webpack(webpackConfig);

// webpack-dev-middleware将webpack编译打包后得到的产品文件存放在内存中而没有写进磁盘
// 将这个中间件挂到express上使用之后即可提供这些编译后的产品文件服务
var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true
});
// webpack-hot-middleware，用于实现热重载功能的中间件
var hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: false,
        // // 关闭控制台的日志输出

    heartbeat: 2000, // 发送心跳包的频率
});

// webpack(重新)编译打包完成后并将js、css等文件inject到html文件之后，通过热重载中间件强制页面刷新
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        hotMiddleware.publish({action: 'reload'});
        cb()
    })
});

// compiler.apply(new DashboardPlugin());
// 根据 proxyTable 中的代理请求配置来设置express服务器的http代理规则
// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
    var options = proxyTable[context]
    // 格式化options，例如将'www.example.com'变成{ target: 'www.example.com' }
    if (typeof options === 'string') {
        options = {target: options}
    }
    app.use(proxyMiddleware(options.filter || context, options))
});

// handle fallback for HTML5 history API
// 重定向不存在的URL，用于支持SPA（单页应用）
// 例如使用vue-router并开启了history模式
// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

// serve webpack bundle output
// 挂载webpack-dev-middleware中间件，提供webpack编译打包后的产品文件服务
app.use(devMiddleware);

// enable hot-reload and state-preserving
// compilation error display
// 挂载热重载中间件
app.use(hotMiddleware);



// serve pure static assets
// 提供static文件夹上的静态文件服务
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
app.use(staticPath, express.static('./static'));

// 访问链接
var uri = 'http://localhost:' + port
// webpack-dev-middleware等待webpack完成所有编译打包之后输出提示语到控制台，表明服务正式启动
// 服务正式启动才自动打开浏览器进入页面
devMiddleware.waitUntilValid(function () {
    console.log('> Listening at ' + uri + '\n')
});






// 暴露本模块的功能给外部使用，例如下面这种用法
// 启动express服务器并监听相应的端口
module.exports = app.listen(port, function (err) {
    if (err) {
        console.log(err);
        return
    }

    // when env is testing, don't need open it
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
        opn(uri)
    }
});




