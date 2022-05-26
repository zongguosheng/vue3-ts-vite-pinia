import { defineStore } from 'pinia'
import { login, logout, getUserInfo } from '@/api/users'
import { getToken, setToken, removeToken } from '@/utils/cookies'
interface User {
  accessToken?: string
  name?: string
  avatar?: string
  introduction?: string
  roles?: string[]
  email?: string
}
export const useStore = defineStore('useStore', {
  state: () => ({
    accessToken: '',
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    email: '',
  }),
  getters: {
  },
  actions: {
    async login(userInfo: { username: string, password: string}) {
      let { username, password } = userInfo
      username = username.trim()
      console.log('userinfo', userInfo)
      const { data } = await login({ username, password })
      console.log('data', data)
      setToken(data.accessToken)
      this.accessToken = data.accessToken
    },
    async GetUserInfo() {
      if (this.accessToken === '') {
        throw Error('GetUserInfo: token is undefined!')
      }
      const { data } = await getUserInfo({ /* Your params here */ })
      console.log('GetUserInfodata', data)
      if (!data) {
        throw Error('Verification failed, please Login again.')
      }
      const { roles, name, avatar, introduction, email } = data.user
      if (!roles || roles.length <= 0) {
        throw Error('GetUserInfo: roles must be a non-null array!')
      }
      console.log('this.name', this.name)
      console.log('this.name', this.avatar)
      console.log('this.name', this.roles)
      this.name = name
      this.avatar = avatar
      this.introduction = introduction
      this.roles = roles
      this.email = email
      console.log('end')
    },
    logout() {
      removeToken()
    },
    ResetToken() {
      removeToken()
    },
    clearUser() {
      this.accessToken = ''
    }
  },
})