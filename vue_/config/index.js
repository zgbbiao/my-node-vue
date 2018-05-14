// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
    // 打包build 时的配置；
    // 构建产品时使用的配置
    build: {
        // 环境变量
        sitEnv: require('./sit.env'),
        prodEnv: require('./prod.env'),
        // html入口文件
        index: path.resolve(__dirname, '../dist/index.html'),
        // 产品文件的存放路径
        assetsRoot: path.resolve(__dirname, '../dist'),
        // 二级目录，存放静态资源文件的目录，位于dist文件夹下
        assetsSubDirectory: 'static',
        // 发布路径，如果构建后的产品文件有用于发布CDN或者放到其他域名的服务器，可以在这里进行设置
        // 设置之后构建的产品文件在注入到index.html中的时候就会带上这里的发布路径
        assetsPublicPath: './',          //请根据自己路径配置更改
        staticPath:'./static/',          //请根据自己路径配置更改
        // 是否使用source-map
        productionSourceMap: true,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        // 是否开启gzip压缩
        productionGzip: false,
        // gzip模式下需要压缩的文件的扩展名，设置js、css之后就只会对js和css文件进行压缩
        productionGzipExtensions: ['js', 'css'],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        // 是否展示webpack构建打包之后的分析报告
        bundleAnalyzerReport: process.env.npm_config_report,
		devServer: {
			//用于方便的开发使用了 HTML5 History API 的单页应用。 这类单页应用要求服务器在针对任何命中的路由时都返回一个对应的 HTML 文件，例如在访问 http://localhost/user 和 http://localhost/home 时都返回 index.html 文件， 浏览器端的 JavaScript 代码会从 URL 里解析出当前页面的状态，显示出对应的界面。
			historyApiFallback:{
				rewrites: [
					// /user 开头的都返回 user.html
					//{ from: /^\/user/, to: '/user.html' },
					//{ from: /^\/game/, to: '/game.html' },
					// 其它的都返回 index.html
					{ from: /./, to: '/index.html' }
				  ]
			},
		},
    },
    // 开发过程中使用的配置
    dev: {
        // 获取配置环境；
        env: require('./dev.env'),
        //端口号
        port: 9001,
        // 是否自动打开浏览器
        autoOpenBrowser: true,
        // 静态资源文件夹
        assetsSubDirectory: 'static',
        // 发布路径
        assetsPublicPath: '/',
        //输出html的路径
        staticPath:'/static/',
        // 代理配置表，在这里可以配置特定的请求代理到对应的API接口
        // 例如将'localhost:8080/api/xxx'代理到'www.example.com/api/xxx'
        proxyTable: {},
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        // 是否开启 cssSourceMap
        cssSourceMap: false,
		devServer: {
			//DevServer 的实时预览功能依赖一个注入到页面里的代理客户端去接受来自 DevServer 的命令和负责刷新网页的工作。 devServer.inline 用于配置是否自动注入这个代理客户端到将运行在页面里的 Chunk 里去，默认是会自动注入。
			inline: true,
			//  devServer.contentBase 配置 DevServer HTTP 服务器的文件根目录  (设置成服务器根目录)
			//  默认情况下为当前执行目录，通常是项目根目录，所有一般情况下你不必设置它
			//  contentBase 只能用来配置暴露本地文件的规则    你可以通过 contentBase:false 来关闭暴露本地文件。
			contentBase: path.join(__dirname, './'),
			// devServer.headers 配置项可以在 HTTP 响应中注入一些 HTTP 响应头
			headers: {
				'X-foo':'bar'
			 },
			 // devServer.host 配置项用于配置 DevServer 服务监听的地址。 例如你想要局域网中的其它设备访问你本地的服务，可以在启动 DevServer 时带上 --host 0.0.0.0。 host 的默认值是 127.0.0.1 即只有本地可以访问 DevServer 的 HTTP 服务
			host: "0.0.0.0",
			///  devServer.allowedHosts 配置一个白名单列表，只有 HTTP 请求的 HOST 在列表里才正常返回
		/* 	allowedHosts: [
			  // 匹配单个域名
			  'host.com',
			  'sub.host.com',
			  // host2.com 和所有的子域名 *.host2.com 都将匹配
			  '.host2.com'
			] */
			// evServer.disableHostCheck 配置项用于配置是否关闭用于 DNS 重绑定的 HTTP 请求的 HOST 检查。 DevServer 默认只接受来自本地的请求，关闭后可以接受来自任何 HOST 的请求。 它通常用于搭配 --host 0.0.0.0 使用，因为你想要其它设备访问你本地的服务，但访问时是直接通过 IP 地址访问而不是 HOST 访问，所以需要关闭 HOST 检查。
			disableHostCheck: false ,
			// DevServer 默认使用 HTTP 协议服务，它也能通过 HTTPS 协议服务。  DevServer 会自动的为你生成一份 HTTPS 证书。  也可以自己配置
			//https: true
			// devServer.compress 配置是否启用 gzip 压缩。 默认为 false。
			compress:  false,
			// devServer.open 用于在 DevServer 启动且第一次构建完时自动用你系统上默认的浏览器去打开要开发的网页。 同时还提供 devServer.openPage 配置项用于打开指定 URL 的网页。
			open:   true
		}
    }
}
