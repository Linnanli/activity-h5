import './index.scss';
import tpl from 'html-loader!./index.html';

//loading
class Loading {
    ele = null;
    constructor() {
        if (this.ele === null) {
            let box = $('<div>').html(tpl);
            this.ele = box.children().eq(0);
            $(document.body).append(this.ele);
        }
    }
    start() {
        this.ele.show();
    }
    stop(callback = ()=>{}) {
        this.ele.hide();

        let timer = setTimeout(() => {
            callback.call(this);
            clearTimeout(timer);
        }, 300);
    }
}

const loading = new Loading();

export default loading