<template>
  <div class="ui-header" :class="{'ui-header-border':isBorder}" v-if="showHeader">
    <div class="ui-header-back" v-if="isBack" @click="backAction">
      <div class="ui-header-back_btn">
      </div>
    </div>
    <h4 class="ui-header-title">{{title}}</h4>
    <slot></slot>
  </div>
</template>

<script type="text/javascript">
// import utils from '@/widget/utils';

export default {
  props: {
    backFn: {
      // 后退回调事件
      default: null,
      type: Function
    },
    title: {
      // 标题
      default: '',
      type: String
    },
    isBorder: {
      default: true,
      type: Boolean
    },
    isShowHeader: {
      // 是否显示头部
      default: false,
      type: Boolean
    },
    isBack: {
      // 是否显示后退按钮
      default: true,
      type: Boolean
    }
  },
  computed: {
    showHeader() {
      return this.isShowHeader || true;
    }
  },
  methods: {
    backAction() {
      if (this.backFn && typeof this.backFn == 'function') {
        this.backFn();
      }
    }
  }
};
</script>

<style lang="less">
.ui-header {
  width: 100%;
  height: 0.88rem;
  display: flex;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background: #4597c7;
  &.ui-header-border {
    border-bottom: 0.01rem solid #4597c7;
  }
  & ~ .scroll-view-wrapper {
    padding-top: 0.88rem;
  }
  .ui-header-back {
    height: 0.88rem;
    padding: 0 0.3rem 0 0.3rem;
    display: flex;
    align-items: center;
    .ui-header-back_btn {
      position: relative;
      width: 0.16rem;
      height: 0.26rem;
      background: url('../images/back.png');
      background-size: 0.16rem auto;
    }
  }
  .ui-header-title {
    height: 0.88rem;
    display: flex;
    align-items: center;
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    font-size: 0.3rem;
    color: #fff;
    text-align: center;
  }
  .ui-header-right {
    height: 0.88rem;
    display: flex;
    align-items: center;
    padding: 0 0.3rem;
    position: absolute;
    right: 0;
    top: 0;
  }
}
</style>
