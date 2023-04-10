// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
// import { Message } from 'element-ui'
// import { Promise } from 'core-js'
// import store from '@/store'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // 超时时间
}) // 创建一个axios的实例
// 请求拦截器
service.interceptors.request.use()
// 响应拦截器
service.interceptors.response.use()

export default service // 导出axios实例
