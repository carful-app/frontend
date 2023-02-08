import './style.css'
import App from './App.vue'

const pinia = createPinia()

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faBars } from '@fortawesome/free-solid-svg-icons'

library.add(faBars)

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App),
  components: {
    FontAwesomeIcon,
  },
})
  .use(router)
  .use(pinia)

app.mount('#app')
