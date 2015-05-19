var weixin = {
	init : function() {
		this.getToken();
	},
	getToken : function() {
		var me = this;
		$.ajax({
			url : "http://www.wifimeishi.cn/wedding/jsticket.php",
			dataType : "jsonp",
			data : {
				url : location.href.split('#')[0]
			},
			success : function(data) {
				wx.config({
				    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				    appId: data.appId, // 必填，公众号的唯一标识
				    timestamp: data.timestamp, // 必填，生成签名的时间戳
				    nonceStr: data.nonceStr, // 必填，生成签名的随机串
				    signature: data.signature,// 必填，签名，见附录1
				    jsApiList: ["startRecord"，"chooseImage"，"previewImage","uploadImage","downloadImage"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				});
			}
		});
	}
	
}
wx.ready(function(){
	
});
wx.error(function(res){
	console.log(res);
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。

});
weixin.init();