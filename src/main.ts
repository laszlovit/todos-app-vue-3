import './assets/global.css'

import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Lara from '@/presets/lara'
import { VueQueryPlugin, type VueQueryPluginOptions } from '@tanstack/vue-query'
import { createPinia } from 'pinia'

const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 0
      }
    }
  }
}

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(PrimeVue, {
  unstyled: true,
  pt: Lara
}),
  app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin, vueQueryPluginOptions)

app.mount('#app')
