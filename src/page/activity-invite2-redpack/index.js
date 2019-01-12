import 'common/styles/reset.scss'
import './index.sass'
import { getQueryString, getPlatform, loadScript } from 'util'
import Home from './js/Home'

let userId = getQueryString('userId')
let inviteUserId = getQueryString('inviteUserId')
let version = getQueryString('version')
let packageId = getQueryString('packageId')
let appName = getQueryString('appName')
let source = getQueryString('sc')
let companyName = getQueryString('companyName')
let shortCompanyName = getQueryString('shortCompanyName')

let platform = getPlatform({ isApp: true})

let params = {
    userId,
    inviteUserId,
    version,
    packageId,
    appName,
    companyName,
    shortCompanyName,
    source,
    platform
}

;(function main(){
    new Home(params)
    // 友盟
    loadScript('//s23.cnzz.com/z_stat.php?id=1275551577&web_id=1275551577').then(() => {
        console.log('友盟 load')
        $('body').children('a').eq(0).hide();
    })
})();