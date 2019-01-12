import { timeout } from 'util'

export default class Product{
    isRuning = false
    params = null
    constructor(params){
        this.params = params
        this.productList = $('.product-list')
        this.getProductList()
    }
    bindEvent(){
        let _this = this
        $('.product-item').on('click', function () {
            let ele = $(this)
            if (ele.hasClass('product-empty')) return
            _this.getProducUrl({
                id: ele.data('id')
            })
        })
    }

    async getProducUrl({ id }) {

        if (this.isRuning === true) return
        this.isRuning = true

        loading.start();
        try {
            let { code, msg, data } = await http({
                url: '/s3/product/skipUrl',
                data: {
                    productId: id,
                    source: this.params.source,
                    packageId: this.params.packageId,
                    userId: this.params.userId,
                    version: this.params.version
                }
            });

            this.isRuning = false
            loading.stop()
            if (code === 1000000) {
                //跳转页面
                window.location.href = data
            } else {
                toast(msg)
            }
        }
        catch (error) {
            this.isRuning = false
            console.log(error)
            loading.stop()
            toast('服务器错误')
        }
    }

    async getProductList(){
        try {
            let { code, msg, data } = await http({
                url: '/s3/product/groupProduct/list',
                data: {
                    // groupId: '17b5d29cd7a547cda322c9a36ced452d'
                    groupId: 'b1c82ecf234241a6bded788a585383da'
                }
            })

            loading.stop();
            if (code === 1000000) {
                await timeout(500)
                if (data.length > 0) {
                    this.renderList(data)
                }
            } else {
                toast(msg)
            }
        } catch (error) {
            console.log(error)
            loading.stop()
            toast('服务器错误')
        }
        
    }

    renderList(data){
        let tpl = ''
        for (let index = 0; index < data.length; index++) {
            const item = data[index]
            tpl += `
                <div class="product-item" data-id="${item.id}" data-name="${item.productName}">
                    <div class="product-img">
                        <img src="${item.logoUrl ? item.logoUrl : ''}">
                    </div>
                    <div class="product-info">
                        <div class="product-title">${item.productName}</div>
                        <div class="product-descript">${item.borrowingLowText}-${item.borrowingHighText}元</div>
                    </div>
                </div>
            `
        }

        this.productList.html(tpl)
        this.bindEvent()
    }
}