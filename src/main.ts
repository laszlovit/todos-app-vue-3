import './assets/global.css'
import App from './App.vue'
import router from './router'
import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
// @ts-ignore
import Lara from '@/presets/lara'
import { VueQueryPlugin, type VueQueryPluginOptions } from '@tanstack/vue-query'
import { createPinia } from 'pinia'
import { VueFire, VueFireAuth } from 'vuefire'
// @ts-ignore
import { firebaseApp } from '@/firebase.js'

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

const app = createApp(App)

app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()]
})

app.use(PrimeVue, {
  unstyled: true,
  pt: Lara
})

app.use(createPinia())

app.use(router)

app.use(VueQueryPlugin, vueQueryPluginOptions)

app.mount('#app')
