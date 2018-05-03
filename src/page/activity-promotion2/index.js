import 'common/styles/reset.scss';
import './index.scss';
import { getQueryString } from 'util'


//获取url参数
let userIp = getQueryString('userIp');

let producList = {
    listEle:null,
    init(){
        this.contain = $('.container').show();
        this.listEle = $('#produc-list');
        this.bindEvent();
        //开始请求
        $.ajax({
            url:'/product/newDynamicList',
            type:'POST',
            data: {
                groupId: window.global.groupId,
                userIp: userIp
            },
            success: ({ code, msg, data: {rows} })=>{
                if (code === 1000000){
                    //产品列表
                    this.generateList(rows);
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
            window.location.href = 'http://www.baidu.com?id=' + $(this).data('id');
        });
    },
    generateList(data){
        let tpl = '';
        $.each(data, (index,item)=>{
            tpl += `<div class="produc-item" data-id="${item.id}">
                        <div class="produc-img-box">
                            <img src="${item.logoUrl ? item.logoUrl:''}"/>
                        </div>
                        <div class="produc-name">${item.productName}</div>
                    </div>`;
        });

        this.listEle.html(tpl);
    }
};

producList.init();