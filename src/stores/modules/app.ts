import { defineStore } from 'pinia'
import { getLocale } from '@/lang'
import { getSidebarStatus, getSize, setSidebarStatus, setLanguage, setSize } from '@/utils/cookies'
export enum DeviceType {
  Mobile,
  Desktop,
}
export interface IAppState {
  device: DeviceType
  sidebar: {
    opened: boolean
    withoutAnimation: boolean
  }
  language: string
  size: string
}
export const appModule = defineStore('appModule', {
  state: () => ({
    device: DeviceType.Desktop,
    sidebar: {
      opened: getSidebarStatus() !== 'closed',
      withoutAnimation: false
    },
    language: getLocale(),
    size: getSize() || 'medium'
  }),
  getters: {},
  actions: {
    ToggleSideBar(withoutAnimation: boolean) {
      this.sidebar.opened = !this.sidebar.opened
      this.sidebar.withoutAnimation = withoutAnimation
      if (this.sidebar.opened) {
        setSidebarStatus('opened')
      } else {
        setSidebarStatus('closed')
      }
    },
    CloseSideBar(withoutAnimation: boolean) {
      this.sidebar.opened = false
      this.sidebar.withoutAnimation = withoutAnimation
      setSidebarStatus('closed')
    },
    ToggleDevice(device: DeviceType) {
      this.device = device
    },
    SetLanguage(state:IAppState, language: string) {
      state.language = language
      setLanguage(language)
    },
    SetSize(state:IAppState, size: string) {
      state.size = size
      setSize(size)
    },
  }
})