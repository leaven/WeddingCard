var Page4 = function(el, options) {
	Page.apply(this, arguments);
}
Page4.prototype =$.extend({}, Page.prototype, {
	$el : $("#page4"),
  photoTpl : __inline("photo.tmpl"),
  $picList: $("#picList"),
	init : function() {
    this.getPhoto();
		this.eventHandler();
	},
  getPhoto: function() {
    var me = this;
    var url = DOMAIN + 'getWeddingPhotos';
    $.ajax({
      url : url,
      dataType: 'jsonp',
      success: function(data) {
        if(data.code == 0) {
          var str = '';
          for(var i = 0, len = data.data.length; i < len; i++) {
              str += me.photoTpl({data:data.data[i].pic.path});
          }
          me.$picList.append(str);
        }
      }
    });
  },
	eventHandler: function() {
		 var me = this;
		 me.$el.on("click", "#uploadPhoto", function() {
        wx.chooseImage({
              success: function (chRes) {

                  var i = 0,
                      len = chRes.localIds.length;
                  var img = {
                      serverIds : []
                  }
                  upload();
                  function upload() {

                  //    setTimeout(function() {
                              wx.uploadImage({
                                    localId: chRes.localIds[i], // 需要上传的图片的本地ID，由chooseImage接口获得
                                    isShowProgressTips: 1, // 默认为1，显示进度提示
                                    success: function (upRes) {
                                        me.$picList.append(me.photoTpl({data:chRes.localIds[i]}));
                                        var serverId = upRes.serverId; // 返回图片的服务器端ID
                                        img.serverIds.push(serverId);
                                        $.ajax({
                                            url : DOMAIN + 'postWeddingPhoto',
                                            method  : 'GET',
                                            data : {
                                                wx_media_id : serverId
                                            },
                                            jsonpCallback : 'postWeddingPhoto',
                                            success : function(data) {
                                            }
                                        });
                                        i++;
                                        if(i < len) {
                                            upload();
                                        }

                                    },
                                    fail: function (res) {
                        	            alert(JSON.stringify(res));
                        	        }
                                });
                 //     },100);
                  }

              }
             });
        });

	}
});