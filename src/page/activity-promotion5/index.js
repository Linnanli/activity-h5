import 'common/styles/reset.scss';
import './index.scss';

let producList = {
    producGtgl:null,
    producMpdz: null,
    producJxtj: null,
    init(){
        this.contain = $('.container').show();
        this.producGtgl = $('#produc-gtgl');
        this.producMpdz = $('#produc-mpdz');
        this.producJxtj = $('#produc-jxtj');

        this.bindEvent();
        //开始请求
        $.ajax({
            url:'../../product/list',
            type:'POST',
            data: {
                groupId:window.global.groupId,
                userIp:window.global.userIp
            },
            success: ({ code, msg, data })=>{
                if (code === 1000000){
                    //产品列表
                    this.render(data);
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
        this.contain.on('click', '.produc-item', function () {
            window.location.href = '../../product/detail?productId='+ $(this).data('id') + '&groupId='+ window.global.groupId + '&tempId='+ window.global.tempId;
        });
    },
    render(data = []){
        if(data.length <= 8){
            this.generateList(this.producGtgl.show().find('.produc-list'),data);
        }else if (data.length <= 16){
            this.generateList(this.producGtgl.show().find('.produc-list'), data.slice(0,8));
            this.generateList(this.producMpdz.show().find('.produc-list'), data.slice(8,16));
        } else if (data.length > 16){
            this.generateList(this.producGtgl.show().find('.produc-list'), data.slice(0, 8));
            this.generateList(this.producMpdz.show().find('.produc-list'), data.slice(8, 16));
            this.generateList(this.producJxtj.show().find('.produc-list'), data.slice(16, data.length));
        }
        
    },
    generateList(ele,data){
        let tpl = '';
        $.each(data, (index, item) => {
            tpl += `<div class="produc-item" data-id="${item.id}">
                        <div class="produc-img-box">
                            <img src="${item.logoUrl ? item.logoUrl : ''}"/>
                        </div>
                        <div class="produc-name">${item.productName}</div>
                    </div>`;
        });

        ele.html(tpl);
    }
};

producList.init();