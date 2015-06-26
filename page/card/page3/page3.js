var Page3 = function(el, options) {
    Page.apply(this, arguments);
}
Page3.prototype =$.extend({}, Page.prototype, {
    $el : $("#page3"),
    init : function() {
        this.getBg();
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
                if(data.data.pic_home.path !== '') {
                    me.$el.css('background-image', 'url('+data.data.pic_home.path+')');
                }
            }
        });
    }
});
module.exports = Page3;