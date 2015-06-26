window.cacheURLs = {};
function getQueryParams(url) {
       var url = url || location.search; //获取url中"?"符后的字串
        //增加cache层
        if(typeof cacheURLs.url !== 'undefined') {
         return cacheURLs.url;
        }
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(url.indexOf("?")+1);
            if (str.indexOf("&") != -1) {
                strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    //
                    var reg = /([^=]*)=(.*)$/;
                    var matchs = strs[i].match(reg);
                    theRequest[matchs[1]] = unescape(matchs[2]);
                                        //theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
                }
            } else {
                var key = str.substring(0,str.indexOf("="));
                var value = str.substr(str.indexOf("=")+1);
                theRequest[key] = decodeURI(value);
            }
        }
        cacheURLs.url = theRequest;
        return theRequest;
}