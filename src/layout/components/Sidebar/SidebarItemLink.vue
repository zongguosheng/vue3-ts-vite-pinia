<template>
  <a
    v-if="isExternal(to)"
    :href="to"
    target="_blank"
    rel="noopener"
  >
    <slot />
  </a>
  <router-link
    v-else
    :to="to"
  >
    <slot />
  </router-link>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import { isExternal } from '@/utils/validate'
const props = defineProps({
  to: {
    type: String,
    default: ''
  },
  name: {
    type: Number,
    default: null
  }
})
</script>
