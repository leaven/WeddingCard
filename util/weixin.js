var weixin = {
	init : function() {
		this.getToken();
		this.eventHandler();
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
				    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				    appId: data.appId, // 必填，公众号的唯一标识
				    timestamp: data.timestamp, // 必填，生成签名的时间戳
				    nonceStr: data.nonceStr, // 必填，生成签名的随机串
				    signature: data.signature,// 必填，签名，见附录1
				    jsApiList: [
						'checkJsApi',
				        'onMenuShareTimeline',
				        'onMenuShareAppMessage',
				        'onMenuShareQQ',
				        'onMenuShareWeibo',
				        'hideMenuItems',
				        'showMenuItems',
				        'hideAllNonBaseMenuItem',
				        'showAllNonBaseMenuItem',
				        'translateVoice',
				        'startRecord',
				        'stopRecord',
				        'onRecordEnd',
				        'playVoice',
				        'pauseVoice',
				        'stopVoice',
				        'uploadVoice',
				        'downloadVoice',
				        'chooseImage',
				        'previewImage',
				        'uploadImage',
				        'downloadImage',
				        'getNetworkType',
				        'openLocation',
				        'getLocation',
				        'hideOptionMenu',
				        'showOptionMenu',
				        'closeWindow',
				        'scanQRCode',
				        'chooseWXPay',
				        'openProductSpecificView',
				        'addCard',
				        'chooseCard',
				        'openCard'
					] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				});
			}
		});
	},
	initShare: function() {
		var share_url = 'http://www.wifimeishi.cn/wedding/index.php?page=card&userid='
						+ window.userid;
		wx.ready(function() {
			wx.onMenuShareAppMessage({
			    title: '婚礼请帖', // 分享标题
			    desc: '「我们」结婚了！你的一点祝福，是我们最大的幸福~', // 分享描述
			    link: share_url, // 分享链接
			    imgUrl: __uri('/static/img/share.png'), // 分享图标
			    type: '', // 分享类型,music、video或link，不填默认为link
			    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
			    success: function () {
			        // 用户确认分享后执行的回调函数
			    },
			    cancel: function () {
			        // 用户取消分享后执行的回调函数
			    }
			});
			wx.onMenuShareTimeline({
			    title: '婚礼请帖', // 分享标题
			    desc:'「我们」结婚了！你的一点祝福，是我们最大的幸福~',
			    link: share_url, // 分享链接
			    imgUrl: __uri('/static/img/share.png'), // 分享图标
			    success: function () {
			        // 用户确认分享后执行的回调函数
			    },
			    cancel: function () {
			        // 用户取消分享后执行的回调函数
			    }
			});
		});
	},
	eventHandler: function() {
		$("body").on("click", '[data-photosrc]', function(event) {
			var me = this;
			var src = $(this).data('photosrc');
			wx.previewImage({
			    current: src, // 当前显示图片的http链接
			    urls: [src]
			});
		});
	}

}
weixin.init();
