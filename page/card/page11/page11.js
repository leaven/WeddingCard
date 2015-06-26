var Page11 = function(el, options) {
    Page.apply(this, arguments);
}
Page11.prototype =$.extend({}, Page.prototype, {
    $el: $("#page11"),
    voiceTpl: __inline('voice.tmpl'),
    userTpl: __inline('userinfo.tmpl'),
    init: function() {
        this.$el.find('.user-info').html(this.userTpl({userData: userData}));
        this.voiceList = this.$el.find('.voice-list');
        this.$guide = this.$el.find('.voice-guide');
        this.$controlBtn = this.$el.find('.control-btn');
        this.$controlSubmit = this.$el.find('.control-btn-submit');
        this.eventHandler();
    },
    eventHandler: function() {
        var me = this;
        wx.onVoicePlayEnd({
            success: function (res) {
                me.$el.find('.voice-play').addClass('voice-pause');
            }
        });
        this.$el.on('touchstart', '.control-btn', $.proxy(this.startRecord, this));
        this.$el.on('click', '.voice-play', $.proxy(this.voiceHandler, this));
        this.$el.on('touchend', '.control-btn', $.proxy(this.stopRecord, this));
        this.$el.on('click', '.control-btn-submit', $.proxy(this.postWish, this));
        this.$el.on('click', '.voice-del', $.proxy(this.delVoice, this));
    },
    startRecord: function(event) {
        this.$controlBtn.on('touchmove', $.proxy(this.cancelRecord, this));
        this.startY = event.originalEvent.touches[0].pageY;
        this.touchY = this.startY;
        this.endY = this.$controlBtn.offset().top;
        this.$guide.css('visibility', 'visible');
        wx.startRecord();
    },
    voiceHandler: function(event) {
        var $se = $(event.target),
            localId = $se.attr("data-voiceId");
        if($se.hasClass('voice-pause')) {
            this.playVoice(localId);
            $se.removeClass('voice-pause');
        }else {
            this.pauseVoice(localId);
            $se.addClass('voice-pause');
        }
    },
    playVoice: function(localId) {
        wx.playVoice({
            localId: localId // 需要播放的音频的本地ID，由stopRecord接口获得
        });
    },
    pauseVoice: function(localId) {
        wx.pauseVoice({
            localId: localId // 需要暂停的音频的本地ID，由stopRecord接口获得
        });
    },
    delVoice: function(event) {
        var $se = $(event.target);
        $se.parent().remove();
        delete this.localId;
        this.$controlBtn.show();
        this.$controlSubmit.hide();
    },
    cancelRecord: function(event) {
        event.preventDefault();
        this.touchY = event.originalEvent.touches[0].pageY;
        if(this.touchY < this.endY) {
             this.$guide.addClass('voice-guide-cancel');
        }

    },
    stopRecord: function() {
        var me = this;
        this.$guide.css('visibility', 'hidden');
        if(this.touchY < this.endY) {
            //canceled
            this.$guide.removeClass('voice-guide-cancel');
            this.$controlBtn.off('touchmove');
            wx.stopRecord();
        }else {
            //stop record
            wx.stopRecord({
                success: function (res) {
                    var localId = res.localId;
                    me.voiceList.append(me.voiceTpl({localId: localId}));
                    wx.uploadVoice({
                        localId: localId, // 需要上传的音频的本地ID，由stopRecord接口获得
                        isShowProgressTips: 1, // 默认为1，显示进度提示
                        success: function (res) {
                            me.voiceId = res.serverId; // 返回音频的服务器端ID
                            me.$controlBtn.hide();
                            me.$controlSubmit.show();
                        }
                    });
                }
            });
        }
    },
    postWish: function(event) {
        event.stopPropagation();
        var url = DOMAIN + "addWeddingBless";
        var me = this;
        $.ajax({
            url: url,
            data: {
                userid: window.userid,
                wx_media_id: me.voiceId
            },
            dataType: 'jsonp',
            success: function(data) {

                if(data.code == 0) {
                    alert('提交成功');
                    var dataSet = $(event.target).data('pageswitch');
                    $("body").trigger("pageSwitch", dataSet);
                }else {
                    alert('提交失败');
                }
            }
        })
    }
});
module.exports = Page11;