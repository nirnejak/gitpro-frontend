import axios from 'axios'
import Vue from 'vue'

if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'https://github-supreme.herokuapp.com'
} else {
  axios.defaults.baseURL = 'http://localhost:5000/api'
}

// export const setAuthToken = jwtToken => {
//   axios.defaults.headers.common['Authorization'] = 'Bearer ' + jwtToken
// }

axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.jwtToken
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 403) {
        // TODO: Logout User
        console.log(`${error.response.status} Error`)
      } else if (error.response.status === 404) {
        if (process.env.NODE_ENV === 'production' && navigator.onLine) {
          // TODO: Capture Error through sentry
          window.location.href = `/error/${error.response.status}`
        } else {
          Vue.message.error({
            message: '404 Not Found',
            position: 'bottom-right',
            showClose: true
          })
        }
      } else {
        if (process.env.NODE_ENV === 'production' && navigator.onLine) {
          // TODO: Capture Error through sentry
          if (error.response.status.toString().startsWith('5')) {
            window.location.href = `/error/${error.response.status}`
          }
        } else {
          error.response.data.errors.map((err) => {
            Vue.message.error({
              message: `${err[0]}: ${err[1]}`,
              position: 'bottom-right',
              showClose: true
            })
          })
        }
      }
    }
    if (error.message === 'Network Error' && process.env.NODE_ENV === 'production') {
      window.location.href = '/error/0'
    }
    if (error.code === 'ECONNABORTED') {
      // TODO: Show "Request Timeout" Toast Message
    }
    return Promise.reject(error)
  }
)

export default axios
