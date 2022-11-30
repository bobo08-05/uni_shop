<template>
	<view>
		<view class="address_button_box" v-if="JSON.stringify(address) === '{}'">
			<button type="primary" size="mini" @click="choosAddress">请选择收货地址+</button>
		</view>
		
		<view class="address_info_box" v-else @click="choosAddress">
			<view class="address_info_row1">
				<view class="row1_left">收货人：{{address.userName}}</view>
				<view class="row1_right">
					<view class="phone">{{address.telNumber}}</view>
					<uni-icons type="arrowright" size="16"></uni-icons>
				</view>
			</view>
			
			<view class="address_info_row2">
				<view class="row2_left">收货地址：</view>
				<view class="row2_right">
					{{addstr}}
				</view>
			</view>
		</view>
		
		<image src="../../static/cart_border@2x.png" class="address_border"></image>
	</view>
</template>

<script>
	import{mapState,mapMutations,mapGetters} from 'vuex'
	export default {
		data() {
			return {
				// address:{
				// 	// name:11
				// }
			};
		},
		computed:{
			...mapState('m_user',['address']),
			...mapGetters('m_user',['addstr'])
		},
		methods:{
			...mapMutations("m_user",['updateAddress']),
			async choosAddress(){
				const [err,succ] =await uni.chooseAddress().catch(err=>err)
				// console.log(succ)
				if(err === null && succ.errMsg === "chooseAddress:ok"){
					// this.address = succ
					this.updateAddress(succ)
				}
				
				// if(err && err.errMsg === 'chooseAddress:fail auth deny'){
				// 	this.reAuth()
				// }
			},
			// async reAuth(){
			// 	const res =await uni.showModal({
			// 		content:'检测到您没有授权地址权限，是否设置去打开',
			// 		confirmText:'确认'
			// 	})
			// 	console.log(res)
			// }
		}
	}
</script>

<style lang="scss">
.address_border{
	display: block;
	width: 100%;
	height: 5px;
}
.address_button_box{
	height: 90px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.address_info_box{
	font-size: 12px;
	height: 90px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 0 5px;
	.address_info_row1{
		display: flex;
		justify-content: space-between;
		.row1_left{
			
		}
		.row1_right{
			display: flex;
			justify-content: space-between;
			.phone{
				
			}
		}
	}
	.address_info_row2{
		display: flex;
		align-items: center;
		margin-top: 5px;
		.row2_right{
			white-space: nowrap;
		}
	}
}
</style>
