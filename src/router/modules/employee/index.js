import Layout from '@/layout'

export default {
  path: '/employee',
  meta: { title: '员工管理', icon: 'contactbook' },
  component: Layout,
  children: [
    {
      path: 'operational-range',
      component: () => import('@/views/employee/courier'),
      meta: {
        title: '快递员管理'
      }
    },
    {
      path: 'MapContent/:agencyName&:id&:name', // 快递员管理模块的查看
      component: () => import('@/views/employee/mapcontant'),
      meta: {
        title: '作业范围分配'
      }
    },
    {
      path: 'driver',
      component: () => import('@/views/employee/driver'),
      meta: {
        title: '司机管理'
      }
    },
    {
      path: 'driver-detail/:id&:formUrlName/', // 司机管理模块的查看
      component: () => import('@/views/employee/driver'),
      meta: {
        title: '司机详情'
      }
    },
    {
      path: 'workArrange-manage',
      component: () => import('@/views/employee/shift'),
      meta: {
        title: '排班管理'
      }
    },
    {
      path: 'workArrange-setting', // 排班设置
      component: () => import('@/views/employee/workArrangeSetting')
    }
  ]
}
