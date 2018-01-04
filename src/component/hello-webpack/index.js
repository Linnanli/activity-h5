

//没有bable 转换es6语法 无法使用 import
require('./hello.css');
var tpl = require('./hello.html');

module.exports = {
    show:function(text){
        var ele = $(tpl);
        ele.append($('<div>').text(text));
        ele.on('click',function(){
            // import(/*webpackChunkName:"show"*/,'../show').then(function(module){
            //     console.log(module)
            // });
            require.ensure(['../show'], function(require){
                var list = require('../show');
                console.log(list)
            },'show');
        });
        return ele;
    }
}