
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
//引入具体模块的routes
import login from './map/login'

//添加路径
let routes = [...login];

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  linkActiveClass: 'active',
  routes
});
export default router



