<template>
  <v-container>
    <h1>Uitloggen...</h1>
  </v-container>
</template>

<script>
import keycloak from '@/keycloak.js'

export default {
  mounted() {
    localStorage.setItem('vue-token', '')
    localStorage.setItem('vue-refresh-token', '')
    console.log('window.location.origin: ')
    console.log(window.location.origin)
    console.log('localStorage: ')
    console.log(localStorage.getItem('vue-token'))
    console.log(localStorage.getItem('vue-refresh-token'))

    // // Callback logica
    keycloak
      .logout({
        redirectUri: window.location.origin + '/', // Na uitloggen, terug naar de root (homescherm)
      })
      .catch((err) => {
        console.error('Fout bij uitloggen:', err)
      })
  },
}
</script>
