<template>
  <div class="about">
    <h1>{{name}}</h1>
    <p>{{counter}}</p>
    <el-form :model="form" label-width="120px">
      <el-form-item label="账号">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.mark" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref,reactive, nextTick, defineProps, defineEmits } from 'vue'
import { useAboutStore } from '@/stores/about';
import { storeToRefs } from 'pinia';
const store = useAboutStore();
console.log('store', store)
const { name, counter, doubleCount } = storeToRefs(store);
const form = reactive({
  name: '',
  password: '',
  mark: '',
})
nextTick(() => {
  // console.log('setName', setName('wangwu'))
  doubleCount
})
const login = () => {
  console.log('form', form)
  store.login(form)
}
store.setName('飞飞')
store.increment()
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
