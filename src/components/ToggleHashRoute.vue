<script setup lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { onMounted, onUnmounted, ref } from 'vue'

const { updateServiceWorker, needRefresh } = useRegisterSW()

const toggleHashRoute = () => {
  window.location.hash = window.location.hash === '#/xxx' ? '#/' : '#/xxx'
}

const currentRoute = ref(window.location.hash)
const handleRouteChange = () => {
  currentRoute.value = window.location.hash

  // 切换路由后如果有更新就执行更新
  if (needRefresh.value) {
    updateServiceWorker()
  }
}

onMounted(() => {
  // 模拟路由后置钩子
  window.addEventListener('hashchange', handleRouteChange)
})

onUnmounted(() => {
  window.removeEventListener('hashchange', handleRouteChange)
})
</script>

<template>
  <div>
    <div>当前路由：{{ currentRoute }}</div>
    <button @click="toggleHashRoute">切换路由</button>
  </div>
</template>

<style scoped></style>
