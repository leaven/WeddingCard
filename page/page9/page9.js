var Page9 = function(el, options) {
	Page.apply(this, arguments);
}
Page9.prototype =$.extend({}, Page.prototype, {
	$el: $("#page9"),
	$domList : {
		"confirmBtn" : $(".confirm-btn")
	},
	init: function() {
		this.eventHandler();
	},
	eventHandler: function() {
		this.$domList.confirmBtn.on("click", $.proxy(this.postData, this));
	},
	postData: function(event) {
		event.stopPropagation();
		var dataSet = this.$domList.confirmBtn.data("pageswitch");
		var me = this;
		var url = DOMAIN + "addWeddingPart";
		$.ajax({
			url: url,
			dataType: 'jsonp',
			type: 'get',
			data : {
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
})