const util = require('./util')
const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const vendorList = require('../lib/vendor')
const config = require('../config');
//生成入口文件配置
let entryList = util.generateEntry({
    pageDir: path.resolve(__dirname, `../src/page`),
    filename: 'index.js'
});
entryList.app = './src/main.js';

//生成HTML插件配置
let HTMLPlugin = util.generateHTMLPlugin({
    entryList: entryList,
    filename: function (name) {
        if (name === 'app') {
            return `index.html`;
        } else {
            return `page/${name}.html`;
        }
    },
    template: function (name) {
        if (name === 'app') {
            return path.resolve(__dirname, `../src/index.ejs`);
        } if (name === 'activity-promotion5') {
            return path.resolve(__dirname, `../src/page/${name}/index.ejs`);
        } else {
            return path.resolve(__dirname, `../src/page/${name}/index.ejs`);
        }
    }
});

//获取入口配置
exports.getEntryList = function () {
    return entryList;
};

//获取html plugin配置
exports.getHTMLPlugin = function (env) {
    let HTMLPlugins = [];
    let isDev = env === 'development';
    HTMLPlugin.forEach((item, index) => {
        // Object.assign(item, inlineScript);
        item.NODE_ENV = env;//传入环境变量
        item.fundebugKey = config.fundebugKey;
        //模板根据不同环境区分不同请求头
        if (!isDev && !process.env.TEST_BUILD){
            item.http = 'https';
        } else if (isDev || process.env.TEST_BUILD){
            item.http = 'http';
        }
        if (isDev) {
            HTMLPlugins.push(new HtmlWebpackPlugin(item));
        } else {
            item.minify = false;
            // item.minify = {
            //     removeComments: true,
            //     collapseWhitespace: true,
            //     removeAttributeQuotes: true
            // };
            item.chunksSortMode = 'dependency';
            HTMLPlugins.push(new HtmlWebpackPlugin(item));
        }
    });
    return HTMLPlugins;
}

