# 婚礼请帖H5接口规范

> 所有数据都通过jsonp请求获得


## 一、亲友篇
- 查看新人相册

			@description 新人相册接口
			@name getAlubm
			@return {array}
			{
				img_list : []
			}
- 婚宴信息
				
		@description 请帖内容接口
		@name getWeddingCard
		@return {object} 
		{
			img_url : '',
			content : ''	
		}	

- 嘉宾信息登记

		@description 嘉宾信息提交接口 
		@name  postGuestInfo
		@params 
		{
			name : '',
			tel : ''
		}
		@return {object}
		{
			status_code : ''
		}

- 添加祝福（**语音提交**待调研微信SDK）

		@descrition 添加祝福接口
		@name  addWishMessage
		@return {object}
		{
			person : '',
			message : '',
			way : ''
		}

- 获取祝福

		@description 获取祝福接口
		@name getWishMessage
		@return {array}
		[
			{
				message : '',
				way : '',
				person: ''
			}
		]

- 新人愿望清单

		@description 获取新人愿望清单接口
		@name getWishList
		@return {array}
		[
			{
				wish_id : '',
				wish_img : '',
				wish_title : ''
			}
		]

- 收到的礼物（亲友、新人通用）

		@description 收到的礼物
		@name getGift
		@params 
		{
			person_id : ''
		}
		@return {array}
		[
			{
				gift_id : '',
				person_from : '',
				gift_img : '',
				likes : ''
			}
		]
		
- 晒礼物（实现方式暂不明确，礼物图片从何而来）

		@description 晒礼物接口
		@name showGift
		@return {array}
		{
			thank_words : '',
			gift_list : [
					{
						gift_img  :  '',
						gift_title  :  ''
					}	
			]
		}		

- 添加现场图片（微信图片上传需要调研）
		
		@description 提交现场图片接口
		@name postWeddingImg
		@param 
		{
			img_url : ''
		}
		@return {object}
		{
				status_code : ''
		}
			
- 现场图片

		@description 展现现场图片接口
		@name showWeddingImg
		@return {array}
		[
			{
				img_url : '',
				likes : ''	
			}		
		]

- 点赞（统一化）

		@description 点赞接口
		@name addLikes
		@params 
		{
			img_id : ''
		}
		@return {object}
		{
			status_code : ''
		}


## 新人篇

- 编辑喜帖

		@description 提交喜帖接口
		@name postWeddingCard
		@params
		{
			boys_name : '',
			girls_name : '',
			wedding_date : '',
			wedding_location: '',
			card : ''
		}
		@return {object}
		{
			status_code : ''
		}
- 更新喜帖 

		@description 更新喜帖内容
		@name updateWeddingCard
		@params 同上
		@return 同上

- 嘉宾列表

		@description 嘉宾信息接口
		@name getGuestList
		@return {array}
		[
			{
				guest_name : '',
				guest_tel : ''
			}
		]

- 新人相册

		@description 提交新人相册接口
		@name postWeddingImg
		@params 
		@return {object}
		{
			status_code : ''
		}		  
		
- 亲友祝福


		@description 获取亲友祝福接口
		@name getWishes
		@return {array}
		[
			{
				way : '',
				message : '',
				person_id : ''
			}
		]


-	心愿清单


		@description 编辑心愿清单接口
		@name postWishes
		@params {array}
		[
			{
				gift_img : '',
				gift_title : ''
			}

		]
		@return {object}
		{
			status_code : ''
		}


- 添加分类

		@description 添加分类接口
		@name addWeddingPart
		@params {object}
		{
			part_title : ''		
		}
		@return {object}
		{
			status_code : ''
		}

-  获取分类

		@description 获取分类接口
		@name getWeddingPart
		@return {array}
		[
			{
				part_id : '',
				part_title: '',
				part_img: []
			}
	]

- 更新分类

		@description 更新分类接口
		@name updateWeddingPart
		@params {object}
		@return {object}
		{
			status_code:''
		}
		
## 整体项目安排

5.16 周六 联调微信SDK问题
5.17 周日 新人篇：接口1-4
5.18 周一 新人篇：接口5-6
5.18 周二 新人篇：接口7-9


亲友篇：11个
5.19 周三 接口 1-2
5.20 周四 接口 3-4
5.21 周五 接口 5-6
5.22 周六 接口 7-10
5.21 周日 接口 11