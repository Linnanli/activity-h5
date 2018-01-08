require('./index.css');
var alert = require('component/alert');
console.log(alert);
function index(){
    var ele = document.getElementById('indexBody');
    ele.onclick = function(){
        // this.innerText = '触发click';
        alert.show('弹出alert');
    }
}

index();