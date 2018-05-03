let content = require('common/layout/mobile-index.ejs')
let script = require('common/layout/script.ejs')
let styles = require('common/layout/styles.ejs')


let container = require('./template/container.html');

module.exports = ({ htmlWebpackPlugin: { options, files } }) =>{
  let { flexible } = options;
  return content({
    title:'考拉记账',
    flexible: flexible,
    styles: styles({ linkList: files.chunks['activity-promotion2'].css }),
    container: container,
    script: script({ chunks: ['manifest','zepto','activity-promotion2'], scriptList: files.chunks }),
  });
}