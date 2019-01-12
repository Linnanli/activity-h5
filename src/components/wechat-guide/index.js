import './index.scss'
import tpl from 'html-loader!./index.html'

class WechatGuide{
    ele = null;
    constructor(){
        if (this.ele === null) {
            let box = $('<div>').html(tpl);
            this.ele = box.children().eq(0);
            $(document.body).append(this.ele);
        }
    }
    show(logo = '//static.kaolabill.com/H5TypeImage/db938d26d7f444588a9185e0b055ffbf.png', title = '考拉有借'){
        this.ele.find('.logo img').attr('src', logo)
        this.ele.find('.title').text(title)
        this.ele.show();
    }
}

export default WechatGuide;