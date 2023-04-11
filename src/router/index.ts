const HomeLayout = () => import('@/views/layouts/HomeLayout.vue')

// auth pages
const LoginPage = () => import('@/views/auth/LoginPage.vue')
const RegisterPage = () => import('@/views/auth/RegisterPage.vue')
const ChoosePlanPage = () => import('@/views/auth/ChoosePlanPage.vue')

// pay
const PayButtonPage = () => import('@/views/pay/PayButtonPage.vue')
const SelectPage = () => import('@/views/pay/SelectPage.vue')
const SelectCarPage = () => import('@/views/pay/SelectCarPage.vue')
const CreateCarPage = () => import('@/views/pay/CreateCarPage.vue')
const SelectHourPage = () => import('@/views/pay/SelectHourPage.vue')

const router = createRouter({
  routes: [
    {
      path: '/auth/login',
      name: 'login',
      component: LoginPage,
      meta: {
        isPublic: true,
      },
    },
    {
      path: '/auth/register',
      name: 'register',
      component: RegisterPage,
      meta: {
        isPublic: true,
      },
    },
    {
      path: '/auth/choose-plan',
      name: 'choose-plan',
      component: ChoosePlanPage,
      meta: {
        isPublic: true,
      },
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
                {
                  path: 'hour',
                  name: 'select-hour',
                  component: SelectHourPage,
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

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  if (!to?.meta?.isPublic && authStore.isEmptyUser) {
    authStore.fetchAuthUser()
  }

  next()
})

export default router
