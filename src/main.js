import '@/assets/tailwindSrcCss/output.css' // 引入 tailwindcss 的 css
import 'primevue/resources/themes/aura-light-green/theme.css' // 引入 primevue 的 css
// '@/assets/main.css'
// import '@/assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'

const app = createApp(App)

app.use(createPinia()).use(router).use(PrimeVue)

app.mount('#app')
