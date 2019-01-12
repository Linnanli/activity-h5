import 'common/styles/reset.scss'
import './index.sass'
import Home from './js/Home'
import { getQueryString, loadScript } from 'util'

let userId = getQueryString('userId')
let packageId = getQueryString('packageId')
let version = getQueryString('version')
let source = getQueryString('sc')
let appName = getQueryString('appName') || '考拉有借'
let companyName = getQueryString('companyName') || '深圳钱花科技有限公司'
let shortCompanyName = getQueryString('shortCompanyName') || '钱花科技'

let params = {
    userId,
    packageId,
    version,
    appName,
    source,
    companyName,
    shortCompanyName
}

;(function main(){
    // 设置初始化首页
    new Home(params)
    // 友盟
    loadScript('//s5.cnzz.com/z_stat.php?id=1275551736&web_id=1275551736').then(() => {
        console.log('友盟 load')
        window._czc && _czc.push(["_trackEvent", '邀请新人-我的奖励', '打开页面', , , 'web']);
        $('body').children('a').eq(0).hide();
    })
})()
