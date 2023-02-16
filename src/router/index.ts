import LoginPage from '@/views/LoginPage.vue'
import HomePage from '@/views/HomePage.vue'

const router = createRouter({
  routes: [
    {
      path: '/auth',
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

let isSetCSRFCookie = false

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  if (!isSetCSRFCookie) {
    await authStore.getCSRFCookie()
    isSetCSRFCookie = true
  }

  if (authStore.isEmptyUser) {
    authStore.fetchAuthUser()
  }

  next()
})

export default router
