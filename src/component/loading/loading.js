require('./loading.css');
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

