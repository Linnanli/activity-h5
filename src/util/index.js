//获取url参数
export const getQueryString = ()=>{
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    return r ? decodeURIComponent(r[2]) : null;
}