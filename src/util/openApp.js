import md5 from 'md5';
import { getApiLocation } from 'util'

let apiHost = getApiLocation();

function openApp({ platform = 'Android',iframe= false, openPtah = '', packageId = 'yingyongbao', phone = '12345678910'}) {
    if (openPtah === '')
        throw new Error('请传入参数');

    let timeStamp = new Date().getTime();
    let dataObj = { 
        sign: md5(md5("12345678910" + timeStamp)), 
        timestamp: timeStamp, 
        packageId: packageId, 
        phone: phone
    };
    if (platform === 'Android'){
        if (iframe){
            setOpenApp(openPtah);
        }else{
            $.ajax({
                url: `${apiHost}/h5/appclient/download`,
                type: 'POST',
                data: dataObj,
                success({ code, data }) {
                    let downUrl = '';
                    if (code === 1000000) {
                        downUrl = data;
                    } else {
                        downUrl = openPtah;
                    }

                    window.location.href = downUrl;
                },
                error() {
                    window.location.href = openPtah;
                }
            });
        }
        
    } else if (platform === 'IOS'){
        // setOpenApp(openPtah);
        window.location.href = openPtah;
    }
}

//设置用iframe 打开 App 商店
function setOpenApp(src) {
    var ifr = document.createElement('iframe');
    ifr.src = src;
    ifr.style.display = 'none';
    document.body.appendChild(ifr);
    let timer = setTimeout(function () {
        document.body.removeChild(ifr);
        clearTimeout(timer);
    }, 2000);
}

export default openApp;