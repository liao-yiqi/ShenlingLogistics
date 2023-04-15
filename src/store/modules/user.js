import { login } from '@/api/user'

const state = {
  token: localStorage.getItem('token') || '',
  userInfo: JSON.parse(localStorage.getItem('userInfo')) || {}
}

const mutations = {
  // 设置token
  setToken(state, token) {
    state.token = token
    localStorage.setItem('token', token)
  },
  // 移除token
  removeToken(state) {
    state.token = ''
    localStorage.removeItem('token')
  },
  // 设置用户数据
  setUserInfo(state, userInfo) {
    state.userInfo = { ...userInfo }
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
  },
  // 删除用户数据
  removeUserInfo(state) {
    state.userInfo = {}
    localStorage.removeItem('userInfo')
  }

}

const actions = {
  // 登录
  async login(context, payload) {
    const res = await login(payload)
    context.commit('setToken', res.data.token.token)
    context.commit('setUserInfo', res.data.user)
    localStorage.setItem('time', Date.now())
  },
  // 登出
  logout(context) {
    context.commit('removeToken')
    context.commit('removeUserInfo')
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

