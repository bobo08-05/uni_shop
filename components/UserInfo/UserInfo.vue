<template>
	<view class="userinfo_container">
		<view class="top_box">
			<image :src="userInfo.avatarUrl" class="avater"></image>
			<view class="nickname">{{userInfo.nickName}}</view>
		</view>

		<view class="panel_list">
			<!--  第一个面板-->
			<view class="panel">
				<view class="panel_body">
					<view class="panel_item">
						<text>2</text>
						<view class="">收藏的店铺</view>
					</view>
					<view class="panel_item">
						<text>12</text>
						<view class="">收藏的商品</view>
					</view>
					<view class="panel_item">
						<text>32</text>
						<view class="">关注的商品</view>
					</view>
					<view class="panel_item">
						<text>62</text>
						<view class="">足迹</view>
					</view>
				</view>
			</view>
			<!--  第二个面板-->
			<view class="panel">
				<view class="panel_title">
					我的订单
				</view>
				<view class="panel_body">
					<view class="panel_item">
						<image src="../../static/my-icons/icon1.png" class="icons"></image>
						<text>待付款</text>
					</view><view class="panel_item">
						<image src="../../static/my-icons/icon2.png" class="icons"></image>
						<text>待收货</text>
					</view><view class="panel_item">
						<image src="../../static/my-icons/icon3.png" class="icons"></image>
						<text>退款/退货</text>
					</view><view class="panel_item">
						<image src="../../static/my-icons/icon4.png" class="icons"></image>
						<text>全部订单</text>
					</view>
				</view>
			</view>
			<!--  第三个面板-->
			<view class="panel">
				<view class="panel3_item">
					<text>收货地址</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>	<view class="panel3_item">
					<text>联系客服</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>	<view class="panel3_item" @click="logout">
					<text>退出登录</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,mapMutations
	} from "vuex"
	export default {
		data() {
			return {

			};
		},
		computed: {
			...mapState('m_user', ['userInfo'])
		},
		methods:{
			...mapMutations('m_user',['updateAddress','updateUserInfo','updateToken']),
			async logout(){
			const [err,succ]=await	uni.showModal({
					title:'提示',
					content:'确定退出登录吗？'
				}).catch(err=> err)
				if(succ && succ.confirm){
					this.updateAddress({})
					this.updateUserInfo({})
					this.updateToken('')
				}
			}
		}
	}
</script>

<style lang="scss">
	.userinfo_container {
		height: 100%;
		background-color: #f4f4f4;

		.top_box {
			height: 400rpx;
			background-color: #C00000;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.avater {
				width: 90px;
				height: 90px;
				border-radius: 45px;
				border: 2px solid white;
				box-shadow: 0 1px 5px #1c1a1a;
			}

			.nickname {
				font-size: 16px;
				font-weight: bold;
				margin-top: 10px;
				color: #FFF;
			}
		}

		.panel_list {
			padding: 0 10px;
			position: relative;
			top: -10px;
			.panel {
				background-color: white;
				border-radius: 3px;
				margin-bottom: 8px;
				.panel_title{
					line-height: 45px;
					padding-left: 10px;
					font-size: 15px;
					border-bottom: 1px solid #f4f4f4;
				}
				.panel_body {
					display: flex;
					justify-content: space-around;
					.panel_item {
						display: flex;
						flex-direction: column;
						align-items: center;
						padding: 10px 0;
						font-size: 13px;
						.icons{
							width: 35px;
							height: 35px;
							}
					}
				}
				.panel3_item{
					 display: flex;
						justify-content: space-between;
						line-height: 45px;
						padding: 0 10px;
						font-size: 15px;
						border-bottom: 1px solid #f4f4f4;
					}
			}
		}
	}
</style>
