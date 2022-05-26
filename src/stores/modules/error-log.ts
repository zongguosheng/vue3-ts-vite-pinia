import { defineStore } from 'pinia'
interface IErrorLog {
  err: Error
  vm: any
  info: string
  url: string
}
export interface IErrorLogState {
  logs: IErrorLog[]
}
export const logStore = defineStore('errorlog', {
  state: () => ({
    logs: [] as IErrorLog[]
  }),
  getters: {},
  actions: {
    AddErrorLog(log: IErrorLog) {
      this.logs.push(log)
    },
    ClearErrorLog() {
      this.logs.splice(0)
    }
  }
})
