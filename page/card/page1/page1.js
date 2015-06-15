var Page1 = function(el, options) {
    Page.apply(this, arguments);
}
Page1.prototype =$.extend({}, Page.prototype, {
    $el : $("#page1"),
    tpl : __inline('card.tmpl'),
    init : function() {
        this.getData();
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
    render: function(data) {
        this.$el.append(this.tpl({data:data}));
    }
});