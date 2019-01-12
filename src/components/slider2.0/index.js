import './index.sass';

class Slider {
    boxHeight = 0
    index = 1
    speed = 0
    timer = null
    constructor(ele = null, speed = 1500) {
        this.ele = $(ele);
        this.scrollWarpEle = this.ele.parent();
        this.scrollWarpEle.css({
            'position': 'relative',
            'overflow': 'hidden',
            'font-size': '12px'
        });
        this.speed = speed;
        this.boxHeight = this.scrollWarpEle.height();
        this.listItem = this.ele.children();

        this.listItem.css({
            'height': this.boxHeight + 'px',
            'line-height': this.boxHeight + 'px',
        })
    }
    start() {
        this.ele.addClass('slider-animation');
        this.timer = setInterval(() => {
            // debugger
            if (this.index !== this.listItem.length) {
                this.animate(this.index);
                this.index++;
            } else {
                this.index = 0;
                this.removeAnimate()
            }
        }, this.speed);
    }

    stop(){
        clearInterval(this.timer)
    }

    animate(index = 0) {
        this.ele.addClass('slider-animation');
        this.ele.css({
            top: `${-this.boxHeight * index}px`
        });
    }

    removeAnimate(){
        this.ele.removeClass('slider-animation');
        this.ele.css({
            top: '0px'
        });
    }
}

export default Slider