var Page13 = function(el, options) {
	Page.apply(this, arguments);
}
Page13.prototype =$.extend({}, Page.prototype, {
	$el: $("#page13"),
	init: function() {
		this.$confirmBtn = this.$el.find('.confirm-btn');
		this.eventHandler();
	},
	eventHandler: function() {
		this.$confirmBtn.on("click", $.proxy(this.postData, this));
	},
	postData: function(event) {
		event.stopPropagation();
		var dataSet = this.$confirmBtn.data("pageswitch");
		var me = this;
		var url = DOMAIN + "addWeddingPart";
		$.ajax({
			url: url,
			dataType: 'jsonp',
			type: 'get',
			data : {
				userid: window.userid,
				type_name : $("#addSortForm").val()
			},
			success: function(data) {
				if(data.code == 0) {
					$("body").trigger("pageSwitch", dataSet);
				}
			},
			timeout: function() {
			}
		});
	}
});
module.exports = Page13;