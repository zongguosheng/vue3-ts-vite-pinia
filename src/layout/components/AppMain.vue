<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script lang='ts' setup>
import { ref, nextTick, onBeforeMount, computed, onMounted, watch } from 'vue'
import { useTagsviewStore } from '@/stores/modules/tagsview'
import { useRouter, useRoute } from 'vue-router'
const useroute = useRoute()
const TagsViewModule = useTagsviewStore()
const cachedViews = computed(() => {
  return TagsViewModule.cachedViews
})
const key = computed(() => {
  return useroute.path
})
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header+.app-main {
  padding-top: 50px;
  height: 100vh;
  overflow: auto;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header+.app-main {
    padding-top: 84px;
  }
}
</style>
