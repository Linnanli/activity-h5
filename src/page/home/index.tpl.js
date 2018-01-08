var compilerTpl = require('./index.hbs');
module.exports = compilerTpl({
  title:'home首页',
  head: 'home head',
  body:'home body(点我)',
  footer:'home footer'
});