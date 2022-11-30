	import {mapGetters} from 'vuex';
	
	export default {
		computed:{
			...mapGetters('m_cart',['total'])
		},
		onShow() {
			this.setBadge()
		},
		methods:{
			setBadge(){
				if(this.total === 0){
					uni.hideTabBarRedDot({
						index:2
					})
				}else{
					uni.setTabBarBadge({
						index:2,
						text:this.total+''
					})
				}
			}
		},
		watch:{
				total:{
					immediate:true,
					handler(newVal){
						this.setBadge()
					}
				}
		}
	}