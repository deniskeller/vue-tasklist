import Vue from 'vue'
import VueRouter from 'vue-router'
import TaskList from '../views/TaskList.vue'
import TaskEdit from '../views/TaskEdit.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'main',
    redirect: '/page/1'
  },
  {
    path: '/page/:pageNumber',
    name: 'TaskList',
    component: TaskList
  },
  {
    path: '/edit/:key',
    name: 'TaskEdit',
    component: TaskEdit
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router