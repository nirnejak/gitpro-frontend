import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

import { lightTheme } from './config'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
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
        console.log("here0")
        if (localStorage.jwtToken) {
          console.log("here1")
          next()
        } else {
          if (to.query.token) {
            localStorage.login = to.query.login
            localStorage.jwtToken = to.query.token
            console.log("here2")
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
        if (localStorage.jwtToken) next()
        else next({ path: '/login' })
      }
    },
    {
      path: '/collaborators/:login',
      name: 'collaborator',
      component: () => import('./views/CollaboratorDetails.vue'),
      beforeEnter: (to, from, next) => {
        if (localStorage.jwtToken) next()
        else next({ path: '/login' })
      }
    },
    {
      path: '/repositories',
      name: 'repository',
      component: () => import('./views/Repositories.vue'),
      beforeEnter: (to, from, next) => {
        if (localStorage.jwtToken) next()
        else next({ path: '/login' })
      }
    },
    {
      path: '/repositories/:owner/:name',
      name: 'repositories',
      component: () => import('./views/RepositoryDetails.vue'),
      beforeEnter: (to, from, next) => {
        if (localStorage.jwtToken) next()
        else next({ path: '/login' })
      }
    },
    {
      path: '/activities',
      name: 'activities',
      component: () => import('./views/Activities.vue'),
      beforeEnter: (to, from, next) => {
        if (localStorage.jwtToken) next()
        else next({ path: '/login' })
      }
    },
    {
      path: '/teams',
      name: 'teams',
      component: () => import('./views/Teams.vue'),
      beforeEnter: (to, from, next) => {
        if (localStorage.jwtToken) next()
        else next({ path: '/login' })
      }
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('./views/Settings.vue'),
      beforeEnter: (to, from, next) => {
        if (localStorage.jwtToken) next()
        else next({ path: '/login' })
      }
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
