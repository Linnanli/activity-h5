import Slider from 'components/slider2.0'
import createData from './scrollData'

export default class ScrollList {
    scrollListEle = null
    constructor(boxEle) {
        this.scrollListEle = $(boxEle)
        // 生成并渲染20条数据
        this.render(createData(20))
        let slider = new Slider(boxEle, 2000)
        slider.start()
    }
    // 渲染模板
    render(list) {
        let tpl = ''
        for (let index = 0; index < list.length; index++) {
            const item = list[index];
            tpl += `
                <div class="scroll-item"><span>${item.name}</span> 已获得邀友现金奖励${item.price}元</div>
            `
        }

        this.scrollListEle.html(tpl)
    }
}