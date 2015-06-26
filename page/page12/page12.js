var Page12 = function(el, options) {
    Page.apply(this, arguments);
}
Page12.prototype =$.extend({}, Page.prototype, {
    $el : $("#page12"),
    noWishTpl: __inline("no_wish.tmpl"),
    wishTpl: __inline("wishes.tmpl"),
    init : function() {
        this.eventHandler();
        this.getWeddingBless();
    },
    eventHandler: function() {
        var me = this;
        wx.onVoicePlayEnd({
            success: function (res) {
                me.$el.find('.voice-play').addClass('voice-pause');
            }
        });
        this.$el.on('click', '.voice-play', $.proxy(this.voiceHandler, this));
    },
    voiceHandler: function(event) {
        var me = this,
            $se = $(event.target),
            localId = $se.data('localid');
        if(!localId) {
            var serverId = $se.data("voiceid");
            this.getVoiceLocalId(serverId, voicehandler);
        }else {
            voicehandler(localId);
        }
        function voicehandler(localId) {
            $se.data('localid',localId);
            if($se.hasClass('voice-pause')) {
                me.playVoice(localId);
                $se.removeClass('voice-pause');
            }else {
                me.pauseVoice(localId);
                $se.addClass('voice-pause');
            }
        }
    },
   getVoiceLocalId: function(serverId, callback) {
        var me = this;
        wx.downloadVoice({
            serverId: serverId, // 需要下载的音频的服务器端ID，由uploadVoice接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function (res) {
                var localId = res.localId; // 返回音频的本地ID
                if(typeof callback === 'function') {
                    callback(localId);
                }
            },
            fail: function(res) {
                alert("语音已失效");
            }
        });

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
    getWeddingBless: function() {
        var url = DOMAIN + "getWeddingBless";
        var me = this;
        $.ajax({
            url: url,
            dataType: 'jsonp',
            success: function(data) {
                if(data.code == 0) {
                    if(data.data.length == 0) {
                        //渲染无祝福页
                        me.$el.append(me.noWishTpl);
                    }else {
                         // me.$el.append(me.noWishTpl);
                        me.render(data.data);
                    }
                }
            }
        })
    },
    render: function(data) {
        this.$el.append(this.wishTpl({data:data}));
    }
});
module.exports = Page12;