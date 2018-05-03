let content = require('common/layout/mobile-index.ejs')
let script = require('common/layout/script.ejs')
let styles = require('common/layout/styles.ejs')


let container = require('./template/container.html');

module.exports = ({ htmlWebpackPlugin: { options, files } }) =>{
  let { flexible } = options;
  return content({
    title:'考拉记账',
    flexible: flexible,
    styles: styles({ linkList: files.chunks['activity-promotion3'].css }),
    global:`{
      userId:'1',
      groupId:'2'
    }`,
    container: container,
    script: script({ chunks: ['manifest','zepto','activity-promotion3'], scriptList: files.chunks }),
  });
}