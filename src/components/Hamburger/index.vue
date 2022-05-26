<template>
  <div
    :class="[{'is-active': isActive}]"
    @click="toggleClick"
  >
    <svg-icon
      name="hamburger"
      width="20"
      height="20"
    />
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
const emit = defineEmits(['toggle-click', 'update:modelValue'])
const props = defineProps({
  // 多选
  isActive: {
    type: Boolean,
    default: false
  }
})
const toggleClick = () => {
  emit('toggle-click')
}
</script>

<style lang="scss" scoped>
.svg-icon {
  vertical-align: middle;
}

.is-active {
  transform: rotate(180deg);
}
</style>
