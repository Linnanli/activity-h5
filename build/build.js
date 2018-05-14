const ora = require('ora')
const path = require('path')
const chalk = require('chalk')
const rimraf = require('rimraf')
const webpack = require('webpack')

//设置全局环境变量
const env = require('../config/prod.env');
process.env.NODE_ENV = JSON.parse(env.NODE_ENV);

const config = require('../config');
const prodCfg = config.build;
const webpackConfig = require('../build/webpack.pro.conf');

const spinner = ora('生产文件构建中...').start();
spinner.color = 'green';

rimraf(path.join(prodCfg.assetsRoot, prodCfg.assetsSubDirectory), (err)=>{
    if (err) throw err;
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
});


