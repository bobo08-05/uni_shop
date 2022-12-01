import Vue from 'vue'
import App from './App'
import { $http } from '@escook/request-miniprogram'
import store from '@/store/store.js'


uni.$http = $http
$http.baseUrl='https://api-hmugo-web.itheima.net'
// 请求拦截器
$http.beforeRequest=function(options){
	uni.showLoading({
		title:"加载中，请稍等.."
	})
	
	// console.log(options)
	if(options.url.indexOf('/my/') !== -1){
		options.header = {
			Authorization:store.state.m_user.token
		}
	}
}

$http.afterRequest=function(){
	uni.hideLoading()
}
// 封装数据加载失败提示信息
uni.$showMsg=function(title='数据加载失败',duration=1500){
	uni.showToast({
		title,
		duration,
		icon:'none'
	})
}
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
