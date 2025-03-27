<script setup lang="ts">
import { onMounted, ref } from 'vue'

const deferredPrompt = ref<Event | null>(null)
const showInstallPrompt = ref(false)

onMounted(() => {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault() // 阻止默认弹窗
    deferredPrompt.value = e
    showInstallPrompt.value = true
  })
})

const installApp = async () => {
  if (deferredPrompt.value) {
    // @ts-expect-error 非标准事件
    deferredPrompt.value.prompt()
    // @ts-expect-error 非标准事件
    const choiceResult = await deferredPrompt.value.userChoice
    if (choiceResult.outcome === 'accepted') {
      console.log('用户接受了 PWA 安装')
    } else {
      console.log('用户拒绝了 PWA 安装')
    }
    deferredPrompt.value = null
    showInstallPrompt.value = false
  }
}
</script>

<template>
  <template v-if="showInstallPrompt">
    <button @click="installApp">安装</button>
  </template>
</template>

<style scoped></style>
