import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import keycloak from '@/keycloak.js'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/beheer',
      name: 'beheer',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AdminView.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !keycloak.authenticated) {
    keycloak.login() // Stuur gebruikers naar de Keycloak-loginpagina
  } else {
    next()
  }
})

export default router
