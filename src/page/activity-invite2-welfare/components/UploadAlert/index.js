import tpl from 'html-loader!./index.html'
import './index.sass'
import { getApiLocation } from 'util'

export default class UploadAlert{
    ele = null
    alertPromise = null
    imgList = []
    maxLen = 0
    constructor(){
        this.render(tpl)
        this.uploadAlertTitle = $('.upload-alert-title')
        this.uploadAlertPrompt = $('.upload-alert-prompt')
        this.uploadAlertCancel = $('.upload-alert-cancel')
        this.uploadAlertConfirm = $('.upload-alert-confirm')
        this.uploadFileEle = $('.upload-file4')
        this.addBtn = $('.add-btn')
        this.uploadAlertContain = $('.upload-alert-contain')
        this.bindEvent()
    }

    bindEvent(){
        let _this = this
        this.addBtn.on('click', () => {
            this.uploadFileEle[0].click()
        })

        this.uploadFileEle.on('change', (e) => {
            this.addImg(e)
        })

        this.uploadAlertContain.on('click', '.remove-btn', function(){
            _this.removeImg($(this).parent())
        })
    }

    async addImg(e){
        if (this.maxLen === this.imgList.length) {
            toast(`图片数量不可超过${this.maxLen}张`)
            return
        }
        
        let target = e.target
        let files = target.files

        // 如果size大于4M，则不能上传
        if (Math.ceil(files[0].size / 1024) > 4000) {
            toast('图片不可超过4M大小')
            return
        }
        // 获取文件base64
        let base64 = await this.getImgBase64(files[0])

        try {
            // 保存成功返回id
            // let imgId = await this.saveImg(this.itemId, base64)
            let imgId = await this.saveImg2(this.itemId, files[0])
            // 清空input
            target.value = ''
            if (imgId) {
                this.imgList.push({
                    imgId
                })
                let tpl = `<div class="upload-alert-item show-img" data-id="${imgId}">
                                <div class="remove-btn"></div>
                                <div class="upload-alert-img">
                                    <img src="${base64}">
                                </div>
                            </div>`

                let ele = $(tpl)
                this.uploadAlertContain.prepend(ele)
                
            }
        } catch (error) {
            console.log(error)
        }

        // 如果满足上传数量，则可以点击上传
        if (this.maxLen === this.imgList.length){
            this.removeDisableConfirm()
        }
    }

    getImgBase64(file) {
        let ready = new FileReader()
        ready.readAsDataURL(file)
        return new Promise((resolve) => {
            ready.onload = function () {
                resolve(this.result)
            }
        })
    }

    removeImg(ele){
        let id = ele.data('id')
        let index = this.imgList.findIndex(item => item.imgId === id)
        // 获取要删除图片的ID
        let imgId = this.imgList[index].imgId
        this.imgList.splice(index, 1)
        ele.remove()
        // 删除
        this.queryDeleImg([imgId])
        // 图片数不满足，禁止点击
        if (this.maxLen !== this.imgList.length) {
            this.disableConfirm()
        }
    }

    async queryDeleImg(imgIdList){
        let uploadCount = 0
        for (let index = 0; index < imgIdList.length; index++) {
            const imgId = imgIdList[index]
            try {
                let { code, msg } = await http({
                    url: '/s5/RedPacketController/delActiveImg',
                    data: {
                        imgId
                    }
                })
                if (code === 1000000) {
                    uploadCount++
                    console.log(`图片'${imgId}'删除成功`)
                } else {
                    console.log(msg)
                }
            } catch (error) {
                console.log(error)
                loading.stop()
                toast(`服务器错误`)
            }
        }


        if (uploadCount === 0) {
            console.log('图片未删除成功，请重新操作')
        } else {
            // 提示上传结果
            if (uploadCount !== imgIdList.length) {
                console.log('图片删除完全，请重新删除')
            } else {
                console.log('图片删除成功')
            }
        }
    }

    disableConfirm(){
        this.uploadAlertConfirm.addClass('disable')
    }

    removeDisableConfirm() {
        this.uploadAlertConfirm.removeClass('disable')
    }

    show({ maxLen = 3, itemId }) {
        this.ele.show()
        // 保存参数
        this.maxLen = maxLen
        this.itemId = itemId
        this.alertPromise = new Promise((resolve, reject) => {
            this.uploadAlertCancel.one('click', (e) => {
                reject(this.imgList)
                // 取消时候删除远程库的图片
                let imgIdList = this.imgList.map(item => item.imgId)
                if (imgIdList.length > 0) {
                    this.queryDeleImg(imgIdList)
                }
                this.hide()
                e.stopPropagation()
            })

            this.uploadAlertConfirm.on('click', (e) => {
                if (this.uploadAlertConfirm.hasClass('disable')) {
                    return
                }
                resolve(this.imgList)
                this.hide()
                // 触发成功后删除click 事件，方便下次触发
                this.uploadAlertConfirm.off('click')
                e.stopPropagation()
            })
        })
        return this.alertPromise
    }

    // async saveImg(itemId, base64){
    //     debugger
    //     loading.start()

    //     let formData = new FormData()
    //     formData.append('itemId', itemId)
    //     // formData.append('file', file)

    //     try {
    //         let { code, msg, data } = await http({
    //             url: '/s5/RedPacketController/saveActiveImg',
    //             data: {
    //                 itemId,
    //                 base64
    //             }
    //         })
    //         loading.stop()
    //         if (code === 1000000) {
    //             toast(`图片上传成功`)
    //             return Promise.resolve(data)
    //         } else {
    //             toast(msg)
    //             return Promise.resolve('')
    //         }
    //     } catch (error) {
    //         loading.stop()
    //         toast(`服务器错误`)
    //         return Promise.reject(error)
    //     }
    // }

    // zepto 上传文件有BUG
    // 改用axios
    async saveImg2(itemId, file) {
        loading.start()
        
        try {
            let response = await axios.post(`${getApiLocation()}/s5/RedPacketController/saveMultiActiveImg`, {
                itemId,
                file
            }, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            let { code, msg, data } = response.data

            loading.stop()
            if (code === 1000000) {
                toast(`图片上传成功`)
                return Promise.resolve(data)
            } else {
                toast(msg)
                return Promise.resolve('')
            }
        } catch (error) {
            loading.stop()
            toast(`服务器错误`)
            return Promise.reject(error)
        }
    }

    hide() {
        this.ele.hide()
        this.imgList = []
        this.uploadAlertContain.find('.show-img').remove()
        this.disableConfirm()
    }

    render(template) {
        this.ele = $(template)
        $('body').append(this.ele)
    }
}