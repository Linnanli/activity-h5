var path = require('path');
var merge = require('webpack-merge');
var webpack = require('webpack');
var FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
//设置全局环境变量
var env = require('../config/dev.env');
process.env.NODE_ENV = JSON.parse(env.NODE_ENV);
//加载配置文件
var webpackCommon = require('./webpack.common');
// var styleCfg = require('./style.cfg');
var config = require('../config').dev;

var webpackDev = merge(webpackCommon,{
    devtool:config.devtool,
    devServer:{
        inline:true,
        hot:true,
        https: config.https,
        quiet: true,
        open:config.open,
        host:config.host,
        port:config.port,
        overlay:{ //当有编译错误或者警告的时候显示一个全屏overlay
            errors:true,
            warnings:false,
        },
        before: require('../mock-server')
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env':env
        }),
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: [`Your application is running here: http://${config.host}:${config.port}`],
            }
        }),//优化提示信息
        new webpack.HotModuleReplacementPlugin(),//热替换插件
        new webpack.NamedModulesPlugin()
    ]
});
module.exports = webpackDev;