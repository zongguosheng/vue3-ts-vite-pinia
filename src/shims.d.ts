/* eslint-disable */
declare module '*.vue' {
  // import { defineComponent, DefineComponent } from 'vue'
  // const component: ReturnType<typeof defineComponent>;
  // export default component;

  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
  
  // import Vue from 'vue'
  // export default Vue
  import _ from 'lodash'
  // import { Api } from '@/api'
  global {
    const _: _
    // const Api$: Api
  }
}

declare module 'element-plus/lib/locale/lang/*' {
  export const elementLocale: any
}

interface ImportMetaEnv {
	readonly VITE_BASE_API: string
} 

interface ImportMeta {
  readonly env: ImportMetaEnv
}


// TODO: remove this part after vue-count-to has its typescript file
declare module 'path-to-regexp'
declare module 'js-cookie'
// declare module 'fuse.js'

// TODO: remove this part after vue2-dropzone has its typescript file
// declare module 'vue2-dropzone'

// TODO: remove this part after vue-image-crop-upload has its typescript file
// declare module 'vue-image-crop-upload'
