import axios from 'axios'
import * as Sentry from '@sentry/browser'

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
        console.log(`${error.response.status} Error`)
        window.location.href = '/logout/'
      } else if (error.response.status === 404) {
        if (process.env.NODE_ENV === 'production' && navigator.onLine) {
          Sentry.captureException(error)
          localStorage.errorMessage = error.response.data.message
          // window.location.href = `/error/${error.response.status}`
        } else {
          if (__VUE_DEVTOOLS_TOAST__) __VUE_DEVTOOLS_TOAST__(error.response.data.message || '404 Not Found', 'error')
        }
      } else {
        if (process.env.NODE_ENV === 'production' && navigator.onLine) {
          Sentry.captureException(error)
          if (error.response.status.toString().startsWith('5')) {
            localStorage.errorMessage = error.response.data.message
            window.location.href = `/error/${error.response.status}`
          }
        } else {
          if (__VUE_DEVTOOLS_TOAST__) __VUE_DEVTOOLS_TOAST__(error.response.data.message, 'error')
        }
      }
    }
    if (error.message === 'Network Error' && process.env.NODE_ENV === 'production') {
      Sentry.captureException(error)
      if (__VUE_DEVTOOLS_TOAST__) __VUE_DEVTOOLS_TOAST__(error.message, 'error')
      window.location.href = '/error/0'
    }
    if (error.code === 'ECONNABORTED') {
      Sentry.captureException(error)
      localStorage.errorMessage = 'Request Timeout'
      window.location.href = '/error/1'
      if (__VUE_DEVTOOLS_TOAST__) __VUE_DEVTOOLS_TOAST__('Request Timeout', 'error')
    }
    return Promise.reject(error)
  }
)

export default axios
