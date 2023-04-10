import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
// 引入持久化插件
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

const store = new Vuex.Store({
  // 注册持久化插件
  plugins: [
    createPersistedState({
      paths: ['user.token']
    })
  ],
  modules: {
    app,
    settings,
    user
  },
  getters
})

export default store
