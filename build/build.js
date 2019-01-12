const ora = require('ora')
const path = require('path')
const chalk = require('chalk')
const rimraf = require('rimraf')
const webpack = require('webpack')
const merge = require('webpack-merge')
const { addConfig } = require('./util')
//设置全局环境变量
const env = require('../config/prod.env');
process.env.NODE_ENV = JSON.parse(env.NODE_ENV);

const config = require('../config');
const prodCfg = config.build;


module.exports = (dirName, userConfig = {}) => {
    //设置配置
    addConfig(prodCfg,userConfig);
    //加载配置文件
    let webpackConfig = null;
    let webpackCommon = require('./webpack.common')(dirName);
    let webpackProConf = require('../build/webpack.pro.conf');
    webpackConfig = merge(webpackCommon, webpackProConf)
    const spinner = ora('生产文件构建中...').start();
    spinner.color = 'green';

    webpack(webpackConfig, (err, stats) => {
        spinner.stop()
        if (err) throw err
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
            chunks: false,
            chunkModules: false
        }) + '\n\n')

        if (stats.hasErrors()) {
            console.log(chalk.red('  构建失败,出现错误.\n'))
            process.exit(1)
        }

        console.log(chalk.cyan('  构建完成.\n'))
        console.log(chalk.yellow(
            '  Tip: 生产文件存放在dist目录下.\n'
        ))
    })
    
}


