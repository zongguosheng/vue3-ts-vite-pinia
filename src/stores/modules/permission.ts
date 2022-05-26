import { defineStore } from 'pinia'
import { useRoute,  } from 'vue-router'
import { asyncRoutes, constantRoutes } from '@/router'
import type { RouteRecordRaw, RouteLocation } from 'vue-router'
export interface IPermissionState {
  routes: RouteRecordRaw[]
  dynamicRoutes: RouteRecordRaw[]
}

const hasPermission = (roles: string[], route: RouteRecordRaw) => {
  if (route.meta && route.meta.roles) {
    // return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}
export const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: string[]) => {
  const res: RouteRecordRaw[] = []
  routes.forEach(route => {
    const r = { ...route }
    if (hasPermission(roles, r)) {
      if (r.children) {
        r.children = filterAsyncRoutes(r.children, roles)
      }
      res.push(r)
    }
  })
  return res
}
export const permissionStore = defineStore('permission', {
  state: () => ({
    routes: [] as RouteRecordRaw[],
    dynamicRoutes: []
  }),
  getters: {},
  actions: {
    GenerateRoutes(roles: string[]) {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      const ass: any[] = accessedRoutes
      this.routes = constantRoutes.concat(ass)
    }
  }
})
