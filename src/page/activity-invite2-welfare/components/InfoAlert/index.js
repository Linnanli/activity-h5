import tpl from 'html-loader!./index.html'
import './index.sass'

export default class InfoAlert{
    ele = null
    constructor(){
        this.render(tpl)
        this.infoAlertTitle = $('.info-alert-title')
        this.infoAlertPrompt = $('.info-alert-prompt')
        this.infoAlertBtn = $('.info-alert-btn')
    }

    show() {
        this.ele.show()
        return new Promise((resolve) => {
            this.infoAlertBtn.on('click', (e) => {
                resolve(true)
                this.hide()
                // 触发成功后删除click 事件，方便下次触发
                this.infoAlertBtn.off('click')
                e.stopPropagation()
            })
        })
    }

    hide() {
        this.ele.hide()
    }

    render(template) {
        this.ele = $(template)
        $('body').append(this.ele)
    }
}