import Vue from 'vue'
import VueRouter from 'vue-router'
import TaskList from '../views/TaskList.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'TaskList',
    component: TaskList
  },
  {
    path: '/TaskEdit/:id',
    name: 'TaskEdit',
    component: () => import('../views/TaskEdit.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router