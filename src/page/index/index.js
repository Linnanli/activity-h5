require('./login.css')

function Login(){
    var ele = document.getElementById('loginBody');
    ele.onclick = function(){
        this.innerText = '触发click';
    }
}

Login();