<template>
	<view>
	<view class="cart_box" v-if="cart.length !==0">
	 <myAddress></myAddress>
		
		<view class="cart_title">
			<uni-icons type="shop" size="18"></uni-icons>
			<text>购物车</text>
		</view>
				
		<uni-swipe-action>
			<view v-for="(cart,i) in cart" :key='i' @click='goGoodsDetail(cart)'>
			<uni-swipe-action-item :options="options" @click="deleteGoods(cart)">
				<GoodsItem :item='cart' :showRadio="true" @radioChange="radioChangeHandler" :showNumBox="true" @numChange="numChangeHandler"></GoodsItem>
			</uni-swipe-action-item>
			</view>
		</uni-swipe-action>
		
		<MySettle></MySettle>
	</view>
	
	<view class="empty_cart" v-else :style="{height: wh+'px'}">
		<image src="../../static/cart.png"></image>
		<text>空空如也~</text>
	</view>
	</view>
</template>

<script>
	import badgeMin from '@/mixins/tabbar_badge.js'
	import {mapState,mapMutations} from 'vuex'
	export default {
		mixins:[badgeMin],
		data() {
			return {
				options:[{
					text:'删除',
					style:{
						backgroundColor:'#c00000'
					}
				}],
				wh:0
			};
		},
		computed:{
			...mapState('m_cart',['cart']),
		},
		onLoad() {
			// console.log(this.cart)
				// 获得窗口数据信息
				const sys = uni.getSystemInfoSync()
				this.wh = sys.windowHeight-150

		},
		methods:{
			...mapMutations('m_cart',['updateRadioState','updateGoodsCount','removeGoods']),
			radioChangeHandler(e){
				// console.log(e,this.cart)
				this.updateRadioState(e)
			},
			numChangeHandler(e){
				// console.log(e)
				this.updateGoodsCount(e)
			},
			deleteGoods(cart){
				this.removeGoods(cart)
			},
			goGoodsDetail(cart){
				uni.navigateTo({
					url:'/subpackage/goods_detail/goods_detail?goods_id='+cart.goods_id
				})
			}
		}
	}
</script>

<style lang="scss">
.cart_title{
	height: 40px;
	display: flex;
	align-items: center;
	padding-left: 5px;
	border-bottom: 1px solid #efefef;
	
	text{
		font-size: 14px;
		margin-left: 10px;
	}
}
.cart_box{
	padding-bottom: 50px;
}
.empty_cart{
	width: 100%;
	// height: 700px;
	background-color: #f2f8f8;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 150px;
	image{
		width: 90px;
		height: 90px;
	}
	text{
		font-size: 12px;
		margin-top: 15px;
		color: gray;
	}
}
</style>
