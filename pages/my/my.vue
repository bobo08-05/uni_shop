<template>
	<view class="mine_box">
		<Login v-if="!token"></Login>
		<UserInfo v-else></UserInfo>
	</view>
</template>

<script>
	import badgeMin from '@/mixins/tabbar_badge.js'
	import{mapState} from 'vuex'
	export default {
		mixins:[badgeMin],
		data() {
			return {
				
			};
		},
		computed:{
			...mapState('m_user',['token'])
		},
		onLoad() {
			// console.log(this.token)
		}
	}
</script>

<style lang="scss">
page,.mine_box{
	// background-color:#F4F4F4;
	height: 100%;
}
</style>
