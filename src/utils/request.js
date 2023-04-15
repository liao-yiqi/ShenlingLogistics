import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
import nProgress from 'nprogress'
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

nProgress.configure({ showSpinner: false })

// request interceptor
service.interceptors.request.use(config => {
  nProgress.start()
  if (store.getters.token) {
    config.headers.Authorization = `${store.getters.token}`
  }
  return config
})

// response interceptor
service.interceptors.response.use(res => {
  // 收到响应 业务处理---
  nProgress.done()
  if ((res.data.msg && res.data.msg === 'ok') || res.headers['content-type'] === 'image/png') {
    return res.data
  } else {
    Message.error(res.data.msg)
    return Promise.reject(res.data.msg)
  }
}, err => {
  // console.log(err)
  nProgress.done()
  Message.error('服务器繁忙，请稍后再试')
  return Promise.reject(err)
}
)

export default service
