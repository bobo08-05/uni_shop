<template>
	<view>
		<!-- 搜索模块 -->
		<view class="search_box">
			<ToSearch></ToSearch>
		</view>
		<!-- 轮播模块 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="swi in swiperList" :key='swi.goods_id'>
				<navigator class="swiper-item" :url="'/subpackage/goods_detail/goods_detail?goods_id='+swi.goods_id">
					<image :src="swi.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>
		
		<!-- 分类导航模块 -->
		<view class="nav_list">
			<view class="nav_item" v-for="(nav,index) in navList" :key='index' @click="navHandler(nav)">
				<image :src="nav.image_src"></image>
			</view>
		</view>
		
		<!-- 楼层导航模块 -->
		<view class="floor_list">
 			<view class="floor_item" v-for="(flo,index) in floorList" :key='index'>
				<image :src="flo.floor_title.image_src" class="flo_title"></image>
				<view class="flo_box">
					<navigator class="flo_left" :url="flo.product_list[0].url">
						<image :src="flo.product_list[0].image_src" :style="{width:flo.product_list[0].image_width+'rpx'}" mode="widthFix"></image>
					</navigator>
					<view class="flo_right">
						<navigator class="flo_right_image" v-for="(flo_r,i) in flo.product_list" :key='i' v-if="i !=0" :url="flo_r.url">
							<image :src="flo_r.image_src" :style="{width: flo_r.image_width+'rpx'}" mode="widthFix"></image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList:[],
				navList:[],
				floorList:[]
			};
		},
		methods:{
			async getSwiperList(){
			   const {data:res} = await uni.$http.get('/api/public/v1/home/swiperdata')
			   if(res.meta.status !=200){
				  return uni.$showMsg()
			   }
			   this.swiperList=res.message
			   uni.$showMsg('数据加载成功')
			},
			async getNavList(){
				const {data:res} = await uni.$http.get('/api/public/v1/home/catitems')
				if(res.meta.status !=200){
								  return uni.$showMsg()
				}
				this.navList=res.message
				uni.$showMsg('数据加载成功')
			},
			navHandler(nav){
				if(nav.name === '分类'){
					uni.switchTab({
						url:'/pages/cate/cate'
					})
				}
				uni.switchTab({
					url:'/pages/cate/cate'
				})
			},
			async getFloorList(){
				const {data:res} = await uni.$http.get('/api/public/v1/home/floordata')
				if(res.meta.status !== 200) return uni.$showMsg()
				// 处理数据
				res.message.forEach(floor=>{
					floor.product_list.forEach(pro=>{
						pro.url='/subpackage/goods_list/goods_list?'+pro.navigator_url.split('?')[1]
					})
				})
				this.floorList=res.message
			}
		},
		onLoad() {
			this.getSwiperList()
			this.getNavList()
			this.getFloorList()
		}
	}
</script>

<style lang="scss">
	.search_box{
		position: sticky;
		top:0;
		z-index: 999;
	}
	swiper{
		height: 333rpx;
		.swiper-item,image{
			width: 100%;
			height: 100%;
		}
	}
	.nav_list{
		display: flex;
		justify-content: space-around;
		margin: 15px 0;
		.nav_item image{
			width: 128rpx;
			height: 140rpx;
		}
	}
	.flo_title{
				height: 60rpx;
				width: 100%;
				display: flex;
			}
			.flo_box{
				display: flex;
				padding-left: 10rpx;
			}
	.flo_right{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}
	
</style>
