import App from './App.vue'

const pinia = createPinia()

import '@/assets/styles/global.sass'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
  faBars,
  faEnvelope,
  faLock,
  faEye,
  faLocationCrosshairs,
  faUser,
  faAngleRight,
  faCar,
  faPlus,
  faHashtag,
  faTrashAlt,
  faPen,
  faGlobe,
  faCaretDown,
  faCaretUp,
} from '@fortawesome/free-solid-svg-icons'
import { faUser as faUserRegular, faClock, faCreditCard, faMap } from '@fortawesome/free-regular-svg-icons'
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons'

library.add(
  faBars,
  faUser,
  faUserRegular,
  faEnvelope,
  faLock,
  faEye,
  faGoogle,
  faFacebook,
  faLocationCrosshairs,
  faAngleRight,
  faCar,
  faClock,
  faCreditCard,
  faPlus,
  faHashtag,
  faMap,
  faTrashAlt,
  faPen,
  faGlobe,
  faCaretDown,
  faCaretUp
)

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App),
})
  .use(router)
  .use(pinia)
  .use(i18n)
  .component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')

import 'bootstrap'
import 'animate.css'
