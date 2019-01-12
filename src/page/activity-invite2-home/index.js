import 'common/styles/reset.scss'
import './index.sass'
import { getQueryString, getPlatform, getSessionStorage, loadScript } from 'util'
import Home from './js/Home'
import http from 'util/async-http'
import toast from 'components/dialog/toast'
import loading from 'components/dialog/loading'

let userId = getQueryString('userId') || getSessionStorage('userId')
let packageId = getQueryString('packageId')
let version = getQueryString('version')
let source = getQueryString('sc')
let appName = getQueryString('appName') || '考拉有借'
let companyName = getQueryString('companyName') || '深圳钱花科技有限公司'
let shortCompanyName = getQueryString('shortCompanyName') || '钱花科技'
let bannerId = getQueryString('bannerId')
let platform = getPlatform({ isApp: true })


window.http = http
window.toast = toast
window.loading = loading

// 设置参数
let params = {
    userId,
    packageId,
    version,
    platform,
    source,
    appName,
    companyName,
    shortCompanyName,
    userIp: '',
    bannerId
}

;(function main(){
    // 设置初始化首页
    const home = new Home(params)
    import(/*webpackChunkName:'activity-invite2-home-async'*/'./js/async-module').then(({ Login }) => {
        const login = new Login(params)
        home.bindStartBtnEvent(login)
    })

    // 友盟
    loadScript('//s96.cnzz.com/z_stat.php?id=1275551257&web_id=1275551257').then(() => {
        console.log('友盟 load')
        window._czc && _czc.push(["_trackEvent", '邀请新人-主页', '打开页面', , , 'web']);
        $('body').children('a').eq(0).hide();
    })

    // 异步获取user ip
    loadScript('//pv.sohu.com/cityjson?ie=utf-8').then(() => {
        console.log('user ip load')
        params.userIp = returnCitySN.cip
        if (!params.sc && params.bannerId) {
            home.bannerCount()
        }
    })
})()
