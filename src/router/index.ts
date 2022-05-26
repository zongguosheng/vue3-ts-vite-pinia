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
        name: 'home',
        component: () => import('@/views/home.vue'),
        meta: { title: 'dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/about',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import(/* webpackChunkName: "documentation" */ '@/views/AboutView.vue'),
        name: 'about',
        meta: { title: 'documentation', icon: 'documentation' } // affix: true
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
const creatRouter = () => {
  return createRouter({
    history: createWebHistory(import.meta.env.VITE_BASE_API),
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
let router = creatRouter()
export  function resetRouter():void {
  sessionStorage.setItem('user','')
  router = creatRouter()
  // store.commit('set_allRoutes',[])
}
export default router
