<template>
	<view>
		<view class="goods_list">
			<view v-for="(item,i) in goodsList" :key='i' @click="goGoodsDetail(item)">
				<GoodsItem :item="item"></GoodsItem>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryObj:{
					query:'',
					cid:'',
					pagenum:1,
					pagesize:10
				},
				goodsList:[],
				total:0,
				isLoading:false
			}
		},
		onLoad(options) {
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''
			// console.log(this.queryObj)
			this.getGoodsList()
		},
		onReachBottom(){
			if(this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('数据加载完毕')
			if(this.isLoading) return
			this.queryObj.pagenum++
			this.getGoodsList()
		},
		onPullDownRefresh(){
			this.queryObj.pagenum=1
			this.goodsList=[]
			this.total=0
			this.isLoading=false
			
			this.getGoodsList(()=>uni.stopPullDownRefresh())
		},
		methods: {
		    async getGoodsList(cb){
				this.isLoading=true
				const {data:res} = await uni.$http.get('/api/public/v1/goods/search',this.queryObj)
				this.isLoading=false
				cb && cb()
				if(res.meta.status !== 200) return uni.$showMsg()
				this.goodsList = [...this.goodsList,...res.message.goods]
				this.total = res.message.total
			},
			goGoodsDetail(item){
				uni.navigateTo({
					url:'/subpackage/goods_detail/goods_detail?goods_id='+item.goods_id
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
