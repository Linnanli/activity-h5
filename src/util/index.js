
//获取url参数
export const getQueryString = (name, parseUrl = window.location.search) => {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = parseUrl.substr(1).match(reg);
    return r ? decodeURIComponent(r[2]) : null;
}

// 兼容
export const getCountScript = () => {

}


/**
 * 拼接url请求参数
 * @param {string} path - 请求地址
 * @param {*} params - 请求参数
 */
export const joinQueryStr = (path, params) => {
    let paramsArr = [],
        queryStr = ''

    for (const key in params) {
        if (!params[key]) continue
        paramsArr.push(`${key}=${params[key]}`)
    }
    
    queryStr = `${path}${~path.indexOf('?') ? '&' : '?'}${paramsArr.join('&')}`

    return queryStr
}

/**
 * 格式化数字
 * @param {number} value - 需要转化的数字
 * @param {number} interval - 数字间隔
 */
export const formatNumber = (value = 0, interval = 3) => {
    if (value === 0) return value.toString()
    let isNegative = value < 0
    let valStr = String(value)
    let lastStr = ''
    let arr = []


    // 临时删除-符号
    if (~valStr.indexOf('-'))
        valStr = valStr.replace('-', '')

    // 如果有小数点,那么截断小数位，最后拼接
    if (~valStr.indexOf('.')) {
        let splitArr = valStr.split('.')
        lastStr = '.' + splitArr[splitArr.length - 1]
        arr = splitArr[0].split('')
    } else {
        arr = valStr.split('')
    }

    let len = arr.length
    for (let i = 1; i < len; i++) {
        let index = len - i * interval
        if (index <= 0) break
        arr.splice(index, 0, ',')
    }

    return `${isNegative ? '-' : ''}${arr.join('')}${lastStr}`
}

/*
* 获取用户app系统名称
* Android/ios/H5
*/
export const getPlatform = ({ isApp = false, isWeChat = true}) =>{
    let isAppP = isApp === true ? isApp : getQueryString('isApp'),
        u = navigator.userAgent;

    if (isWeChat && /MicroMessenger/gi.test(u))
        return 'WeChat';
    
    if (isAppP && isAppP != "null" && isAppP != "(null)") {
        if (u.match(/iphone|iPod/i) != null) {
            return 'IOS';
        } else if (u.match(/Android/i) != null) {
            return 'Android';
        }
    } else {
        return 'H5';
    }

}

/**
 * 判断浏览器
 */
export const browser = {
    isChrome() {
        let u = navigator.userAgent;
        if (u.match(/Chrome/i) != null) {
            return true;
        } else {
            return false
        }
    }
}

/**
 * @return {string} - 返回页面基础地址 
 */
export const toPage = (page) => {
    let basePath = process.env.BASE_PATH;
    window.location.href = `${basePath}${page}`;
}

// 获取basePath
export const getBasePath = () => {
    return process.env.BASE_PATH;
}


/**
 * 将对象转换成form表单
 * @param {Object} params - 需要转成form表单的对象字面量
 */
export const formaterForm = (params) => {
    let form = new FormData()
    for (const key in params) {
        form.append(key, params[key])
    }
    return form
}

/**
 * 异步加载
 * @param {string} src 
 * @param {function} callback 
 */
export const loadScript = (src = '') => {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.src = src;
    let root = document.getElementsByTagName('script')[0];
    root.parentNode.insertBefore(script, root);
    return new Promise((resolve, reject) => {
        script.onload = () => {
            resolve()
        }

        script.onerror = (error) => {
            reject(error)
        }
    });
}

//如果友盟脚本网络异常就不断调用,直到调用成功
export const pointCount = (params = null,interval = 2000)=>{
    if (window._czc === undefined){
        let timer = setInterval(()=>{
            if (typeof window._czc === 'object'){
                window._czc.push(params);
                clearInterval(timer);
            }
            
        }, interval);
    }else{
        window._czc.push(params);
    }
}

//本地存储值
export const setLocalStorage = (key,value)=>{
    window.localStorage.setItem(`${location.host}_${key}`, JSON.stringify(value));
}

//取出本地存储值
export const getLocalStorage = key =>{
    return JSON.parse(window.localStorage.getItem(`${location.host}_${key}`));
}

//删除本地存储的值
export const removeLocalStorage = (key)=>{
    window.localStorage.removeItem(`${location.host}_${key}`);
}

//session存储值
export const setSessionStorage = (key, value) => {
    window.sessionStorage.setItem(`${location.host}_${key}`, JSON.stringify(value));
}

//取出 session 存储值
export const getSessionStorage = key => {
    return JSON.parse(window.sessionStorage.getItem(`${location.host}_${key}`));
}

//删除session存储的值
export const removeSessionStorage = (key) => {
    window.sessionStorage.removeItem(`${location.host}_${key}`);
}

//获取global变量
export const getGlobal = ()=>{
    if (typeof window.global !== 'object')
        window.global = {};

    return window.global;
}

//获取api地址
export const getApiLocation = ()=>{
    return process.env.API_HOST;
}

function lock (e) {
    e.preventDefault();
}
//屏幕锁住不能滚动
export const screenLockScroll = ()=>{
    // document.body.addEventListener('touchmove', lock , { passive: false });
    $('html,body').css({
        'height': $(window).height() + 'px',
        'overflow':'hidden'
    });
}
// 屏幕解锁
export const screenUnlockScroll = () => {
    // document.body.removeEventListener('touchmove', lock);
    $('html,body').css({
        'height': 'auto',
        'overflow': 'auto'
    });
}

// 延迟执行
export const timeout = (timeout) => {
    return new Promise((resolve) => {
        let timer = setTimeout(() => {
            resolve()
            clearTimeout(timer)
        }, timeout);
    })
}

//转px转rem
export const pxToRem = (px = 0, baseFontSize = 100) => {
    return (px * 2 / baseFontSize) + 'rem';
}


