export default{
	// 开启命名空间
	namespaced:true,
	
	state:()=>({
		cart:JSON.parse(uni.getStorageSync('cartData') || "[]")
	}),
	
	mutations:{
		addToCart(state,goods){
			const findResult = state.cart.find(x=> x.goods_id === goods.goods_id
			)
			// console.log(findResult)
			
			if(!findResult){
				state.cart.push(goods)
			}else{
			findResult.goods_count++
			}
			// console.log(state.cart)
			this.commit('m_cart/saveCartData')
		},
		
		saveCartData(state){
			uni.setStorageSync('cartData',JSON.stringify(state.cart))
		},
		
		updateRadioState(state,goods){
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			if(findResult){
				findResult.goods_state=goods.goods_state
				
				this.commit('m_cart/saveCartData')
			}
		},
		
		updateGoodsCount(state,goods){
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			if(findResult){
				findResult.goods_count = goods.goods_count
				
				this.commit('m_cart/saveCartData')
			}
		},
		
		removeGoods(state,goods){
			state.cart =state.cart.filter(x => x.goods_id !== goods.goods_id)
			
			this.commit('m_cart/saveCartData')
		},
		
		changeAllState(state,newState){
			state.cart.forEach(x => x.goods_state = newState)
			
			this.commit('m_cart/saveCartData')
		}
	},
	
	getters:{
		total(state){
			// let c = 0
			// state.cart.forEach(goods=>c += goods.goods_count)
			// return c
		 return	state.cart.reduce((total,item) => {
				return total += item.goods_count
			},0)
		},
		
		checkedCount(state){
			return state.cart.filter(x => x.goods_state).reduce((total,item)=> total += item.goods_count,0)
		},
		
		totalPrice(state){
			return state.cart.filter(x => x.goods_state).reduce((total,item) =>{
				return total += item.goods_price*item.goods_count
			},0).toFixed(2)
		}
	}
}