import Layout from '@/layout'

export default {
  path: '/scheduling',
  component: Layout,
  meta: { title: '调度管理', icon: 'lines' },
  children: [
    {
      path: 'transport-task',
      component: () => import('@/views/scheduling/transportTask'),
      meta: {
        title: '运输任务管理'
      }
    },
    {
      path: 'line-manage',
      component: () => import('@/views/scheduling/line'),
      meta: {
        title: '线路管理'
      }
    },
    {
      path: 'pickUptask',
      component: () => import('@/views/scheduling/pickupJob'),
      meta: {
        title: '取件作业管理'
      }
    },
    {
      path: 'dispatchTask',
      component: () => import('@/views/scheduling/dispatchJob'),
      meta: {
        title: '派件作业管理'
      }
    },
    {
      path: 'task-detail/:id&:type', // 运输任务详情
      component: () => import('@/views/scheduling/taskDetail')
    }
  ]
}
