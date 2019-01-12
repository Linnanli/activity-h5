import { toPage, joinQueryStr } from 'util'
import http from 'util/async-http'
import toast from 'components/dialog/toast'
import loading from 'components/dialog/loading'

export default class Home{
    params = null
    constructor(params){
        this.params = params
        this.getMoney()
        this.bindEvnet()
    }

    bindEvnet(){
        $('.to-activity-page').on('click', () => {
            window._czc && _czc.push(["_trackEvent", '邀请新人-领红包页面', '赚更多现金', , , 'web']);
            let link = joinQueryStr('/activity-invite2-home.html', {
                userId: this.params.userId,
                version: this.params.version,
                packageId: this.params.packageId,
                appName: this.params.appName,
                companyName: this.params.companyName,
                sc: this.params.source,
                shortCompanyName: this.params.shortCompanyName
            })
            toPage(link)
        })

        $('.download-app').on('click', () => {
            window._czc && _czc.push(["_trackEvent", '邀请新人-领红包页面', '下载APP提现', , , 'web']);
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
            // this.downloadApp()
        })
    }

    async downloadApp() {
        let terminal = 0;
        let packageId = ''
        let platform = this.params.platform
        debugger
        if (platform === 'Android') {
            terminal = 1;
            // packageId = 'klyjaz_guanfang'
            packageId = this.params.packageId || 'klyjaz_guanfang'
        } else if (platform === 'IOS') {
            terminal = 2;
            // packageId = 'com.beiwo.klyjpg'
            packageId = this.params.packageId || 'com.beiwo.klyjpg'
        }

        try {
            let { code, data, msg } = await http({
                url: '/s1/version/lastVersion',
                data: {
                    terminal,
                    packageId
                }
            });
            if (code == 1000000 && data && data.versionUrl) {
                window.location.href = data.versionUrl;
            } else {
                toast(msg);
            }
        } catch (error) {
            console.log(error)
            toast('服务器错误');
        }

    }

    async getMoney(){
        try {
            let { msg, code, data } = await http({
                url: '/s5/RedPacketController/generateRandRed',
                data: {
                    userId: this.params.userId,
                    inviteUserId: this.params.inviteUserId
                }
            })
            loading.stop()
            if (code === 1000000) {
                $('.amount-num').text(data)
            } else {
                toast(msg)
            }

        } catch (error) {
            loading.stop()
            console.log(error)
            toast('服务器错误')
        }
    }
}