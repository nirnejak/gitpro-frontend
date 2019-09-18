import Vue from 'vue'
import moment from 'moment'

import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

import Message from 'vue-m-message'

import 'circular-std'

Vue.config.productionTip = false
Vue.use(Message)

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
