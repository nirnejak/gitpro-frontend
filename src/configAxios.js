import axios from 'axios'

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
      if (error.response.status === 401) {
        // TODO: Logout User
        console.log('401 Unauthorized')
      } else if (error.response.status === 404) {
        if (process.env.NODE_ENV === 'production' && navigator.onLine) {
          // TODO: Capture Error through sentry
          window.location.href = `/error/${error.response.status}`
        } else {
          // TODO: Show Error Toast Message
          console.log('404 Not Found')
        }
      } else {
        if (process.env.NODE_ENV === 'production' && navigator.onLine) {
          // TODO: Capture Error through sentry
          if (error.response.status.toString().startsWith('5')) {
            window.location.href = `/error/${error.response.status}`
          }
        } else {
          const errors = Object.keys(error.response.data.errors)
          errors.map((item) => {
            // TODO: Show in Toast Message
            // `${title(item)}: ${error.response.data.errors[item]}`
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
