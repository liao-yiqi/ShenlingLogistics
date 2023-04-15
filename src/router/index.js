import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

// 路由规则
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/', // 路径
    component: Layout, // 组件
    // 配置二级路的路由表
    redirect: '/dashboard',
    children: [{
      path: 'dashboard', // 当前二级路由的默认路由
      component: () => import('@/views/workbench/dashboard'),
      meta: {
        title: '工作台', // 显示菜单名称
        icon: 'home' // 显示icon
      }
    }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

import basicdataRouter from './modules/basicdata/index'
import vehicleRouter from './modules/vehicle/index'
import employeeRouter from './modules/employee/index'
import businessRouter from './modules/business/index'
import schedulingRouter from './modules/scheduling/index'

export const asyncRoutes = [
  basicdataRouter,
  vehicleRouter,
  employeeRouter,
  businessRouter,
  schedulingRouter
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: [...constantRoutes, ...asyncRoutes]
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
