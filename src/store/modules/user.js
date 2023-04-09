import { login } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: ''
  },
  mutations: {
    // 设置token
    setToken(state, token) {
      state.token = token
    },
    // 删除token
    removeToken(state) {
      state.token = null
    }
  },
  actions: {
    // 发送登录请求
    async login(context, data) {
      const res = await login(data)
      context.commit('setToken', res)
    },
    // 退出
    logout(context) {
      context.commit('removeToken')
    }
  }
}
