import { useCookies } from '@vueuse/integrations/useCookies'

// HTTP connection to the API
const httpLink = createHttpLink({
  uri: `${import.meta.env.VITE_API_URL}/graphql`,
  credentials: 'include',
  headers: {
    Accept: 'application/json',
  },
})

const authMiddleware = new ApolloLink((operation, forward) => {
  const cookies = useCookies(['XSRF-TOKEN'], { autoUpdateDependencies: false })
  const token = cookies.get('XSRF-TOKEN')
  const oldContext = operation.getContext()

  if (token) {
    operation.setContext({
      headers: {
        'X-XSRF-TOKEN': token,
        ...oldContext.headers,
      },
    })
  }

  return forward(operation)
})

const localeMiddleware = new ApolloLink((operation, forward) => {
  const localStorageLocale = useLocalStorage('locale', import.meta.env.VITE_DEFAULT_LOCALE)
  const oldContext = operation.getContext()

  operation.setContext({
    headers: {
      'Accept-Language': localStorageLocale.value,
      ...oldContext.headers,
    },
  })

  return forward(operation)
})

// Cache implementation
const cache = new InMemoryCache()

const isProd = import.meta.env.PROD

if (isProd) {
  const SCHEMA_VERSION = Math.floor(Math.random() * 1000000).toString()
  const SCHEMA_VERSION_KEY = 'apollo-schema-version'

  const persistor = new CachePersistor({
    cache,
    storage: new LocalStorageWrapper(window.localStorage),
  })

  const currentVersion = window.localStorage.getItem(SCHEMA_VERSION_KEY)

  if (currentVersion === SCHEMA_VERSION) {
    await persistor.restore()
  } else {
    await persistor.purge()
    window.localStorage.setItem(SCHEMA_VERSION_KEY, SCHEMA_VERSION)
  }
}

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: from([localeMiddleware, authMiddleware, httpLink]),
  cache,
})
