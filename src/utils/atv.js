/**
 * 功能：android与vue桥梁
 */

/**
 * android向vue传递事件
 * @param event_name 事件名称 类型：String
 * @param event_params 事件参数 类型：Object{}
 */
export const android_to_vue = (event_name, event_params) => {
  //分发事件，交由store处理
  vue.$store.dispatch('ANDROID_TO_VUE',{event_name, event_params});
}

window.android_to_vue = android_to_vue;
