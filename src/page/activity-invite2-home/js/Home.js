import ScrollList from './scrollList'
import { toPage, joinQueryStr } from 'util'
import { callAppLogin, isApp } from './app-api'
// import toast from 'components/dialog/toast' // todo 删除

export default class Activity{
    startBtn = null
    params = null
    constructor(params){
        this.params = params
        this.startBtn = $('.start-btn')
        this.prizesBtn = $('.prizes-btn-text')
        new ScrollList('.scroll-list')
        this.bindEvent()
    }

    bindEvent(){
        $('.rule-btn').on('click', () => {
            window._czc && _czc.push(["_trackEvent", '邀请新人-主页', '活动规则', , , 'web']);
            let link = joinQueryStr('/activity-invite2-rules.html', {
                title: '活动规则',
                appName: this.params.appName,
                companyName: this.params.companyName,
                shortCompanyName: this.params.shortCompanyName
            })
            toPage(link)
        })
    }
    // banner点击数统计，兼容
    async bannerCount(){
        await http({
            url: '/s1/supernatant/loadSupernatant',
            data: {
                id: this.params.bannerId,
                userId: this.params.userId || this.params.userIp,
                supernatantType: 2,
                packageId: this.params.packageId,
                version: this.params.version
            }
        })
    }

    bindStartBtnEvent(loginObject){
        
        this.startBtn.on('click', () => {
            window._czc && _czc.push(["_trackEvent", '邀请新人-主页', '立即赚钱', , , 'web']);
            // let userId = getSessionStorage('userId')
            let userId = loginObject.getUserId()
            if (userId) {
                loginObject.setUserId(userId)
            }

            let prizesPath = '/activity-invite2-qrcode.html'
            let prizesParams = {
                title: '二维码邀请',
                userId: this.params.userId,
                packageId: this.params.packageId,
                version: this.params.version,
                appName: this.params.appName,
                sc: this.params.source,
                companyName: this.params.companyName,
                shortCompanyName: this.params.shortCompanyName
            }
            
            // 如果已登录直接跳转
            if (this.params.userId) {
                let link = joinQueryStr(prizesPath, prizesParams)
                toPage(link)
            } else {
                // loginObject.show(prizesPath, prizesParams)
                this.showLogin(loginObject, prizesPath, prizesParams)
            }
        })

        this.prizesBtn.on('click', () => {
            window._czc && _czc.push(["_trackEvent", '邀请新人-主页', '我的奖励', , , 'web']);
            let userId = loginObject.getUserId()
            if (userId) {
                loginObject.setUserId(userId)
            }

            let prizesPath = '/activity-invite2-prizes.html'
            let prizesParams = {
                title: '我的奖励',
                userId: this.params.userId,
                packageId: this.params.packageId,
                version: this.params.version,
                appName: this.params.appName,
                sc: this.params.source,
                companyName: this.params.companyName,
                shortCompanyName: this.params.shortCompanyName
            }
            // 如果已登录直接跳转
            if (this.params.userId) {
                let link = joinQueryStr(prizesPath, prizesParams)
                toPage(link)
            } else {
                // loginObject.show(prizesPath, prizesParams)
                this.showLogin(loginObject,prizesPath, prizesParams)
            }
        })
        
    }

    async showLogin(loginObject, prizesPath, prizesParams){
        let res = isApp()
        debugger
        // 如果不是app的话，直接使用web的登录框
        if (res === false) {
            let data = await loginObject.isLogin()
            if (!data) {
                loginObject.show(prizesPath, prizesParams)
            } else {
                loginObject.jumpPathParams = prizesParams
                loginObject.jumpPath = prizesPath
                loginObject.jumpTarget(data)
            }
            
        } else {
            try{
                let res = await callAppLogin()
                let userInfo
                let data
                // ios 返回数据格式 { data: { userId: '' }, msg: '' }
                // android 返回数据格式 { userId: '' }
                if (this.params.platform === 'IOS') {
                    if (typeof res === 'string') {
                        userInfo = JSON.parse(res)
                    } else {
                        userInfo = res
                    }
                    data = userInfo.data
                } else {
                    if (typeof res === 'string') {
                        data = JSON.parse(res)
                    } else {
                        data = res
                    }
                }
                loginObject.setUserId(data.id)
                prizesParams.userId = data.id
                let link = joinQueryStr(prizesPath, prizesParams)
                toPage(link)
            }catch(error){
                alert(JSON.stringify(error))
            }
        }
    }
}