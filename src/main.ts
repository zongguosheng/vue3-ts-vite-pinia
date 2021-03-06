import { createApp } from 'vue'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import 'normalize.css'
import '@/styles/element-variables.scss'
import '@/styles/index.scss'
// import zhCn from 'element-plus/es/locale/lang/zh-cn'
import svgIcon from "@/components/SvgIcon/index.vue"
import 'virtual:svg-icons-register'
import APP from './App.vue'
import router from './router'
import _ from 'lodash'
import { store } from "@/stores/index"
import 'xe-utils'
import { VXETable,Footer, Column,Table} from 'vxe-table'
// import zhCN from 'vxe-table/es/locale/lang/zh-CN'
// VXETable.setup({
//   i18n: (key, args) => XEUtils.toFormatString(XEUtils.get(zhCN, key), args)
// })

const app = createApp(APP)
function useTable (app: any) {
  app.use(Footer).use(Column).use(Table)
}

import * as icons from "@element-plus/icons-vue";
for (const [key, component] of Object.entries(icons)) {
  app.component(key, component)
}
import '@/permission'
// import messages from '@intlify/vite-plugin-vue-i18n/messages'
// import { createI18n } from 'vue-i18n';
// let i18n = createI18n({
//   locale: 'zh',
//   globalInjection: true,  // 全局注册 $t方法
//   messages
// })
const getLabelv = (options: any, value: any) => _.get(_.find(options, { value }), 'label', '')
const logs = (...args: any) => console.log(...args)
import i18n from '@/lang'

app.config.globalProperties.$getLabel = getLabelv
app.config.globalProperties.$log = logs
// app.use(ElementPlus, {locale: zhCn,})
app.use(store).use(router).use(useTable).component('svg-icon', svgIcon).use(i18n).mount('#app')