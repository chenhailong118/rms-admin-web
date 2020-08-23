import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  {path: '/login', component: () => import('@/views/login/index'), hidden: true},
  {path: '/404', component: () => import('@/views/404'), hidden: true},
  {
    path: '',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: {title: '首页', icon: 'home'}
    }]
  }
]

export const asyncRouterMap = [
  {
    path:'/superstar',
    component: Layout,
    redirect: '/superstar/actor',
    name: 'superstar',
    meta: {title: '超级明星', icon: 'superstar'},
    children: [
      {
        path: 'actor',
        name: 'actor',
        component: () => import('@/views/superstar/actor/index'),
        meta: {title: '演员列表', icon: 'superstar-actor'}
      },{
        path: 'actorDetails',
        name: 'actorDetails',
        component: () => import('@/views/superstar/actor/details'),
        meta: {title: '演员详情'},
        hidden: true
      },
      {
        path: 'resources',
        name: 'resources',
        component: () => import('@/views/superstar/resource/index'),
        meta: {title: '作品列表', icon: 'superstar-resources'}
      },{
        path: 'resourceDetails',
        name: 'resourceDetails',
        component: () => import('@/views/superstar/resource/details'),
        meta: {title: '作品详情'},
        hidden: true
      },
      {
        path: 'tag',
        name: 'tag',
        component: () => import('@/views/superstar/tag/index'),
        meta: {title: '标签列表', icon: 'superstar-tag'}
      },
      {
        path: 'addTag',
        name: 'addTag',
        component: () => import('@/views/superstar/tag/add'),
        meta: {title: '添加标签'},
        hidden: true
      },
      {
        path: 'updateTag',
        name: 'updateTag',
        component: () => import('@/views/superstar/tag/update'),
        meta: {title: '修改标签'},
        hidden: true
      },
    ]
  },
  {
    path:'/auth',
    component: Layout,
    redirect: '/auth/user',
    name: 'auth',
    meta: {title: '权限管理', icon: 'auth'},
    children: [
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/auth/user/index'),
        meta: {title: '用户列表', icon: 'auth-user'}
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/auth/role/index'),
        meta: {title: '角色列表', icon: 'auth-role'}
      },
      {
        path: 'allocMenu',
        name: 'allocMenu',
        component: () => import('@/views/auth/role/allocMenu'),
        meta: {title: '分配菜单'},
        hidden: true
      },
      {
        path: 'allocResource',
        name: 'allocResource',
        component: () => import('@/views/auth/role/allocResource'),
        meta: {title: '分配资源'},
        hidden: true
      },
      {
        path: 'menu',
        name: 'menu',
        component: () => import('@/views/auth/menu/index'),
        meta: {title: '菜单列表', icon: 'auth-menu'}
      },
      {
        path: 'addMenu',
        name: 'addMenu',
        component: () => import('@/views/auth/menu/add'),
        meta: {title: '添加菜单'},
        hidden: true
      },
      {
        path: 'updateMenu',
        name: 'updateMenu',
        component: () => import('@/views/auth/menu/update'),
        meta: {title: '修改菜单'},
        hidden: true
      },
      {
        path: 'resource',
        name: 'resource',
        component: () => import('@/views/auth/resource/index'),
        meta: {title: '资源列表', icon: 'auth-resource'}
      },
      {
        path: 'resourceCategory',
        name: 'resourceCategory',
        component: () => import('@/views/auth/resource/categoryList'),
        meta: {title: '资源分类'},
        hidden: true
      }
    ]
  },
  {path: '*', redirect: '/404', hidden: true}
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

