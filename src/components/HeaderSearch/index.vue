<template>
  <div
    id="header-search"
    :class="{'show': show}"
    class="header-search"
  >
    <!-- <span class="svg-container">
      <svg-icon name="search" />
    </span> -->
    <svg-icon
      class="search-icon"
      name="search"
      @click.stop="click"
    />
    <el-select
      ref="headerSearchSelect"
      v-model="search"
      :remote-method="querySearch"
      filterable
      default-first-option
      remote
      placeholder="Search"
      class="header-search-select"
      @change="change"
    >
      <el-option
        v-for="item in options"
        :key="item.path"
        :value="item"
        :label="item.meta.title.join(' > ')"
      />
    </el-select>
  </div>
</template>

<script lang="ts" setup>
import path from 'path-browserify'
import { fileURLToPath, URL } from 'url'
import Fuse from 'fuse.js'
import { ref, onBeforeMount, nextTick, computed, onMounted, watch, defineProps, defineEmits } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { RouteRecordRaw, _RouteRecordBase } from 'vue-router'
import { permissionStore } from '@/stores/modules/permission'
import { appModule } from '@/stores/modules/app'
import i18n from '@/lang' // Internationalization
import { useI18n } from 'vue-i18n'
const search = ref<string>('')
const show = ref<boolean>(false)
const options = ref<Array<RouteRecordRaw>>([])
const searchPool = ref<Array<RouteRecordRaw>>([])
const fuse = ref<Fuse<RouteRecordRaw>>()
const headerSearchSelect = ref()
const router = useRouter()
const { t, locale } = useI18n()
const permission = permissionStore()
const app = appModule()
const routes = computed(() => {
  return permission.routes
})
const lang = computed(() => {
  return app.language
})
watch(
  () => lang.value,
  (newVal, oldVal) => {
    searchPool.value = generateRoutes(routes.value)
  }
)
watch(
  () => routes.value,
  (newVal, oldVal) => {
    searchPool.value = generateRoutes(routes.value)
  }
)
watch(
  () => searchPool.value,
  (newVal, oldVal) => {
    initFuse(newVal)
  }
)
watch(
  () => show.value,
  (newVal, oldVal) => {
    if (newVal) {
      document.body.addEventListener('click', close)
    } else {
      document.body.removeEventListener('click', close)
    }
  }
)
onMounted(() => {
  searchPool.value = generateRoutes(routes.value)
})
const click = () => {
  show.value = !show.value
  if (show.value) {
    headerSearchSelect && (headerSearchSelect.value as HTMLElement).focus()
  }
}
const close = () => {
  headerSearchSelect && (headerSearchSelect.value as HTMLElement).blur()
  options.value = []
  show.value = false
}
const change = (route: RouteRecordRaw) => {
  router.push(route.path).catch(err => {
    console.log('err', err)
  })
  search.value = ''
  options.value = []
  nextTick(() => {
    show.value = false
  })
}
const initFuse = (list: RouteRecordRaw[]) => {
  fuse.value = new Fuse(list, {
    shouldSort: true,
    threshold: 0.4,
    location: 0,
    distance: 100,
    minMatchCharLength: 1,
    keys: [{
      name: 'title',
      weight: 0.7
    }, {
      name: 'path',
      weight: 0.3
    }]
  })
}

const generateRoutes = (routes: RouteRecordRaw[], basePath = '/', prefixTitle: string[] = []) => {
  let res: RouteRecordRaw[]  = []
  for (const router of routes) {
    if (router.meta && router.meta.hidden) {
        continue
    }
    const data: RouteRecordRaw = {
      path: path.resolve(basePath, router.path),
      meta: {
        title: [...prefixTitle]
      }
    }
    if (router.meta && router.meta.title) {
      // generate internationalized title
      const i18ntitle = t(`route.${router.meta.title}`).toString()
      // console.log('i18ntitle', i18ntitle)
      // console.log('data', data)
      data.meta.title = [...data.meta.title, i18ntitle]
      if (router.redirect !== 'noRedirect') {
        // only push the routes with title
        // special case: need to exclude parent router without redirect
        // console.log('datapushpush', data)
        res.push(data)
      }
    }

    if (router.children) {
      const tempRoutes = generateRoutes(router.children, data.path, data.meta.title)
      if (tempRoutes.length >= 1) {
        res = [...res, ...tempRoutes]
      }
    }
  }
  return res
}

const querySearch = (query: string) => {
    if (query !== '') {
      if (fuse.value) {
        options.value = fuse.value.search(query).map((result) => result.item)
      }
    } else {
      options.value = []
    }
}
// @Component({
//   name: 'HeaderSearch'
// })
// export default class extends Vue {
//   private search = ''
//   private show = false
//   private options: RouteConfig[] = []
//   private searchPool: RouteConfig[] = []
//   private fuse?: Fuse<RouteConfig>

//   get routes() {
//     return PermissionModule.routes
//   }

//   get lang() {
//     return AppModule.language
//   }

//   @Watch('lang')
//   private onLangChange() {
//     this.searchPool = this.generateRoutes(this.routes)
//   }

//   @Watch('routes')
//   private onRoutesChange() {
//     this.searchPool = this.generateRoutes(this.routes)
//   }

//   @Watch('searchPool')
//   private onSearchPoolChange(value: RouteConfig[]) {
//     this.initFuse(value)
//   }

//   @Watch('show')
//   private onShowChange(value: boolean) {
//     if (value) {
//       document.body.addEventListener('click', this.close)
//     } else {
//       document.body.removeEventListener('click', this.close)
//     }
//   }

//   mounted() {
//     this.searchPool = this.generateRoutes(this.routes)
//   }

//   private click() {
//     this.show = !this.show
//     if (this.show) {
//       this.$refs.headerSearchSelect && (this.$refs.headerSearchSelect as HTMLElement).focus()
//     }
//   }

//   private close() {
//     this.$refs.headerSearchSelect && (this.$refs.headerSearchSelect as HTMLElement).blur()
//     this.options = []
//     this.show = false
//   }

//   private change(route: RouteConfig) {
//     this.$router.push(route.path).catch(err => {
//       console.warn(err)
//     })
//     this.search = ''
//     this.options = []
//     this.$nextTick(() => {
//       this.show = false
//     })
//   }

//   private initFuse(list: RouteConfig[]) {
//     this.fuse = new Fuse(list, {
//       shouldSort: true,
//       threshold: 0.4,
//       location: 0,
//       distance: 100,
//       minMatchCharLength: 1,
//       keys: [{
//         name: 'title',
//         weight: 0.7
//       }, {
//         name: 'path',
//         weight: 0.3
//       }]
//     })
//   }

//   // Filter out the routes that can be displayed in the sidebar
//   // And generate the internationalized title
/*   private generateRoutes(routes: RouteConfig[], basePath = '/', prefixTitle: string[] = []) {
    let res: RouteConfig[] = []

    for (const router of routes) {
      // skip hidden router
      if (router.meta && router.meta.hidden) {
        continue
      }

      const data: RouteConfig = {
        path: path.resolve(basePath, router.path),
        meta: {
          title: [...prefixTitle]
        }
      }

      if (router.meta && router.meta.title) {
        // generate internationalized title
        const i18ntitle = i18n.t(`route.${router.meta.title}`).toString()
        data.meta.title = [...data.meta.title, i18ntitle]
        if (router.redirect !== 'noRedirect') {
          // only push the routes with title
          // special case: need to exclude parent router without redirect
          res.push(data)
        }
      }

      // recursive child routes
      if (router.children) {
        const tempRoutes = this.generateRoutes(router.children, data.path, data.meta.title)
        if (tempRoutes.length >= 1) {
          res = [...res, ...tempRoutes]
        }
      }
    }
    return res
  } */

//   private querySearch(query: string) {
//     if (query !== '') {
//       if (this.fuse) {
//         this.options = this.fuse.search(query).map((result) => result.item)
//       }
//     } else {
//       this.options = []
//     }
//   }
// }
</script>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;

  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }

  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }

  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
