import './index.scss'
import tpl from 'html-loader!./index.html'
import { screenLockScroll, screenUnlockScroll } from 'util'

class Protocol {
    constructor() {
        this.ele = $(tpl);
        this.closeBtn = this.ele.find('.back-icon');
        this.appNameEle = this.ele.find('.appName');
        this.companyNameEle = this.ele.find('.companyName');
        this.shortCompanyNameEle = this.ele.find('.shortCompanyName');
        $('body').append(this.ele);
        this.bindEvent();
    }
    bindEvent() {
        this.closeBtn.on('click', () => {
            this.hide();
        });
    }
    show(appName = '考拉记账', companyName = '杭州贝沃科技有限公司', shortCompanyName = '杭州贝沃科技') {
        this.appNameEle.text(appName);
        this.companyNameEle.text(companyName);
        this.shortCompanyNameEle.text(shortCompanyName);
        this.ele.show();
        screenLockScroll();
    }
    hide() {
        this.ele.hide();
        screenUnlockScroll();
    }
}

export default Protocol
