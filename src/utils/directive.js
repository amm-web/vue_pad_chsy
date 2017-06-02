/**
 * 功能：自定义指令
 */
import Vue from 'vue';

/**
 * 自定义指令：响应android返回键
 * 使用：
 * v-onback="callback"
 */
Vue.directive('onback', {
  bind: function (el, binding, vnode, oldVnod) {
    //准备工作：注册返回键监听事件
    vue.$store.dispatch('REGISTER_ATV_EVENT', {event_name: 'onBackPressed', callback: binding.value});
  },

  update: function () {
    //值更新时的工作
    //也会以初始值为参数调用一次
  },

  unbind: function (el, binding, vnode, oldVnod) {
    //清理工作：注销返回键监听事件
    vue.$store.dispatch('UNREGISTER_ATV_EVENT', {event_name: 'onBackPressed', callback: binding.value});
  }
});

/**
 * 自定义指令：点击元素外面才会触发的事件
 * 使用：
 * v-click-outside="callback"
 */
Vue.directive('click-outside', {
  bind: function (el, binding, vNode) {
    // Provided expression must evaluate to a function.
    if (typeof binding.value !== 'function') {
      const compName = vNode.context.name;
      let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`;
      if (compName) {
        warn += `Found in component '${compName}'`;
      }
      console.warn(warn);
    }
    // Define Handler and cache it on the element
    const bubble = binding.modifiers.bubble;
    const handler = (e) => {
      if (bubble || (!el.contains(e.target) && el !== e.target)) {
        binding.value(e);
      }
    }
    el.__vueClickOutside__ = handler;

    // add Event Listeners
    setTimeout(()=>{document.addEventListener('click', handler)},500);//延迟添加事件：el被v-if限制下，外界点击显示时会触发回调handler
  },

  unbind: function (el, binding) {
    // Remove Event Listeners
    document.removeEventListener('click', el.__vueClickOutside__);
    el.__vueClickOutside__ = null;
  }
});


