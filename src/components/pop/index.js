import tpl from 'html-loader!./index.html'
import './index.scss'

class Pop{
    ele = null;
    titleEle = null;
    infoEle = null;
    constructor(){
        if (this.ele === null) {
            let box = $('<div>').html(tpl);
            this.ele = box.children().eq(0);
            $(document.body).append(this.ele);
        }
        this.titleEle = $('.alert-title');
        this.infoEle = $('.alert-info');
    }
    show({ title = '',info = '' }){
        this.titleEle.text(title);
        this.infoEle.text(info);
        this.ele.show();
        let timer = setTimeout(() => {
            this.ele.hide();
            clearTimeout(timer);
        }, 2000);   
    }
}

export default Pop;