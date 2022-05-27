<template>
  <div :class="{'has-logo': showLogo}">
    <sidebar-logo
      v-if="showLogo"
      :collapse="isCollapse"
    />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="menuActiveTextColor"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
          :is-collapse="isCollapse"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script lang="ts" setup>
import { computed, onBeforeMount, onMounted, ref, } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SidebarItem from './SidebarItem.vue'
import SidebarLogo from './SidebarLogo.vue'
import variables from '@/styles/variables.module.scss'
import { appModule } from '@/stores/modules/app'
import { permissionStore } from '@/stores/modules/permission'
import { settingStore } from '@/stores/modules/setting'
const userouter = useRouter()
const app = appModule()
const permission = permissionStore()
const setting = settingStore()
const sidebar = computed(() => {
  return app.sidebar
})
const routes = computed(() => {
  return permission?.routes
})

const showLogo = computed(() => {
  return setting.showSidebarLogo
})
const menuActiveTextColor = computed(() => {
  if (setting.sidebarTextTheme) {
    return setting.theme
  } else {
    return variables.menuActiveText
  }
})
const activeMenu = computed(() => {
  const { meta, path } = useRoute()
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return path
})
onMounted(() => {
  console.log('routes', routes)
})
const isCollapse = computed(() => {
  return !sidebar.value.opened
})
</script>
<style lang="scss">
.sidebar-container {
  // reset element-ui css
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
  }

  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }

  .el-scrollbar__view {
    height: 100%
  }

  .el-scrollbar__bar {
    &.is-vertical {
      right: 0px;
    }

    &.is-horizontal {
      display: none;
    }
  }
}
</style>

<style lang="scss" scoped>
.el-scrollbar {
  height: 100%
}

.has-logo {
  .el-scrollbar {
    height: calc(100% - 50px);
  }
}

.el-menu {
  border: none;
  height: 100%;
  width: 100% !important;
}
</style>