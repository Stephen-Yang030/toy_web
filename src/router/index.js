import Vue from 'vue'
import VueRouter from 'vue-router'
import toyMain from '../views/toyMain.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'toyLogin',
    component: () => import('../views/toyLogin.vue'),
  },
  {
    path: '/toyMain',
    name: 'toyMain',
    component: toyMain,
  },
  {
    path: '/root-login',
    name: 'rootLogin',
    component: () => import('../views/rootLogin.vue'),
  },
  {
    path: '/toyManagement',
    name: 'toyManagement',
    component: () => import('../views/managements/toyManagement.vue'),
  },
  {
    path: '/toy-login',
    name: 'ToyLogin',
    component: () => import('../views/toyLogin.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
