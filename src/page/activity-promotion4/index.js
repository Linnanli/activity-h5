import 'common/styles/reset.scss';
import './index.scss';
import Slider from './js/slider.js'

//轮播
let sliderList = {
    sliderWrap:null,
    init(){
        this.sliderWrap = $('#slider-wrap');
        $.ajax({
            url: '../../product/queryBorrowingPrompt',
            type: 'POST',
            success:({ code, data }) =>{
                if (code === 1000000) {
                    this.generateList(data,2000);
                    let slider = new Slider(this.sliderWrap);
                    slider.start();
                } else {
                    alert(msg);
                }
            },
            error() {
                alert('请求失败,请联系管理员');
            }
        });
        
    },
    generateList(data = []){
        let tpl = '';
        $.each(data, (index, item) => {
            tpl += `<li class="slider-item">${item}</li>`;
        });

        this.sliderWrap.html(tpl);
    }
};



//产品列表
let producList = {
    listEle:null,
    init(){
        this.contain = $('.container').show();
        this.listEle = $('#produc-list');
        this.bindEvent();
        //开始请求
        $.ajax({
            url:'../../product/list',
            type:'POST',
            data: {
                groupId:window.global.groupId,
                userIp:window.global.userIp
            },
            success: ({ code, msg, data})=>{
                if (code === 1000000){
                    //产品列表
                    this.generateList(data);
                }else{
                    alert(msg);
                }
            },
            error:()=>{
                alert('请求失败,请联系管理员');
            }
        });
    },
    bindEvent(){
        this.listEle.on('click', '.produc-item', function () {
            window.location.href = '../../product/detail?productId='+ $(this).data('id') + '&groupId='+ window.global.groupId + '&tempId='+ window.global.tempId;
        });
    },
    generateList(data){
        let tpl = '';
        $.each(data, (index,item)=>{
            tpl += `
                <div class="produc-item" data-id="${item.id}">
                    <div class="produc-img-box">
                        <img src="${item.logoUrl ? item.logoUrl : ''}" />
                    </div>
                    <div class="produc-desc">
                        <div class="produc-name">${item.productName}</div>
                        <div class="produc-price">${item.borrowingHighText}</div>
                        <div class="produc-person">${item.successCount}人<span class="footer">已放款</span></div>
                    </div>
                </div>
            `;
        });

        this.listEle.html(tpl);
    }
};

sliderList.init();
producList.init();