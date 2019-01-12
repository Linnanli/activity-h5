import http from 'util/async-http'
import { joinQueryStr, getBasePath } from 'util'
import toast from 'components/dialog/toast'
import loading from 'components/dialog/loading'
import { saveImg, isApp } from './app-api'

export default class Home {
    constructor(params) {
        this.params = params
        this.saveImgBtn = $('.save-img-btn button')
        if (isApp()) {
            this.saveImgBtn.text('保存图片')
        } else {
            this.saveImgBtn.text('截图分享')
        }
        this.bindEvent()
        this.initQR()
    }

    bindEvent() {
        $('.save-img-btn button').on('click', () => {
            if (isApp()) {
                window._czc && _czc.push(["_trackEvent", '邀请新人-二维码页面', '保存图片', , , 'web']);
                this.saveQRimg()
            }
        })
    }

    saveQRimg() {
        loading.start()
        const dom = document.querySelector('.warp')
        // const innerDOM = $('.container')
        const box = window.getComputedStyle(dom)
        // DOM 节点计算后宽高
        const width = parseInt(box.width, 10)
        const height = parseInt(box.height, 10)
        // 获取像素比
        const scaleBy = this.DPR()
        // 创建自定义 canvas 元素
        const canvas = document.createElement('canvas')
        // 设定 canvas 元素属性宽高为 DOM 节点宽高 * 像素比
        canvas.width = width * scaleBy
        canvas.height = height * scaleBy
        // 设定 canvas css宽高为 DOM 节点宽高
        canvas.style.width = `${width}px`
        canvas.style.height = `${height}px`
        // 获取画笔
        const context = canvas.getContext('2d')
        context.scale(scaleBy, scaleBy)

        // 兼容IOS图片无法居中的问题
        // let x = 0
        // if (this.params.plateform === 'IOS') {
        //     x = Math.ceil(-(width - innerDOM.width()) / 2)
        // }

        html2canvas(dom, {
            allowTaint: true,
            taintTest: false,
            height,
            width,
            // x,
            canvas
        }).then(async (canvas) => {
            loading.stop()
            var base64 = canvas.toDataURL('image/png', 1.0)
            console.log(base64)
            try {
                await saveImg(base64)
            } catch (error) {
                toast(error)
            }
        });
    }

    DPR() {
        if (window.devicePixelRatio && window.devicePixelRatio > 1) {
            return window.devicePixelRatio;
        }
        return 1;
    }

    async initQR() {
        loading.start()
        let basePath = `${window.location.protocol}//${window.location.host}${getBasePath()}`
        // 生成url
        let qrUrl = basePath + joinQueryStr('/activity-invite2-register.html', {
            userId: this.params.userId,
            version: this.params.version,
            packageId: this.params.packageId,
            appName: this.params.appName,
            companyName: this.params.companyName,
            sc: this.params.source,
            shortCompanyName: this.params.shortCompanyName
        })

        console.log(qrUrl)
        try {
            let {
                msg,
                code,
                data
            } = await http({
                url: '/s5/QrCodeController/generateQrCode',
                data: {
                    qrUrl
                }
            })
            loading.stop()
            if (code === 1000000) {
                $('#qrcode-box-img').attr('src', `data:image/png;base64,${data}`)
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