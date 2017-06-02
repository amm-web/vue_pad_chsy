<!--说明：弹窗显示和隐藏都由使用它的地方控制，自动消失也需emit事件，然后由父组件监听（参见 vue教程 组件:父子组件间通信）-->
<!--说明：弹窗仅负责界面呈现；显示隐藏逻辑交由父组件处理 -->
<template>
  <div id="modal" >
    <div class="mask"  @touchmove.prevent
           @click.self="click_mask"><!--防止遮罩下内容滑动； 只能点击遮罩本身-->
          <slot name="content">
          </slot>
    </div>
    <!--借鉴mint-ui，弹窗透明背景与内容分离，避免webview中点击时背景出现的黑条-->
    <div class="transparent-bg"></div>
  </div>
</template>

<script type="text/ecmascript-6">
    /**
     * modal
     * @desc 只带透明遮罩的弹窗
     *
     * @example
     * <modal @click_mask='call_back'>
     *    <div slot="content">
     *      <div class="info">提示信息</div>
     *    </div>
     * </modal>
     */
  export default {
    props: {},
    data(){
      return {};
    },
    methods: {
      click_mask(){
        this.$emit('click_mask');
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


