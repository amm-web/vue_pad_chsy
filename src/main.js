// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from 'ROUTER/'
import store from 'STORE/'

import './utils/logutil'
import './utils/atv'
import './utils/directive'//导入自定义指令
import Toast from './components/toast';  //吐司
window.toast = Toast; //为window对象绑定toast方法
window.toastDev = process.env.NODE_ENV === "development" ? Toast : () => {}; //仅在开发环境弹出的toast

import modal from './components/modal/index';
import md_bg from './components/modal/md_bg';
//公用组件可以在此注册，此后再使用时就不需要导包
Vue.component('modal', modal);
Vue.component('md_bg', md_bg);

// 公式加载
Vue.prototype.loadMathJax = function (callback) {
  this.$nextTick(() => {
    MathJax.Hub.Queue(["Typeset", MathJax.Hub], callback);
  })
}

if (process.env.NODE_ENV == "development") { //开发模式下可在devtool中timeline监测性能
  Vue.config.performance = true;  //traces component init, compile, render and patch time in the browser devtool timeline
} else {  //Vue捕获到的异常，bugly无法捕获，因此需手动上传异常
  Vue.config.errorHandler = function (err, vm) {  //Vue 2.2.0组件生命周期内错误不会导致整个应用无法使用，可在此捕获异常
    console.log(err);
    console.log(vm);
    if (typeof(androidJs) != 'undefined') {
      androidJs.postError(err.toString() + '>>>' + vm.toString());
    }
  }
}

window.vue = new Vue({
  router,
  store,
  render: h => h(App)
});
window.vue.$mount('#app');




