<template>
	<view v-if="goodsInfo.goods_name" class="goods_info_box">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,i) in goodsInfo.pics" :key='i'>
				<image :src="item.pics_big" @click="preview(i)"></image>
			</swiper-item>
		</swiper>
		<view class="goods_info">
			<view class="price">{{goodsInfo.goods_price}}</view>
			<view class="goods_info_body">
				<view class="goods_name">{{goodsInfo.goods_name}}</view>
				<view class="favi">
					<uni-icons type="star" size="18" color='gray'></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<view class="yf">
				快递：免运费
			</view>
		</view>
		<rich-text :nodes="goodsInfo.goods_introduce"></rich-text>

		<view class="nav_box">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations,mapGetters} from 'vuex'
	export default {
		data() {
			return {
				goodsInfo: {},
				options: [{
					icon: 'shop',
					text: '店铺',
					infoBackgroundColor: '#007aff',
					infoColor: "red"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 0
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			};
		},
		computed:{
			...mapState('m_cart',[]),
			...mapGetters('m_cart',['total'])
		},
		methods: {
			...mapMutations('m_cart',['addToCart']),
			async getGoodsInfo(goodsId) {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/detail', {
					"goods_id": goodsId
				})
				if (res.meta.status !== 200) return uni.$showMsg()
				res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display:block;"').replace(
					/webp/g, 'jpg')
				this.goodsInfo = res.message
			},
			preview(i) {
				uni.previewImage({
					current: i,
					urls: this.goodsInfo.pics.map(x => x.pics_big)
				})
			},
			onClick(e){
				if(e.content.text === '购物车'){
					uni.switchTab({
						url:'/pages/cart/cart'
					})
				}
			},
			buttonClick(e){
				if(e.content.text === '加入购物车'){
					const goods={
						goods_id:this.goodsInfo.goods_id,
						goods_name:this.goodsInfo.goods_name,
						goods_price:this.goodsInfo.goods_price,
						goods_count:1,
						goods_small_logo:this.goodsInfo.goods_small_logo,
						goods_state:true
					}
					
					this.addToCart(goods)
				}
			}
			
		},
		onLoad(options) {
			const goodsId = options.goods_id
			this.getGoodsInfo(goodsId)
		},
		watch:{
			total:{
				immediate:true,
				handler(newVal){
					const findResult = this.options.find(x => x.text === '购物车')
					if(findResult){
						findResult.info = newVal
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	.goods_info_box{
		padding-bottom: 50px;
		}
	swiper {
		height: 750rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.goods_info {
		padding: 10px;
		padding-right: 0px;

		.price {
			margin: 10px 0;
			font-size: 18px;
			color: #c00000;
		}

		.goods_info_body {
			display: flex;
			justify-content: space-between;

			.goods_name {
				font-size: 13px;
				margin-right: 10px;
			}

			.favi {
				width: 120px;
				font-size: 12px;
				display: flex;
				flex-direction: column;
				// text-align: center;
				justify-content: center;
				align-items: center;
				border-left: 1px solid #efefef;
				color: gray;
			}
		}

		.yf {
			font-size: 12px;
			color: gray;
			margin: 10px 0;
		}
	}

	.nav_box {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}
</style>
