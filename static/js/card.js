__inline('/data/cardTitle.js');
__inline('/page/card/page1/page1.js');
__inline('/page/card/page2/page2.js');
__inline('/page/card/page4/page4.js');
__inline('/page/card/page5/page5.js');
__inline('/page/card/page8/page8.js');
__inline('/page/card/page9/page9.js');
__inline('/page/card/page10/page10.js');
__inline('/page/card/page11/page11.js');
window.menu = window.menu || __inline('/tmpl/menu.tmpl');
var DOMAIN = 'http://www.wifimeishi.cn/wedding/action.php/';
FastClick.attach(document.body);

window.userid = 4;
var page1 = new Page1($("#page1"));
page1.enter();

//定义一个pageMap,每个page对应一个Page类
var pageLength = 14,
    defaultPageClass = {};
for(var i = 1; i <= pageLength; i++) {
    defaultPageClass['page' + i] = Page;
}
var pageMapClass = $.extend(defaultPageClass, {
    'page1': Page1,
    'page2': Page2,
    'page4': Page4,
    'page5': Page5,
    'page8': Page8,
    'page9': Page9,
    'page10': Page10,
    'page11': Page11
    // 'page2': Page2,
    // 'page3': Page3,
    // 'page4': Page4,
    // 'page5': Page5,
    // 'page6': Page6,
    // 'page7': Page7,
    // 'page8': Page8,
    // 'page9': Page9,
    // 'page10': Page10,
    // 'page12': Page12,
    // 'page13': Page13,
    // 'page14': Page14
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