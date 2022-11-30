<template>
	<view>
		<view class="settle_box">
				<label class="radio" @click="changeAllCheched">
					<radio :checked="isFullChecked" color="#C00000"/><text>全选</text>
				</label>
			<view class="settle_price">
				总计:<text class="price">￥{{totalPrice}}</text>
			</view>
			<view class="settle_button">结算({{checkedCount}})</view>
		</view>
	</view>
</template>

<script>
	import {mapGetters,mapMutations} from 'vuex'
	export default {
		data() {
			return {
				
			};
		},
		computed:{
			...mapGetters('m_cart',['total','checkedCount','totalPrice']),
			isFullChecked(){
				return this.total === this.checkedCount
			}
		},
		methods:{
			...mapMutations('m_cart',['changeAllState']),
			changeAllCheched(){
				this.changeAllState(!this.isFullChecked)
			}
		}
	}
</script>

<style lang="scss">
.settle_box{
	width: 100%;
	height: 50px;
	position: fixed;
	bottom: 0;
	left: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-left: 5px;
	font-size: 14px;
	background-color: white;
	.radio{
		display: flex;
		align-items: center;
	}
	.settle_price{
		.price{
			color: #C00000;
			font-weight: bold;
		}
	}
	.settle_button{
		background-color: #C00000;
		height: 50px;
		line-height: 50px;
		color: white;
		min-width: 100px;
		text-align: center;
	}
}
</style>
