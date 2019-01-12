import 'common/styles/reset.scss'
import './index.scss'
import { getQueryString, getPlatform, getLocalStorage, formatNumber, setLocalStorage, timeout, toPage, joinQueryStr, loadScript } from 'util'
import toast from 'components/dialog/toast'
import loading from 'components/dialog/loading'
import http from 'util/async-http'
import check from 'util/check'

let userId = getQueryString('userId');
let version = getQueryString('version');
let packageId = getQueryString('packageId');
let appName = getQueryString('appName') || '考拉有借';
let companyName = getQueryString('companyName') || '深圳钱花科技有限公司';
let shortCompanyName = getQueryString('shortCompanyName') || '钱花科技';
let source = getQueryString('sc')
let platformName = getPlatform({ isApp: true });

let resultAlert = null;
// 延迟加载组件，减少首屏js包的大小
; (async () => {
    let chunk = await import(/*webpackChunkName:'activity-invite2-register-async'*/'./js/component.js')
    let Component = chunk.default;
    resultAlert = new Component({
        appName,
        companyName,
        shortCompanyName,
        packageId,
        version,
        userId
    }).resultAlert;
    resultAlert.setHttpHandle(http);
})();

// 友盟
loadScript('//s5.cnzz.com/z_stat.php?id=1275551512&web_id=1275551512').then(() => {
    console.log('友盟 load')
    window._czc && _czc.push(["_trackEvent", '邀请新人-注册页面', '打开页面', , , 'web']);
    $('body').children('a').eq(0).hide();
})

class Activity{
    time = 30;
    account = '';
    token = ''
    activeStatus = '1'
    constructor(){
        this.getCheckcodeBtn = $('#getCheckcodeBtn');
        this.inputPhone = $('#inputPhone');
        this.inputCheckcode = $('#inputCheckcode');
        this.rulesBtn = $('#rules-btn');
        this.personNumEle = $('.person-num span');
        this.verifyImg = $('#verify-btn img')
        this.verifyInput = $('.verify-input input')
        this.startBtn = $('#startBtn');
        this.activeStatusBar = $('.active-status-bar');
        if (platformName === 'Android') {
            this.platform = 4;
        } else if (platformName === 'IOS') {
            this.platform = 5;
        } else {
            this.platform = 3;
        }
        
        this.genarateToken()
        this.bindeEvent();
        this.setPersonNumber()
        this.initParams();
    }

    bindeEvent(){
        this.getCheckcodeBtn.on('click', () => {
            if (!this.getCheckcodeBtn.hasClass('disable')) {
                //获取验证码,发送短信
                this.getCheckCode();
            }
        });
        this.startBtn.on('click', () => {
            if (!this.startBtn.hasClass('disabled')) {
                window._czc && _czc.push(["_trackEvent", '邀请新人-注册页面', '领取红包', , , 'web']);
                //提交表单
                this.submit();
            }
        });
        this.verifyImg.on('click', () => {
            this.getVerifyImg()
        })
    }

    genarateToken(){
        this.pagetoken =  (Date.now().toString(32) + Math.random().toString(32)).replace('.', '')
    }

    // 设置人数
    setPersonNumber() {
        let _this = this
        setPersonNumber()
        setInterval(setPersonNumber, 1000 * 60)

        function setPersonNumber() {
            let now = Date.now()
            let personNum = getLocalStorage('personNum')

            if (personNum === null) {
                setLocalStorage('personNum', {
                    num: 100658,
                    time: now
                })
            } else {
                _this.personNumEle.text(formatNumber(personNum.num));
                // 如果已经过去5分钟,那么人数加60
                if (now - personNum.time >= 1000 * 60 * 5) {
                    console.log(1)
                    let newNum = personNum.num + 60
                    setLocalStorage('personNum', {
                        num: newNum,
                        time: now
                    })
                    _this.personNumEle.text(formatNumber(newNum));
                }
            }
        }

    }

    // 获取验证码
    async getCheckCode() {
        let phoneVal = this.inputPhone.val();
        if (!phoneVal) {
            toast('手机号不能为空');
            return;
        }
        if (!check('mobile', phoneVal)) {
            toast('请输入正确手机号码');
            return;
        }
        let res = await this.validateVerifyCode()
        if (!res) return

        let platform = 0;
        if (platformName === 'Android') {
            platform = 2;
        } else if (platformName === 'IOS') {
            platform = 3;
        } else {
            platform = 1;
        }
        //开始倒计时
        if (this.isCountdown() === false) return

        loading.start();
        //获取验证码
        try {
            let { code, msg, data } = await http({
                url: '/s1/sms/sendSms',
                data: {
                    type: 0,
                    phone: phoneVal,
                    platform: platform
                }
            });
            loading.stop();
            if (code === 100006) {
                toast('已注册老用户不能重复被邀请哦');
                // resultAlert.show('faild', '已注册老用户不能重复被邀请哦')
            }else {
                this.countdown()
                toast(msg);
            }
        } catch (error) {
            loading.stop();
            toast('服务器错误');
        }
    }
    // 倒计时
    countdown(){
        if(this.getCheckcodeBtn.hasClass('disable')) return false;
        this.getCheckcodeBtn.addClass('disable');
        let curTime = this.time;

        let timer = setInterval(() => {
            
            this.getCheckcodeBtn.text(curTime-- + '秒');

            if (curTime === -1){
                this.getCheckcodeBtn.removeClass('disable').text('获取验证码');
                clearInterval(timer);
            }
        },1000);
    }

    isCountdown(){
        if (this.getCheckcodeBtn.hasClass('disable')) return false;
        return true;
    }
    // 初始化加载
    async initParams(){
        loading.start();
        await this.getPersonInfo()
        await this.getActiveStatus()
        loading.stop();
        if (this.activeStatus === '1') {
            this.getVerifyImg()
        }
    }

    async getPersonInfo(){
        try {
            let { code, data = {}, msg } = await http({
                url: '/s1/clientUserDetail/personalCenter',
                data: {
                    userId
                }
            })
            
            if (code === 1000000) {
                this.account = data.account;
            } else {
                loading.stop();
                toast(msg);
            }
        } catch (error) {
            loading.stop();
            toast('服务器错误');
            console.log(error)
        }
    }

    async getActiveStatus(){
        try {
            let { code, data, msg } = await http({
                url: '/s5/RedPacketQueryController/getActiveStatus'
            })
            
            if (code === 1000000) {
                this.activeStatus = data.status;
                this.setActiveStatus(data.status)
            } else {
                loading.stop();
                toast(msg);
            }
        } catch (error) {
            loading.stop();
            toast('服务器错误');
            console.log(error)
        }
    }
    
    setActiveStatus(status){
        if (status === '0') {
            this.getCheckcodeBtn.addClass('disable')
            this.startBtn.addClass('disabled')
            this.activeStatusBar.show()
        }
    }

    // 校验验证码
    async validateCheckCode(){
        try {
            let res = await http({
                url: '/s1/clientUser/verificationCodeVerify',
                data: {
                    platform: this.platform,
                    verificationCode: this.inputCheckcode.val(),
                    verificationCodeType: '0',
                    account: this.inputPhone.val()
                }
            })
            return Promise.resolve(res);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    // 提交数据
    async submit(){

        let phoneVal = this.inputPhone.val(),
            checkCodeVal = this.inputCheckcode.val();

        if (!phoneVal) {
            toast('手机号不能为空');
            return;
        }
        if (!check('mobile', phoneVal)) {
            toast('请输入正确手机号码');
            return;
        } else if (!check('required', checkCodeVal)) {
            toast('请输入验证码');
            return;
        }

        loading.start();

        try {
            // 验证码验证
            let res1 = await this.validateCheckCode();
            loading.stop();
            if (res1.code === 1000000){
                // 注册请求
                let res2 = await http({
                    url: '/s1/clientUser/register',
                    data: {
                        account: phoneVal,
                        inviteUserId: userId,
                        pwd: md5(sha512('000000') + phoneVal).toUpperCase(),
                        // platformNum: this.platform,
                        platform: this.platform,
                        inviteCode: this.account
                    }
                });
                toast(res2.msg);
                await timeout(500)
                if (res2.code === 1000000) {
                    let data = res2.data || {}
                    let link = joinQueryStr('/activity-invite2-redpack.html', {
                        userId: data.id, //新注册成功用户
                        inviteUserId: userId,
                        version,
                        packageId,
                        appName,
                        companyName,
                        sc: source,
                        shortCompanyName
                    })
                    toPage(link)
                }
            // 提示已注册
            } else if (res1.code === 100006) {
                // resultAlert.show('faild', '已注册老用户不能重复被邀请哦')
                toast('已注册老用户不能重复被邀请哦');
            // 其他失败状态
            } else {
                toast(res1.msg);
            }
        } catch (error) {
            loading.stop();
            toast('服务器错误');
            console.log(error);
        }
        
    }

    async getVerifyImg(){
        try {
            let { code, data, msg } = await http({
                url: '/s1/clientUser/getGraphicVerificationCode',
                data: {
                    verificationCodeType: 0,
                    pagetoken: this.pagetoken
                }
            })
            if (code === 1000000) {
                this.verifyImg.attr('src', data.base64)
            } else {
                toast(msg);
            }
        } catch (error) {
            loading.stop();
            toast('服务器错误');
            console.log(error)
        }
    }

    async validateVerifyCode(){
        let verifyVal = this.verifyInput.val()
        if (!verifyVal) {
            toast('请填写图像验证码')
            return Promise.resolve(false)
        }
        try {
            let { code, data, msg } = await http({
                url: '/s1/clientUser/verifyGraphicVerificationCode',
                data: {
                    verificationCodeType: 0,
                    pagetoken: this.pagetoken,
                    graphicVerificationCode: verifyVal
                }
            })
            if (code === 1000000) {
                return Promise.resolve(true)            
            } else {
                this.verifyImg.attr('src', data.base64)
                toast(msg)
                return Promise.resolve(false) 
            }
        } catch (error) {
            loading.stop();
            toast('服务器错误');
            console.log(error)
        }
    }
}

new Activity()