import Layout from '@/layout'

export default {
  path: '/vechicle',
  component: Layout,
  meta: { title: '车辆管理', icon: 'vehicle' },
  children: [
    {
      path: 'car-models',
      component: () => import('@/views/vehicle/model'),
      meta: {
        title: '车型管理'
      }
    },
    {
      path: 'list',
      component: () => import('@/views/vehicle/list'),
      meta: {
        title: '车辆列表'
      }
    },
    {
      path: 'car-register',
      component: () => import('@/views/vehicle/enterRegister'),
      meta: {
        title: '回车登记'
      }
    },
    {
      path: '/vehicleDetails/:id', // 车辆详情
      component: () => import('@/views/vehicle/vehicleDetails'),
      meta: {
        title: '车辆详情'
      },
      hidden: true
    }
  ]
}
