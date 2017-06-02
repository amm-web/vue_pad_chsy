export default{
  SHOW_LOADING(state, msg){
    state.loadingRequest++;
    state.loadingMsg = msg ? msg : "数据加载中...";  //去除空数据
  },
  HIDE_LOADING(state){
    if (state.loadingRequest > 0) {
      state.loadingRequest--;
    } else {
      state.loadingRequest = 0;
    }
  }
}
