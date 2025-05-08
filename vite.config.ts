import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import Icons from 'unplugin-icons/vite'
import vueDevTools from 'vite-plugin-vue-devtools'
export default defineConfig({
  server: {
    port: 5007
  },
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  plugins: [
    vue(),
    Icons({ compiler: 'vue3', autoInstall: true }) as any,
    vueDevTools()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  },
  define: {
    __VUE_PROD_DEVTOOLS__: true,
  },
  optimizeDeps: {
    //exclude: ["@ffmpeg/ffmpeg", "@ffmpeg/util"],
    //include: ['nsfwjs', '@tensorflow/tfjs'],
  },
  worker: {
    format: 'es',
  },
})