import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { i18n } from './locales/i18n'
import router from './router'
import { setupInterceptors } from './api/client'
import { useAuthStore } from './stores/auth'
import { vuetify } from './plugins/vuetify'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura';

// import 'primevue/resources/themes/lara-light-blue/theme.css'
// import 'primevue/resources/primevue.min.css'

// Create app instance
const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(vuetify)
app.use(i18n)
app.use(router)

app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: 'system',
            cssLayer: false
        }
    }
})
const authStore = useAuthStore(pinia)
setupInterceptors(() => authStore.token)

app.mount('#app')
