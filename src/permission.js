import router from '@/router'
import store from '@/store'
import nProgress from 'nprogress'

router.beforeEach(async(to, from, next) => {
  // 开启进度条加载
  nProgress.start()
  // 已登录
  if (store.state.user.token) {
    // 还是登录页
    if (to.path === '/login') {
      // 强制跳转首页
      next('/')
    } else {
      // 其他情况 放行
      next()
    }
  } else {
    // 未登录 白名单
    const whiteList = ['/login', '/404']
    if (whiteList.includes(to.path)) {
      // 存在白名单中放行
      next()
    } else {
      // 否则跳去登录页
      next('/login')
    }
  }
})

router.afterEach(config => {
  // 关闭进度条加载
  nProgress.done()
})
