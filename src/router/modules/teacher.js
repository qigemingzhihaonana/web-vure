import Layout from '@/views/layout/Layout'

const teacherRouter = {
  path: '/teacher',
  component: Layout,
  redirect: '/teachet/code',
  name: 'teacher',
  meta: {
    icon: 'people',
    title: '教师'
  },
  children: [
    {
      path: 'code',
      component: () => import('@/views/teacher/index'),
      name: 'teacherCode',
      menu: '教师评分',
      meta: {
        title: '教师评分'
      }
    },
    {
      path: 'message',
      component: () => import('@/components/OwnMessage'),
      name: 'message',
      menu: '教师个人信息',
      meta: {
        title: '教师个人信息'
      }
    }
  ]
}

export default teacherRouter
