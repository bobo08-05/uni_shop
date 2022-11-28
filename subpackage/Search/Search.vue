<template>
	<view>
		<view class="search_box">
			<uni-search-bar @input="input"  radius="100" cancelButton='none'></uni-search-bar>
		</view>
		
		<!-- 搜索建议 -->
		<view class="sug_list" v-if="searchList.length !== 0">
			<view class="sug_item" v-for="(sug,i) in searchList.goods" :key='i' @click="goGoodsDetail(sug)">
				<view class="sug_content">
					{{sug.goods_name}}
				</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
		<view class="his_box"  v-else>
			<view class="his_title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="16" @click='clean'></uni-icons>
			</view>
			<view class="his_content">
				<uni-tag :text="h" v-for="(h,i) in histories" :key='i' @click="goGoodsList(h)"></uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer:null,
				kw:'',
				searchList:[],
				historyList:[]
			};
		},
		computed:{
			histories(){
				return [...this.historyList].reverse()
			}
		},
		onLoad(){
			// if(this.historyList.length === 0){
				this.historyList=JSON.parse(uni.getStorageSync('kw') || '[]')
			// }else{
			// 	this.historyList=[...JSON.parse(uni.getStorageSync('kw') || '[]'),...this.historyList]
			// }
		},
		methods:{
			input(e){
				clearTimeout(this.timer)
				this.timer = setTimeout(()=>{
					this.kw=e.value
					this.getSearchList()
				},500)
			},
			async getSearchList(){
				if(this.kw.length === 0){
					this.searchList=[]
					return
				}
				const {data:res} = await uni.$http.get('/api/public/v1/goods/search',{query:this.kw})
				if(res.meta.status !== 200) return uni.$showMsg()
				this.searchList=res.message
				this.saveHistories()
			},
			goGoodsDetail(sug){
				uni.navigateTo({
					url:'/subpackage/goods_detail/goods_detail?goods_id='+sug.goods_id
				})
			},
			saveHistories(){
				// 使用set集合，避免重复
				const set =new Set(this.historyList)
				set.delete(this.kw)
				set.add(this.kw)
				
				this.historyList=Array.from(set)
				
				// 持久化存储
				uni.setStorageSync('kw',JSON.stringify(this.historyList))
			},
			clean(){
				this.historyList = [],
				uni.removeStorageSync('kw')
			},
			goGoodsList(h){
				uni.navigateTo({
					url:'/subpackage/goods_list/goods_list?query='+h
				})
			}
		}
	}
</script>

<style lang="scss">
	.search_box{
		position: sticky;
		top:0;
		z-index: 999;
	}
	.sug_list{
		padding: 0 5px;
		.sug_item{
			display: flex;
			justify-content: space-between;
			align-content: center;
			font-size: 12px;
			padding: 13px 0;
			border-bottom: 1px solid #efefef;
			.sug_content{
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				margin-right: 3px;
			}
		}
	}
	.his_box{
		padding: 0 5px;
		.his_title{
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 13px;
			height: 40px;
			border-bottom: 1px solid #efefef;
		}
		.his_content{
			display: flex;
			flex-wrap: wrap;
			.uni-tag{
				margin-top: 5px;
				margin-left: 5px;
			}
		}
	}
</style>
