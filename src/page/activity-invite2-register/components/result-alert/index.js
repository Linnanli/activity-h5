import tpl from 'html-loader!./index.html'
import './index.scss'
import { getQueryString, getPlatform, toPage, joinQueryStr, screenLockScroll, screenUnlockScroll } from 'util'

let userId = getQueryString('id');
let source = getQueryString('source');
let version = getQueryString('version');
let packageId = getQueryString('packageId');
let platformName = getPlatform({ isApp: true, isWeChat: false });

class ResultAlert{
    constructor(){
        this.ele = $(tpl).find('.result-alert-mask');
        this.boxBody = this.ele.find('.result-alert-box');
        this.closeBtn = this.ele.find('.result-alert-close');
        this.startBtn = this.ele.find('.result-alert-btn');
        this.inputPhone = $('#inputPhone');
        $('body').append(this.ele);
        this.bindEvent();
    }

    bindEvent(){
        this.closeBtn.on('click', () => {
            this.hide();
        });

        this.startBtn.on('click', () => {
            this.hide();
            this.downloadApp();
        });
        
    }

    hide(){
        screenUnlockScroll()
        this.ele.hide();
    }

    show(type = '', title = ''){
        screenLockScroll()
        if (type === 'success') {
            this.boxBody .addClass('success').removeClass('faild');
        } else {
            this.boxBody.children('.title').text(title)
            this.boxBody.addClass('faild').removeClass('success');
        }
        this.ele.show();
    }

    // 设置http句柄
    setHttpHandle(http){
        this.http = http
    }
    // 埋点
    async countUv(type) {
        await this.http({
            url: '/s1/dataDictionary/countUv',
            data: {
                userId,
                type,
                source,
                version,
                packageId,
                phone: this.inputPhone.val()
            }
        });
    }

    isKLYJ() {
        if (packageId === 'com.beiwo.klyjpg') {
            return true
        } else if (/^klyjaz_/.test(packageId)) {
            return true
        }

        return false
    }

    //获取 下载 app 地址
    async downloadApp() {
        this.countUv('DownloadImmediately');

        if (this.isKLYJ()) {
            let path = joinQueryStr('/activity-download-app.html', {
                title: '考拉有借',
                isIosJumpGuide: '1',
                iosPId: 'com.beiwo.klyjpg',
                androidPId: 'klyjaz_guanfang',
                packageId: '',
                guideBg: '//static.kaolabill.com/H5TypeImage/24522ff5d5d64e96bb5d4124016e6eb3.png',
                logo: '//static.kaolabill.com/H5TypeImage/db938d26d7f444588a9185e0b055ffbf.png'
            })
            toPage(path)
            return
        }

        let terminal = 0;
        if (platformName === 'Android') {
            terminal = 1
            if (!packageId)
                packageId = 'com.beihui.market';
        } else if (platformName === 'IOS') {
            terminal = 2
            if (!packageId)
                packageId = 'com.beiwo.kljz';
        }
        try {
            let { code, data = {} } = await this.http({
                url: '/s1/version/lastVersion',
                // host: 'http://116.62.134.207:8082', // 测试host
                // host: 'https://api.kaolabill.com', // 正式host
                data: {
                    terminal,
                    packageId
                }
            });
            
            if (code == 1000000 && data && data.versionUrl) {
                window.location.href = data.versionUrl;
            }
        } catch (error) {
            console.error(error)
        }
    }
    
}

export default ResultAlert