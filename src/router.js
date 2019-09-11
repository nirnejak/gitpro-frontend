import Vue from 'vue'
import Router from 'vue-router'

// import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      // component: Home
      component: () => import('./views/Home.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
      beforeEnter: (to, from, next) => {
        if (localStorage.jwtToken) {
          // TODO: Toast Message - Already Logged In
          next({ path: '/dashboard' })
        } else {
          next()
        }
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('./views/Dashboard.vue'),
      beforeEnter: (to, from, next) => {
        if (localStorage.jwtToken) {
          next()
        } else {
          if (to.query.token) {
            localStorage.login = to.query.login
            localStorage.jwtToken = to.query.token
            next({ path: '/dashboard' })
          } else {
            next({ path: '/login' })
          }
        }
      }
    },
    {
      path: '/collaborators',
      name: 'collaborators',
      component: () => import('./views/Collaborators.vue'),
      beforeEnter: (to, from, next) => {
        if (localStorage.jwtToken) {
          next()
        } else {
          next({ path: '/login' })
        }
      }
    },
    {
      path: '/collaborators/:login',
      name: 'collaborator',
      component: () => import('./views/CollaboratorDetails.vue'),
      beforeEnter: (to, from, next) => {
        if (localStorage.jwtToken) {
          next()
        } else {
          next({ path: '/login' })
        }
      }
    },
    {
      path: '/repositories',
      name: 'repository',
      component: () => import('./views/Repositories.vue'),
      beforeEnter: (to, from, next) => {
        if (localStorage.jwtToken) {
          next()
        } else {
          next({ path: '/login' })
        }
      }
    },
    {
      path: '/repositories/:name',
      name: 'repositories',
      component: () => import('./views/RepositoryDetails.vue'),
      beforeEnter: (to, from, next) => {
        if (localStorage.jwtToken) {
          next()
        } else {
          next({ path: '/login' })
        }
      }
    },
    {
      path: '/teams',
      name: 'teams',
      component: () => import('./views/Teams.vue'),
      beforeEnter: (to, from, next) => {
        if (localStorage.jwtToken) {
          next()
        } else {
          next({ path: '/login' })
        }
      }
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('./views/Settings.vue'),
      beforeEnter: (to, from, next) => {
        if (localStorage.jwtToken) {
          next()
        } else {
          next({ path: '/login' })
        }
      }
    },
    {
      path: '/logout',
      name: 'logout',
      beforeEnter: (to, from, next) => {
        localStorage.removeItem('login')
        localStorage.removeItem('jwtToken')
        localStorage.removeItem('avatar_url')
        next({ path: '/' })
      }
    },
    {
      path: '/error/:code',
      name: 'error',
      component: () => import('./views/Error.vue')
    }
  ]
})
