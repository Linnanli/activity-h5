var compilerTpl = require('./index.hbs');
module.exports = compilerTpl({
  title:'title首页',
  head: 'login head',
  body:'login body(点我)',
  footer:'login footer'
})