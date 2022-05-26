<template>
  <div class="app-wrapper">
    <Sidebar class="sidebar-container" />
    <div class="main-container">
        <div :class="{'fixed-header': fixedHeader}">
          <Navbar />
          <!-- <tags-view v-if="showTagsView" /> -->
        </div>
    </div>
    <app-main />
    <!-- <right-panel v-if="showSettings">
      <settings />
    </right-panel> -->
  </div>
</template>

<script lang='ts' setup>
import { Navbar, Sidebar, AppMain } from './components'
import { RouterLink, RouterView } from 'vue-router'
import { ref, nextTick, onBeforeMount, computed, onMounted, watch } from 'vue'
// import { storeAction, store } from '@/store'
import { useRouter, useRoute } from 'vue-router'
import type { RouteRecordRaw, RouteLocationMatched } from 'vue-router'
const name = ref<String>('')

const fixedHeader = () => {
  // return SettingsModule.fixedHeader
}

</script>

// <style lang="scss" scoped>
// .app-wrapper {
//   @include clearfix;
//   position: relative;
//   height: 100%;
//   width: 100%;
// }
// </style>