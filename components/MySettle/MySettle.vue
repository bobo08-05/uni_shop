<template>
	<view>
		<view class="settle_box">
				<label class="radio" @click="changeAllCheched">
					<radio :checked="isFullChecked" color="#C00000"/><text>全选</text>
				</label>
			<view class="settle_price">
				总计:<text class="price">￥{{totalPrice}}</text>
			</view>
			<view class="settle_button" @click="settlement">结算({{checkedCount}})</view>
		</view>
	</view>
</template>

<script>
	import {mapGetters,mapMutations,mapState} from 'vuex'
	export default {
		data() {
			return {
				seconds:3,
				timer:null
			};
		},
		computed:{
			...mapGetters('m_cart',['total','checkedCount','totalPrice']),
			...mapGetters('m_user',['addstr']),
			...mapState('m_user',['token']),
			...mapState('m_cart',['cart']),
			isFullChecked(){
				return this.total === this.checkedCount
			}
		},
		methods:{
			...mapMutations('m_cart',['changeAllState']),
			// ...mapMutations('m_user',['updateRedirectInfo']),
			...mapMutations('m_user',['updateRedirectInfo']),
			changeAllCheched(){
				this.changeAllState(!this.isFullChecked)
			},
			settlement(){
				if(!this.checkedCount) return uni.$showMsg('请选择要结算的商品！')
				if(!this.addstr) return uni.$showMsg('请选择收货地址！')
				// if(!this.token) return uni.$showMsg('请先登录！')
				if(!this.token){
					this.delayNavigate()
				}
				this.payOrder()
				// console.log(this.token)
			},
			delayNavigate(){
				this.seconds=3
				this.showTips(this.seconds)
				
			 this.timer =	setInterval(()=>{
					this.seconds--
					if(this.seconds<=0) {
						clearInterval(this.timer)
						
						uni.switchTab({
							url:'/pages/my/my',
						 success:()=>{
								// console.log('111')
						 	this.updateRedirectInfo({
						 		openType:'switchTab',
						 		from:'/pages/cart/cart'
						 	})
						 }
						})
						return
					}
					this.showTips(this.seconds)
				},1000)
			},
			showTips(n){
				uni.showToast({
					icon:'none',
					title:'请登录后再结算！'+n+'秒后跳转到登录页',
					mask:true,
					duration:1500
				})
			},
			async payOrder(){
				
				const orderInfo={
					order_price:0.1,
					consignee_addr:this.addstr,
					goods:this.cart.filter(x => x.goods_state).map(x =>{
						return {goods_id:x.goods_id,goods_number:x.goods_count,goods_price:x.goods_price}
					})
				}
				
			const {data:res}=await	uni.$http.post('/api/public/v1/my/orders/create',orderInfo)
			if(res.meta.status !== 200) return uni.$showMsg('获取订单失败')
			const orderNumber = res.message.order_number
			// console.log(orderNumber)
			const {data:res2} = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder',{order_number:orderNumber})
		if(res2.meta.status !== 200) return uni.$showMsg('订单预支付失败')
			const payInfo = res.message.pay
			// console.log(payInfo)
			const [err,succ] = await uni.requestPayment(payInfo)
			if(err) return uni.$showMsg('订单支付失败')
			
			const {data:res3} = await uni.$http.post('/api/public/v1/my/orders/chkOrder',{order_number:orderNumber})
			if(res.meta.status !== 200) return uni.$showMsg('订单未支付！')
			uni.showToast({
				icon:'success',
				title:'订单支付成功',
				// duration:1500
			})
			}
		},
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
