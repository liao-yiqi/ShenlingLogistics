# 开发前准备

## 1.清理代码并改造

- vue.config.js 清理 devServer 里面的 before (禁掉模拟登陆)

- 清理permission.js(允许进入所有页面)

- 清理vuex user模块,没有了模拟登录,这里也可以删掉原来的逻辑

- 在env.development文件中修改发送请求的基地址,并且设置端口号

- ~~~js
  # just a flag
  ENV = 'development'
  
  # base api
  VUE_APP_BASE_API = 'https://slwl-api.itheima.net/manager'
  
  port = 3080
  ~~~

- 清理request.js里面的代码,方便后面进行编写

- ~~~js
  import axios from 'axios'
  
  // 创建 axios 实例
  const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
  })
  
  // 请求拦截器
  service.interceptors.request.use()
  
  // 响应拦截器
  service.interceptors.response.use()
  
  // 暴露实例
  export default service
  ~~~

- 在src/setting.js中修改网站名称

- ~~~js
  module.exports = {
  
    title: '神领TMS管理系统',
  
    /**
     * @type {boolean} true | false
     * @description Whether fix the header
     */
    fixedHeader: false,
  
    /**
     * @type {boolean} true | false
     * @description Whether show the logo in sidebar
     */
    sidebarLogo: false
  }
  ~~~

  ## 2.登录页

  ## 封装验证码请求

  ~~~js
  // 获取验证码
  export function getLoginCode(params) {
    return request({
      url: '/captcha',
      params,
      responseType: 'blob'
    })
  }
  ~~~

  

  

  
