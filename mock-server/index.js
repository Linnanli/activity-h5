const util = require('./util')
const Mock = require('mockjs')

module.exports = function(app){
    //获取热门产品
    app.post('/product/newDynamicList',function(rep,res){
        let json = util.getJsonFile('./newDynamicList.json');
        res.json(Mock.mock(json));
    });

    app.post('/product/list', function (rep, res) {
        let json = util.getJsonFile('./producList.json');
        res.json(Mock.mock(json));
    });
    //借款
    app.post('/product/queryBorrowingPrompt', function (rep, res) {
        let json = util.getJsonFile('./queryBorrowingScroll.json');
        res.json(Mock.mock(json));
    });
}