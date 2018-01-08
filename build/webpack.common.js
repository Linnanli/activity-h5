const path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

//加载配置文件
var util= require('../build/util');
var config = require('../config');
var devCfg = config.dev;
var prodCfg = config.build;

//生成入口脚本地址
var entryCfg = util.generateEntry({
    pageFile:path.resolve(__dirname,`../src/${config.multiPageDir}`),//page 目录的地址
    filename:'index.js'//各个页面入口文件的名称
});
//生成HTML插件配置
var HTMLPlugin = util.generateHTMLPlugin({
    entry:entryCfg,
    filename:function(name,basePath){
        //如果需要后端模板引擎渲染,可以将模板文件存放到指定的文件夹中
        // filename: `../../view/frontend/${page}.php`, // 通过控制相对路径来确定模板的根目录
        return `page/${name}.html`;
    },
    template:function(name,basePath){
        //限制模板文件为inde.tpl.js
        return path.resolve(__dirname,`${basePath}/index.tpl.js`);
    },
    dependChunks:['manifest','vendor']
});

module.exports = {
    context:path.resolve(__dirname,'../'),
    entry:entryCfg,
    output:{
        path:prodCfg.assetsRoot,
        filename: path.join(prodCfg.assetsSubDirectory, 'js/[name].js'),
        chunkFilename: path.join(prodCfg.assetsSubDirectory, 'js/[name].js'),
        publicPath:process.env.NODE_ENV === 'production'
        ?devCfg.assetsPublicPath
        :prodCfg.assetsPublicPath
    },
    resolve:{
        extensions:['.js','.json'],
        alias:{
            '@':path.resolve(__dirname,'../src'),
            'component':path.resolve(__dirname,'../src/component')
        }
    },
    module:{
        rules:[
            {
                test:/\.hbs$/,
                loader:'handlebars-loader',
                options:{
                    exclude: '/node_modules/',
                    helperDirs:path.resolve(__dirname,'../src/helpers'),
                    // inlineRequires: /^((?!http|https).)*(images|media|file)((?!http|https).)*$/,
                    inlineRequires:/\.(png|jpe?g|gif|svg)(\?.*)?$/,
                }
            },
            {
                test:/\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader:'url-loader',
                options:{
                    limit: 1024*10,
                    name:path.join(prodCfg.assetsSubDirectory,'img/[name].[hash:7].[ext]')
                }
            },{
                test:/\.html$/,
                loader:'html-loader'
            },{
                test:require.resolve('zepto'),
                //exports-loader向文件添加导出语句 module.exports = window.zepto
                //在全局上下文执行一次脚本,等于将zepto挂载到window对象下面
                // use:['exports-loader?window.zepto!script-loader']
                use: ['exports-loader?window.Zepto','script-loader']
            }
        ]
    },
    plugins:[
        //自动加载模块,不需要import后再使用
        new webpack.ProvidePlugin({
            '$':'zepto'
        }),
        ...HTMLPlugin
    ]
};