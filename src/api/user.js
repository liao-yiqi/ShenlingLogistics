import request from '@/utils/request'
// 登录接口
export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {

}

export function logout() {

}

// 获取验证码
export function getLoginCode(params) {
  return request({
    url: '/captcha',
    params,
    responseType: 'blob'
  })
}
