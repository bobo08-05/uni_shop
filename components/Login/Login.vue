<template>
	<view>
		<view class="login_box">
			<uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
			<button type="primary" class="btn" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button>
			<text>登录后尽享更多权益</text>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations,mapState
	} from 'vuex'
	export default {
		data() {
			return {

			};
		},
		computed:{
			...mapState('m_user',['redirectInfo'])
		},
		methods: {
			...mapMutations('m_user', ['updateUserInfo','updateToken','updateRedirectInfo']),
			// getUserProfile() {
			// 	uni.getUserProfile({
			// 		desc: '用于完善个人资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
			// 		success: (res) => {
			// 			// 3. 将用户的基本信息存储到 vuex 中
			// 			this.updateUserInfo(res.userInfo)

			// 			// 获取登录成功后的 Token 字符串
			// 			this.getToken(res)
			// 		},
			// 		fail: (res) => {
			// 			return uni.$showMsg('您取消了登录授权')
			// 		}
			// 	})
			// }
			getUserInfo(e){
				// console.log(e)
				if(e.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了登录授权！')
				this.updateUserInfo(e.detail.userInfo)
				this.getToken()
				this.navigateBack()
			},
			async getToken(){
				const [err,res] = await uni.login().catch(err => err)
				if(err || res.errMsg !== 'login:ok') return uni.$showMsg('登录失败')
				this.updateToken(res.code)
				},
				navigateBack(){
					if(this.redirectInfo && this.redirectInfo.openType === 'switchTab'){
						uni.switchTab({
							url:this.redirectInfo.from,
							complete: () => {
								this.updateRedirectInfo(null)
							}
						})
					}
				}
		// 		const query={
		// 			// '013pZWCt0GniKb1ftkBt0AxfDt0pZWCf'
		// 			code:res.code,
		// 			encryptedData:info.encryptedData,
		// 			iv:info.iv,
		// 			rawData:info.rawData,
		// 			signature:info.signature
		// 		}
		// 		// console.log(query)

		// 		const {data:result} =await uni.$http.post('/api/public/v1/users/wxlogin',query)
		// 		if(result.meta.status !== 200) return uni.$showMsg()
		// 		uni.$showMsg('登录成功!')
		// 	}
		}
	}
</script>

<style lang="scss">
	.login_box {
		height: 750rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #F8F8F8;
		position: relative;
		overflow: hidden;

		&::after {
			content: '';
			width: 100%;
			height: 40px;
			position: absolute;
			bottom: 0;
			background-color: white;
			border-radius: 100%;
			transform: translateY(50%);
		}

		.btn {
			width: 90%;
			border-radius: 100px;
			margin: 15px 0;
			background-color: #C00000;
		}

		text {
			font-size: 12px;
			color: gray;
		}
	}
</style>
