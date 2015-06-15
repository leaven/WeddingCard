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
	this.setData();
	this.setTitle();
}
Page.prototype = {
	init : function() {

	},
	setData: function() {
		for(var key in this._settings) {
			this.$el.data(key, this._settings[key]);
		}
	},
	setTitle: function() {
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
	},
	destroy: function() {
		this.$el.off();
		this.$el.html("");
	}
}