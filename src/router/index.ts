import LoginPage from '@/views/LoginPage.vue'
import HomePage from '@/views/HomePage.vue'
import PayButtonPage from '@/views/PayButtonPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'

const router = createRouter({
  routes: [
    {
      path: '/auth/login',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/auth/register',
      name: 'register',
      component: RegisterPage,
    },
    {
      path: '/',
      component: HomePage,
      children: [
        {
          path: '',
          name: 'home',
          component: PayButtonPage,
        },
      ],
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

  if (to?.name !== 'register' && authStore.isEmptyUser) {
    authStore.fetchAuthUser()
  }

  next()
})

export default router
