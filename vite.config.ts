import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    vueDevTools(),

    VitePWA({
      registerType: 'prompt',
      manifest: false, // 禁用自动生成manifest
      workbox: {
        globPatterns: ['**/*.{css,html,png,svg,ico,json,woff2}'], // 缓存 dist 目录中的资源
        runtimeCaching: [
          {
            urlPattern: /\.js$/, // 让所有 JS 文件走运行时缓存
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'js-runtime-cache',
              expiration: { maxEntries: 50, maxAgeSeconds: 30 * 24 * 60 * 60 },
            },
          },
        ],
      },
      /* 开发环境启用 sw */
      devOptions: {
        enabled: true,
        type: 'module',
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
