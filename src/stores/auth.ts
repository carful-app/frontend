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
  })
  const isEmptyUser = computed(() => !user.name || !user.email)

  const getCSRFCookie = async () => {
    const cookies = useCookies(['XSRF-TOKEN'], { autoUpdateDependencies: false })
    if (!cookies.get('XSRF-TOKEN')) {
      await fetch(`${import.meta.env.VITE_API_URL}/sanctum/csrf-cookie`, {
        credentials: 'include',
      }).then((response) => {
        if (response.ok) {
          return response
        }
        throw new Error('Error setting XSRF-TOKEN cookie')
      })
    }
  }

  const socialLogin = (provider: Provider, host?: string) => {
    window.location.href = `${host ?? import.meta.env.VITE_API_URL}/auth/${provider}`
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

    onError(({ graphQLErrors }) => {
      console.log(graphQLErrors)
    })

    return {
      mutate,
      loading,
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

    onError(({ graphQLErrors }) => {
      console.log(graphQLErrors)
    })

    return {
      mutate,
      loading,
    }
  }

  const fetchAuthUser = async () => {
    await new Promise((resolve, _) => {
      const { onResult, onError } = useQuery(AUTH_USER_QUERY)

      onResult((result) => {
        if (result) {
          const { me } = result.data
          user.id = me.id
          user.name = me.name
          user.email = me.email
          user.isComplete = me.isComplete
          user.stripe_id = me.stripe_id

          if (me.providers.length > 0) {
            user.avatar = me.providers[0].avatar
          } else {
            user.avatar = ''
          }
        }
        resolve(true)
      })

      onError(() => {
        resolve(false)
        router.push({ name: 'login' })
      })
    })
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
            },
          },
        })
      },
    })

    onDone(() => {
      router.push({ name: 'login' })
    })

    return {
      mutate,
    }
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
}

type Provider = string
