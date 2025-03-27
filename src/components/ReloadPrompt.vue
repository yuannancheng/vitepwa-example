<script setup lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue'

const { updateServiceWorker } = useRegisterSW({
  onNeedRefresh() {
    console.log('新版本可用')
    if (window.confirm('发现新版本，是否立即更新？')) {
      console.log('用户同意更新 PWA')
      updateServiceWorker()
    } else {
      console.log('用户取消更新 PWA')
    }
  },
})
</script>
