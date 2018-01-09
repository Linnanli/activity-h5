// var compilerTpl = require('./index.hbs');
import compilerTpl from './index.hbs';
export default compilerTpl({
  title:'home首页',
  head: 'home head',
  body:'home body(点我)',
  footer:'home footer'
});