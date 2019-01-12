import { getPlatform } from 'util'
let platform = getPlatform({ isApp: true });

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
        if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.showLoginView) {
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