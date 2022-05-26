import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'normalize.css'
import '@/styles/element-variables.scss'
import '@/styles/index.scss'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import App from './App.vue'
import router from './router'
import _ from 'lodash'
import { store } from "@/stores/index"
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
const app = createApp(App)
app.config.globalProperties.$getLabel = getLabelv
app.config.globalProperties.$log = logs
app.use(router).use(store).use(i18n).use(ElementPlus, {locale: zhCn,}).mount('#app')
