var Page14 = function(el, options) {
    Page.apply(this, arguments);
}
Page14.prototype =$.extend({}, Page.prototype, {
    $el : $("#page14"),
    giftTpl: __inline("gift.tmpl"),
    init : function() {
        this.getWeddingBless();
    },
    getWeddingBless: function() {
        var url = DOMAIN + "getWeddingRecvGifts?recv_id=" + this._settings.recv_id;
        var me = this;
        $.ajax({
            url: url,
            dataType: 'jsonp',
            success: function(data) {
                if(data.code == 0) {
                    me.render(data.data);
                }
            }
        })
    },
    render: function(data) {
        this.$el.append(this.giftTpl({data:data}));
        // this.$el.append(this.tpl({data:data}));
    }
});
module.exports = Page14;