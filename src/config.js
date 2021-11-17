import axios from 'axios'
import { Toast } from 'antd-mobile'

// 拦截请求
axios.interceptors.request.use(function(config){
	Toast.show({
		icon: 'loading',
		content: '请求中…',
	  })
	return config
})

// 拦截相应

axios.interceptors.response.use(function(config){
	Toast.clear()
	return config
})