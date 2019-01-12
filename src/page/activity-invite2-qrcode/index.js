import 'common/styles/reset.scss'
import './index.sass'
import { getQueryString, getPlatform, loadScript } from 'util'
import Home from './js/Home'


let userId = getQueryString('userId')
let source = getQueryString('sc')
let version = getQueryString('version')
let packageId = getQueryString('packageId')
let appName = getQueryString('appName') || '考拉有借'
let companyName = getQueryString('companyName') || '深圳钱花互联网金融服务有限公司'
let shortCompanyName = getQueryString('shortCompanyName') || '深圳钱花'

let plateform = getPlatform({isApp: true})

let params = {
    userId,
    version,
    packageId,
    appName,
    companyName,
    source,
    shortCompanyName,
    plateform
}

;(function main(){
    new Home(params)
    import(/*webpackChunkName:'activity-invite2-qrcode-async'*/'./js/component')
    // 友盟
    loadScript('//s23.cnzz.com/z_stat.php?id=1275551406&web_id=1275551406').then(() => {
        console.log('友盟 load')
        $('body').children('a').eq(0).hide();
    })
})();
