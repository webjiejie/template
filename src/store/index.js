import Vue from "vue";
import Vuex from "vuex";

const files = require.context('./modules', true, /\.js$/);

//自动获取modules文件夹下的文件加入modules
const modules = {};
files.keys().forEach(key => {
    let k= key.replace(/(\.\/|\.js)/g, '')
    modules[k] = files(key).default
})

Vue.use(Vuex);
// 集中管理多个组件共享的数据
export default new Vuex.Store({
  // 共享数据
  state: {
    name: "cyj",
  },
  getters: {},
  // 修改共享数据只能通过mutation实现，必须是同步操作
  mutations: {
    // setName(state, name) {
    //   state.name = name;
    // },
  },
  // 通过actions可以调用mutations，在actions中可以讲行异步操作
  actions: {
    // 通过context上下文参数，才能调用mutations中的对象
    // setNameByAxios(context) {
    //   axios({
    //     url: "/api/admin/employee/login",
    //     method: "post",
    //     data: {
    //       username: "admin",
    //       password: "123456",
    //     },
    //   })
    //     .then((res) => {
    //       if (res.data.code == 1) {
    //         context.commit("setName", res.data.data.name);
    //       }
    //     })
    //     .catch((error) => {
    //       console.error("Error occurred:", error.response);
    //     });
    // },
  },
  modules,
});