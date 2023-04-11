// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
import { Message } from 'element-ui'
import { Promise } from 'core-js'
import router from '@/router'
import store from '@/store'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // 超时时间
}) // 创建一个axios的实例
// 请求拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    if (Date.now() - localStorage.getItem('time') > 1000 * 60 * 60) {
      // 超时后调用退出功能
      store.dispatch('user/logout')
      // 返回到登录页
      router.push('/login')
      // 阻止继续往下运行
      return Promise.reject('登录超时,请重新登录')
    }
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config
})
// 响应拦截器
service.interceptors.response.use(res => {
  // 判断验证码是否正确
  if (res.data.code === 1) {
    Message.error(res.data.msg)
  }
  return res
})

export default service // 导出axios实例
