const util = require('./util')
const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const dependentChunck = require('../lib/outer-script')
// const inlineScript = require('../lib/inline-script')

//生成入口文件配置
let entryList = util.generateEntry({
    pageDir: path.resolve(__dirname, `../src/page`),
    filename: 'index.js'
});
entryList.app = './src/main.js';
// entryList = merge(entryList, dependentChunck);

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
            return path.resolve(__dirname, `../src/html.js`);
        } else {
            return path.resolve(__dirname, `../src/page/${name}/html.js`);
        }
    }
});

//获取入口配置
exports.getEntryList = function () {
    return entryList;
};

//获取html plugin配置
exports.getHTMLPlugin = function (isDev) {
    let HTMLPlugins = [];

    HTMLPlugin.forEach((item, index) => {
        Object.assign(item, {});
        if (isDev) {
            HTMLPlugins.push(new HtmlWebpackPlugin(item));
        } else {
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

