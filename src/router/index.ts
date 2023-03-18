const HomeLayout = () => import('@/views/layouts/HomeLayout.vue')

// auth pages
const LoginPage = () => import('@/views/auth/LoginPage.vue')
const RegisterPage = () => import('@/views/auth/RegisterPage.vue')

// pay
const PayButtonPage = () => import('@/views/pay/PayButtonPage.vue')
const SelectPage = () => import('@/views/pay/SelectPage.vue')
const SelectCarPage = () => import('@/views/pay/SelectCarPage.vue')
const CreateCarPage = () => import('@/views/pay/CreateCarPage.vue')

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
              component: SelectPage,
              children: [
                {
                  path: 'car',
                  name: 'select-car',
                  component: SelectCarPage,
                  children: [
                    {
                      path: 'create',
                      name: 'create-car',
                      component: CreateCarPage,
                    },
                  ],
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
