const util = require('./util')
const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const vendorList = require('../lib/vendor')
// const inlineScript = require('../lib/inline-script')
const config = require('../config');
//生成入口文件配置

//获取入口配置
exports.getEntry = function (dirName = 'each') {
    let entryFile = {};
    //生成page文件夹下的所有文件入口
    if (dirName === 'each'){
        entryFile = util.generateEntry({
            pageDir: path.resolve(__dirname, `../src/page`),
            filename: 'index.js'
        });
        entryFile.app = './src/main.js';
    //生成单个文件夹入口
    }else{
        entryFile[dirName] = path.join(__dirname, '../src/page', dirName, 'index.js');
    }
    return entryFile;
};

//获取html plugin配置
exports.getHTMLPlugin = function (entryConfig,env) {
    //生成HTML插件配置
    let HTMLPlugin = util.generateHTMLPlugin({
        entryList: entryConfig,
        filename: function (name) {
            if (name === 'app') {
                return `index.html`;
            } else {
                return `${name}.html`;
            }
        },
        template: function (name) {
            if (name === 'app') {
                return path.resolve(__dirname, `../src/index.ejs`);
            } else if (name === 'activity-promotion5') {
                return path.resolve(__dirname, `../src/page/${name}/index.ejs`);
            } else {
                return path.resolve(__dirname, `../src/page/${name}/index.ejs`);
            }
        }
    });

    let HTMLPlugins = [];
    let isDev = env === 'development';
    HTMLPlugin.forEach((item, index) => {
        // Object.assign(item, inlineScript);
        item.NODE_ENV = env;//传入环境变量
        item.fundebugKey = config.fundebugKey;
        //模板根据不同环境区分不同请求头
        item.http = process.env.HTTPS === 'true' ? 'https' :'http';
        if (isDev) {
            HTMLPlugins.push(new HtmlWebpackPlugin(item));
        } else {
            item.minify = false;
            item.hash = true;
            item.minify = {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            };
            item.chunksSortMode = 'dependency';
            HTMLPlugins.push(new HtmlWebpackPlugin(item));
        }
    });

    return HTMLPlugins;
}

