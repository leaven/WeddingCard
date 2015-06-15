var Page12 = function(el, options) {
    Page.apply(this, arguments);
}
Page12.prototype =$.extend({}, Page.prototype, {
    $el : $("#page12"),
    noWishTpl: __inline("no_wish.tmpl"),
    wishTpl: __inline("wishes.tmpl"),
    init : function() {
        this.getWeddingBless();
    },
    getWeddingBless: function() {
        var url = DOMAIN + "getWeddingBless";
        var me = this;
        $.ajax({
            url: url,
            dataType: 'jsonp',
            success: function(data) {
                if(data.code == 0) {
                    if(data.data.length == 0) {
                        //渲染无祝福页
                        me.$el.append(me.noWishTpl);
                    }else {
                         // me.$el.append(me.noWishTpl);
                        me.render(data.data);
                    }
                }
            }
        })
    },
    render: function(data) {
        this.$el.append(this.wishTpl({data:data}));
        // this.$el.append(this.tpl({data:data}));
    }
});