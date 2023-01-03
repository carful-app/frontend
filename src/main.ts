import { createApp, provide, h } from 'vue'
import './style.css'
import App from './App.vue'

import { apolloClient } from './apollo'
import { DefaultApolloClient } from '@vue/apollo-composable'

import { createPinia } from 'pinia'

import router from './router'

const pinia = createPinia()

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App),
})
  .use(router)
  .use(pinia)

app.mount('#app')
