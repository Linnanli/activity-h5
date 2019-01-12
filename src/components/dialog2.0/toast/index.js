import './index.scss';
import tpl from 'html-loader!./index.html';

// 提示框
class Toast {
    ele = null;
    constructor() {
        if (this.ele === null) {
            let box = $('<div>').html(tpl);
            this.ele = box.children().eq(0);
            $(document.body).append(this.ele);
        }
    }

    show(text = '', times = 1500,isAnimation = true) {
        // debugger
        if (text === '')
            throw new Error('请传入字符串');
        //修复IOS上动画渲染抖动的BUG
        if (isAnimation)
            this.ele.css('transition','transform .3s ease');
    
        this.ele.text(text).addClass('show');
        let timer = setTimeout(() => {
            this.ele.removeClass('show');
            clearTimeout(timer);
        }, times);
    }
}

const toast = new Toast();

export default function (...arg) {
    toast.show(...arg);
}