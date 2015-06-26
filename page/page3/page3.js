var Page3 = function(el, options) {
	Page.apply(this, arguments);
}
Page3.prototype = $.extend({}, Page.prototype, {
    el: $('#page3'),
    formTpl: __inline('form.tmpl'),
	init: function() {
		this.$submit = $("#weddingCardFormSubmit");
        this.renderForm();
		this.eventHandler();
	},
	eventHandler: function() {
		this.$el.on('click', '#weddingCardFormSubmit', $.proxy(this.postInfo, this));
		this.$el.on("click", ".wedding-photo", $.proxy(this.postPhoto, this));
	},
	postInfo : function(event) {
		event.stopPropagation();
		var me = this;
		var url = DOMAIN + 'postWeddingCard';
		var dataSet = $(event.target).data('pageswitch');
		var data = {
			"boys_name": $("#boyName").val(),
			"girls_name": $("#girlName").val(),
			"wedding_date": $("#weddingTime").val(),
			"wedding_hotel": $("#weddingHotel").val(),
			"wedding_location": $("#weddingPosition").val(),
			"card": $("#weddingCardText").val(),
			"pic_well_id": $("[data-photo-page='firstPage']").data('wx-photo'),
			"pic_home_id": $("[data-photo-page='secondPage']").data('wx-photo')
		}
		$.ajax({
			url: url,
			dataType: 'jsonp',
			data : data,
			success: function(data) {
				if(data.code == 0) {
					$("body").trigger('pageSwitch', dataSet);
				}
			}
		})
	},
	postPhoto: function(event) {
		var me = this;
		var $se = $(event.target).parents(".wedding-photo");
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

                                $se.find("img").attr("src", chRes.localIds[i]);
                                var serverId = upRes.serverId; // 返回图片的服务器端ID
                                img.serverIds.push(serverId);
                                $se.data('wx-photo',serverId);
                            },
                            fail: function (res) {
                	            alert(JSON.stringify(res));
                	        }
                        });
                  }

              }
             });
	},
    renderForm: function() {
        var url = DOMAIN + 'getWeddingCard';
        var me = this;
        $.ajax({
            url: url,
            dataType: 'jsonp',
            success: function(data) {
                  data.data = data.data || {};
                  data.data.pic_well = data.data.pic_well || {};
                  data.data.pic_home = data.data.pic_home || {};
                  data.data.pic_well.path = data.data.pic_well.path ? data.data.pic_well.path
                                            : __uri('add.png');
                  data.data.pic_home.path = data.data.pic_home.path ? data.data.pic_home.path
                                            : __uri('add.png');
                  me.$el.append(me.formTpl({data:data.data}))
            }
        });
    }
});
module.exports = Page3;