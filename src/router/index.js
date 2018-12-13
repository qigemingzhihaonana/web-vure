import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/* Router Modules */
import teacherRouter from './modules/teacher'

/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/index',
    component: () => import('@/views/index/index'),
    hidden: true
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/editor/index'),
        name: 'DashboardEditor',
        meta: { title: '首页', icon: 'dashboard', noCache: true }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [

  /** When your routing table is too long, you can split it into small modules**/
  teacherRouter,
  {
    path: '/student',
    component: Layout,
    name: 'student',
    meta: {
      title: '学生',
      icon: 'people'
    },
    children: [
      {
        path: 'class',
        component: () => import('@/views/student/index'),
        name: 'studentClass',
        menu: '学生选课',
        meta: {
          title: '学生选课'
        }
      },
      {
        path: 'message',
        menu: '学生个人信息',
        component: () => import('@/components/OwnMessage'),
        name: 'message',
        meta: {
          title: '学生个人信息'
        }
      }
    ]
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
      },
      {
        path: 'course',
        component: () => import('@/views/admin/course'),
        name: 'course',
        menu: '课程管理',
        meta: {
          title: '课程管理'
        }
      }
    ]
  },
  {
    path: '/news',
    component: Layout,
    redirect: '/news/build',
    children: [
      {
        path: 'build',
        name: 'Tinymce',
        component: () => import('@/views/components-demo/tinymce'),
        menu: 'news',
        meta: {
          title: '新闻发布',
          icon: 'eye'
        }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]
