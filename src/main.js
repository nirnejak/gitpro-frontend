import Vue from 'vue'
import moment from 'moment'
import Multiselect from 'vue-multiselect'
import VCalendar from 'v-calendar'
import VueScrollTo from 'vue-scrollto'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'

import Message from 'vue-m-message'

import 'circular-std'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import 'bulma/css/bulma.css'

Sentry.init({
  dns: 'https://6b54e15a63de435681f11ef35cf13b10@sentry.io/1766629',
  integrations: [new Integrations.Vue({ Vue, attachProps: true })]
})

Vue.config.productionTip = false
Vue.use(Message)
Vue.use(VCalendar)
Vue.use(VueScrollTo)
Vue.component('multiselect', Multiselect)

Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).format('DD MMM YYYY')
  }
})

Vue.filter('fromNow', function (value) {
  if (value) {
    return moment(String(value), 'DD MMM YYYY').fromNow()
  }
})

function gtag() { dataLayer.push(arguments) }

if (process.env.NODE_ENV === 'production' && !window.location.href.includes('dashboard?')) {
  window.dataLayer = window.dataLayer || []
  gtag('js', new Date())

  gtag('config', 'UA-150741640-1')
}

new Vue({
  router,
  store,
  render: h => h(App),
  mounted: () => document.dispatchEvent(new Event("x-app-rendered")),
}).$mount('#app')