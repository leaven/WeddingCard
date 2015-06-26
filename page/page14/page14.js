var Page14 = function(el, options) {
    Page.apply(this, arguments);
}
Page14.prototype =$.extend({}, Page.prototype, {
  $el : $("#page14"),
  photoTpl : __inline("/page/page4/photo.tmpl"),
  $picList: $("#partPicList"),
  init : function() {
        this.getPhoto();
        this.eventHandler();
    },
  getPhoto: function() {
    var me = this;
    var url = DOMAIN + 'getWeddingPartImg?type_id=' + this._settings.type_id;
    $.ajax({
      url : url,
      dataType: 'jsonp',
      success: function(data) {
        if(data.code == 0) {
          var str = '';
          for(var i = 0, len = data.data.imgs.length; i < len; i++) {
              str += me.photoTpl({data:data.data.imgs[i].path});
          }
          me.$picList.html(str);
        }
      }
    });
  },
  eventHandler: function() {
        var me = this;
        me.$el.on("click", "#uploadPartPhoto", function() {
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
                                        var $backBtn = me.$el.find(".back");
                                        var dataSet = $backBtn.data('pageswitch');
                                        dataSet.refresh = true;
                                        $backBtn.data(dataSet);
                                        $.ajax({
                                            url : DOMAIN + 'updateWeddingPartImg',
                                            method  : 'GET',
                                            data : {
                                                type_id : me._settings.type_id,
                                                wx_media_id : serverId
                                            },
                                            jsonpCallback : 'updateWeddingPartImg',
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

  },
  destroy: function() {
    this.$el.find(".head").remove();
    this.$el.off("click");
    this.$picList.html("");
  }
});
module.exports = Page14;