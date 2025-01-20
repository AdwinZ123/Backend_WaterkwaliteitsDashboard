<template>
  <v-container>
    <h1>Inloggen...</h1>
  </v-container>
</template>

<script>
import keycloak from '@/keycloak.js'

export default {
  mounted() {
    // Callback logica
    keycloak
      .login({ redirectUri: window.location.href }) // Zorg ervoor dat de URL correct wordt doorgegeven
      .then(() => {
        this.$router.push('/home')
      })
      .catch((error) => {
        console.error('Fout tijdens de Keycloak callback', error)
      })
  },
}
</script>
