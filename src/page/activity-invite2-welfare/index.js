import 'common/styles/reset.scss'
import './index.sass'
import { getQueryString, loadScript } from 'util'
import Home from './js/Home'
import Product from './js/Product'
import loading from 'components/dialog/loading'
import toast from 'components/dialog/toast'
import http from 'util/async-http'

window.loading = loading
window.toast = toast
window.http = http

let userId = getQueryString('userId')
let version = getQueryString('version')
let packageId = getQueryString('packageId')
let appName = getQueryString('appName')
let shortCompanyName = getQueryString('shortCompanyName')
let companyName = getQueryString('companyName')
let source = getQueryString('sc')


let params = {
    userId,
    version,
    packageId,
    appName,
    shortCompanyName,
    companyName,
    source
}

;(function main(){
    const home = new Home(params)
    const product = new Product(params)
    import(/*webpackChunkName:'activity-invite2-welfare-async'*/'./components').then(({ InfoAlert, UploadAlert }) => {
        const infoAlert = new InfoAlert()
        home.infoAlert = infoAlert
        const uploadAlert = new UploadAlert()
        home.uploadAlert = uploadAlert
    })
    // 友盟
    loadScript('//s5.cnzz.com/z_stat.php?id=1275551830&web_id=1275551830').then(() => {
        console.log('友盟 load')
        window._czc && _czc.push(["_trackEvent", '邀请新人-新人福利', '打开页面', , , 'web']);
        $('body').children('a').eq(0).hide();
    })
})();

