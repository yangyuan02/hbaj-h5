<template>
  <div class="ui-dialog">
    <div class="ui-dialog-mask"></div>
    <div class="ui-dialog-container">
      <div class="ui-dialog__bd" id="dialog-content">{{options.content}}</div>
      <div class="ui-dialog__ft">
        <span id="ui-dialog-cancel" :style="{display: toast}" class="ui-dialog__btn ui-dialog__btn_default">{{cancelText}}</span>
        <span id="ui-dialog-confirm" class="ui-dialog__btn">{{confirmText}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'showModal',
  props: {
    options: {
      type: Object
    },
    confirmText: {
      type: String,
      default: ''
    },
    cancelText: {
      type: String,
      default: ''
    },
    toast: {
      type: String,
      default: ''
    }
  }
};
</script>


<style lang="less">
.ui-dialog-mask {
  position: fixed;
  z-index: 900;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  opacity: 0;
}
.ui-dialog .ui-dialog-mask {
  animation: fadeIn linear 0.5s forwards;
}
.ui-dialog__hd {
  padding-top: 0.3rem;
}
.ui-dialog__hd .ui-dialog__title {
  font-size: 0.36rem;
  color: #333;
  font-weight: 400;
}
.ui-dialog-container {
  position: fixed;
  z-index: 5000;
  width: 70%;
  max-width: 6rem;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  background-color: #fff;
  text-align: center;
  border-radius: 0.06rem;
  overflow: hidden;
}
.ui-dialog__bd {
  padding: 0.6rem 0.5rem 0.6rem;
  min-height: 40px;
  font-size: 0.32rem;
  line-height: 0.44rem;
  word-wrap: break-word;
  word-break: break-all;
  color: gray;
}
.ui-dialog__ft {
  position: relative;
  line-height: 0.88rem;
  font-size: 0.3rem;
  display: flex;
}
.ui-dialog__btn_primary {
  color: #0bb20c;
}
.ui-dialog__btn {
  display: block;
  flex: 1;
  color: #4597c7;
  text-decoration: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  position: relative;
}
.ui-dialog__btn_default {
  color: #353535;
}
.ui-dialog__btn:after {
  content: ' ';
  position: absolute;
  left: 0;
  top: 0;
  width: 1px;
  bottom: 0;
  border-left: 0.01rem solid #d5d5d6;
  color: #d5d5d6;
}
.ui-dialog__ft:after {
  content: ' ';
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 1px;
  border-top: 0.01rem solid #d5d5d6;
  color: #d5d5d6;
}
</style>

