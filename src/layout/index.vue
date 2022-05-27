<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="classObj.mobile && ResizeMixin.setup().sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <Sidebar class="sidebar-container" />
    <div :class="{hasTagsView: showTagsView}" class="main-container">
      <div :class="{'fixed-header': fixedHeader}">
        <Navbar />
        <!-- <tags-view v-if="showTagsView" /> -->
      </div>
      <app-main />
      <!-- <right-panel v-if="showSetting">
        <settings />
      </right-panel> -->
    </div>
  </div>
</template>

<script lang='ts' setup>
import { Navbar, Sidebar, AppMain } from './components'
import { RouterLink, RouterView } from 'vue-router'
import ResizeMixin from './mixins/index'
import { ref, nextTick, onBeforeMount, computed, onMounted, watch } from 'vue'
import { appModule, DeviceType } from '@/stores/modules/app'
import { settingStore } from '@/stores/modules/setting'
import { useRouter, useRoute } from 'vue-router'
import type { RouteRecordRaw, RouteLocationMatched } from 'vue-router'
const app = appModule()
const classObj = computed(() => {
  return {
    hideSidebar:!ResizeMixin.setup().sidebar.value.opened,
    openSidebar: ResizeMixin.setup().sidebar.value.opened,
    withoutAnimation: ResizeMixin.setup().sidebar.value.withoutAnimation,
    mobile: ResizeMixin.setup().device.value === DeviceType.Mobile
  }
})
const SettingsModule = settingStore()
const showSetting = computed(() => {
  return SettingsModule.showSettings
})
const showTagsView = () => {
  return SettingsModule.showTagsView
}
console.log('layout', )
const fixedHeader = () => {
  return SettingsModule.fixedHeader
}
const handleClickOutside = () => {
  app.CloseSideBar(false)
}
onMounted(() => {
})
</script>

<style lang="scss" scoped>
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.main-container {
  min-height: 100%;
  transition: margin-left .28s;
  margin-left: $sideBarWidth;
  position: relative;
}
.sidebar-container {
  transition: width 0.28s;
  width: $sideBarWidth !important;
  height: 100%;
  position: fixed;
  font-size: 0px;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}
.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}
.hideSidebar {
  .main-container {
    margin-left: 54px;
  }

  .sidebar-container {
    width: 54px !important;
  }

  .fixed-header {
    width: calc(100% - 54px)
  }
}

/* for mobile response 适配移动端 */
.mobile {
  .main-container {
    margin-left: 0px;
  }

  .sidebar-container {
    transition: transform .28s;
    width: $sideBarWidth !important;
  }

  &.openSidebar {
    position: fixed;
    top: 0;
  }

  &.hideSidebar {
    .sidebar-container {
      pointer-events: none;
      transition-duration: 0.3s;
      transform: translate3d(-$sideBarWidth, 0, 0);
    }
  }

  .fixed-header {
    width: 100%;
  }
}

.withoutAnimation {
  .main-container,
  .sidebar-container {
    transition: none;
  }
}
</style>