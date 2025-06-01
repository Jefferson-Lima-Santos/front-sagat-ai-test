import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const myCustomTheme = {
  dark: false,
  colors: {
    primary: '#42b983',
    secondary: '#36996b',
    accent: '#4ade80',
    error: '#e53e3e',
    info: '#3291FF',
    success: '#42b983',
    warning: '#f5a623',
    background: '#f8fafc'
  }
}

export const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'myCustomTheme',
    themes: {
      myCustomTheme
    }
  }
})
