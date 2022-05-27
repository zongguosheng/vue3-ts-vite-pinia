import { reactive, computed, nextTick, watch, onBeforeMount, onMounted, onBeforeUnmount, ref } from 'vue'
import { appModule, DeviceType } from '@/stores/modules/app'
import { store } from "@/stores/index"
const WIDTH = 992
const app = appModule(store)
const ResizeMixin = {
  data() {
    return {
    }
  },
  setup() {
    onBeforeMount(() => {
      console.log('onBeforeMount!')
    })
    onMounted(() => {
      console.log('onMounted!')
    })
    onBeforeUnmount(() => {
      console.log('onBeforeUnmount!')
    })
    const isMobile = () => {
      const rect = document.body.getBoundingClientRect()
      return rect.width - 1 < WIDTH
    }
    const resizeHandler = (): void => {
      // console.log(isMobile())
      if (!document.hidden) {
        const isMobiles: any = isMobile()
        app.ToggleDevice(isMobiles ? DeviceType.Mobile : DeviceType.Desktop)
        if (isMobile()) {
          app.CloseSideBar(true)
        }
      }
    }
    return {
      isMobile,
      resizeHandler,
      device: computed(() => app.device),
      sidebar: computed(() => app.sidebar)
    }
  }
}
export default ResizeMixin