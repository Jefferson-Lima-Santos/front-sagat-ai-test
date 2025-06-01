import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { i18n } from './locales/i18n'
import router from './router'
import { setupInterceptors } from './api/client'
import { useAuthStore } from './stores/auth'
import { vuetify } from './plugins/vuetify'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(vuetify)
app.use(i18n)
app.use(router)

const authStore = useAuthStore(pinia)
setupInterceptors(() => authStore.token)

app.mount('#app')
