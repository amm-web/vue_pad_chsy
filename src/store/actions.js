import {URL, api} from 'API';
export default {
  //接收处理android传来事件
  ANDROID_TO_VUE({commit},{event_name,event_params}){
    console.log(event_name + ',' + JSON.stringify(event_params), 'android_to_vue:');
    if (vue._events[event_name] && vue._events[event_name].length>0) {
      vue.$emit(event_name, event_params);//如果vue中已注册此事件，即将事件发出
    } else {
      console.log("not found register this event_name:"+event_name, 'android_to_vue:');
      //处理未注册的传来事件
      if(event_name == 'onBackPressed'){
        vue.$router.go(-1);
      }
    }
  },
  //注册ANDROID_TO_VUE指定事件
  REGISTER_ATV_EVENT({commit},{event_name,callback}){
    callback.atv_id = new Date().getTime();//给callback添加atv_id唯一事件标识
    vue.$on(event_name,callback);
    return callback.atv_id;
  },
  //注销ANDROID_TO_VUE指定事件名，[传入callback注销指定事件名对应的指定回调]
  UNREGISTER_ATV_EVENT({commit},{event_name,callback}){
    var cbs = vue._events[event_name];
    if (cbs.length>1 && (typeof callback !='undefined')){
      cbs.forEach((func,index)=> {
        if(func.atv_id==callback.atv_id){
          cbs.splice(index, 1);
        }
      });
    }else {
      vue.$off(event_name);
    }
  },
  //获取新的vue版本
  GET_VUE_CODE({commit},project_name){
    return new Promise((resolve,reject)=>{
      api.requestOpenApi(URL.VUE_CODE(project_name))
        .then((response) => {
          resolve(response.version_name);
        }).catch((error) => {
        console.log(error);
        reject();
      });
    });
  }
}
