// require('./index.css');
// var alert = require('component/alert');
// import alert from 'component/alert'
import './index.css'

var ele = document.getElementById('indexBody');
ele.onclick = function () {
    // $.ajax({
    //     url: '/user/userinfo',
    //     type: 'GET',
    //     success: function (data) {
    //         console.log(data);
    //         // if(data.error === 0)
    //             // alert.show(data.data.text);
    //     }
    // });
    import(/*webpackChunkName:"alert"*/'component/alert')
    .then((module)=>{
        var alert = module.default;
        alert.show('异步加载模块测试');
    });
}
