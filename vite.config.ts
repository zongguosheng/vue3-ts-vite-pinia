import { fileURLToPath, URL } from 'url'
import { resolve } from 'path';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import VueI18n from '@intlify/vite-plugin-vue-i18n'

// import { loadEnv, createProxy } from "./src/utils/load-env"
// const { VITE_URL, VITE_BASE_URL, VITE_ZIP_NAME } = loadEnv(mode)
const mockServerPort = 9599
// https://vitejs.dev/config/
export default defineConfig({
  base:'./',
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    VueI18n({
      include: resolve(__dirname, './src/lang/**'),
    })
  ],
  logLevel: 'info',
  server: {
    https: false, // 是否开启 https
    open: true, // 是否自动在浏览器打开
    port: 3000, // 端口号
    hmr:true, //开启热更新
    host: "0.0.0.0",
    proxy: {
      "/dev-api": {
        // target: `http://127.0.0.1:${mockServerPort}/mock-api/v1`, // 后台接口
        target: `http://127.0.0.1:9527/mock-api/v1`, // 后台接口
        changeOrigin: true,
        secure: false, // 如果是https接口，需要配置这个参数
        // ws: true, //websocket支持
        rewrite: (path) => path.replace(/^\/dev-api/, ''),
      },
    },
  },
  resolve: {
    alias: {
      // "@":resolve(__dirname,"src"),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@comps': fileURLToPath(new URL('./src/components', import.meta.url)),
      "@images": resolve(__dirname, "src/assets/images"),
    }
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      less: {
        charset: false,
        additionalData: '@import "@/src/assets/styles/global.less";',
      },
      // 引入 var.scss 这样就可以在全局中使用 var.scss中预定义的变量了
      // 给导入的路径最后加上 ;
      scss: {
        additionalData: `@import "@/styles/_variables.scss";\n@import "@/assets/styles/mixin.scss";\n`,
      }
    },
  },
  
})
