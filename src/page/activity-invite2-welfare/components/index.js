import InfoAlerts from './InfoAlert'
import UploadAlerts from './UploadAlert'
import axios from 'axios'

import { formaterForm } from 'util'

window.axios = axios

axios.interceptors.request.use(function (config) {
    let timeStamp = new Date().getTime(),
        sortData = objKeySort(config.data),
        dataStr = '';

    for (const key in sortData) {
        if (!sortData[key] && sortData[key] != 0)
            sortData[key] = '';

        if (typeof sortData[key] === 'object') continue
            dataStr += key + sortData[key];
    }
    
    let header = '0bca3e8e2baa42218040c5dbf6978f315e104e5c' + timeStamp + dataStr;
    let signValue = md5(md5(header));

    let signHeaders = { 'accessKey': '699b9305418757ef9a26e5a32ca9dbfb', 'reqTime': timeStamp, 'sign': signValue }

    for (const key in signHeaders) {
        config.headers[key] = signHeaders[key]
    }

    config.data = formaterForm(config.data)

    return config
}, function (error) {
    return Promise.reject(error)
})


//对象排序
function objKeySort(obj) {
    var newkey = Object.keys(obj).sort();
    var newObj = {};
    for (var i = 0; i < newkey.length; i++) {
        newObj[newkey[i]] = obj[newkey[i]];
    }
    return newObj;
}

export const UploadAlert = UploadAlerts
export const InfoAlert = InfoAlerts