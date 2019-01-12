import { getPlatform } from 'util'
let platform = getPlatform({ isApp: true });

// 好友唤起相册
export const saveImg = (base64) => {
    return new Promise((resolve, reject) => {
        if (platform === 'IOS') {
            if (window.webkit !== undefined && window.webkit.messageHandlers !== undefined) {
                resolve()
                window.webkit.messageHandlers.ConversePicture.postMessage(base64);
            } else {
                reject()
            }
        } else if (platform === 'Android') {
            if (window.android !== undefined) {
                resolve()
                window.android.ConversePicture(base64);
            } else {
                reject()
            }
        } else if (platform === 'H5') {
            reject()
        }
    });
}

export const isApp = () => {
    if (platform === 'IOS') {
        if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.ConversePicture) {
            return true
        } else {
            return false
        }
    } else if (platform === 'Android') {
        if (window.android && window.android.ConversePicture) {
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