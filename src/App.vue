<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ReloadPrompt from './components/ReloadPrompt.vue'
import InstallApp from './components/InstallApp.vue'
import ToggleHashRoute from './components/ToggleHashRoute.vue'

// 预加载其他路由组件
const preloadComponents = [() => import('@/components/TestComponent.vue')]

onMounted(() => {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(
      () => {
        preloadComponents.forEach((item) => item())
      },
      {
        timeout: 2000,
      },
    )
  } else {
    preloadComponents.forEach((item) => item())
  }
})

const version = ref('0.0.22')
</script>

<template>
  <div>当前应用版本：{{ version }}</div>

  <InstallApp />

  <ToggleHashRoute />

  <ReloadPrompt />

  <div>
    <span>运行时资源测试：</span>
    <img style="width: 52px;" src="https://gravatar.com/avatar/e2e8100b129b73e4beb21e6bebd4bf84?size=52" alt="">
  </div>
</template>

<style scoped></style>
