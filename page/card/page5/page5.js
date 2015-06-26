var Page5 = function(el, options) {
    Page.apply(this, arguments);
}
Page5.prototype =$.extend({}, Page.prototype, {
    $el : $("#page5"),
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
module.exports = Page5;