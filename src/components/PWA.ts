import { ref } from 'vue'
import { useRegisterSW } from 'virtual:pwa-register/vue'

const setupManifest = () => {
  const host = location.origin
  const basePath = location.pathname

  let link: HTMLLinkElement | null = document.querySelector("link[rel='manifest']")

  if (!link) {
    link = document.createElement('link')
    link.rel = 'manifest'
    document.head.appendChild(link)
  }

  link.href = URL.createObjectURL(
    new Blob(
      [
        JSON.stringify({
          name: 'VitePWA Example',
          short_name: 'VitePWA',
          description: 'VitePWA 示例',
          display: 'standalone',
          start_url: `${host}${basePath}`,
          theme_color: '#41b883',
          background_color: '#ffffff',
          icons: [
            {
              src: `${host}${basePath}logo.png`,
              sizes: '300x300',
              type: 'image/png',
            },
          ],
        }),
      ],
      {
        type: 'application/json',
      },
    ),
  )
}

const updateIntervalTimer = ref<ReturnType<typeof setInterval> | null>(null)
const setUpdateInterval = () => {
  const intervalMS = 10 * 1000 // 自动更新间隔，设置较短时间以便于测试，生产环境需做调整

  useRegisterSW({
    onRegisteredSW(swUrl, r) {
      if (r) {
        if (updateIntervalTimer.value) {
          clearInterval(updateIntervalTimer.value)
        }
        updateIntervalTimer.value = setInterval(async () => {
          console.info('定期检测 PWA 更新')
          if (r.installing || !navigator) return

          if ('connection' in navigator && !navigator.onLine) return

          try {
            const resp = await fetch(swUrl, {
              cache: 'no-store',
              headers: {
                cache: 'no-store',
                'cache-control': 'no-cache',
              },
            })

            if (resp?.status === 200) await r.update()
          } catch (e) {
            console.warn('加载 sw 失败', e)
          }
        }, intervalMS)
      }
    },
  })
}

// 激活已有的 Service Worker
const activateServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker?.getRegistration().then((registration) => {
      if (registration?.waiting) {
        console.info('激活已有的 Service Worker')

        // 监听 controllerchange 事件
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          console.log('新的 Service Worker 已接管控制权')
          window.location.reload() // 立即刷新激活新 SW
        })

        registration.waiting.postMessage({ type: 'SKIP_WAITING' })
      }
    })
  }
}

export const setupServicesWorker = () => {
  setupManifest()

  setUpdateInterval()

  // 激活已有的 Service Worker
  activateServiceWorker()
}
