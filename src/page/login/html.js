let content = require('common/layout/index.ejs');
let script = require('common/layout/script.ejs');

module.exports = function ({ htmlWebpackPlugin: { options, files } }){
  return content({
    title:'login',
    container:'<div class="box"></div>',
    script: script({ chunks: ['manifest', 'login'], chuncksEntry: files.chunks }),
  });
}