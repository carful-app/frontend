import { useCookies } from '@vueuse/integrations/useCookies'

// HTTP connection to the API
const httpLink = createHttpLink({
  uri: `${import.meta.env.VITE_API_URL}/graphql`,
  credentials: 'include',
})

const authMiddleware = new ApolloLink((operation, forward) => {
  const cookies = useCookies(['XSRF-TOKEN'], { autoUpdateDependencies: false })

  if (cookies.get('XSRF-TOKEN')) {
    operation.setContext({
      headers: {
        'X-XSRF-TOKEN': cookies.get('XSRF-TOKEN'),
      },
    })
  }

  return forward(operation)
})

// Cache implementation
const cache = new InMemoryCache()

const SCHEMA_VERSION = '1'
const SCHEMA_VERSION_KEY = 'apollo-schema-version'

// const persistor = new CachePersistor({
//   cache,
//   storage: new LocalStorageWrapper(window.localStorage),
// })

// const currentVersion = window.localStorage.getItem(SCHEMA_VERSION_KEY)

// if (currentVersion === SCHEMA_VERSION) {
//   await persistor.restore()
// } else {
//   await persistor.purge()
//   window.localStorage.setItem(SCHEMA_VERSION_KEY, SCHEMA_VERSION)
// }

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache,
})
