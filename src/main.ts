import './assets/global.css'

import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Lara from './presets/lara'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(PrimeVue, {
  unstyled: true,
  pt: Lara
}),
  app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin)

app.mount('#app')
