__inline('/data/titles.js');
var Page3 = require('/page/page3/page3.js');
var Page4 = require('/page/page4/page4.js');
var Page5 = require('/page/page5/page5.js');
var Page6 = require('/page/page6/page6.js');
var Page7 = require('/page/page7/page7.js');
var Page8 = require('/page/page8/page8.js');
var Page9 = require('/page/page9/page9.js');
var Page10 = require('/page/page10/page10.js');
var Page12 = require('/page/page12/page12.js');
var Page13 = require('/page/page13/page13.js');
var Page14 = require('/page/page14/page14.js');

window.menu = window.menu || __inline('/tmpl/menu.tmpl');
window.DOMAIN = 'http://www.wifimeishi.cn/wedding/action.php/';
var queryParams = getQueryParams();
window.userid = queryParams.userid;
weixin.initShare();
FastClick.attach(document.body);
$('.page').height($(document).height()+'px');
var page1 = new Page($("#page1"));
page1.enter();
//定义一个pageMap,每个page对应一个Page类
var pageLength = 14,
	defaultPageClass = {};
for(var i = 1; i <= pageLength; i++) {
	defaultPageClass['page' + i] = Page;
}
var pageMapClass = $.extend(defaultPageClass, {
	'page3': Page3,
	'page4': Page4,
	'page5': Page5,
	'page6': Page6,
	'page7': Page7,
	'page8': Page8,
	'page9': Page9,
	'page10': Page10,
	'page12': Page12,
	'page13': Page13,
	'page14': Page14
})
var pageMap = {
	'page1': page1
}
$("body").on('pageSwitch', function(e, param) {
	if(param.nextPage === undefined) {
		return;
	}
	pageMap[param.currentPage].leave();
	if(param.refresh !== undefined && param.refresh == true) {
		if(pageMap[param.nextPage] !== undefined) {
			pageMap[param.nextPage].destroy();
			delete pageMap[param.nextPage];
		}
	}
	if(pageMap[param.nextPage] === undefined) {
		var defaults = {
			refer : param.currentPage || '',
			title : param.title || Titles[param.nextPage].title,
			currentPage : param.nextPage,
			nextPage : param.currentPage
		};
		var settings = $.extend({}, param, defaults);
		pageMap[param.nextPage] = new pageMapClass[param.nextPage]($("#"+param.nextPage), settings);
	}
	pageMap[param.nextPage].enter();
});


$("body").on('click', '[data-pageswitch]', function(e) {
	var dataSet = $(this).data('pageswitch');
	$("body").trigger('pageSwitch', dataSet);
});