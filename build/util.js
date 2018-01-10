var fs = require('fs');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var config = require('../config');
//判断是否存在目录
var util = {
    fsExistsAccess: function (path) {
        try {
            fs.accessSync(path, fs.F_OK);
        } catch (e) {
            return false;
        }
        return true;
    },
    /**
     * 生成多页面entry参数
     * 
     * options{object}
     * options.pagePath{string} 多页面入口地址
     * options.filename{function|string} 设置多页面入口地址
     */
    generateEntry: function (options) {
        var pagePath = path.resolve(__dirname, options.pageFile),
            isExists = this.fsExistsAccess(pagePath),
            entryPath = {};

        if (isExists) {
            var pageFile = fs.readdirSync(pagePath),
                filename = '',
                entryStr = '',
                unShiftEntryStr = '';

            pageFile.forEach(function (name, index) {
                if (typeof options.filename === 'function') {
                    filename = options.filename.call(name, name);
                } else if (typeof options.filename === 'string') {
                    filename = options.filename;
                } else {
                    filename = 'index.js';
                }

                entryStr = path.resolve(__dirname,`../src/${config.multiPageDir}/${name}/${filename}`);
                if(typeof options.unshift === 'function'){
                    entryPath[name] = [entryStr];
                    unShiftEntryStr = options.unshift(name);
                    if(typeof  unShiftEntryStr === 'string'){
                        entryPath[name].unshift(unShiftEntryStr);
                    }             
                }else{
                    entryPath[name] = entryStr;
                }

            });
        }

        return entryPath;
    },
    generateHTMLPlugin: function (options) {
        var entry = options.entry || {},
            filename = '',
            template = '',
            chunks,
            // basePath = '',
            HTMLPlugins = [];

        for (var name in entry) {
            if (entry.hasOwnProperty(name)) {
                chunks = [];
                // basePath = path.parse(entry[name]).dir;
                //判断文件名称
                if (typeof options.filename === 'function') {
                    filename = options.filename.call(name,name);
                } else if (typeof options.filename === 'string') {
                    filename = options.filename;
                } else {
                    filename = 'index.html';
                }

                if (typeof options.template === 'function') {
                    template = options.template.call(name,name);
                } else if (typeof options.template === 'string') {
                    template = options.template;
                } else {
                    template = 'index.html';
                }
                
                //添加依赖块
                if(options.dependChunks){
                    chunks = chunks.concat(options.dependChunks,name);
                }else{
                    chunks.push(name);
                }
                
                HTMLPlugins.push(new HtmlWebpackPlugin({
                    filename: filename,
                    template:template,
                    chunks: chunks
                }));
            }
        }

        return HTMLPlugins;
    },
    //提取state.json文件
    getStateJSON(){
        return function () {
            this.plugin('done', function (statsData) {
                const stats = statsData.toJson();
                fs.writeFileSync(path.join(__dirname, '../stats.json'), JSON.stringify(stats));
            });
        }
    }
};

module.exports = util;