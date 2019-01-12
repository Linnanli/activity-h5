import md5 from 'md5'
import { getApiLocation } from './index'
//对象排序
function objKeySort(obj) {
    var newkey = Object.keys(obj).sort();
    var newObj = {};
    for (var i = 0; i < newkey.length; i++) {
        newObj[newkey[i]] = obj[newkey[i]];
    }
    return newObj;
}

//http请求
const http = ({ url = '', type = 'POST', data = {}, success = () => { }, error = () => { } }) => {
    let timeStamp = new Date().getTime(),
        sortData = objKeySort(data),
        apiHost = getApiLocation(),
        // apiHost = 'http://dxtg.kaolabill.com',
        dataStr = '';

    for (const key in sortData) {
        if (!sortData[key] && sortData[key] != 0)
            sortData[key] = '';

        dataStr += key + sortData[key];
    }

    let header = '0bca3e8e2baa42218040c5dbf6978f315e104e5c' + timeStamp + dataStr;
    let signValue = md5(md5(header));
    
    $.ajax({
        url: apiHost + url,
        type: type,
        headers: { 'accessKey': '699b9305418757ef9a26e5a32ca9dbfb', 'reqTime': timeStamp, 'sign': signValue },
        data: sortData,
        success: success,
        error: error
    });
}

export default http;