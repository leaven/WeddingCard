var Page12 = function(el, options) {
    Page.apply(this, arguments);
}
Page12.prototype =$.extend({}, Page.prototype, {
    $el: $("#page12"),
    wishTpl: __inline("wish.tmpl"),
    giftTpl: __inline("gift.tmpl"),
    init: function() {
        this.getGift();
        this.getWishes();
    },
    getGift: function() {
        var me = this;
        var url = DOMAIN + "getWeddingRecvGifts";
        $.ajax({
            url: url,
            data: {
                userid: window.userid
            },
            dataType: 'jsonp',
            success: function(data) {
                if(data.code == 0) {
                    var $giftList = me.$el.find(".gift-list");
                    $giftList.html(me.giftTpl({data: data.data}));
                     $giftList.owlCarousel({
                        items: 3,
                        itemsMobile: [414, 3],
                        autoPlay: true
                    });

                }
            }
        });
    },
    getWishes: function() {
        var me  = this;
        var url = DOMAIN + 'getWeddingWishs?userid=' + window.userid;
        $.ajax({
            url: url,
            dataType: 'jsonp',
            success: function(data) {
                if(data.code == 0) {
                    var $giftLike = me.$el.find(".gift-like");
                    $giftLike.html(me.wishTpl({data: data.data}));
                    $giftLike.owlCarousel({
                        items: 4,
                        itemsMobile: [414,4],
                        autoPlay: true
                    });
                }
            }
        });
    }
});
module.exports = Page12;