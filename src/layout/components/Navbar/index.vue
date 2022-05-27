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
import { ref, nextTick, onBeforeMount, computed, onMounted} from 'vue'
// import { ArrowDown } from '@element-plus/icons-vue'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import Hamburger from '@/components/Hamburger/index.vue'
import HeaderSearch from '@/components/HeaderSearch/index.vue'
// import ErrorLog from '@/components/ErrorLog/index.vue'
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
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    padding: 0 15px;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      // background: #007aff;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>