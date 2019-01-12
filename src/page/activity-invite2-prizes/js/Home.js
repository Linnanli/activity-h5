import { toPage } from 'util'
import http from 'util/async-http'
import { getQueryString, timeout, joinQueryStr } from 'util'
import toast from 'components/dialog/toast'
import loading from 'components/dialog/loading'

let userId = getQueryString('userId')

export default class Activity{
    startBtn = null
    mescroll = null
    params = null
    constructor(params){
        this.params = params
        this.startBtn = $('.start-btn')
        this.topBar = $('.top-bar')
        this.leftAmount = $('.left-amount')
        this.inviteInfo = $('.invite-info')
        this.container = $('.container') 
        this.tbody = $('.tbody')
        this.bindEvent()
        this.getMyPrizes()
    }

    bindEvent(){
        let params = {
            title: '',
            userId: this.params.userId,
            packageId: this.params.packageId,
            version: this.params.version,
            appName: this.params.appName,
            sc: this.params.source,
            companyName: this.params.companyName,
            shortCompanyName: this.params.shortCompanyName
        }
        this.startBtn.on('click', () => {
            window._czc && _czc.push(["_trackEvent", '邀请新人-我的奖励', '立即参与', , , 'web']);
            params.title = '新人福利'
            let link = joinQueryStr('/activity-invite2-welfare.html', params)
            toPage(link)
        })

        $('.invite-prompt-btn').on('click', () => {
            window._czc && _czc.push(["_trackEvent", '邀请新人-我的奖励', '邀请好友', , , 'web']);
            params.title = '二维码邀请'
            let link = joinQueryStr('/activity-invite2-qrcode.html', params)
            toPage(link)
        })
    }

    initMescroll(){
        this.mescroll = new MeScroll($('.mescroll')[0], {
            down: {
                isLock: true,
            },
            up: {
                page: {
                    num: 1, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
                    size: 10 //每页数据条数,默认10
                },
                callback: (page) => {
                    this.getInviteList({
                        pageNo: page.num - 1,
                        pageSize: page.size,
                    })
                }
            }
        })
    }

    async getMyPrizes(){
        loading.start()
        try {
            let {
                msg,
                code,
                data
            } = await http({
                url: '/s5/RedPacketQueryController/queryHeadReward',
                data: {
                    userId
                }
            })
            loading.stop()
            if (code === 1000000) {
                this.setStatus(data)
            } else {
                toast(msg)
            }

        } catch (error) {
            loading.stop()
            console.log(error)
            toast('服务器错误')
        }
    }

    setStatus(data){
        // 被邀请金额为0，表示 该用户不是通过被邀请注册
        // 隐藏头部
        if (!data.regReward) {
            this.topBar.hide()
        } else {
            this.leftAmount.text(data.regReward)
        }

        // 邀请人数为0，则隐藏栏目
        // 显示邀请好友按钮
        if (data.invitationNum) {
            this.container.removeClass('empty')
            this.inviteInfo.find('.invite-amount').text(data.invitationReward)
            this.inviteInfo.find('.invite-person-num').text(data.invitationNum)
            this.initMescroll()
        }
    }

    async getInviteList({ pageNo, pageSize }){
        try {
            let {
                msg,code,data
            } = await http({
                url: '/s5/RedPacketQueryController/queryRewardList',
                data: {
                    userId,
                    pageNo,
                    pageSize
                }
            })
            if (code === 1000000) {
                debugger
                this.renderInviteList(data)
                let hasNext = false
                if (data.length === 10) 
                    hasNext = true
                await timeout(800)
                this.mescroll.endSuccess(0, hasNext) 
            } else {
                this.mescroll.endErr()
                toast(msg)
            }

        } catch (error) {
            this.mescroll.endErr()
            console.log(error)
            toast('服务器错误')
        }
    }

    renderInviteList(data){
        let tpl = ''
        for (let index = 0; index < data.length; index++) {
            const item = data[index]
            tpl += `
                <tr>
                    <td>${item.account}</td>
                    <td>${item.gmtCreate}</td>
                    <td>${item.inviteMoney || 0}</td>
                </tr>
                `
        }
        
        this.tbody.html(tpl)
    }
}