<template>
  <v-layout class="rounded rounded-md">
    <!-- Top navigatie menu -->
    <v-app-bar flat>
      <v-container class="mx-auto d-flex align-center justify-center">
        <RouterLink style="text-decoration: none; color: inherit" to="/"
          ><v-btn variant="text">Home</v-btn></RouterLink
        >
        <RouterLink v-if="isAdmin" style="text-decoration: none; color: inherit" to="/beheer"
          ><v-btn variant="text">Beheer</v-btn></RouterLink
        >

        <v-spacer></v-spacer>

        <RouterLink style="text-decoration: none; color: inherit" to="/logout"
          ><v-btn variant="text">Uitloggen</v-btn></RouterLink
        >
      </v-container>
    </v-app-bar>

    <!-- Main body met alle pagina's erin -->
    <v-main>
      <!-- style="min-height: 300px; margin: 15px" class="h-screen" -->
      <RouterView />
    </v-main>
  </v-layout>
</template>

<script>
import keycloak from '@/keycloak.js'
import { RouterLink, RouterView } from 'vue-router'

export default {
  components: [RouterLink, RouterView],
  computed: {
    isAdmin() {
      return keycloak.tokenParsed?.realm_access?.roles?.includes('admin')
    },
  },
}
</script>
