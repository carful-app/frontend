import App from './App.vue'

const pinia = createPinia()

import '@/assets/styles/global.sass'
const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App),
})
  .use(router)
  .use(pinia)

app.mount('#app')

import 'bootstrap'
