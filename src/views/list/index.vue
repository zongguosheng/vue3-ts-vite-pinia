<template>
  <div class="container">
    <h2>list</h2>
  </div>
</template>

<script lang='ts' setup>
import { RouterLink, RouterView } from 'vue-router'
  import { ref, nextTick, onBeforeMount, computed, onMounted, watch, defineProps, defineEmits } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import type { RouteRecordRaw, RouteLocationMatched } from 'vue-router'
</script>

<style>
  
</style>
