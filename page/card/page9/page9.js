var Page9 = function(el, options) {
    Page.apply(this, arguments);
}
Page9.prototype =$.extend({}, Page.prototype, {
    $el: $("#page9"),
    tpl: __inline('photo.tmpl'),
    init: function() {
        this.$photoList = this.$el.find('.photo-list');
        this.eventHandler();
    },
    eventHandler: function() {
        this.$el.on('click', '.photo-post', $.proxy(this.postPhoto, this));
        this.$el.on('click', '.submit-btn', $.proxy(this.submitCard, this));
        this.$el.on('click', '.del-photo', $.proxy(this.deletePhoto, this));
    },
    postPhoto: function(event) {
        var me = this;
        me.photoIds = [];
        wx.chooseImage({
            success: function (chRes) {
              var i = 0,
                  len = chRes.localIds.length;
              var img = {
                  serverIds : []
              }
              upload();
              function upload() {
                  wx.uploadImage({
                        localId: chRes.localIds[i], // 需要上传的图片的本地ID，由chooseImage接口获得
                        isShowProgressTips: 1, // 默认为1，显示进度提示
                        success: function (upRes) {
                            me.$photoList.append(me.tpl({data: {no: i, imgUrl: chRes.localIds[i]}}));
                            var serverId = upRes.serverId; // 返回图片的服务器端ID
                            me.photoIds.push(serverId);
                            i++;
                            if(i < len) {
                                upload();
                            }

                        },
                        fail: function (res) {
                            alert(JSON.stringify(res));
                        }
                    });
              }

            }
        });
    },
    submitCard: function(event) {
        event.stopPropagation();
        var me = this;
        $.ajax({
            url : DOMAIN + 'sendWeddingGift',
            method  : 'GET',
            data : {
                userid: window.userid,
                wx_media_ids: me.photoIds.join(','),
                msg: me.$el.find('.wish-content').val()
            },
            dataType: 'jsonp',
            success : function(data) {
                var dataSet = $(event.target).data('pageswitch');
                if(data.code == 0) {
                    alert('提交成功');
                    $("body").trigger("pageSwitch", dataSet);
                }else {
                    alert('提交失败');
                }
            },
            timeout: function() {
                alert('网络超时');
            }
        });
    },
    deletePhoto: function(event) {
        var $se = $(event.target);
        var index = $se.data('index');
        $se.parents('.photo-item').remove();
        this.photoIds.splice(index, 1);
    }
});
module.exports = Page9;