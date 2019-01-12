## oepnWeChat 唤起微信


## ios接口名称

``` javascript
window.webkit.messageHandlers.openWeChat.postMessage();
```

## android接口名称

``` javascript
window.android.openWeChat();
```

## js 封装

在`util`中封装了打开微信的方法`openWeChat`

``` javascript
export const openWeChat = ({ isApp }) => {
    let platform = getPlatform({ isApp });
    if (platform === 'IOS'){
        if (window.webkit && window.webkit.messageHandlers){
            window.webkit.messageHandlers.openWeChat.postMessage();
    } else if (platform === 'Android') {
        if (window.android !== undefined)
            window.android.openWeChat();
    } else if (platform === 'H5') {
        window.location.href = 'weixin://';
    }
}

```
