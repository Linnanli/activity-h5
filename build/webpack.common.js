const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

//加载配置文件
const util= require('../build/util');
const config = require('../config');
const devCfg = config.dev;
const prodCfg = config.build;

const page = require('./webpack.page.conf');
const entryCfg = page.getEntryList();
const htmlPluginCfg = page.getHTMLPlugin(process.env.NODE_ENV === 'development'?true:false);
const styleCfg = require('./style.cfg');

function assetsPath(_path) {
    const assetsSubDirectory = process.env.NODE_ENV === 'production'
        ? config.build.assetsSubDirectory
        : config.dev.assetsSubDirectory

    return path.posix.join(assetsSubDirectory, _path)
}

module.exports = {
    context:path.resolve(__dirname,'../'),
    entry:entryCfg,
    output:{
        path:prodCfg.assetsRoot,
        filename: path.join(prodCfg.assetsSubDirectory, 'js/[name].js'),
        chunkFilename: path.join(prodCfg.assetsSubDirectory, 'js/[name].js'),
        publicPath:process.env.NODE_ENV === 'production'
            ? prodCfg.assetsPublicPath
            : devCfg.assetsPublicPath
    },
    resolve:{
        extensions:['.js','.json'],
        alias:{
            '@':path.resolve(__dirname,'../src'),
            'component':path.resolve(__dirname,'../src/component'),
            'common': path.resolve(__dirname,'../src/common'),
            'util': path.resolve(__dirname, '../src/util')
        }
    },
    module:{
        rules:[
            ...styleCfg.cssLoader,
            {
                test:/\.js$/,
                include:path.resolve(__dirname,'../src'),
                loader:'babel-loader'
            },
            {
                test:/\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader:'url-loader',
                options:{
                    limit: 1024 * 10,
                    name: assetsPath('img/[name].[hash:7].[ext]')
                }
            },{
                test:/\.html$/,
                loader:'html-loader'
            },{
                test: /\.(ejs|tpl)$/,
                exclude:/node_modules/,
                loader:'ejs-loader'
            }
        ]
    },
    plugins:[
        ...htmlPluginCfg
    ]
};