const fs = require('fs');
const UglifyJS = require('uglify-es')
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('../config');
// console.log(config)
//判断是否存在目录
function fsExistsAccess(path) {
    try {
        fs.accessSync(path, fs.F_OK);
    } catch (e) {
        return false;
    }
    return true;
}

//判断entry配置是否是js入口文件
function isJsEntryFile(entry, suffix = ['js']) {
    let reg = new RegExp(`\.(${suffix.join('|')})$`);

    if (typeof entry === 'string') return reg.test(entry);

    if (entry instanceof Array) {
        for (let index = 0; index < entry.length; index++) {
            if (!reg.test(entry[index])) return false;
        }
    }

    return true;
}

//生成各个入口配置
exports.generateEntry = function  ({ pageDir, filename, insetBefore }) {
    if (typeof pageDir !== 'string')
        throw new Error('请传入目录绝对路径');

    let pagePath = path.resolve(__dirname, pageDir),
        isExists = fsExistsAccess(pageDir),
        entryPath = {};

    if (isExists) {
        let pageFile = fs.readdirSync(pageDir),
            finishFilename = '',
            entryStr = '',
            chunckName = '';

        pageFile.forEach(function (name, index) {
            if (typeof filename === 'function') {
                finishFilename = filename.call(name, name);
            } else if (typeof filename === 'string') {
                finishFilename = filename;
            } else {
                finishFilename = 'index.js';
            }

            entryStr = path.join(pageDir, `${name}/${filename}`);

            //向指定入口添加chunck,如: ['babel-polyfill','main.js']
            if (typeof insetBefore === 'function') {
                chunckName = insetBefore(name);
                if (typeof chunckName === 'string') {
                    entryPath[name] = [entryStr];
                    entryPath[name].unshift(chunckName);
                }
            } else {
                entryPath[name] = entryStr;
            }

        });
    }

    return entryPath;
}

//生成html plugin
exports.generateHTMLPlugin = function ({ entryList = {}, filename, template }) {
    let params,
        finishFilename = '',
        finishTemplate = '',
        HTMLPlugins = [];

    for (let name in entryList) {

        if (!isJsEntryFile(entryList[name])) continue;
        params = {};
        //判断文件名称
        if (typeof filename === 'function') {
            finishFilename = filename.call(params, name);
        } else if (typeof filename === 'string') {
            finishFilename = filename;
        } else {
            finishFilename = 'index.html';
        }

        if (typeof template === 'function') {
            finishTemplate = template.call(params, name);
        } else if (typeof template === 'string') {
            finishTemplate = template;
        } else {
            finishTemplate = 'index.html';
        }

        params.filename = finishFilename;
        params.template = finishTemplate;
        params.inject = false;

        HTMLPlugins.push(params);
    }

    return HTMLPlugins;
}

exports.loadMinified = function (filePath, isUglifyJS) {
  const code = fs.readFileSync(filePath, 'utf-8');
  if (isUglifyJS) {
    const result = UglifyJS.minify(code)
    if (result.error) return ''
    return result.code
  }

  return code;
}

exports.assetsPath = function (_path) {
    const assetsSubDirectory = process.env.NODE_ENV === 'production'
        ? config.build.assetsSubDirectory
        : config.dev.assetsSubDirectory

    return path.posix.join(assetsSubDirectory, _path)
}