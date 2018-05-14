import 'common/styles/reset.scss';
import './index.scss';

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
        this.listEle.on('click', '.produc-btn', function () {
            window.location.href = '../../product/detail?productId='+ $(this).data('id') + '&groupId='+ window.global.groupId + '&tempId='+ window.global.tempId;
        });
    },
    generateList(data){
        let tpl = '';
        $.each(data, (index,item)=>{
            tpl += `<div class="produc-item">
                        <div class="produc-top">
                            <div class="produc-img-box">
                                <img src="${item.logoUrl ? item.logoUrl:''}" />
                            </div>
                            <div class="produc-desc">
                                <div class="produc-name">${item.productName}</div>
                                <div class="produc-person">已借${item.successCount}人</div>
                            </div>
                            <div class="produc-btn"  data-id="${item.id}">立即借钱</div>
                        </div>        
                    </div>`;
        });

        this.listEle.html(tpl);
    }
};

producList.init();