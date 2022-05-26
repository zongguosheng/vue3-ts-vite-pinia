import { defineStore } from 'pinia'
import elementVariables from '@/styles/element-variables.scss'
import defaultSettings from '@/settings'
export interface ISettingsState {
  theme: string
  fixedHeader: boolean
  showSettings: boolean
  showTagsView: boolean
  showSidebarLogo: boolean
  sidebarTextTheme: boolean
}
export const settingStore = defineStore('setting', {
  state: () => ({
    theme: elementVariables.theme,
    fixedHeader: defaultSettings.fixedHeader,
    showSettings: defaultSettings.showSettings,
    showTagsView: defaultSettings.showTagsView,
    showSidebarLogo: defaultSettings.showSidebarLogo,
    sidebarTextTheme: defaultSettings.sidebarTextTheme
  }),
  getters: {},
  actions: {
    changesetting(state: any, payload: { key: string, value: any}) {
      if (state.hasOwnProperty(payload.key)) {
        console.log('state', state)
        // state[key] = payload.value
      }
    }
  }
})