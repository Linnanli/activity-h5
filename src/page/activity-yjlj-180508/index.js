import 'common/styles/reset.scss';
import './index.scss';
import { webPoint, getQueryString } from 'util';

let userId = getQueryString('userId');
let url = getQueryString('url');

let activity = {
    ruleBtn:null,
    init(){
        this.startBtn = $('#start-btn');
        this.bindEvent();
    },
    bindEvent(){
        this.startBtn.on('click',()=>{
            //统计UV
            webPoint({
                url: "/s1/dataDictionary/countUv",
                data: { type: "运营活动一键领奖", userId: userId }
            });
            window.location.href = url;
        })
    }
};

activity.init();