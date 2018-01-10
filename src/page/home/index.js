// require('./index.css');
import './index.css';


var ele = document.getElementById('indexBody');
ele.onclick = function () {
    $.ajax({
        url: '/user/userinfo',
        type: 'GET',
        success: function (data) {
            console.log(data);
            // if(data.error === 0)
                // alert.show(data.data.text);
        }
    });
}
