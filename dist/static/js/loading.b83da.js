/*! project:"demo4"author:"林楠力" */
webpackJsonp([3],{

/***/ "9vu6":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("xG4Y");
window.loading = {
    ele:null,
    show:function(text){
        console.log(1);
        this.ele = document.createElement('div');
        this.ele.id = 'loading';
        this.ele.className = 'loading';
        this.ele.innerText = text;
        this.ele.style.display = 'block';
        document.body.appendChild(this.ele);
    },
    hide:function(){
        this.ele.style.display = 'none';
    }
};

    window.loading.show('loading');



/***/ }),

/***/ "xG4Y":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},["9vu6"]);