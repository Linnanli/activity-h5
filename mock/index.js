module.exports = function(app){
    //获取用户数据
    app.get('/user/userinfo',function(rep,res){
        res.json({error:0,data:{text:'server test'}});
    });
}