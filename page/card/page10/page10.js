var Page10 = function(el, options) {
    Page.apply(this, arguments);
}
Page10.prototype =$.extend({}, Page.prototype, {
    $el : $("#page10"),
    userTpl: __inline('userinfo.tmpl'),
    init: function() {
        this.$el.find('.user-info').html(this.userTpl({userData: userData}));
        this.eventHandler();
    },
    eventHandler: function() {
        this.$el.on('click', '.submit-btn', $.proxy(this.postWish, this));
    },
    postWish: function(event) {
        event.stopPropagation();
        var url = DOMAIN + "addWeddingBless";
        var me = this;
        $.ajax({
            url: url,
            data: {
                userid: window.userid,
                text: me.$el.find('textarea').val()
            },
            dataType: 'jsonp',
            success: function(data) {

                if(data.code == 0) {
                    alert('提交成功');
                    var dataSet = $(event.target).data('pageswitch');
                    $("body").trigger("pageSwitch", dataSet);
                }else {
                    alert('提交失败');
                }
            }
        })
    }
});
module.exports = Page10;