const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const WebpackDevServer = require("webpack-dev-server");
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
//设置全局环境变量
const env = require('../config/dev.env');
process.env.NODE_ENV = JSON.parse(env.NODE_ENV);
//加载配置文件
const webpackCommon = require('./webpack.common');
const config = require('../config').dev;
const util = require('../build/util');
// module.exports = webpackDev;

module.exports = (dirName)=>{
    let webpackDev = merge(webpackCommon(dirName), {
        devtool: config.devtool,
        plugins: [
            new webpack.DefinePlugin({
                'process.env': env
            }),
            new FriendlyErrorsWebpackPlugin({
                compilationSuccessInfo: {
                    messages: [`Your application is running here: http://${config.host}:${config.port}`],
                }
            }),//优化提示信息
            new webpack.HotModuleReplacementPlugin(),//热替换插件
            new webpack.NamedModulesPlugin()
        ]
    })

    let compiler = webpack(webpackDev);

    let server = new WebpackDevServer(compiler, {
        inline: true,
        hot: true,
        https: config.https,
        quiet: true,
        open: config.open,
        host: config.host,
        port: config.port,
        progress: true,
        overlay: { //当有编译错误或者警告的时候显示一个全屏overlay
            errors: true,
            warnings: false,
        },
        before: require('../mock-server')
    });

    server.listen(config.port, config.host, function () {
        console.log('> Starting dev server...')
    });
}
