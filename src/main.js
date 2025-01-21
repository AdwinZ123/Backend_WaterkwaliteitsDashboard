// import './assets/main.css'
import keycloak from '@/keycloak.js'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Icons
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import { aliases, md } from 'vuetify/iconsets/md'

// Declareer en initialiseer een nieuwe Vuetify object
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'md',
    aliases,
    sets: {
      md,
    },
  },
})

keycloak
  .init({ onLoad: 'login-required', checkLoginIframe: false, pkceMethod: 'S256' })
  .then((auth) => {
    if (!auth) {
      window.location.reload()
    } else {
      // console.info('Authenticated')
      const app = createApp(App)
      app.provide('keycloak', keycloak)
      app.use(router)
      app.use(vuetify)
      app.mount('#app')
      localStorage.setItem('vue-token', keycloak.token)
      localStorage.setItem('vue-refresh-token', keycloak.refreshToken)
      router.replace({ path: '/home' })
    }

    //Token Refresh
    setInterval(() => {
      keycloak
        .updateToken(70)
        .then((refreshed) => {
          if (refreshed) {
            // console.info('Token refreshed' + refreshed)
          } else {
            // console.warn(
            //   'Token not refreshed, valid for ' +
            //     Math.round(
            //       keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000,
            //     ) +
            //     ' seconds',
            // )
          }
        })
        .catch(() => {
          console.error('Failed to refresh token')
        })
    }, 6000)
  })
  .catch(() => {
    router.push('/home')
  })
