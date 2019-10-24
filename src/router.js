import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

import { lightTheme } from './config'

Vue.use(Router)

const isAuthenticated = (to, from, next) => {
  if (localStorage.jwtToken) next()
  else next({ path: '/' })
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: (to, from, next) => {
        if (localStorage.jwtToken) {
          next({ path: '/dashboard' })
        } else {
          next()
        }
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
    {
      path: '/faq',
      name: 'faq',
      component: () => import('./views/FAQ.vue')
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
            next({ path: '/' })
          }
        }
      }
    },
    {
      path: '/collaborators',
      name: 'collaborators',
      component: () => import('./views/Collaborators.vue'),
      beforeEnter: isAuthenticated
    },
    {
      path: '/collaborators/:login',
      name: 'collaborator',
      component: () => import('./views/CollaboratorDetails.vue'),
      beforeEnter: isAuthenticated
    },
    {
      path: '/repositories',
      name: 'repository',
      component: () => import('./views/Repositories.vue'),
      beforeEnter: isAuthenticated
    },
    {
      path: '/repositories/:owner/:name',
      name: 'repositories',
      component: () => import('./views/RepositoryDetails.vue'),
      beforeEnter: isAuthenticated
    },
    {
      path: '/activities',
      name: 'activities',
      component: () => import('./views/Activities.vue'),
      beforeEnter: isAuthenticated
    },
    {
      path: '/teams',
      name: 'teams',
      component: () => import('./views/Teams.vue'),
      beforeEnter: isAuthenticated
    },
    {
      path: '/insights',
      name: 'insights',
      component: () => import('./views/Insights.vue'),
      beforeEnter: isAuthenticated
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('./views/Settings.vue'),
      beforeEnter: isAuthenticated
    },
    {
      path: '/logout',
      name: 'logout',
      beforeEnter: (to, from, next) => {
        localStorage.removeItem('login')
        localStorage.removeItem('jwtToken')
        localStorage.removeItem('avatar_url')
        const rootElement = document.querySelector(':root')
        Object.keys(lightTheme).forEach(key => {
          rootElement.style.setProperty(key, lightTheme[key])
        })
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
