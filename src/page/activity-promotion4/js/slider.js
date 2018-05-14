import { pxToRem } from 'util'

class Slider {
    boxHeight = 0;
    constructor(ele = null, speed = 1500){
        if (typeof ele !== 'object')
            throw new Error('请传入DOM');
        this.ele = ele;
        this.speed = speed;
        this.listItem = this.ele.children();
        this.index = 1;
        this.boxHeight = this.listItem.eq(0).height();
    }
    start(){
        setInterval(()=>{
            if (this.index !== this.listItem.length){
                this.animate(this.index,true);
                this.index++;
            }else{
                this.index = 0;
                this.animate(this.index, false);
            } 
        }, this.speed);
    }
    animate(index = 0,isAnimate){
        this.ele[0].style.transition = isAnimate?'transform 1s ease':'';
        this.ele[0].style.transform = `translateY(${-this.boxHeight * index}px)`;
    }
}

// function Slider(ele = null, speed = 1500){
//     if (typeof ele !== 'object')
//             throw new Error('请传入DOM');
//         this.ele = ele;
//         this.boxHeight = 0;
//         this.speed = speed;
//         this.listItem = this.ele.children();
//         this.index = 1;
//         this.boxHeight = this.listItem.eq(0).height();
// }
// Slider.prototype = {
//     constructor: Slider,
//     start() {
//         setInterval(()=>{
//             if (this.index !== this.listItem.length){
//                 this.animate(this.index,true);
//                 this.index++;
//             }else{
//                 this.index = 0;
//                 this.animate(this.index, false);
//             } 
//         }, this.speed);
//     },
//     animate(index = 0, isAnimate) {
//         this.ele[0].style.transition = isAnimate?'transform 1s ease':'';
//         this.ele[0].style.transform = `translateY(${pxToRem(-this.boxHeight * index)})`;
//     }
// };
export default Slider