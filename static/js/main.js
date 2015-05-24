__inline('/data/titles.js');
window.menu = window.menu || __inline('/tmpl/menu.tmpl');
var page1 = new Page($("#page1")
);
page1.enter();
//定义一个pageMap
var pageMap = {
	'page1' : page1
}
$("body").on('pageSwitch', function(e, param) {
	console.log(param);
	if(param.nextPage === undefined) {
		return;
	}
	pageMap[param.currentPage].leave();
	if(pageMap[param.nextPage] === undefined) {
		pageMap[param.nextPage] = new Page($("#"+param.nextPage), {
			refer : param.currentPage || '',
			title : param.title || Titles[param.nextPage].title,
			currentPage : param.nextPage,
			nextPage : param.currentPage
		});
	}
	pageMap[param.nextPage].enter();
});


$("body").on('click', '[data-pageswitch]', function(e) {
	var dataSet = $(this).data('pageswitch');
	$("body").trigger('pageSwitch', dataSet);
})