import { useCookies } from '@vueuse/integrations/useCookies'

provideApolloClient(apolloClient)

export const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN_NAME

export const useAuthStore = defineStore('auth', () => {
  const user = reactive<User>({
    email: '',
    name: '',
    avatar: '',
  })
  const isSetCSRFCookie = ref(false)

  const isEmptyUser = computed(() => !user.name || !user.email || !user.avatar)

  const getCSRFCookie = async () => {
    const cookies = useCookies(['XSRF-TOKEN'], { autoUpdateDependencies: false })
    if (!cookies.get('XSRF-TOKEN') && !isSetCSRFCookie.value) {
      await fetch(`${import.meta.env.VITE_API_URL}/sanctum/csrf-cookie`, {
        credentials: 'include',
      }).then((response) => {
        if (response.ok) {
          isSetCSRFCookie.value = true
          return response
        }
        throw new Error('Error setting XSRF-TOKEN cookie')
      })
    }
  }

  const socialLogin = (provider: Provider, host?: string) => {
    // getCSRFCookie()

    window.location.href = `${host ?? import.meta.env.VITE_API_URL}/auth/${provider}`
  }

  const getLoginMutation = () => {
    // getCSRFCookie()

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
      router.push({ name: 'home' })
    })

    onError((error) => {
      console.log('onError', error)
    })

    return {
      mutate,
      loading,
    }
  }

  const fetchAuthUser = () => {
    // getCSRFCookie()

    const { onResult, onError } = useQuery(AUTH_USER_QUERY)

    onResult((result) => {
      if (result) {
        const { me } = result.data
        user.name = me.name
        user.email = me.email
        user.avatar = me.providers[0]?.avatar
      }
    })

    return onError(() => {
      router.push({ name: 'auth' })
    })
  }

  return {
    user,

    isEmptyUser,

    socialLogin,
    getLoginMutation,
    fetchAuthUser,

    getCSRFCookie,
  }
})

const AUTH_USER_QUERY = gql`
  query getAuthUser {
    me {
      name
      email
      providers {
        avatar
      }
    }
  }
`

const LOGIN_MUTATION = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      name
      email
      providers {
        avatar
      }
    }
  }
`

interface User {
  email: string
  name: string
  avatar: string
}

type Provider = string
