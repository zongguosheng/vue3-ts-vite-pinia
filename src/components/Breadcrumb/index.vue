<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="item.path">
        <span v-if="item.redirect === 'noredirect' || index === breadcrumbs.length-1" class="no-redirect">
        {{ $t('route.' + item.meta.title) }}
        </span>
        <a v-else @click.prevent="handelLink(item)">
        {{ $t('route.' + item.meta.title) }}
        </a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang='ts' setup>
import { ref, nextTick, onBeforeMount, computed, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { compile } from 'path-to-regexp'
import { useRoute, useRouter } from 'vue-router'
import type { RouteRecordRaw, RouteLocationMatched } from 'vue-router'
const route = useRoute()
const router = useRouter()
const { locale, t } = useI18n()
const breadcrumbs = ref<Array<RouteRecordRaw>>([])
watch(
  route,
  (newVal, oldVal) => {
    if (route.path.startsWith('/redirect/')) {
      // console.log('新值:' + newVal + '旧值:' + oldVal)
      return
    }
    getBreadcrumb()
  }
  // 可选项，是否开启深监听
  // {
  //   deep: true
  // }
)
onMounted(() => {
  
  getBreadcrumb()
})
const getBreadcrumb = () => {
  let matched = route.matched.filter((item) => item.meta && item.meta.title)
  const first = matched[0]
  if (!isDashboard(first)) {
    matched = [{ path: '/home', meta: { title: 'home' } } as unknown as RouteLocationMatched].concat(matched)
  }
  breadcrumbs.value = matched.filter((item) => {
    return item.meta && item.meta.title && item.meta.breadcrumb !== false
  })
}
const isDashboard = (route: RouteRecordRaw | String | any) => {
  const name = route && route.name
  if (!name) {
    return false
  }
  return name.trim().toLocaleLowerCase() === 'Home'.toLocaleLowerCase()
}
const pathCompile = (path: string) => {
  const { params } = route
  const toPath = compile(path)
  return toPath(params)
}
const handelLink = (item: any) => {
  const { redirect, path } = item
  if (redirect) {
    router.push(redirect).catch(err => {
      console.warn(err)
    })
    return
  }
  router.push(pathCompile(path)).catch(err => {
    console.warn(err)
  })
}

</script>

<style lang="scss" scoped>
.el-breadcrumb__inner,
.el-breadcrumb__inner a {
  font-weight: 400 !important;
}

.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
