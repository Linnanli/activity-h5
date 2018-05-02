let content = require('common/layout/index.ejs')
let script = require('common/layout/script.ejs')
let styles = require('common/layout/styles.ejs')

module.exports =  ({ htmlWebpackPlugin: { options, files } }) => {
    return content({
        title:'index',
        styles: styles({ linkList: files.chunks.app.css }),
        container:'<div>container</div>',
        script: script({ chunks: ['manifest','zepto', 'login'], scriptList: files.chunks }),
    });
}