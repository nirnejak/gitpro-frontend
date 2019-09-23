import Vue from 'vue'
import moment from 'moment'
import Multiselect from 'vue-multiselect'
import VCalendar from 'v-calendar'

import { Diff2Html } from 'diff2html';

import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

import Message from 'vue-m-message'

import 'circular-std'
import 'vue-multiselect/dist/vue-multiselect.min.css'

Vue.config.productionTip = false
Vue.use(Message)
Vue.use(VCalendar)
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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
