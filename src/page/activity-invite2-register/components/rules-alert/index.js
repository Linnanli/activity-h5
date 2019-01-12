import tpl from 'html-loader!./index.html'
import './index.scss'
import { screenLockScroll, screenUnlockScroll } from 'util'

class RulesAlert{
    params = null
    constructor(params){
        this.params = params
        this.ele = $(tpl);
        this.contain = this.ele.find('.rules-alert-contain');
        this.titleEle = this.ele.find('.rules-alert-title');
        this.closeBtn = this.ele.find('.rules-alert-close');
        $(document.body).append(this.ele)
        this.bindEvent()
    }

    bindEvent(){
        this.closeBtn.on('click',() => {
            this.hide()
        })
    }

    setContain(title,list){
        this.titleEle = title;
        let tpl = '';
        list.forEach((item, index) => {
            tpl += `<div class="rules-alert-text">${item}</div>`
        });
        this.contain.html(tpl);
        this.appNameEle = this.ele.find('.appName')
    }

    show(){
        screenLockScroll();
        debugger
        this.appNameEle.text(this.params.appName);
        this.ele.show();
    }

    hide(){
        screenUnlockScroll();
        this.ele.hide();
    }
}

export default RulesAlert