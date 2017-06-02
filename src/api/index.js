import Axios from "axios";
import Store from "STORE";
import Router from "ROUTER";

export {URL} from './url'

Axios.defaults.timeout = 30000;

export const api = {
  get(url, is_show_loading = true, loading_msg = ''){ //get请求
    return this.request(url,{},false,is_show_loading,loading_msg);
  },
  post(url, data = {}, is_show_loading = true, loading_msg = ''){ //post请求
    return this.request(url,data,true,is_show_loading,loading_msg);
  },
  request(url, data = {}, isPost = false, is_show_loading = true, loading_msg = ''){ //正常接口联网请求
    url = VUE_BASE_URL + url;
    if (url.indexOf("?") == -1) {
      url = url + "?sessionid=" + localStorage.getItem("sessionid");
    } else {
      url = url + "&&sessionid=" + localStorage.getItem("sessionid");
    }
    let config = {loading_msg: loading_msg, 'is_show_loading': is_show_loading};
    return isPost ? Axios.post(url, data, config) : Axios.get(url, config);
  },
  requestOpenApi(url, data = {}, isPost = false, is_show_loading = true, loading_msg = ''){ //openApi联网请求
    url = OPEN_API_URL + url;
    let config = {loading_msg: loading_msg, 'is_show_loading': is_show_loading};
    return isPost ? Axios.post(url, data, config) : Axios.get(url, config);
  }
}

Axios.interceptors.request.use(function (config) {
  if (config.is_show_loading) {
    Store.commit("SHOW_LOADING", config.loading_msg);
  }
  return config;
}, function (error) {
  Store.commit("HIDE_LOADING");
  return Promise.reject(error);
});

Axios.interceptors.response.use(function (response) {
  Store.commit("HIDE_LOADING");
  if (response.status === 200) {  //status >= 200 && status < 300;
    let resultData = response.data; //取出json数据
    if (resultData.response === 'ok') {
      // console.log('ok','ok');
      return Promise.resolve(resultData.data);//在此处直接将json内的data取出
    }
    else {  //resultData.response === 'fail'
      if (resultData.error === 'no_user') {
        console.log('no_user', 'no_user');
        Router.replace("/login");
        return Promise.reject('no_user');
      } else {
        if (resultData.error === 'no_attendance') {
          resultData.message = resultData.error;
        }
        if (response.config.url.indexOf('auth') == -1) {
          window.toast(resultData.message);
        }
        console.log(resultData.message, 'fail');
        return Promise.reject(resultData.message);
      }


    }
  }
  else {
    window.toast("网络请求失败，请检查你的网络!");    //应该很少会被调用
    return Promise.reject(response);
  }
}, function (error) {   //404、500都走这里，断网也走这里
  Store.commit("HIDE_LOADING");
  window.toast("网络请求失败，请检查你的网络!");
  console.log(error, '404、500都走这里，断网也走这里');
  return Promise.reject("网络请求失败，请检查你的网络!");
});
