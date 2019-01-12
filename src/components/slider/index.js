import './index.scss';

class Slider {
    boxHeight = 0;
    constructor(ele = null, speed = 1500) {
        if (typeof ele !== 'object')
            throw new Error('请传入DOM');
        this.ele = ele;
        this.box = this.ele.parent();
        this.box.css('position','relative');
        this.speed = speed;
        this.listItem = this.ele.children();
        this.index = 1;
        this.boxHeight = this.listItem.eq(0).height();
    }
    start() {
        setInterval(() => {
            if (this.index !== this.listItem.length) {
                this.animate(this.index, true);
                this.index++;
            } else {
                this.index = 0;
                this.animate(this.index, false);
            }
        }, this.speed);
    }
    animate(index = 0, isAnimate) {
        if (isAnimate){
            this.ele.addClass('slider-animation');
        }else{
            this.ele.removeClass('slider-animation');
        }
        this.ele.css({
            top: `${-this.boxHeight * index}px`
        });
    }
}

export default Slider