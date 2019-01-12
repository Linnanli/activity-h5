import { getPlatform } from 'util'
let platform = getPlatform({ isApp: true });

// 打开唤起微信到首页
export const openWeChat = () => {
    return new Promise((resolve, reject) => {
        if (platform === 'IOS') {
            if (window.webkit !== undefined && window.webkit.messageHandlers !== undefined) {
                resolve();
                window.webkit.messageHandlers.openWeChat.postMessage("");
            } else {
                reject('iOS openWeChat 方法未定义');
            }
        } else if (platform === 'Android') {
            if (window.android !== undefined) {
                resolve();
                window.android.openWeChat();
            } else {
                reject('android openWeChat 方法未定义');
            }   
        } else if (platform === 'H5') {
            window.location.href = 'weixin://';
        }
    });
}

// 唤起app分享栏目
export const invite = () => {
    return new Promise((resolve, reject)=>{
        if (platform === 'IOS') {
            if (window.webkit !== undefined && window.webkit.messageHandlers !== undefined){
                resolve()
                window.webkit.messageHandlers.inviteShareCallBack.postMessage("");
            }else {
                reject()
            }
        } else if (platform === 'Android') {
            if (window.android !== undefined){
                resolve()
                window.android.invite();
            } else {
                reject()
            }
        } else if (platform === 'H5') {
            reject()
        }
    })
}

// 交给app调用
window.sendLoginUserInfo = function (userInfo) {
    let _this = window.sendLoginUserInfo
    _this.promise.resolve(userInfo)
}
// 唤起登录
export const callAppLogin = () => {
    return new Promise((resolve, reject) => {
        window.sendLoginUserInfo.promise = {
            resolve,
            reject
        }
        if (platform === 'IOS') {
            if (window.webkit !== undefined && window.webkit.messageHandlers !== undefined) {
                window.webkit.messageHandlers.showLoginView.postMessage('');
            }
        } else if (platform === 'Android') {
            if (window.android !== undefined) {
                window.android.authorize();
            }
        }
    });
}

export const isApp = () => {
    if (platform === 'IOS') {
        if (window.webkit && window.webkit.messageHandlers) {
            return true
        } else {
            return false
        }
    } else if (platform === 'Android') {
        if (window.android && window.android.authorize) {
            return true
        } else {
            return false
        }
    } else if (platform === 'H5') {
        return false
    } else {
        return false
    }
}

// 打开新的APP页面
export const openAppPage = (pageName = '') => {
    if (!pageName) {
        throw new Error('请传入一个字符串作为page名称');
    }
    return new Promise((resolve, reject) => {
        if (platform === 'IOS') {
            if (window.webkit !== undefined && window.webkit.messageHandlers !== undefined) {
                resolve()
                window.webkit.messageHandlers.inviteShareCallBack.postMessage("");
            } else {
                reject()
            }
        } else if (platform === 'Android') {
            if (window.android !== undefined) {
                resolve()
                window.android[pageName]();
            } else {
                reject()
            }
        } else if (platform === 'H5') {
            reject()
        }
    });
}