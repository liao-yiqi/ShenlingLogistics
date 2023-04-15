import Layout from '@/layout'

export default {
  path: '/business',
  component: Layout,
  meta: { title: '业务管理', icon: 'files' },
  children: [
    {
      path: 'order-manage',
      component: () => import('@/views/business/order'),
      meta: {
        title: '订单管理'
      }
    },
    {
      path: 'order-detail/:id', // 订单详情
      component: () => import('@/views/business/orderDetail')
    },
    {
      path: 'waybill',
      component: () => import('@/views/business/waybill'),
      meta: {
        title: '运单管理'
      }
    },
    {
      path: 'waybill-detail/:id', // 运单详情
      component: () => import('@/views/business/waybillDetail')
    }
  ]
}
