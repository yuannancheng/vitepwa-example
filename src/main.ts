import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import { setupServicesWorker } from './components/PWA'

createApp(App).mount('#app')

setupServicesWorker()
