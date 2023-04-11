import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '工作台',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '工作台', icon: 'dashboard' }
    }]
  },

  {
    path: '/basicDataManagement',
    component: Layout,
    // redirect: '/example/table',
    name: '基础数据管理',
    meta: { title: '基础数据管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'basicDataManagement/orgManagement',
        name: '机构管理',
        component: () => import('@/views/basicDataManagement/orgManagement/index'),
        meta: { title: '机构管理', icon: 'table' }
      },
      {
        path: 'basicDataManagement/oroMechanism',
        name: '机构作业范围',
        component: () => import('@/views/basicDataManagement/oroMechanism/index'),
        meta: { title: '机构作业范围', icon: 'tree' }
      },
      {
        path: 'basicDataManagement/freightManagement',
        name: '运费管理',
        component: () => import('@/views/basicDataManagement/freightManagement/index'),
        meta: { title: '运费管理', icon: 'tree' }
      }
    ]
  },

  {
    path: '/vehicleManagement',
    component: Layout,
    // redirect: '/example/table',
    name: '车辆管理',
    meta: { title: '车辆管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'vehicleManagement/vehicleTypeManagement',
        name: '车型管理',
        component: () => import('@/views/vehicleManagement/vehicleTypeManagement/index'),
        meta: { title: '车型管理', icon: 'form' }
      },
      {
        path: 'vehicleManagement/vehicleList',
        name: '车辆列表',
        component: () => import('@/views/vehicleManagement/vehicleList/index'),
        meta: { title: '车辆列表', icon: 'form' }
      },
      {
        path: 'vehicleManagement/vehicleRegister',
        name: '回车登记',
        component: () => import('@/views/vehicleManagement/vehicleRegister/index'),
        meta: { title: '回车登记', icon: 'form' }
      }
    ]
  },

  {
    path: '/employeeManagement',
    component: Layout,
    // redirect: '/nested/menu1',
    name: '员工管理',
    meta: {
      title: '员工管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'employeeManagement/courierManagement',
        component: () => import('@/views/employeeManagement/courierManagement/index'), // Parent router-view
        name: '快递员管理',
        meta: { title: '快递员管理', icon: 'form' }
      },
      {
        path: 'employeeManagement/driverManagement',
        component: () => import('@/views/employeeManagement/driverManagement/index'),
        name: '司机管理',
        meta: { title: '司机管理', icon: 'form' }
      },
      {
        path: 'employeeManagement/schedulingManagement',
        component: () => import('@/views/employeeManagement/schedulingManagement/index'),
        name: '排班管理',
        meta: { title: '排班管理', icon: 'form' }
      }
    ]
  },
  {
    path: '/serviceManagement',
    component: Layout,
    // redirect: '/nested/menu1',
    name: '业务管理',
    meta: {
      title: '业务管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'serviceManagement/orderManagement',
        component: () => import('@/views/serviceManagement/orderManagement/index'),
        name: '订单管理',
        meta: { title: '订单管理', icon: 'form' }
      },
      {
        path: 'serviceManagement/waybillManagement',
        component: () => import('@/views/serviceManagement/waybillManagement/index'),
        name: '运单管理',
        meta: { title: '运单管理', icon: 'form' }
      }
    ]
  },
  {
    path: '/schedulingManagement',
    component: Layout,
    // redirect: '/nested/menu1',
    name: '调度管理',
    meta: {
      title: '调度管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'schedulingManagement/transportTaskManagement',
        component: () => import('@/views/schedulingManagement/transportTaskManagement/index'),
        name: '运输任务管理',
        meta: { title: '运输任务管理', icon: 'form' }
      },
      {
        path: 'schedulingManagement/lineManagement',
        component: () => import('@/views/schedulingManagement/lineManagement/index'),
        name: '线路管理',
        meta: { title: '线路管理', icon: 'form' }
      },
      {
        path: 'schedulingManagement/PickUpJobManagement',
        component: () => import('@/views/schedulingManagement/PickUpJobManagement/index'),
        name: '取件作业管理',
        meta: { title: '取件作业管理', icon: 'form' }
      },
      {
        path: 'schedulingManagement/deliveryOperationManagement',
        component: () => import('@/views/schedulingManagement/deliveryOperationManagement/index'),
        name: '派件作业管理',
        meta: { title: '派件作业管理', icon: 'form' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
