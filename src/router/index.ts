import HomeLayout from '@/views/layouts/HomeLayout.vue'

// auth pages
import LoginPage from '@/views/auth/LoginPage.vue'
import RegisterPage from '@/views/auth/RegisterPage.vue'

// pay
import PayButtonPage from '@/views/pay/PayButtonPage.vue'
import SelectCardPage from '@/views/pay/SelectCardPage.vue'
import SelectCarPage from '@/views/pay/SelectCarPage.vue'

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
      path: '',
      component: HomeLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: PayButtonPage,
          children: [
            {
              path: '/select',
              name: 'select',
              component: SelectCardPage,
              children: [
                {
                  path: 'car',
                  name: 'car',
                  component: SelectCarPage,
                },
              ],
            },
          ],
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
