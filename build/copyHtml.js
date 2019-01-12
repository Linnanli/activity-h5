const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs')
const { fsStat } = require('./util')
const ora = require('ora')

;(async () => {
    let answers = {};
    let answers2 = {};
    let dirName = ''
    answers = await inquirer.prompt({
        type: 'input',
        message: '请输入需要生成副本的html文件名称',
        name: 'htmlName',
        validate: async function (input) {
            let done = this.async();
            if (input === '') {
                done('请输入文件名');
            } else {
                dirName = path.join(__dirname, '../dist/page', input + '.html');
                try {
                    const state = await fsStat(dirName);
                    if (state.isFile(dirName)) {
                        done(null, true);
                    } else {
                        done('请检查输入html名称');
                    }
                } catch (error) {
                    done('请检查html是否存在');
                }

            }
        }
    }); 

    answers2 = await inquirer.prompt({
        type: 'input',
        message: '请输入副本的html文件名称',
        name: 'copyHtmlName',
        validate: async function (input) {
            let done = this.async();
            if (input === '') {
                done('请输入文件名');
            } else {
                if (answers.htmlName === input) {
                    done('文件名称不可相同');
                    return;
                }
                if (/^[\d\w-]{4,30}$/.test(input)) {
                    done(null, true);
                } else {
                    done('请检查输入以.html结尾,4-30位的文件名称');
                }
            }
        }
    });

    const spinner = ora('生产文件构建中...').start();
    spinner.color = 'green';


    let readStream = fs.createReadStream(dirName)
    var writeStream = fs.createWriteStream(path.join(__dirname, '../dist/page', answers2.copyHtmlName + '.html'))

    readStream.on('data', function (chunk) {
        if (writeStream.write(chunk) === false) {
            console.log('still cached')
            readStream.pause();
        }
    })
    readStream.on('end', function () {
        writeStream.end()
        spinner.stop()
    })
    writeStream.on('drain', function () {
        console.log('data drains')
        readStream.resume()
    })
})();