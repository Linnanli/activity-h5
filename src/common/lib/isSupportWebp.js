;(function(){
    function isSupportWebpFunc() {
        try{
            return document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0;
        }catch(err) {
            return  false;
        }
    }
    // 判断是否支持webp, 如果支持那么在html上加上class .webp
    var isSupportWebp = window.isSupportWebp = isSupportWebpFunc()
    if (isSupportWebp) {
        document.cookie = 'webp=open';
        var htmlDOM = document.documentElement;
        htmlDOM.className = htmlDOM.className + ' webp';
    }
})();