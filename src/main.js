import Vue from 'vue'; // 引入Vue库
import App from './App.vue'; // 引入根组件文件（通常是单文件组件）
import router from './router'; // 引入路由配置（如果需要）
import store from "./store"; 

new Vue({ // 创建Vue实例并挂载到DOM元素上（通常是body标签）
  router, // 如果使用了路由则传入router配置对象（如果需要）
  store,
  render: h => h(App) // 渲染根组件App（通常是单文件组件）
}).$mount('#app'); // 将Vue实例挂载到页面上id为app的元素上（如果需要）