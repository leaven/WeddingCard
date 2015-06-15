var Page4 = function(el, options) {
    Page.apply(this, arguments);
}
Page4.prototype =$.extend({}, Page.prototype, {
    $el : $("#page4"),
    photoTpl : __inline("photo.tmpl"),
    $picList: $("#picList"),
    init : function() {
       this.getPhoto();
    },
    getPhoto: function() {
      var me = this;
      var url = DOMAIN + 'getWeddingPhotos';
        $.ajax({
          url : url,
          data: {
              userid: window.userid
          },
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
    }
});