var fs = require('fs');
var path = require('path');
var util= require('../build/util');


var config = {
    multiPageDir:'page',
    build:{
        assetsRoot:path.resolve(__dirname,'../dist'),//生成资源根路径
        assetsSubDirectory:'/static',//静态资源存放目录
        assetsPublicPath:'',
        //sourceMap
        devtool:'hidden-source-map'
    },
    dev:{
        assetsRoot:path.resolve(__dirname,'../dist'),
        assetsSubDirectory:'/static',//静态资源存放目录
        assetsPublicPath:'',
        //sourceMap
        devtool:'eval-source-map',
        
        host:'localhost',
        port:8089
    }
};
//指定浏览器打开url地址
config.dev.open = true;

module.exports = config;