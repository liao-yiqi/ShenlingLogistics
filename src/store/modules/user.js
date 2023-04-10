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
    async login(context, data) {
      // 发送登录请求
      const res = await login(data)
      // 判断是否成功
      if (res.data.code === 200) {
        context.commit('setToken', res.data.data.token.token)
      }
    },
    // 退出
    logout(context) {
      context.commit('removeToken')
    }
  }
}
