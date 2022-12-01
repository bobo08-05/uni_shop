export default{
	namespaced:true,
	
	state:()=>({
		address:JSON.parse(uni.getStorageSync('address') || '{}'),
		// token:uni.getStorageSync('token') || '',
		token:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo',
		userInfo:JSON.parse(uni.getStorageSync('userInfo') || '{}'),
		redirectInfo:null,
	}),
	
	mutations:{
		updateAddress(state,address){
			state.address = address
			
			this.commit('m_user/saveAddress')
		},
		saveAddress(state){
			uni.setStorageSync('address',JSON.stringify(state.address))
		},
		
		updateUserInfo(state,userinfo){
			state.userInfo = userinfo
			
			this.commit('m_user/saveUserInfo')
		},
		saveUserInfo(state){
			uni.setStorageSync('userInfo',JSON.stringify(state.userInfo))
		},
		
		updateToken(state,token){
			state.token=token
			
			this.commit('m_user/saveToken')
		},
		
		saveToken(state){
			uni.setStorageSync('token',state.token)
		},
		
		updateRedirectInfo(state,info){
			state.redirectInfo = info
			console.log(state.redirectInfo)
		}
	},
	
	getters:{
			addstr(state){
				if(!state.address.provinceName) return ''
				return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
			}		
	},
}