/**
 * YDUI 可伸缩布局方案
 * rem计算方式：设计图尺寸px / 100 = 实际rem  例: 100px = 1rem
 */
!function (window) {

    /* 设计图文档宽度 */
    var docWidth = 750;

    var doc = window.document,
        docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';

    var recalc = (function refreshRem() {
        var clientWidth = docEl.getBoundingClientRect().width;
        if (doc.body){
            doc.body.style.fontSize = '16px';
        }
        var rem = docEl.clientWidth / 10
        docEl.style.fontSize = rem + 'px'
        return refreshRem;
    })();

    window.recalc = recalc;
    
    // window.refreshRem = recalc;
    /* 添加倍屏标识，安卓倍屏为1 */
    docEl.setAttribute('data-dpr', window.navigator.appVersion.match(/iphone/gi) ? window.devicePixelRatio : 1);

    if (/iP(hone|od|ad)/.test(window.navigator.userAgent)) {
        /* 添加IOS标识 */
        doc.documentElement.classList.add('ios');
        /* IOS8以上给html添加hairline样式，以便特殊处理 */
        if (parseInt(window.navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)[1], 10) >= 8)
            doc.documentElement.classList.add('hairline');
    }
   
    if (!doc.addEventListener) return;
    window.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', function(){
        doc.body.onpageshow = function () {
            recalc();
        }
        recalc();
    }, false);
}(window);