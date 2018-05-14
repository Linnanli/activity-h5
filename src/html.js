/**
 * 使用js生成html(暂废)
 */
let content = require('common/layout/index.ejs')
let script = require('common/layout/script.ejs')
let styles = require('common/layout/styles.ejs')

let container = require('./template.html')

module.exports =  ({ htmlWebpackPlugin: { options, files } }) => {
    let { flexible } = options;
    return content({
        title:'index',
        // flexible: flexible,
        styles: styles({ linkList: files.chunks.app.css }),
        container: container,
        script: script({ chunks: ['manifest','login'], scriptList: files.chunks }),
    });
}