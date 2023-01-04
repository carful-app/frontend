import { ApolloClient, ApolloLink, concat, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { useCookies } from '@vueuse/integrations/useCookies'

// HTTP connection to the API
const httpLink = createHttpLink({
  uri: 'http://api.carful.local/graphql',
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

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache,
})
