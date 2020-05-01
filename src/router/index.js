import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'main',
    redirect: '/page/1'
  },
  {
    path: '/page/:pageNumber',
    name: 'TaskList',
    component: () => import('../views/TaskList.vue')
  },
  {
    path: '/edit/:key',
    name: 'TaskEdit',
    component: () => import('../views/TaskEdit.vue')
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router