import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '../views/index.vue'
import routerconfig from "@/config/config"
Vue.use(VueRouter)
const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect:'/home',
    component: Layout,
    children:[
      {
        path: '/home',
        name: 'Home',
        component: ()=>import(/* webpackChunkName: "about" */ "@/views/home/index.vue")
      },
      {
        path: '/login',
        name: 'login',
        component: ()=>import(/* webpackChunkName: "about" */ "@/views/login/index.vue")
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