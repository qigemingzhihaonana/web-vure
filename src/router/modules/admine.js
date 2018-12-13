import Layout from '@/views/layout/Layout'

const adminRouter = {
  path: '/admin',
  component: Layout,
  redirect: '/admin/',
  name: 'admin',
  meta: {
    icon: 'people',
    title: '管理员'
  },
  children: [
    {
      path: 'course',
      component: () => import('@/views/admin/course'),
      name: 'course',
      menu: '课程管理',
      meta: {
        title: '课程管理'
      }
    },
    {
      path: 'message',
      component: () => import('@/components/OwnMessage'),
      name: 'message',
      menu: '人员管理',
      meta: {
        title: '人员管理'
      }
    },
    {
      path: 'message',
      component: () => import('@/components/OwnMessage'),
      name: 'message',
      menu: '人员管理',
      meta: {
        title: '人员管理'
      }
    },
    {
      path: '/system',
      component: Layout,
      redirect: '/system/switch',
      meta: {
        title: '系统设置',
        icon: 'system'
      },
      children: [
        {
          path: 'switch',
          name: 'switch',
          component: () => import('@/views/admin/sys'),
          menu: '系统开关',
          meta: {
            title: '系统开关'
          }
        },
        {
          path: 'user',
          name: 'user',
          component: () => import('@/views/admin/people'),
          menu: '人员设置',
          meta: {
            title: '人员设置'
          }
        }
      ]
    }
  ]
}

export default adminRouter
