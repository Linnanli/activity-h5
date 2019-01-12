import tpl from 'html-loader!./index.html';
// import './index.scss';
import './index.scss';

class CopyAlert {
    ele = null;
    btn = null;
    constructor() {
        if (this.ele === null) {
            let box = $('<div>').html(tpl);
            this.ele = box.children().eq(0);
            this.infoEle = this.ele.find('.alert-info')
            $(document.body).append(this.ele);
        }

        this.btn = this.ele.find('.alert-btn');
        this.btn.on('click', (e) => {
            this.ele.hide();
        });
    }
    show(nodeStr = '关注“考拉记账App”公众号 <br>领取奖励') {
        this.infoEle.html(nodeStr)
        this.ele.show();
    }
}

export default CopyAlert;