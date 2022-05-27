import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue';
export const constantRoutes:Array<RouteRecordRaw> = [
  {
    path: '/',
    name: "Main",
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home.vue'),
        meta: { title: 'home', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: { hidden: true }
  },
  {
    path: '/list',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/list/index.vue'),
        name: 'about',
        meta: { title: 'list', icon: 'documentation' } // affix: true
      }
    ]
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "401" */ '@/views/error-page/404.vue'),
    meta: { hidden: true }
  },
]
export const asyncRoutes = [
  /** when your routing map is too long, you can split it into small modules **/
    // {
  //   path: '/icon',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import(/* webpackChunkName: "icons" */ '@/views/icons/index.vue'),
  //       name: 'Icons',
  //       meta: {
  //         title: 'icons',
  //         icon: 'icon',
  //         noCache: true
  //       }
  //     }
  //   ]
  // },
  {
    path: '*',
    redirect: '/404',
    meta: { hidden: true }
  }
]
console.log('import.meta.env.VITE_BASE_API', import.meta.env.VITE_BASE_API)
const creatRouters = () => {
  return createRouter({
    history: createWebHistory(),
    routes: constantRoutes,
    scrollBehavior(to, from, savedPosition) {
      // 始终滚动到顶部
      if (savedPosition) {
        return savedPosition
      } else {
        return { top: 0 }
      }
    }
  })
}
let router = creatRouters()
export  function resetRouter():void {
  sessionStorage.setItem('user','')
  router = creatRouters()
  // store.commit('set_allRoutes',[])
}
export default router
