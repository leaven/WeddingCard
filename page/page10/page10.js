var Page10 = function(el, options) {
	Page.apply(this, arguments);
}
Page10.prototype =$.extend({}, Page.prototype, {
	$el: $("#page10"),
	tpl: __inline("gift.tmpl"),
	init: function() {
		this.eventHandler();
		this.getData();
	},
	eventHandler: function() {
		this.$el.on('click', '.gift-menu-item-select', function() {
			$(this).parent().toggleClass('gift-menu-item-selected');
		})
		this.$el.on('click', '.wish-gift-submit', $.proxy(this.postGift,this));
	},
	getData: function() {
		var me = this;
		var url = DOMAIN + "getWeddingAllGifts";
		$.ajax({
			url: url,
			dataType: 'jsonp',
			success: function(data) {
				if(data.code == 0) {
					me.render(data.data);
				}
			}
		});
	},
	render: function(data){
		this.$el.append(this.tpl({data: data}));
	},
	postGift: function(event) {
		event.stopPropagation();
		var giftIds = [],
			url = DOMAIN + 'addWeddingWishs';
		var selectList = this.$el.find('.gift-menu-item-selected');
		$.each(selectList, function(key, value) {
			giftIds.push($(value).data('gift_id'));
		})
		$.ajax({
			url: url,
			dataType: 'jsonp',
			data: {
				gift_ids: giftIds.join(',')
			},
			success: function(data) {
				if(data.code == 0) {
					var dataSet = $(".wish-gift-submit").data('pageswitch');
					$("body").trigger('pageSwitch', dataSet);
				}
			}
		});
	}
})