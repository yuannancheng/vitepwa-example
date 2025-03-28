<script setup lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { ref } from 'vue'

const { updateServiceWorker } = useRegisterSW({
  onNeedRefresh() {
    console.log('新版本可用')
    hasUpdate.value = true
  },
})

const hasUpdate = ref(false)
const handleUpdate = () => {
  console.log('用户点击更新 PWA')
  hasUpdate.value = false
  updateServiceWorker()
}
</script>

<template>
  <template v-if="hasUpdate">
    <span>发现新版本，是否立即更新？</span>
    <button @click="handleUpdate">更新</button>
  </template>
</template>
