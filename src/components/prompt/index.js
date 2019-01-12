import tpl from 'html-loader!./index.html';
import './index.scss';

class Prompt {
    ele = null;
    contain = null;
    constructor(){
        if (this.ele === null) {
            let box = $('<div>').html(tpl);
            this.ele = box.children().eq(0);
            $(document.body).append(this.ele);
        }

        this.contain = this.ele.find('.prompt-contain');
        this.ele.on('click',(e)=>{
            this.ele.hide();
        });
        this.contain.on('click',(e)=>{
            e.stopPropagation();
        });
    }
    show(text = ''){
        this.contain.html(text);
        this.ele.show();
    }
}

export default Prompt;