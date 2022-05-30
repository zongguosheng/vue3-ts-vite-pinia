<template>
  <div class="container">
    <vxe-table border :data="tableData">
      <vxe-column type="seq" width="60"></vxe-column>
      <!-- <vxe-column field="name" title="Name">
        <template #default="{ row }">
          <span>自定义插槽模板 {{ row.name }}</span>
        </template>
      </vxe-column> -->
      <vxe-column field="sex" title="Sex"></vxe-column>
      <vxe-column field="age" title="Age"></vxe-column>
      <vxe-column field="age" title="操作">
        <template #default="{ row }">
          <el-button type="primary" @click="handleEdit(row)">编辑</el-button>
        </template>
      </vxe-column>
    </vxe-table>

    <!-- <vxe-grid v-bind="gridOptions">
      <template #name="{ row }">
        <span>自定义插槽模板 {{ row.name }}</span>
      </template>
    </vxe-grid> -->
  </div>
</template>

<script lang='ts' setup>
  import { ref, nextTick, onBeforeMount, computed, onMounted, watch, defineProps, defineEmits } from 'vue'
  // import { storeAction, store } from '@/store'
  import { useRouter, useRoute } from 'vue-router'
  import type { VxeGridProps } from 'vxe-table'
  import type { RouteRecordRaw, RouteLocationMatched } from 'vue-router'
  // const  = ref<>()
interface UserVO {
  id: number;
  name: string;
  role: string;
  sex: string;
  age: number;
  address: string;
}
const tableData = ref<UserVO[]>([
  { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
  { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
  { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
  { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
])
console.log('tableData', tableData)
const gridOptions = ref<VxeGridProps<UserVO>>({
  border: true,
  columns: [
    { type: 'seq', width: 50 },
    { field: 'name', title: 'Name', slots: { default: 'name' } },
    { field: 'sex', title: 'Sex', showHeaderOverflow: true },
    { field: 'address', title: 'Address', showOverflow: true }
  ],
  data: [
    { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
    { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
    { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
    { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
  ]
})

const handleEdit = (item: any) => {
  console.log('Edit', item)
}

</script>

<style lang="less" scoped>
  
</style>
