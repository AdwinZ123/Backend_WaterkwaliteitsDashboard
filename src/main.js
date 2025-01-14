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
  .init({
    onLoad: 'login-required',
    checkLoginIframe: false,
    pkceMethod: 'S256', // Optioneel, veiliger met PKCE
    // Poging 2
    // onLoad: 'check-sso',
    // checkLoginIframe: true,
    // checkLoginIframeInterval: 60, // Verhoog de intervaltijd
    // Poging 1
    // onLoad: 'login-required',
    // checkLoginIframe: false, // Probeer het uitschakelen van de iframe-check
    // silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html', // Optioneel
    // pkceMethod: 'S256', // Gebruik PKCE voor veiliger authenticatie
  })
  .then(() => {
    const app = createApp(App)
    app.provide('keycloak', keycloak)
    app.use(router)
    app.use(vuetify)
    //app.use(createPinia()) // If using Pinia
    //app.use(i18n) // If has Multilang
    app.mount('#app')
  })
  .catch((err) => console.error('Keycloak init failed', err))

// const app = createApp(App)

// app.use(router)

// app.use(vuetify)

// app.mount('#app')
