import 'common/styles/reset.scss';
import './index.scss';

let producList = {
    producGtgl: null,
    producMpdz: null,
    producJxtj: null,
    init() {
        this.contain = $('.container').show();
        this.producGtgl = $('#produc-gtgl');
        this.producMpdz = $('#produc-mpdz');
        this.producJxtj = $('#produc-jxtj');
        this.producXpsx = $('#produc-xpsx');
        this.producXrbj = $('#produc-xrbj');

        this.bindEvent();
        //开始请求
        $.ajax({
            url: '../../product/list',
            type: 'POST',
            data: {
                groupId: window.global.groupId,
                userIp: window.global.userIp
            },
            success: ({ code, msg, data }) => {
                if (code === 1000000) {
                    //产品列表
                    this.render(data);
                } else {
                    alert(msg);
                }
            },
            error: () => {
                alert('请求失败,请联系管理员');
            }
        });
    },
    bindEvent() {
        this.contain.on('click', '.produc-item', function () {
            window.location.href = '../../product/detail?productId=' + $(this).data('id') + '&groupId=' + window.global.groupId + '&tempId=' + window.global.tempId;
        });
    },
    render(data = []) {
        if (data.length <= 4) {
            this.generateList(this.producGtgl.show().find('.produc-list'), data);
        } else if (data.length <= 8) {
            this.generateList(this.producGtgl.show().find('.produc-list'), data.slice(0, 4));
            this.generateList(this.producMpdz.show().find('.produc-list'), data.slice(4, 8),2);
        } else if (data.length <= 12) {
            this.generateList(this.producGtgl.show().find('.produc-list'), data.slice(0, 4));
            this.generateList(this.producMpdz.show().find('.produc-list'), data.slice(4, 8),2);
            this.generateList(this.producJxtj.show().find('.produc-list'), data.slice(8, 12));
        } else if (data.length <= 16){
            this.generateList(this.producGtgl.show().find('.produc-list'), data.slice(0, 4));
            this.generateList(this.producMpdz.show().find('.produc-list'), data.slice(4, 8),2);
            this.generateList(this.producJxtj.show().find('.produc-list'), data.slice(8, 12));
            this.generateList(this.producXpsx.show().find('.produc-list'), data.slice(12, 16));
        }else{
            this.generateList(this.producGtgl.show().find('.produc-list'), data.slice(0, 4));
            this.generateList(this.producMpdz.show().find('.produc-list'), data.slice(4, 8), 2);
            this.generateList(this.producJxtj.show().find('.produc-list'), data.slice(8, 12));
            this.generateList(this.producXpsx.show().find('.produc-list'), data.slice(12, 16));
            this.generateList(this.producXrbj.show().find('.produc-list'), data.slice(16,data.length),3);
        }

    },
    generateList(ele, data,type = 1) {
        let tpl = '';
        $.each(data, (index, item) => {
            if (type === 1) {
                tpl += `<div class="produc-item" data-id="${item.id}">
                        <div class="produc-img-box">
                            <img src="${item.logoUrl ? item.logoUrl : ''}"/>
                        </div>
                        <div class="produc-name">${item.productName}</div>
                    </div>`;

            } else if (type === 2) {
                tpl += `<div class="produc-item" data-id="${item.id}">
                            <div class="produc-img-box">
                                <img src="${item.logoUrl ? item.logoUrl : ''}" />
                            </div>
                            <div class="produc-desc">
                                <div class="produc-name">${item.productName}</div>
                                <div class="produc-price">${item.borrowingHighText}</div>
                                <div class="produc-person">${item.successCount}人<span class="footer">已放款</span></div>
                            </div>
                        </div>`;
            }else{
                tpl += `<div class="produc-item">
                        <div class="produc-top">
                            <div class="produc-img-box">
                                <img src="${item.logoUrl ? item.logoUrl : ''}" />
                            </div>
                            <div class="produc-desc">
                                <div class="produc-name">${item.productName}</div>
                                <div class="produc-person">已借${item.successCount}人</div>
                            </div>
                            <div class="produc-btn"  data-id="${item.id}">立即借钱</div>
                        </div>        
                    </div>`;
            }
        });

        ele.html(tpl);
    }
};

producList.init();