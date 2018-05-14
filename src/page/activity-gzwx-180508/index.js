import 'common/styles/reset.scss';
import './index.scss';
import { webPoint } from 'util';
import Clipboard from 'clipboard';

let wx = 'kaolajizhang';
let id = returnCitySN.cip;//用户ip地址

//统计用户打开页面次数
_czc.push(["_trackEvent", 'H5页面', '打开页面',,,'web']);
//隐藏站长统计
$('body').show().children('a').eq(0).hide();

let activity = {
    ruleBtn:null,
    init(){
        this.ruleBtn = $('#rule-btn');
        this.rule = $('#rule');
        this.ruleCloseBtn = $('#rule-close-btn');
        this.toastEle = $('#toast');
    },
    toast(text = '',times = 1500){
        this.toastEle.text(text).show();
        let timer = setTimeout(() => {
            this.toastEle.hide();
            clearTimeout(timer);
        }, times);
    }
};

activity.init();

//剪切板对象
let clipboard = new Clipboard('#copy-wx-btn', {
    text: function () {
        return wx;
    }
});

clipboard.on('success', function (e) {
    activity.toast('公众号已复制到粘贴板');
    //统计UV
    webPoint({
        url: "/s1/dataDictionary/countUv",
        data: { type: "短信推广关注公众号", userId: id }
    });
    e.clearSelection();
});

clipboard.on('error', function (e) {
    activity.toast('复制失败');
});


