import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/views/LoginPage.vue'

export default createRouter({
  routes: [
    {
      path: '/auth/:provider?',
      name: 'auth',
      component: LoginPage,
    },
  ],
  history: createWebHistory(),
})
