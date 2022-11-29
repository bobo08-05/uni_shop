<template>
	<view>
		<view class="goods_item">
			<view class="goods_item_left">
				<image :src="item.goods_small_logo || defaultPic" class="goods_pic"></image>
			</view>
			<view class="goods_item_right">
				<view class="goods_name">
					{{item.goods_name}}
				</view>
				<view class="goods_info_box">
					<view class="goods_price">￥{{item.goods_price | toFixed}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				defaultPic:'https://p5.ssl.qhimgs1.com/sdr/400__/t01de5ef27a03796b0f.png'
			};
		},
		props:{
			item:{
				type:Object,
				default:{}
			}
		},
		filters:{
			toFixed(num){
				return Number(num).toFixed(2)
			}
		}
	}
</script>

<style lang="scss">
.goods_item{
		display: flex;
		padding: 10px 5px;
		border-bottom: 1px solid #efefef;
		.goods_item_left{
			margin-right: 5px;
			.goods_pic{
				width: 100px;
				height: 100px;
				display: block;
			}
		}
		.goods_item_right{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.goods_name{
				font-size: 13px;
			}
			.goods_info_box{
				.goods_price{
					color: #c00000;
					font-size: 16px;
				}
			}
		}
	}
</style>
