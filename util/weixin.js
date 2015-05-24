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
	}
	
}
weixin.init();
wx.ready(function() {
    var images = {
        localId: [],
        serverId: []
      };
	$("#checkApi").on("click", function() {
		 wx.checkJsApi({
	      jsApiList: [
	        'chooseImage',
	        'previewImage',
			'uploadImage'
	      ],
	      success: function (res) {
	        alert(JSON.stringify(res));
	      }
		});
	});
    $("#chooseImage").on("click", function() {
        wx.chooseImage({
          success: function (res) {
            images.localId = res.localIds;
			var str = '';
			for(var i = 0 , len = res.localIds.length; i < len; i++) {
				//str += '<img src="'+res.localIds[i]+'" />';
				$('body').append($('<img src="'+res.localIds[i] + '" />'));
			}
//			$(this).after(str)
            alert('已选择 ' + res.localIds.length + ' 张图片');
          }
        });
    });
	$("#previewImage").on('click', function() {
		wx.previewImage({
	      current: 'http://img5.douban.com/view/photo/photo/public/p1353993776.jpg',
	      urls: [
	        'http://img3.douban.com/view/photo/photo/public/p2152117150.jpg',
	        'http://img5.douban.com/view/photo/photo/public/p1353993776.jpg',
	        'http://img3.douban.com/view/photo/photo/public/p2152134700.jpg'
	      ]
	    });
	});
	$("#uploadImage").on('click', function() {
		if (images.localId.length == 0) {
	      alert('请先使用 chooseImage 接口选择图片');
	      return;
	    }
	    var i = 0, length = images.localId.length;
	    images.serverId = [];
	    function upload() {
	      wx.uploadImage({
	        localId: images.localId[i],
	        success: function (res) {
	          i++;
	          alert('已上传：' + i + '/' + length);
	          images.serverId.push(res.serverId);
	          if (i < length) {
	            upload();
	          }
	        },
	        fail: function (res) {
	          alert(JSON.stringify(res));
	        }
	      });
	    }
	    upload();
	});
	$("#downloadImage").on('click', function() {
		if (images.serverId.length === 0) {
	      alert('请先使用 uploadImage 上传图片');
	      return;
	    }
	    var i = 0, length = images.serverId.length;
	    images.localId = [];
	    function download() {
	      wx.downloadImage({
	        serverId: images.serverId[i],
	        success: function (res) {
	          i++;
	          alert('已下载：' + i + '/' + length);
	          images.localId.push(res.localId);
	          if (i < length) {
	            download();
	          }
	        }
	      });
	    }
	    download();
		});
});