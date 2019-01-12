import md5 from 'md5';
import { getApiLocation } from './index'

window.md5 = md5
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
const http = ({ url = '', type = 'POST', host = '', data = {}, headers = {}, processData, contentType }) => {
    let timeStamp = new Date().getTime(),
        sortData = objKeySort(data),
        apiHost = !host ? getApiLocation() : host, // 是否使用默认host
        dataStr = '';

    for (const key in sortData) {
        if (!sortData[key] && sortData[key] != 0)
            sortData[key] = '';

        // console.log()
        if (typeof sortData[key] === 'object') continue
        dataStr += key + sortData[key];
    }

    let header = '0bca3e8e2baa42218040c5dbf6978f315e104e5c' + timeStamp + dataStr;
    let signValue = md5(md5(header));

    let signHeaders = { 'accessKey': '699b9305418757ef9a26e5a32ca9dbfb', 'reqTime': timeStamp, 'sign': signValue }

    for (const key in headers) {
        signHeaders[key] = headers[key]
    }

    return new Promise((resolve, reject) => {
        $.ajax({
            url: apiHost + url,
            type: type,
            headers: signHeaders,
            data: sortData,
            processData,
            contentType,
            success: (res) => {
                resolve(res);
            },
            error: (error) => {
                reject(error);
            }
        });
    });

}

export default http;
