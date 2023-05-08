const MapLayout = () => import('@/views/layouts/MapLayout.vue')
const OtherLayout = () => import('@/views/layouts/OtherLayout.vue')

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

// profile
const ProfilePage = () => import('@/views/profile/ProfilePage.vue')

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
      path: '/auth/choose-plan',
      name: 'choose-plan',
      component: ChoosePlanPage,
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore()

        if (authStore.user.isComplete) {
          next({ name: 'home' })
        } else {
          next()
        }
      },
    },
    {
      path: '',
      component: MapLayout,
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
    {
      path: '/:pathMatch(.*)*',
      component: OtherLayout,
      children: [
        {
          path: '/profile',
          name: 'profile',
          component: ProfilePage,
        },
        {
          path: '/:pathMatch(.*)*', // 404
          name: 'not-found',
          component: () => import('@/views/NotFoundPage.vue'),
        },
      ],
    },
  ],
  history: createWebHistory(),
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  if (authStore.isEmptyUser) {
    await authStore.fetchAuthUser()

    if (authStore.user.isComplete || (!authStore.user.isComplete && to.name === 'choose-plan')) {
      next()
    } else {
      next({ name: 'choose-plan' })
    }

    return
  }

  next()
})

export default router
