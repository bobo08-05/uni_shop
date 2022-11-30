<template>
	<view>
		<ToSearch></ToSearch>
		<view class="cate_wrapper">
			<scroll-view class="cate_left" scroll-y="true" :style="{height: wh+'px'}">
				<block v-for="(cate_l,i) in categoryList" :key='cate_l.cat_id'>
					<view :class="['cate_left_item',i === active ? 'active' : '']" @click="activeChange(i)">
						{{cate_l.cat_name}}
					</view>
				</block>
			</scroll-view>
			<scroll-view class="cate_right" scroll-y="true" :style="{height: wh+'px'}" :scroll-top="scrollTop+'px'">
				<view class="cate_right_list1" v-for="(cate_r,i2) in categoryList2" :key='i2'>
					<view class="cate_right_title">
						/{{cate_r.cat_name}}/
					</view>
					<view class="cate_right_list2">
						<view class="cate_right_list2_item" v-for="(cate_r_l,i3) in cate_r.children" :key='i3' @click="goGoodsList(cate_r_l)">
							<image :src="cate_r_l.cat_icon"></image>
							<text>{{cate_r_l.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import badgeMin from '@/mixins/tabbar_badge.js'
	export default {
		mixins:[badgeMin],
		data() {
			return {
				wh:0,
				active:0,
				categoryList:[],
				categoryList2:[],
				scrollTop:0
			};
		},
		onLoad(){
			// 获得窗口数据信息
			const sys = uni.getSystemInfoSync()
			this.wh = sys.windowHeight-50
			// 获得分类数据
			this.getCategoryList()
		},
	    methods:{
			async getCategoryList(){
				const {data:res} = await uni.$http.get('/api/public/v1/categories')
				// console.log(res)
				if(res.meta.status !==200) return uni.$showMsg()
				this.categoryList=res.message
				this.categoryList2=res.message[0].children
			},
			activeChange(i){
				this.active=i
				this.categoryList2=this.categoryList[i].children
				this.scrollTop= this.scrollTop===0 ? 1 : 0
			},
			goGoodsList(cate_r_l){
				uni.navigateTo({
					url:'/subpackage/goods_list/goods_list?cid='+cate_r_l.cat_id
				})
			}
		}
	}
</script>

<style lang="scss">
.cate_wrapper{
	display: flex;
	.cate_left{
		width: 120px;
		.cate_left_item{
			background-color: #f7f7f7;
			line-height: 60px;
			text-align: center;
			font-size: 12px;
			position: relative;
			&.active{
				background: #FFFFFF;
				&::before{
					content: '';
					width: 3px;
					height: 30px;
					background-color: #c00000;
					position: absolute;
					top:50%;
					left: 0;
					transform: translateY(-50%);
				}
			}
		}
	}
	.cate_right_title{
		font-size: 12px;
		padding: 15px 0;
		text-align: center;
		font-weight: bold;
	}
	.cate_right_list2{
		display: flex;
		flex-wrap: wrap;
		.cate_right_list2_item{
			width: 33.33%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-bottom: 10px;
			image{
				width: 60px;
				height: 60px;
			}
			text{
				font-size: 12px;
			}
		}
	}
}
</style>
