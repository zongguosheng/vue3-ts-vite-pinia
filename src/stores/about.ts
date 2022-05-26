import { defineStore } from 'pinia'
import { useRouter, useRoute } from 'vue-router'
import type { RouteRecordRaw, RouteLocationMatched } from 'vue-router'
// export const useAboutStore = defineStore('about', { state:() => ({}), actions:{}, getters:{} }) // 简写
export const useAboutStore = defineStore({
  id: 'about',
  state: () => ({
    name: 'zhansan',
    counter: 1
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,

  },
  actions: {
    increment() {
      this.counter++
    },
    decrement() {
      this.counter--
    },
    // 修改name
    setName(name: string) {
      console.log('name', name)
      this.name = name
    },
    async login(data: any) {
      console.log('login', data)

    }
  }
})
