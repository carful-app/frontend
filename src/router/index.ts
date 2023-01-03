import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/views/LoginPage.vue'
import HomePage from '@/views/HomePage.vue'

const router = createRouter({
  routes: [
    {
      path: '/auth/:provider?',
      name: 'auth',
      component: LoginPage,
    },
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
  ],
  history: createWebHistory(),
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'auth') {
    const accessTokenName = import.meta.env.VITE_ACCESS_TOKEN_NAME
    const token = localStorage.getItem(accessTokenName)

    if (!token) {
      next({ name: 'auth' })
      return
    }
  }

  next()
})

export default router
