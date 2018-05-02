let content = require('common/layout/index.ejs')
let script = require('common/layout/script.ejs')
let styles = require('common/layout/styles.ejs')

module.exports = ({ htmlWebpackPlugin: { options, files } }) =>{
  return content({
    title:'login',
    styles: styles({ linkList: files.chunks.login.css }),
    container:'<div class="box"></div>',
    script: script({ chunks: ['manifest', 'login'], scriptList: files.chunks }),
  });
}