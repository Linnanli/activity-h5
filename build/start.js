const inquirer = require('inquirer');
const path = require('path');

const { fsStat } = require('./util')
const { getConfig, getAllName } = require('./getOptions');
const prodEnv = require('../config/prod.env');

(async () => {
    let answers = {};
    let answers2 = {};
    // let answers3 = {};
    // let answers4 = {};

    answers = await inquirer.prompt([
        {
            type: 'list',
            message: '请选择构建项目类型',
            choices: ['development', 'production'],
            name: 'project_type'
        },
        {
            type: 'list',
            message: '请选择配置项',
            choices: getAllName(),
            name: 'conf'
        }
    ]);
    // 获取需要构建的文件名称
    if (answers.project_type === 'production'){
        answers2 =  await inquirer.prompt({
            type: 'input',
            message: '请输入需要构建的文件名称',
            name: 'dirName',
            validate: async function (input) {
                let done = this.async();
                if (input === ''){
                    done('请输入文件名');
                }else{
                    let dirName = path.join(__dirname, '../src/page', input);
                    try {
                        const state = await fsStat(dirName);
                        if (state.isDirectory(dirName)) {
                            done(null, true);
                        } else {
                            done('请检查输入文件夹名称');
                        }
                    } catch (error){
                        done('请检查文件夹是否存在');
                    }
                    
                }
            }
        }); 
    }

    // answers3 = await inquirer.prompt({
    //     type: 'confirm',
    //     message: '是否需要自定义html入口文件名称',
    //     name: 'isCustomHtmlName'
    // }); 

    // if (answers3.isCustomHtmlName === true) {
    //     answers4 = await inquirer.prompt({
    //         type: 'input',
    //         message: '请输入需要生成的html文件名称',
    //         name: 'htmlName',
    //         validate: async function (input) {
    //             let done = this.async();
    //             if (input === '') {
    //                 done('请输入文件名');
    //             } else {
    //                 if (/^[\d\w-]{4,15}\.html$/.test(input)) {
    //                     done(null, true);
    //                 } else {
    //                     done('请检查输入以.html结尾,4-15位的文件名称');
    //                 }
    //             }
    //         }
    //     }); 
    // }
    // console.log(answers4.htmlName)
    console.log('\n');

    //设置全局变量 API_HOST的值
    let config = getConfig(answers.conf);
    prodEnv.API_HOST = JSON.stringify(config.api_host);
    prodEnv.BASE_PATH = JSON.stringify(config.basePath);
    process.env.HTTPS = config.https;
    
    if (answers.project_type === 'development') {
        require('../build/webpack.dev.conf')('each');
    } else if (answers.project_type === 'production') {
        require('../build/build')(answers2.dirName, config.build);
    }

})();