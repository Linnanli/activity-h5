import { toPage, joinQueryStr } from 'util'

export default class Home{
    acImoneyData = null
    acImoneyInitId = ''
    infoAlert = null // 绑定上传图片弹窗对象
    uploadAlert = null
    constructor(params){
        this.params = params
        this.headAmount = $('.head-amount')
        this.index1 = $('.index-1')
        this.index1Btn = this.index1.children('.task-btn')
        this.index2 = $('.index-2')
        this.index2Btn = this.index2.children('.task-btn')
        this.index3 = $('.index-3')
        this.index3Btn = this.index3.children('.task-btn')
        this.rulesBtn = $('.rules-btn')
        this.getInitParams()
        this.bindEvnet()
    }

    bindEvnet(){
        this.rulesBtn.on('click', () => {
            window._czc && _czc.push(["_trackEvent", '邀请新人-新人福利', '活动规则', , , 'web']);
            let link = joinQueryStr('/activity-invite2-rules2.html', {
                companyName: '考拉有借',
                title: '活动规则'
            })

            toPage(link)
        })
        this.index1Btn.on('click', () => {
            if (this.index1Btn.hasClass('disabled')) return
            if (!this.acImoneyData) return
            // 如果1还未开启则，点击开启
            if (!this.acImoneyData.acImoneyFirst) {
                this.openTask(this.acImoneyData.acImoneyInit.id, 1)
            } else if (this.acImoneyData.acImoneyFirst.auditStatus === '0' || this.acImoneyData.acImoneyFirst.auditStatus === '2') {
                let itemId = this.acImoneyData.acImoneyFirst.id
                // auditStatus === '0' 审核中，或者可以上传图片
                this.uploadAlert.show({ maxLen: 1, itemId }).then(async () => {
                    // 上传base64图片
                    await this.commitTask(itemId)
                    // toast('图片上传成功')
                    await this.infoAlert.show()
                    await this.getInitParams(true)
                    // this.saveImg(this.acImoneyData.acImoneyFirst.id, imgList, 1)
                })
            }
        })
        this.index2Btn.on('click', () => {
            if (this.index2Btn.hasClass('disabled')) return
            if (!this.acImoneyData) return
            // 如果2还未开启则，点击开启
            if (!this.acImoneyData.acImoneySecond) {
                this.openTask(this.acImoneyData.acImoneyInit.id, 2)
            } else if (this.acImoneyData.acImoneySecond.auditStatus === '0' || this.acImoneyData.acImoneySecond.auditStatus === '2') {
                // auditStatus === '0' 审核中，或者可以上传图片
                let itemId = this.acImoneyData.acImoneySecond.id
                this.uploadAlert.show({ maxLen: 3, itemId }).then(async () => {
                    await this.commitTask(itemId)
                    // toast('图片上传成功')
                    await this.infoAlert.show()
                    await this.getInitParams(true)
                    // this.saveImg(this.acImoneyData.acImoneySecond.id, imgList, 2)
                })
            }
            
        })
        this.index3Btn.on('click', () => {
            if (this.index3Btn.hasClass('disabled')) return
            if (!this.acImoneyData) return
            // 如果3还未开启则，点击开启
            if (!this.acImoneyData.acImoneyThird) {
                this.openTask(this.acImoneyData.acImoneyInit.id, 3)
            } else if (this.acImoneyData.acImoneyThird.auditStatus === '0' || this.acImoneyData.acImoneyThird.auditStatus === '2') {
                let itemId = this.acImoneyData.acImoneyThird.id
                // auditStatus === '0' 审核中，或者可以上传图片
                this.uploadAlert.show({ maxLen: 6, itemId }).then(async () => {
                    await this.commitTask(itemId)
                    // toast('图片上传成功')
                    await this.infoAlert.show()
                    await this.getInitParams(true)
                    // this.saveImg(this.acImoneyData.acImoneyThird.id, imgList ,3)
                })
            }
        })
    }

    async getInitParams(isShowAnimation = false){
        loading.start()
        try {
            let { code, msg, data } = await http({
                url: '/s5/RedPacketQueryController/queryWelfare',
                data: {
                    userId: this.params.userId
                }
            })

            loading.stop();
            if (code === 1000000) {
                this.acImoneyData = data
                // this.acImoneyInitId = data.acImoneyInit.id
                this.setStatus(data, isShowAnimation)
            } else {
                toast(msg)
            }
        } catch (error) {
            console.log(error)
            loading.stop()
            toast('服务器错误')
        }
    }

    setFirstStatus(firstData, secondtData, thirdData, { isShowAnimation }){
        // 任务1
        if (firstData) {
            let auditStatus = firstData.auditStatus
            
            // 初始状态
            if (auditStatus === '0') {
                this.index1Btn.text('上传图片').removeClass('disabled')
            } else if (auditStatus === '3') { // 审核中
                // 如果图片未上传则，可以上图片
                // 如果已上传则，显示审核中
                this.removeErrorInfo(this.index1)
                if (firstData.imageList.length === 0) {
                    this.index1Btn.text('上传图片').removeClass('disabled')
                } else {
                    this.index1Btn.text('审核中').addClass('disabled')
                }
                // 审核成功
            } else if (auditStatus === '1') {
                this.index1Btn.text('已完成').addClass('disabled')
                // 执行动画
                if (isShowAnimation) {
                    this.index1.find('.task-item-multiple').addClass('done')
                }
                
                // 如果任务2还未开启的话，设置为可开启状态
                if (!secondtData) {
                    this.index2Btn.text('开启').removeClass('disabled')
                }
                // 审核不成功
            } else if (auditStatus === '2') {
                // 设置审核不通过的错误信息
                this.setErrorInfo(this.index1, firstData.auditContent)
                this.index1Btn.text('重新上传').removeClass('disabled')
            }
        } else {
            // 初始化值，为1，设置任务一可开启
            if (this.acImoneyData.acImoneyInit && this.acImoneyData.acImoneyInit.auditStatus === '1') {
                this.index1Btn.text('开启').removeClass('disabled')
            }
        }
    }

    setSecondStatus(firstData, secondtData, thirdData, { isShowAnimation }) {
        // 任务2
        if (secondtData) {
            let auditStatus = secondtData.auditStatus
            // 审核中
            if (auditStatus === '0') {
                this.index2Btn.text('上传图片').removeClass('disabled')
            } else if (auditStatus === '3') {
                // 如果图片未上传则，可以上图片
                // 如果已上传则，显示审核中
                this.removeErrorInfo(this.index2)
                if (secondtData.imageList.length === 0) {
                    this.index2Btn.text('上传图片').removeClass('disabled')
                } else {
                    this.index2Btn.text('审核中').addClass('disabled')
                }
                // 审核成功
            } else if (auditStatus === '1') {
                this.index2Btn.text('已完成').addClass('disabled')
                // 执行动画
                if (isShowAnimation) {
                    this.index2.find('.task-item-multiple').addClass('done')
                }
                // 如果任务3还未开启的话，设置为可开启状态
                if (!thirdData) {
                    this.index3Btn.text('开启').removeClass('disabled')
                }
                // 审核不成功
            } else if (auditStatus === '2') {
                // 设置审核不通过的错误信息
                this.setErrorInfo(this.index2, secondtData.auditContent)
                this.index2Btn.text('重新上传').removeClass('disabled')
            }
        }
    }

    setThirdStatus(firstData, secondtData, thirdData, { isShowAnimation }){
        // 任务3
        if (thirdData) {
            let auditStatus = thirdData.auditStatus

            if (auditStatus === '0') {
                this.index3Btn.text('上传图片').removeClass('disabled')
            } else if (auditStatus === '3') {
                // 审核中
                this.index3Btn.text('上传图片').removeClass('disabled')
                // 如果图片未上传则，可以上图片
                // 如果已上传则，显示审核中
                this.removeErrorInfo(this.index3)
                if (thirdData.imageList.length === 0) {
                    this.index3Btn.text('上传图片').removeClass('disabled')
                } else {
                    this.index3Btn.text('审核中').addClass('disabled')
                }
            } else if (auditStatus === '1') {
                // 审核成功
                this.index3Btn.text('已完成').addClass('disabled')
                // 执行动画
                if (isShowAnimation) {
                    this.index3.find('.task-item-multiple').addClass('done')
                }
            } else if (auditStatus === '2') {
                // 审核不成功
                // 设置审核不通过的错误信息
                this.setErrorInfo(this.index3, thirdData.auditContent)
                this.index3Btn.text('重新上传').removeClass('disabled')
            }
        }
    }

    setStatus(data, isShowAnimation){
        // 设置被邀奖金(元)
        if (data.totalImoney) {
            this.headAmount.text(data.totalImoney)
        }

        // 任务1
        this.setFirstStatus(data.acImoneyFirst, data.acImoneySecond, data.acImoneyThird, {
            isShowAnimation
        })
        // 任务2
        this.setSecondStatus(data.acImoneyFirst, data.acImoneySecond, data.acImoneyThird, {
            isShowAnimation
        })
        // 任务3
        this.setThirdStatus(data.acImoneyFirst, data.acImoneySecond, data.acImoneyThird, {
            isShowAnimation
        })
    }

    async openTask(initTaskId, taskNum){
        loading.start()
        try {
            let { code, msg, data } = await http({
                url: '/s5/RedPacketController/openTask',
                data: {
                    initTaskId,
                    taskNum
                }
            })

            loading.stop();
            if (code === 1000000) {
                this.getInitParams()
                toast('开启成功')
            } else {
                toast(msg)
            }
        } catch (error) {
            console.log(error)
            loading.stop()
            toast('服务器错误')
        }
    }

    //保存图片接口
    // async saveImg(itemId, imgList) {
    //     // let base64 = await this.getImgBase64(file)
    //     loading.start()
    //     let len = imgList.length
    //     let uploadCount = 0

    //     for (let index = 0; index < len; index++) {
    //         const base64 = imgList[index]
    //         try {
    //             let { code, msg, data } = await http({
    //                 url: '/s5/RedPacketController/saveActiveImg',
    //                 data: {
    //                     itemId,
    //                     base64
    //                 }
    //             })
    //             if (code === 1000000) {
    //                 // toast(`图片${index}上传成功`)
    //                 uploadCount++
    //             } else {
    //                 toast(`第${index + 1}张图片上传异常`)
    //                 // toast(msg)
    //             }
    //         } catch (error) {
    //             console.log(error)
    //             loading.stop()
    //             toast(`服务器错误`)
    //             // toast(JSON.stringify(error))
    //         }   
    //     }

    //     if (uploadCount === 0) {
    //         toast('图片未上传成功，请重新上传')
    //         await this.getInitParams(false)
    //     } else {
    //         // 提示上传结果
    //         if (uploadCount !== len) {
    //             toast('图片未上传完全，请重新上传')
    //             await this.getInitParams(false)
    //         } else {
    //             await this.commitTask(itemId)
    //             toast('图片上传成功')
    //             await this.getInitParams(true)
    //         }
    //     }
        
        
    //     loading.stop()
    // }

    // 提交任务
    async commitTask(itemId){
        loading.start()
        try {
            let { code, msg } = await http({
                url: '/s5/RedPacketController/commintTask',
                data: {
                    itemId
                }
            })
            loading.stop()
            if (code !== 1000000) {
                toast(msg)
            }
        } catch (error) {
            console.log(error)
            loading.stop()
            toast('服务器错误')
        }
    }

    setErrorInfo(ele, massge){
        ele.append(`<div class="task-error-info">${massge}</div>`)
    }
    removeErrorInfo(ele){
        ele.children('.task-error-info').remove()
    }
}