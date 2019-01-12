let types = {
    script: {
        attr: 'type',
        type: 'text/javascript',
        charset: 'utf-8'
    }
}

const setElementAttr = (ele, attrs) => {
    for (const key in attrs) {
        ele.setAttribute(key, attrs[key])
    }
}

/**
 * 异步加载
 * @param {string} src
 */
export const loadDependent = (attrs) => {
    let ele = document.createElement(type);
    setElementAttr(ele, attrs)
    let root = document.getElementsByTagName('script')[0];
    root.parentNode.insertBefore(ele, root);
    return new Promise((resolve, reject) => {
        ele.onload = () => {
            resolve()
        }

        ele.onerror = (error) => {
            reject(error)
        }
    });
}