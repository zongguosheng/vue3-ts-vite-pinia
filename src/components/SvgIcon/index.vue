<template>
  <svg aria-hidden="true" class="svg-icon svg-fill" :width="props.size" :height="props.size">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue'
const props = defineProps({
  prefix: {
    type: String,
    default: 'icon'
  },
  name: {
    type: String,
    required: true
  },

  size: {
    type: String,
    default: '1em'
  }
})
const symbolId = computed(() => `#${props.prefix}-${props.name}`)

</script>

<style lang="scss">
.svg-fill {
  fill: currentColor;
  stroke: none;
}
</style>
