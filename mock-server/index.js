const util = require('./util')
const Mock = require('mockjs')

module.exports = function(app){
    //获取用户数据
    app.get('/user/userinfo',function(rep,res){
        let json = util.getJsonFile('./userInfo.json');
        res.json(Mock.mock(json));
    });
}