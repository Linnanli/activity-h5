var fs = require('fs');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

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
                filename = '';

            pageFile.forEach(function (name, index) {
                if (typeof options.filename === 'function') {
                    filename = options.filename.call(name, name);
                } else if (typeof options.filename === 'string') {
                    filename = options.filename;
                } else {
                    filename = 'index.js';
                }
                if (/\.js$/.test(filename) === false)
                    throw new Error('not a script file');

                entryPath[name] = path.resolve(__dirname,`../src/page/${name}/${filename}`);
            });
        }

        return entryPath;
    },
    generateHTMLPlugin: function (options) {
        var entry = options.entry || {},
            filename = '',
            template = '',
            chunks,
            basePath = '',
            HTMLPlugins = [];

        for (var name in entry) {
            if (entry.hasOwnProperty(name)) {
                chunks = [];
                basePath = path.parse(entry[name]).dir;
                //判断文件名称
                if (typeof options.filename === 'function') {
                    filename = options.filename.call(name,name,basePath);
                } else if (typeof options.filename === 'string') {
                    filename = options.filename;
                } else {
                    filename = 'index.html';
                }

                if (typeof options.template === 'function') {
                    template = options.template.call(name,name,basePath);
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
    }
};

module.exports = util;