import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

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
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('./views/Dashboard.vue')
    },
    {
      path: '/collaborators',
      name: 'collaborators',
      component: () => import('./views/Collaborators.vue')
    },
    {
      path: '/repositories',
      name: 'repositories',
      component: () => import('./views/Repositories.vue')
    },
    {
      path: '/teams',
      name: 'teams',
      component: () => import('./views/Teams.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('./views/Settings.vue')
    }
  ]
})
