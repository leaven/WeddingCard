var Page1 = function(el, options) {
    Page.apply(this, arguments);
}
Page1.prototype =$.extend({}, Page.prototype, {
    $el : $("#page1"),
    tpl : __inline('card.tmpl'),
    init : function() {
        this.getData();
        this.getBg();
    },
    getData : function() {
        var url = DOMAIN + "getWeddingCard";
        var me = this;
        $.ajax({
            url: url,
            data: {
                userid: window.userid
            },
            dataType: 'jsonp',
            success: function(data) {
                if(data.code == 0) {
                    me.render(data.data);
                }
            }
        })
    },
    getBg: function() {
        var me = this;
        $.ajax({
            url: DOMAIN + 'getWeddingCard',
            dataType: 'jsonp',
            data: {
                userid: window.userid
            },
            success: function(data) {
                if(data.data && data.data.pic_well && data.data.pic_well.path !== '') {
                    me.$el.css('background-image', 'url('+data.data.pic_well.path+')');
                }
            }
        });
    },
    render: function(data) {
        this.$el.append(this.tpl({data:data}));
    }
});

module.exports = Page1;