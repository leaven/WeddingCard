function Page(el, options) {
	this.$el = el;
	var _defaults = {
		refer : '',
		title : '',
		currentPage : '',
		nextPage : ''
	};
	this._settings = $.extend({}, _defaults, options);
	this.init();	
}
Page.prototype = {
	init : function() {
		window.menu = window.menu || __inline('/tmpl/menu.tmpl');
		this.$el.prepend(window.menu({
			data : this._settings
		}));
	},
	enter : function() {
		this.$el.show();
	},
	leave : function() {
		this.$el.hide();
	}
}