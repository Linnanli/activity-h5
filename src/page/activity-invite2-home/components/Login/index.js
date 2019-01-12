import tpl from 'html-loader!./index.html'
import './index.sass'
import { toPage, joinQueryStr, setSessionStorage, getSessionStorage } from 'util'
import check from 'util/check'
import 'common/lib/zepto.cookie'
import 'zepto/src/touch'

export default class Login {
    ele = null
    time = 60
    params = null
    jumpPath = '' // 登录成功后的跳转地址
    jumpPathParams = null // 登录成功后的跳转地址带的参数
    constructor(params) {
        this.params = params
        this.render(tpl)
        this.phoneEle = $('.phone-input')
        this.checkCode = $('.check-code')
        this.checkCodeBtn = $('.check-code-btn')
        this.loginBtn = $('.login-btn')
        this.bindEvent() 
    }

    bindEvent() {
        $('.line-text').on('tap', () => {
            let link = joinQueryStr('/user-protocol.html', {
                appName: '考拉有借',
                companyName: '杭州贝沃科技有限公司',
                shortCompanyName: '贝沃科技'
            })
            toPage(link)
        })

        this.loginBtn.on('tap', () => {
            window._czc && _czc.push(["_trackEvent", '邀请新人-主页', '登录/注册', , , 'web']);
            this.doLogin()
        })

        this.checkCodeBtn.on('tap', () => {
            this.getCheckCode()
        })

        $('.close-btn').on('tap', () => {
            this.hide()
        })
    }

    show(path, params) {
        this.jumpPath = path
        this.jumpPathParams = params
        this.ele.show()
    }

    hide() {
        this.phoneEle.val('')
        this.checkCode.val('')
        this.checkCodeBtn.removeClass('disable')
        this.ele.hide()
    }

    countdown() {
        if (this.checkCodeBtn.hasClass('disable')) return false;
        this.checkCodeBtn.addClass('disable');
        let curTime = this.time;
        let timer = setInterval(() => {

            this.checkCodeBtn.text(curTime-- + '秒');

            if (curTime === -1) {
                this.checkCodeBtn.removeClass('disable').text('获取验证码');
                clearInterval(timer);
            }
        }, 1000);
    }

    async getCheckCode() {

        let phoneVal = this.phoneEle.val()
        if (!check('mobile', phoneVal)) {
            toast('请输入正确手机号码');
            return;
        }
        // 平台名称
        let platform = this.params.platform
        // 平台代码
        let platformNum = 0
        if (platform === 'Android') {
            platformNum = 2
        } else if (platform === 'IOS') {
            platformNum = 3
        } else {
            platformNum = 1
        }

        //开始倒计时
        if (this.countdown() === false) return;
        loading.start();

        //获取验证码
        try {
            let { msg } = await http({
                url: '/s1/sms/sendSms',
                data: {
                    type: '6',
                    phone: phoneVal,
                    platform: platformNum
                }
            })
            loading.stop()
            toast(msg)
        } catch (error) {
            loading.stop()
            console.log(error)
            toast('服务器错误')
        }
    }

    async doLogin() {
        let phoneVal = this.phoneEle.val()
        let checkcodeVal = this.checkCode.val()

        if (!check('mobile', phoneVal)) {
            return toast('请输入正确手机号码')
        }
        if (!check('required', checkcodeVal)) {
            return toast('请输入验证码')
        }
        loading.start()
        // 平台名称
        let platform = this.params.platform
        // 平台代码
        let platformNum = 0
        if (platform === 'Android') {
            platformNum = 1
        } else if (platform === 'IOS') {
            platformNum = 2
        } else {
            platformNum = 4
        }

        try {
            let { msg, code, data } = await http({
                url: '/s1/clientUser/login',
                data: {
                    account: phoneVal,
                    loginType: 2,
                    platform: platformNum, // todo
                    verifyCode: checkcodeVal,
                    active: 'ActiveC'
                }
            })
            loading.stop()
            if (code === 1000000) {
                // 讲userId拼进去刷新页面
                // 报错userId
                // setSessionStorage('userId', data.id)
                this.hide()
                this.jumpTarget(data)
            } else {
                toast(msg)
            }

        } catch (error) {
            loading.stop()
            console.log(error)
            toast('服务器错误')
        }
    }

    jumpTarget(data){
        this.setUserId(data.id)
        this.setCookie(data.account)
        this.jumpPathParams.userId = data.id
        let link = joinQueryStr(this.jumpPath, this.jumpPathParams)
        toPage(link)
    }

    async isLogin () {
        let phoneVal = this.getCookie()
        // 平台名称
        let platform = this.params.platform
        // 平台代码
        let platformNum = 0
        if (platform === 'Android') {
            platformNum = 1
        } else if (platform === 'IOS') {
            platformNum = 2
        } else {
            platformNum = 4
        }
        loading.start()
        try {
            let { code, data } = await http({
                url: '/s1/clientUser/login',
                data: {
                    account: phoneVal,
                    loginType: 2,
                    platform: platformNum, // todo
                    // verifyCode: checkcodeVal,
                    active: 'ActiveC'
                }
            })
            loading.stop()
            if (code === 1000000) {
                return Promise.resolve(data)
            } else {
                return Promise.resolve(null)
            }

        } catch (error) {
            loading.stop()
            console.log(error)
            toast('服务器错误')
        }
    }

    setUserId(userId) {
        this.params.userId = userId
        setSessionStorage('userId', userId)
    }

    getUserId() {
        return this.params.userId || getSessionStorage('userId')
    }

    setCookie(val){
        $.fn.cookie('phone', val)
    }

    getCookie(){
        return $.fn.cookie('phone')
    }

    render(template) {
        this.ele = $(template)
        $('body').append(this.ele)
        this.ele.find('.line-text').text(`《${this.params.appName}用户协议》`)
    }
}