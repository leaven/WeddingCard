var Page7 = function(el, options) {
	Page.apply(this, arguments);
}
Page7.prototype =$.extend({}, Page.prototype, {
	$el: $("#page7"),
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
			dataType: 'jsonp',
			success: function(data) {
				if(data.code == 0) {
					var $giftList = me.$el.find(".gift-list");
					$giftList.html(me.giftTpl({data: data.data}));

				}
			}
		});
	},
	getWishes: function() {
		var me  = this;
		var url = DOMAIN + 'getWeddingWishs';
		$.ajax({
			url: url,
			dataType: 'jsonp',
			success: function(data) {
				if(data.code == 0) {
					var $giftLike = me.$el.find(".gift-like");
					$giftLike.html(me.wishTpl({data: data.data}));
					$giftLike.owlCarousel({
						items: 4,
						itemsMobile: [414,4]
					});
				}
			}
		});
	}
});
module.exports = Page7;