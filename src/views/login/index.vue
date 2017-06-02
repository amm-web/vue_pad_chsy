<template>
  <div id="login" v-onback="onBackPressed">
    <div class="content">
      <h1></h1>
      <div :class="[focusPos==0?'input_focus':'input_no_focus']">
        <a class="username_img"></a>
        <input class="username" type="text" v-model="info.username" placeholder="请输入账号" @focus="setFocus(0)"
               @keyup.enter="next()"
        >
      </div>
      <div class="password_div" :class="[focusPos==1?'input_focus':'input_no_focus']">
        <a class="password_img"></a>
        <input class="password" type="password" v-model="info.password" placeholder="请输入密码" @focus="setFocus(1)"
               @keyup.enter="dataVerify"> <!--增加对确认键的监听-->
      </div>
      <p class="red">
        {{message}}
        <!--账号和密码错误！-->
      </p>
      <a class="loginbtn" @click="dataVerify">登&nbsp;&nbsp;&nbsp;&nbsp;录</a>
    </div>
    <div class="dev">版本号:&nbsp;&nbsp;&nbsp;{{ this.versionName }}</div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapActions, mapState} from 'vuex';
  export default {
    name: "login",
    data(){
      return {
        focusPos: -1,
        info: {
          username: '',
          password: ''
        },
        message: '',
        versionName: ''
      }
    },
    computed: {
      ...mapState(["login"]),
    },
    created(){
      if (typeof(androidJs) != 'undefined') {
        androidJs.closeWel();
        this.versionName = androidJs.getAppVersionName();
      }
      localStorage.removeItem("sessionid");
      localStorage.setItem('isNeedBind', true);
    },

    methods: {
      onBackPressed(){
        if (typeof(androidJs) != 'undefined') {
          androidJs.exitApp();
        }
      },
      next(){
        document.getElementsByClassName("password")[0].focus();
      },
      setFocus(num){
        this.focusPos = num;
        this.message = "";
      },
      dataVerify(){
        if (!this.info.username && !this.info.password) {
          this.message = "请输入账号和密码！";
        } else if (!this.info.username && this.info.password) {
          this.message = "请输入账号！";
        } else if (this.info.username && !this.info.password) {
          this.message = "请输入密码！";
        } else {
          console.log(this.info);
        }
      }
    },
    watch: {
      info: {
        handler(newVal){
          this.info.username = newVal.username.replace(/[^_$0-9a-z]/g, "");
          this.info.password = newVal.password.replace(/[^_$0-9a-z]/g, "");
        },
        deep: true
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~ASSETS/scss/index.scss";

  #login {
    overflow: auto;
    width: 100%;
    height: 100%;
    position: fixed;
    background: url("../../assets/images/login/login_bg.png") no-repeat;
    background-size: 100% 100%;
    .content {
      position: fixed;
      width: pxToRem(597px);
      height: pxToRem(432px);
      top: 50%;
      left: 50%;
      margin-left: pxToRem(-308px);
      margin-top: pxToRem(-246px);
      text-align: center;
      box-sizing: border-box;
      h1 {
        width: pxToRem(248px);
        height: pxToRem(77px);
        margin: 0 auto pxToRem(4px);
        background: url("../../assets/images/login/login_logo.png") no-repeat;
      }
      .red {
        height: pxToRem(30px);
        color: red;
        font-size: pxToRem(20px);
        padding-left: pxToRem(16px);
        padding-top: pxToRem(5px);
        text-align: left;
      }
      div {
        @include centerVertical();
        width: pxToRem(597px);
        height: pxToRem(83px);
        margin-top: pxToRem(52px);
        background-color: white;
        text-align: left;
        line-height: pxToRem(80px);
        font-size: pxToRem(18px);
        color: #BEBEBE;
      }
      ::-webkit-input-placeholder {
        color: #BEBEBE;
      }
      :-moz-placeholder {
        color: #BEBEBE;
      }
      ::-moz-placeholder {
        color: #BEBEBE;
      }
      :-ms-input-placeholder {
        color: #BEBEBE;
      }
      .username_img {
        width: pxToRem(15px);
        height: pxToRem(24px);
        margin-left: pxToRem(24px);
        display: inline-block;
        background: url("../../assets/images/login/login_account_left.png") no-repeat center;
        vertical-align: middle;
      }
      .username {
        flex: 1;
        height: 100%;
        padding-left: 18px;
        display: inline-block;
        vertical-align: middle;
        background-color: white;
        border-width: 0px;
        border-radius: 10px;
      }
      .password_img {
        width: pxToRem(14px);
        height: pxToRem(22px);
        margin-left: pxToRem(24px);
        display: inline-block;
        background: url("../../assets/images/login/login_pass_left.png") no-repeat center;
        vertical-align: middle;
      }
      .password_div {
        margin-top: pxToRem(25px);
        /*border-color: #dddddd;*/
      }
      input {
        font-size: pxToRem(24px);
        color: #999;
      }
      .input_focus {
        border-color: #4cb5f5;
      }
      .input_no_focus {
        border-color: #dddddd;
      }
      .password {
        flex: 1;
        height: 100%;
        padding-left: 18px;
        display: inline-block;
        vertical-align: middle;
        background-color: white;
        border-width: 0px;
        border-radius: 10px;
      }
      .loginbtn {
        position: relative;
        width: pxToRem(249px);
        height: pxToRem(58px);
        display: inline-block;
        vertical-align: middle;
        background-color: #40A386;
        line-height: pxToRem(58px);
        margin-top: pxToRem(25px);
        font-size: pxToRem(24px);
        color: #ffffff;
        text-align: center;
        box-shadow: 4px 4px 4px #32876E;
      }
    }
    .dev {
      float: right;
      color: #1B291C;
      font-size: pxToRem(18px);
      font-weight: bold;
      margin-right: pxToRem(15px);
      margin-top: pxToRem(697px);
    }
  }


</style>
