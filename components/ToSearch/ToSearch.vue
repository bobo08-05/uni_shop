<template>
	<view class="search_container" :style="{'background-color':bkcolor}">
		<view class="search_box" :style="{'border-radius':borradius+'px'}" @click="toSearch">
			<uni-icons type="search" size="17"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:{
			bkcolor:{
				type:String,
				default:'#c00000'
			},
			borradius:{
				type:Number,
				default:16
			}
		},
		methods:{
			toSearch(){
				uni.navigateTo({
					url:'/subpackage/Search/Search'
				})
			}
		}
	}
</script>

<style lang="scss">
.search_container{
	// background-color: #c00000;
	height: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0 10px;
	.search_box{
		width:100% ;
		height:36px ;
		// border-radius: 15px;
		background-color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
		.placeholder{
			font-size: 15px;
			margin-left: 5px;
		}
	}
}
</style>
