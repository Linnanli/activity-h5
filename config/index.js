var fs = require('fs');
var path = require('path');

var config = {
    multiPageDir:'page',
    fundebugKey:'3213c4f5cfcfa6862e653ac4e2b2be46be3bfe316dee8df15776d2d6de6cafa5',
    build:{
        assetsRoot:path.resolve(__dirname,'../dist'),//生成资源根路径
        assetsSubDirectory:'static',//静态资源存放目录
        assetsPublicPath:'/dist/',
        //sourceMap
        devtool:'hidden-source-map'
    },
    dev:{
        assetsRoot:path.resolve(__dirname,'../dist'),
        assetsSubDirectory:'static',//静态资源存放目录
        assetsPublicPath:'/',
        //sourceMap
        devtool:'eval-source-map',
        https:false,
        host:'localhost',
        port:8089
    }
};
//指定浏览器打开url地址
config.dev.open = true;
module.exports = config;