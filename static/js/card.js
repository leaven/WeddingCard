__inline('/data/cardTitle.js');
var Page1 = require('/page/card/page1/page1.js');
var Page2 = require('/page/card/page2/page2.js');
var Page3 = require('/page/card/page3/page3.js');
var Page4 = require('/page/card/page4/page4.js');
var Page5 = require('/page/card/page5/page5.js');
var Page12 = require('/page/card/page12/page12.js');
var Page9 = require('/page/card/page9/page9.js');
var Page10 = require('/page/card/page10/page10.js');
var Page11 = require('/page/card/page11/page11.js');
var Page8 = require('/page/card/page8/page8.js');
var Page13 = require('/page/card/page13/page13.js');
var Page14 = require('/page/card/page14/page14.js');
window.menu = window.menu || __inline('/tmpl/menu.tmpl');
window.DOMAIN = 'http://www.wifimeishi.cn/wedding/action.php/';
FastClick.attach(document.body);
var queryParams = getQueryParams();
window.userData = {};
window.userid = queryParams.userid;
weixin.initShare();
var page1 = new Page1($("#page1"));
page1.enter();
$('.page').height($(document).height()+'px');
(function() {
    $.ajax({
        url: DOMAIN + 'getUserInfo',
        dataType: 'jsonp',
        success: function(data) {
            if(data.code == 0 && data.data) {
                userData = data.data;
            }else {
                alert('信息获取失败');
            }
        }
    });
}());
//定义一个pageMap,每个page对应一个Page类
var pageLength = 14,
    defaultPageClass = {};
for(var i = 1; i <= pageLength; i++) {
    defaultPageClass['page' + i] = Page;
}
var pageMapClass = $.extend(defaultPageClass, {
    'page1': Page1,
    'page2': Page2,
    'page3': Page3,
    'page4': Page4,
    'page5': Page5,
    'page12': Page12,
    'page8': Page8,
    'page9': Page9,
    'page10': Page10,
    'page11': Page11,
    'page13': Page13,
    'page14': Page14
});
var pageMap = {
    'page1': page1
}
module.exports = function() {
    $(function() {
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
    });
}