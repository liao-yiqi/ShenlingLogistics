// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'

const service = axios.create({
  baseURL: 'https://slwl-api.itheima.net/manager', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // 超时时间
}) // 创建一个axios的实例

service.interceptors.request.use() // 请求拦截器
service.interceptors.response.use() // 响应拦截器

export default service // 导出axios实例
