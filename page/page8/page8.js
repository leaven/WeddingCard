var Page8 = function(el, options) {
	Page.apply(this, arguments);
}
Page8.prototype =$.extend({}, Page.prototype, {
	$el: $("#page8"),
	tpl: __inline('part.tmpl'),
	photoTpl: __inline('photo.tmpl'),
	init: function() {
		this.eventHandler();
		this.getData();
	},
	eventHandler: function() {
		this.$el.on("click", '.photo-edit', $.proxy(this.editTitle, this));
		this.$el.on("click", '.photo-add', $.proxy(this.postPhoto, this));
	},
	editTitle: function(event) {
		//focus on
		var $targetTitle = $(event.target).siblings('.photo-title');
		var oldValue = $targetTitle.val();
		$targetTitle.removeAttr('readonly');
		$targetTitle.val('');
		$targetTitle.focus();
		$targetTitle.on('blur', function() {
			var me = this;
			var newValue = $(this).val();
			if(newValue === '' || newValue === oldValue) {
				$(this).val(oldValue);
			}else {
				var type_id = $(this).parent().data('type_id');
				var url = DOMAIN + 'updateWeddingPart';
				$.ajax({
					url: url,
					dataType: 'jsonp',
					data : {
						type_id: type_id,
						type_name: newValue
					},
					success: function(data) {
						if(data.code != 0) {
							alert('更新失败');
							$(me).val(oldValue);
						}
					}
				})
			}
			$(this).off('blur');
			$(this).attr('readonly', true);
		})
	},
	postPhoto : function(event) {
		var me = this;
		var $photoList = $(event.target).parents('.photo-menu').siblings('.photo-list');
		var type_id = $(event.target).parents('.photo-menu').data('type_id');
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
                            $photoList.addClass('photo-list-high');
							$photoList.append(me.photoTpl({data: {no: i, imgUrl: chRes.localIds[i]}}));
                            var serverId = upRes.serverId; // 返回图片的服务器端ID
                            img.serverIds.push(serverId);
                            $.ajax({
                                url : DOMAIN + 'updateWeddingPartImg',
                                method  : 'GET',
                                data : {
                                    wx_media_id: serverId,
									type_id: type_id
                                },
                                jsonpCallback : 'postPhoto',
                                success : function(data) {
                                    alert(data);
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
	},
	getData: function() {
		var me = this;
		var url = DOMAIN + "getWeddingPart";
		$.ajax({
			url: url,
			dataType: 'jsonp',
			success: function(data) {
				if(data.code == 0) {
					me.render(data.data);
				}
			}
		});
	},
	render: function(data){
		this.$el.append(this.tpl({data: data}));
	}
})