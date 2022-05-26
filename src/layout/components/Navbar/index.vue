<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggle-click="toggleSideBar"
    />
    <breadcrumb
      id="breadcrumb-container"
      class="breadcrumb-container"
    />
    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <header-search class="right-menu-item" />
        <!-- <error-log class="errLog-container right-menu-item hover-effect" /> -->
      </template>
      <div class="avatar-container right-menu-item hover-effect">
        <el-dropdown
          trigger="click"
        >
          <div class="avatar-wrapper">
            <img
              :src="avatar+'?imageView2/1/w/80/h/80'"
              class="user-avatar"
            >
            <i class="el-icon-caret-bottom" />
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <router-link to="/profile/">
                <el-dropdown-item>
                  {{ $t('navbar.profile') }}
                </el-dropdown-item>
              </router-link>
              <router-link to="/">
                <el-dropdown-item>
                  {{ $t('navbar.dashboard') }}
                </el-dropdown-item>
              </router-link>
              <a
                target="_blank"
              >
                <el-dropdown-item>
                  {{ $t('navbar.github') }}
                </el-dropdown-item>
              </a>
              <a
                target="_blank"
              >
                <el-dropdown-item>Docs</el-dropdown-item>
              </a>
              <el-dropdown-item
                divided
                @click.native="logout"
              >
                <span style="display:block;">
                  {{ $t('navbar.logOut') }}
                </span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import Hamburger from '@/components/Hamburger/index.vue'
import HeaderSearch from '@/components/HeaderSearch/index.vue'
// import ErrorLog from '@/components/ErrorLog/index.vue'
import { ref, nextTick, onBeforeMount, computed, onMounted} from 'vue'
import { appModule } from '@/stores/modules/app'
import { useStore } from '@/stores/modules/user'
import { useRouter, useRoute } from 'vue-router'
import type { RouteRecordRaw, RouteLocationMatched } from 'vue-router'
const AppModule = appModule()
const UserModule = useStore()
const sidebar = computed(() => {
  return AppModule.sidebar
})
const device = computed(() => {
  return AppModule.device.toString()
})

const avatar = computed(() => {
  return UserModule.avatar
})

const toggleSideBar = () => {
  AppModule.ToggleSideBar(false)
}
const logout = () => {
  console.log('logout', logout)
}

</script>

<style lang="scss" scoped>
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
</style>