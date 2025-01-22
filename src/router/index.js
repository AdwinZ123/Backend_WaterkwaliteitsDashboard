import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AdminView from '@/views/AdminView.vue'
import LoginView from '@/views/LoginView.vue'
import LogoutView from '@/views/LogoutView.vue'
import keycloak from '@/keycloak.js'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      alias: '/home',
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: LoginView,
      meta: { requiresAuth: true },
    },
    {
      path: '/beheer',
      name: 'beheer',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: AdminView,
      meta: { requiresAuth: true, roles: ['admin'] },
    },
    {
      path: '/logout',
      name: 'uitloggen',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: LogoutView,
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !keycloak.authenticated) {
    keycloak
      .login()
      .then(() => {
        window.location.href = '/'
      })
      .catch((error) => {
        console.error('Fout tijdens de Keycloak callback', error)
      }) // Stuur gebruikers naar de Keycloak-loginpagina
  } else if (
    to.meta.roles &&
    !to.meta.roles.some((role) => keycloak.tokenParsed?.realm_access?.roles?.includes(role))
  ) {
    // Geen toegang
    alert('Je hebt geen toegang tot deze pagina.')
    next('/')
  } else {
    next()
  }
})

export default router
