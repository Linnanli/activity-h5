const path = require('path')

// 获取本机局域网内ip地址
const getIp = () => {
    let os = require('os'),
        iptable = {},
        ifaces = os.networkInterfaces()
    for (let dev in ifaces) {
        ifaces[dev].forEach(function (details, alias) {
            if (details.family == 'IPv4') {
                iptable[dev + (alias ? ':' + alias : '')] = details.address
            }
        })
    }

    for (let key in iptable) {
        return iptable[key]
    }
}


var config = {
    multiPageDir:'page',
    fundebugKey:'3213c4f5cfcfa6862e653ac4e2b2be46be3bfe316dee8df15776d2d6de6cafa5',
    build:{
        assetsRoot:path.resolve(__dirname,'../dist'),//生成资源根路径
        assetsSubDirectory:'static',//静态资源存放目录
        assetsPublicPath:'/',
        // assetsPublicPath: '/activity/',
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
        host: getIp(),
        port:8087
    }
};
//指定浏览器打开url地址
config.dev.open = true;
module.exports = config;