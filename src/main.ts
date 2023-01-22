import './style.css'
import App from './App.vue'

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
