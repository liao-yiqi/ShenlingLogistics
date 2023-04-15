import Layout from '@/layout'

export default {
  path: '/basicdata',
  component: Layout,
  meta: {
    title: '基础数据管理', // 显示菜单名称
    icon: 'data' // 显示icon
  },
  children: [
    {
      path: 'organization-manage',
      component: () => import('@/views/basicdata/institutional'),
      meta: {
        title: '机构管理'
      }
    },
    {
      path: 'institutions-jobs-area',
      component: () => import('@/views/basicdata/scope'),
      meta: {
        title: '机构作业范围'
      }
    },
    {
      path: 'freight-manage',
      component: () => import('@/views/basicdata/freight'),
      meta: {
        title: '运费管理'
      }
    }
  ]
}

