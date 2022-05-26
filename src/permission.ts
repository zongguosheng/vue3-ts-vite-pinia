import router from './router'
import { ElMessage } from 'element-plus'
import { resetRouter } from '@/router'
import { createRouter, useRoute } from 'vue-router'
import { useStore } from '@/stores/modules/user'
import { permissionStore } from '@/stores/modules/permission'
import settings from './settings'
const whiteList = ['/login']
// const whiteList = ['/login', '/test', '/home', '/dashboard']
// const getPageTitle = (key: string) => {
//   const hasKey = i18n.te(`route.${key}`)
//   if (hasKey) {
//     const pageName = i18n.t(`route.${key}`)
//     return `${pageName} - ${settings.title}`
//   }
//   return `${settings.title}`
// }

router.beforeEach(async(to, from, next) => {
  const user = useStore()
  const permission = permissionStore()
  console.log('to.path', to.path)
  // 判断登录
  if (user.accessToken) {
    if (to.path === '/login') {
      // 如果已登录，重定向到主页
      next({ path: '/' })
    } else {
      // next({ ...to, replace: true })
      // Check whether the user has obtained his permission roles
      console.log('user.roles', user.roles)
      if (user.roles?.length === 0 || user.roles === undefined) {
        try {
          // Note: roles must be a object array! such as: ['admin'] or ['developer', 'editor']
          console.log('1111', 1111, user.GetUserInfo())
          await user.GetUserInfo()
          console.log('user------------', user)
          const roles = user.roles
          console.log('roles', roles)
          // console.log('roles', storeAction)
          // // Generate accessible routes map based on role
          permission.GenerateRoutes(roles!)
          // // Dynamically add accessible routes
          permission.dynamicRoutes.forEach(route => {
            // console.log('route', route);
            router.addRoute(route)
          })
          // Hack: ensure addRoutes is complete
          // Set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (err: any) {
          // Remove token and redirect to login page
          user.$reset() // store 上的 $reset() 方法将状态 重置 到其初始值：
          // UserModule.ResetToken()
          // ElMessage.error(err || 'Has Error')
          next(`/login?redirect=${to.path}`)
          // NProgress.done()
        }
      } else {
        next()
      }
    }
  } else {
    console.log('to.path', to.path)
    // Has no token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免费登录白名单中，直接进入
      next()
    } else {
      // Other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
    }
  }
})

router.afterEach((to) => {
  // console.log('afterEach', to)
  // Finish progress bar
  // set page title
  // document.title = getPageTitle(to.meta.title)
})
