var Page6 = function(el, options) {
	Page.apply(this, arguments);
}
Page6.prototype =$.extend({}, Page.prototype, {
	$el: $("#page6"),
	tpl: __inline('guest.tmpl'),
	init: function() {
		this.getData();
	},
	getData: function() {
		var me = this;
		var url = DOMAIN + "getWeddingGuest";
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
		this.$el.find('.guest-list').html(this.tpl({data: data}));
	}
});
module.exports = Page6;