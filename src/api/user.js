import request from '@/utils/request'
// 登录 接口
export function login(data) {
  return request({
    url: '/manager/login',
    method: 'post',
    data
  })
}
// 获取验证码 接口
export function getCaptcha(key) {
  return request({
    url: '/manager/captcha',
    params: {
      key
    },
    responseType: 'arraybuffer'
  })
}

