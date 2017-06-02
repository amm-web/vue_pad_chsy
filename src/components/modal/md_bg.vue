<!--说明：弹窗显示和隐藏都由使用它的地方控制，自动消失也需emit事件，然后由父组件监听（参见 vue教程 组件:父子组件间通信）-->
<!--说明：弹窗仅负责界面呈现；显示隐藏逻辑交由父组件处理 -->
<template>
  <div id="modal" >
    <div class="mask"  @touchmove.prevent><!--防止遮罩下内容滑动； 只能点击遮罩本身-->
        <div class="content-bg" v-click-outside="click_outside">
          <slot name="content">
          </slot>
        </div>
    </div>
    <!--借鉴mint-ui，弹窗透明背景与内容分离，避免webview中点击时背景出现的黑条-->
    <div class="transparent-bg">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    /**
     * modal
     * @desc 带背景弹窗
     *
     * @example
     * <modal @click_outside="call_back">
     *    <div slot="content">
     *      <div class="info">是否确认退出登录？</div>
     *    </div>
     * </modal>
     */
  export default {
    props: {

    },
    data(){
      return {

      };
    },
    methods: {
      //响应点击弹框内容外部区域事件
      click_outside(){
        this.$emit('click_outside')
      }
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~SCSS/index";

  .mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .content-bg{
      background: url("~IMAGES/bg_modal.png") no-repeat;
      position: relative;
      width: pxToRem(523px);
      height: pxToRem(315px);
    }
  }

  .transparent-bg {
    position: fixed;
    z-index: 9997;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
  }
</style>


