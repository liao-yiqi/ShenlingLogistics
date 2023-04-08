import request from '@/utils/request'

export function login(data) {

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
