import eltable from '@/views/table/eltable/index.vue'
import vxtable from '@/views/table/vxtable/index.vue'
import Layout from '@/layout/index.vue';
import type { RouteRecordRaw } from 'vue-router'
const tablerouter: RouteRecordRaw = {
  path: '/table',
  component: Layout,
  name: 'Table',
  redirect: 'noRedirect',
  meta: { title: 'draggableList', icon: 'table' },
  children: [
    {
      path: 'eltable',
      name: 'Eltable',
      component: eltable, // 流程模板
      meta: {
        title: 'eltable',
      }
    },
    {
      path: '/vxtable',
      name: 'Vxtable',
      component: vxtable, // 流程模板
      meta: {
        title: 'vxtable',
      }
    },
  ]
}

export default tablerouter
