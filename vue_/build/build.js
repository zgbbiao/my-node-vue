require('./check-versions')(); // 检查NodeJS和npm的版本
var server = require('pushstate-server');
var opn = require('opn')
var ora = require('ora') // ora，一个可以在终端显示spinner的插件
var rm = require('rimraf') // rm，用于删除文件或文件夹的插件
var path = require('path')
var chalk = require('chalk') // chalk，用于在控制台输出带颜色字体的插件
var webpack = require('webpack');
var config = require('../config');
var webpackConfig = require('./webpack.prod.conf');

/*
 * loading动画
 删除目标文件夹
 执行webpack构建
 输出信息
 * */

console.log(process.env.NODE_ENV)

var spinner = ora('building for ' + process.env.NODE_ENV + '...')
spinner.start() // 开启loading动画

// 首先将整个dist文件夹以及里面的内容删除，以免遗留旧的没用的文件
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
    if (err) { throw err; }
// 执行webpack构建打包，完成之后在终端输出构建完成的相关信息或者输出报错信息并退出程序
    webpack(webpackConfig, function (err, stats) {
        spinner.stop()
        if (err) throw err
        process.stdout.write(stats.toString({
                colors: true,
                modules: false,
                children: false,
                chunks: false,
                chunkModules: false
            }) + '\n\n')

        console.log(chalk.cyan('  Build complete.\n'))
        if(process.env.npm_config_preview){
            server.start({
                port: 9528,
                directory: './dist',
                file: '/index.html'
            });
            console.log('> Listening at ' +  'http://localhost:9528' + '\n')
        }
    })
})
