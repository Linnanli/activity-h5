var compilerTpl = require('./index.hbs');
// var miao = requi;
module.exports = compilerTpl({
  title:'index首页',
  head: 'index head',
  body:'点击图片显示弹窗,点击jump跳转页面',
  footer:'index footer',
})