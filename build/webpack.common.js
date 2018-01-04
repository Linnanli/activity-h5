const path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context:path.resolve(__dirname,'../'),
    entry:{
        app:'./src/main.js'
    },
    output:{
        path:path.resolve(__dirname, '../dist'),
        filename:path.join('static','js/[name].js'),
        chunkFilename:path.join('static','js/[name].js'),
        publicPath:''
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
                test:/\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader:'url-loader',
                options:{
                    minimize:1024*30,
                    name:path.join('static','img/[name].[hash:7].[ext]')
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
        })
    ]
};