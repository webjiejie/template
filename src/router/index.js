import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/index.vue'
import routerconfig from "@/config/config.js"
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    redirect:'/home',
    component: Layout,
    children:[
      {
        path: '/home',
        name: 'Home',
        component: ()=>import("@/views/home")
      },
      {
        path: '/login',
        name: 'login',
        component: ()=>import("@/views/login")
      },
    ]
  },
]

const router = new VueRouter({
  routes,
  base:routerconfig.myrouter + '/',
  mode: 'history', // 设置路由模式为history  hash
})

export default router