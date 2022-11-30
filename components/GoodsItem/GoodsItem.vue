<template>
	<view>
		<view class="goods_item">
			<view class="goods_item_left">
				<radio :checked="item.goods_state" color="#C00000" v-if="showRadio" @click="ridioClickHandler"></radio>
				<image :src="item.goods_small_logo || defaultPic" class="goods_pic"></image>
			</view>
			<view class="goods_item_right">
				<view class="goods_name">
					{{item.goods_name}}
				</view>
				<view class="goods_info_box">
					<view class="goods_price">￥{{item.goods_price | toFixed}}</view>
					<uni-number-box :min="1" :value="item.goods_count" v-if="showNumBox"  @change="numberChangeHandler"></uni-number-box>
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
			},
			showRadio:{
				type:Boolean,
				default:false
			},
			showNumBox:{
				type:Boolean,
				default:false
			}
		},
		filters:{
			toFixed(num){
				return Number(num).toFixed(2)
			}
		},
		methods:{
			ridioClickHandler(){
				this.$emit('radioChange',{
					goods_id:this.item.goods_id,
					goods_state:!this.item.goods_state
				})
			},
			numberChangeHandler(val){
				this.$emit('numChange',{
					goods_id:this.item.goods_id,
					goods_count:+val
				})
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
			display: flex;
			justify-content: center;
			align-items: center;
			.goods_pic{
				width: 100px;
				height: 100px;
				display: block;
			}
		}
		.goods_item_right{
			display: flex;
			flex: 1;
			flex-direction: column;
			justify-content: space-between;
			.goods_name{
				font-size: 13px;
			}
			.goods_info_box{
				display: flex;
				justify-content: space-between;
				.goods_price{
					color: #c00000;
					font-size: 16px;
				}
			}
		}
	}
</style>
