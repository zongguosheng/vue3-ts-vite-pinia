
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from '@comps/HelloWorld.vue'
import { ref, nextTick, onBeforeMount, computed, onMounted } from 'vue'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
const locale = zhCn
</script>

<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<style>
</style>
