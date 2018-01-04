var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
var HappyPack = require('happypack');
var { WebPlugin } = require('web-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, './'),
    entry: {
        app: './src/main.js',
        loading: './src/component/loading/loading.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: path.join('static', 'js/[name].js'),
        publicPath: ''
    },
    devtool:'hidden-source-map',//不会上传到http服务器让用户获取,而是上传到javascript错误收集系统,再计算出错误源码所在位置,不会暴露源码
    // devtool:'cheap-module-eval-source-map',//开发环境使用,因为开发时不用压缩代码所以不用生成列信息,所以生成更快.
    resolve:{
        modules:[path.resolve(__dirname,'./node_modules')],//优化:减少查找第三方模块目录的的时间
        extensions:['.js','.json'],
        alias:{
            '@':path.join(__dirname,'src'),
            'component':path.join(__dirname,'./src/component')
        },
        // noParse:['vue.esm.js']//对于没有采用模块化的文件,忽略对它的递归解析处理,优化构建性能
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader?minimize']
                    // use:['happypack/loader?id=css']//开启一个进程处理css,加快构建速度
                })
            }, {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1024 * 30,
                    // name: path.join('static', 'img/[name].[hash:5].[ext]')
                    name:path.posix.join('static', 'img/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new ParallelUglifyPlugin({
            // 缓存压缩后的结果，下次遇到一样的输入时直接从缓存中获取压缩后的结果返回
            // cacheDir 用于配置缓存存放的目录路径
            cacheDir: '.uglify-cache',
            output:{
                // 最紧凑的输出
                beautify: false,
                // 删除所有的注释
                comments: false
            },
            compress:{
                // 在UglifyJs删除没有用到的代码时不输出警告
                warnings: false,
                // 删除所有的 `console` 语句，可以兼容ie浏览器
                drop_console: true,
                // 内嵌定义了但是只用到一次的变量
                collapse_vars: true,
                // 提取出出现多次但是没有定义成变量去引用的静态值
                reduce_vars: true
            }
        }),
        new ExtractTextPlugin({
            filename: path.join('static', 'css/[name].css')
        }),
        new WebPlugin({
            template: './index.html',
            filename: 'index.html',
            requires: ['app', 'loading']
        })
    ]
};