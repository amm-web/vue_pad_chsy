<template xmlns:>
  <div id="app">
    <router-view class="child-view" v-if="isShowPage"></router-view>

    <md_bg v-show="loadingRequest!=0">
      <div slot="content" >
        <div class="pet" >
          <img src="~IMAGES/pet_loading.webp" alt="">
          <div class="tips">
            <img src="~IMAGES/loading_txt_bg.webp" alt="">
          </div>
        </div>
      </div>
    </md_bg>
  </div>

</template>
<script type="text/ecmascript-6">
  import {mapState, mapMutations, mapActions} from 'vuex';
  import 'ASSETS/scss/index.scss'

  export default {
    name: 'app',
    data() {
      return {
        isShowPage: false,
      }
    },
    computed: {
      ...mapState(["loadingRequest", "loadingMsg"]),
    },
    created(){
      /*      if (typeof androidJs != 'undefined') {
       let that = this;
       //获取最新vue版本比对
       this.GET_VUE_CODE("xxxx").then((version_name) => {
       if (version_name != localStorage.getItem("version_name")) {
       localStorage.setItem("version_name", version_name)
       androidJs.deleteCache();
       } else {
       that.jumpPage();
       }
       }).catch(error => {});
       } else {
       this.jumpPage();
       }*/
      this.jumpPage();
    },
    methods: {
      ...mapActions(['GET_VUE_CODE']),
      jumpPage(){
        //android资源拦截响应，延迟加载页面
        setTimeout((params) => {
          this.isShowPage = true;
          if (localStorage.getItem("sessionid")) {
            this.$router.replace("/home");
          } else {
            this.$router.replace("/login");
          }
        },1000);
      },
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  /*此处的样式会影响到之后加入到router-view中的内容，注意class的命名;router-view中的内容 还需单独引用scss*/
  @import "./assets/scss/index";

  .child-view {
    transition: all .5s cubic-bezier(.55, 0, .1, 1);
  }

  .pet{
    position: relative;
    top:pxToRem(80px);
    text-align: center;
    img{
      margin-right: pxToRem(5px);
    }
    .tips{
      @extend .md-text;
      font-size: pxToRem(26px);
      margin-top: pxToRem(30px);
      color: $c-brown;
    }
  }
</style>
