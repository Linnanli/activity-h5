require('./index.css');
var alert = require('component/alert');

var ele = document.getElementById('indexBody');
ele.onclick = function () {
    
    $.ajax({
        url: '/user/userinfo',
        type: 'GET',
        success: function (data) {
            if(data.error === 0)
                alert.show(data.data.text);
        }
    });
}
