var compileTpl = require('./alert.hbs');
require('./alert.css');

var tpl = compileTpl({
    headText:'head',
    bodyText:'body',
    confirmButName:'确认'
});

module.exports = {
    show:function(text){
        var _this=this;
        if(!this.ele){
            $(document.body).append(tpl);
            this.ele = $('#alert');
            this.body = this.ele.find('.alert-body');
            this.confirmBut = this.ele.find('.alert-confirm-but');
            this.confirmBut.on('click',function(){
                _this.ele.css('display','none');
            });
        }
        this.ele.css('display','flex');
        this.body.text(text);
    },
    hide:function(){
        if(this.ele!==undefined)
            this.ele.css('display','flex');
    }
};