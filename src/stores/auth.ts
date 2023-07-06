import { useCookies } from '@vueuse/integrations/useCookies'

provideApolloClient(apolloClient)

export const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN_NAME

export const useAuthStore = defineStore('auth', () => {
  const user = reactive<User>({
    id: 0,
    email: '',
    name: '',
    avatar: '',
    isComplete: false,
    stripe_id: '',
    balance: 0,
  })
  const isEmptyUser = computed(() => !user.name || !user.email)
  const fetchAuthUserAttempted = ref(false)
  const fetchAuthUser = async () => {
    await new Promise((resolve, _) => {
      if (fetchAuthUserAttempted.value) {
        resolve(true)
        return
      }

      const { onResult, onError } = useQuery(AUTH_USER_QUERY)

      onResult((result) => {
        if (!result.loading) {
          const { me } = result.data

          user.id = me.id
          user.name = me.name
          user.email = me.email
          user.isComplete = me.isComplete
          user.stripe_id = me.stripe_id
          user.balance = me.balance

          if (me.providers.length > 0) {
            user.avatar = me.providers[0].avatar
          } else {
            user.avatar = ''
          }

          resolve(true)
          fetchAuthUserAttempted.value = true
        }
      })

      onError(() => {
        resolve(false)
        fetchAuthUserAttempted.value = true
      })
    })
  }

  const getCSRFCookie = async () => {
    const cookies = useCookies(['XSRF-TOKEN'], { autoUpdateDependencies: false })
    if (!cookies.get('XSRF-TOKEN')) {
      await fetch(`${import.meta.env.VITE_API_URL}/sanctum/csrf-cookie`, {
        credentials: 'include',
      })
        .then((response) => {
          if (response.ok) {
            return response
          }
          throw new Error('Error setting XSRF-TOKEN cookie')
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }

  const getLoginMutation = () => {
    const { onDone, mutate, onError, loading } = useMutation(LOGIN_MUTATION, {
      update: (cache, { data: { login } }) => {
        cache.writeQuery({
          query: AUTH_USER_QUERY,
          data: {
            me: login,
          },
        })
      },
    })

    onDone(() => {
      if (user.isComplete) {
        router.push({ name: 'home' })
      } else {
        router.push({ name: 'choose-plan' })
      }
    })

    return {
      mutate,
      loading,
      onError,
    }
  }

  const getRegisterMutation = () => {
    const { onDone, mutate, onError, loading } = useMutation(REGISTER_MUTATION, {
      update: (cache, { data: { register } }) => {
        cache.writeQuery({
          query: AUTH_USER_QUERY,
          data: {
            me: register,
          },
        })
      },
    })

    onDone(() => {
      router.push({ name: 'choose-plan' })
    })

    return {
      mutate,
      loading,
      onError,
    }
  }

  const getLogoutMutation = () => {
    const { mutate, onDone } = useMutation(LOGOUT_MUTATION, {
      update: (cache) => {
        cache.writeQuery({
          query: AUTH_USER_QUERY,
          data: {
            me: {
              id: 0,
              name: '',
              email: '',
              providers: [],
              isComplete: false,
              stripe_id: '',
              balance: 0,
            },
          },
        })
      },
    })

    onDone(() => {
      useCarStore().$reset()
      useParkingStore().$reset()

      router.push({ name: 'login' })
    })

    return {
      mutate,
    }
  }

  const socialLogin = (provider: Provider, host?: string) => {
    window.location.href = `${host ?? import.meta.env.VITE_API_URL}/auth/${provider}`
  }

  return {
    user,

    isEmptyUser,

    socialLogin,
    getLoginMutation,
    getRegisterMutation,
    fetchAuthUser,

    getLogoutMutation,

    getCSRFCookie,
  }
})

export const AUTH_USER_QUERY = gql`
  query getAuthUser {
    me {
      id
      name
      email
      providers {
        avatar
      }
      isComplete
      stripe_id
      balance
    }
  }
`

const LOGIN_MUTATION = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      id
      name
      email
      providers {
        avatar
      }
      isComplete
      stripe_id
      balance
    }
  }
`

const LOGOUT_MUTATION = gql`
  mutation logout {
    logout {
      id
      name
    }
  }
`

const REGISTER_MUTATION = gql`
  mutation register($input: RegisterInput!) {
    register(input: $input) {
      id
      name
      email
      providers {
        avatar
      }
      isComplete
      stripe_id
      balance
    }
  }
`

export interface User {
  id: number
  email: string
  name: string
  avatar: string
  isComplete: boolean
  stripe_id: string
  balance: number
}

type Provider = string
