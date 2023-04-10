import router from '@/router'
import store from '@/store'

// 路由导航守卫
router.beforeEach((to, from, next) => {
  // 判断是否有token
  if (store.getters.token) {
    // 如果已登录
    if (to.path === '/login') {
      // 不能去登录页,强制回到首页
      next('/')
    } else {
      next()
    }
  } else {
    // 未登录
    const whiteLIst = ['/login', '/404']// 白名单
    if (whiteLIst.includes(to.path)) {
      // 白名单可以随便进
      next()
    } else {
      next('/login')
    }
  }
})
