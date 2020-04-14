<template>
  <div class="ui-toast-mask">
    <div class="ui-toast">
      <span>{{text}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'toast',
  props: {
    text: {
      type: String,
      default: ''
    }
  }
};
</script>

<style lang="less">
.ui-toast-mask {
  width: 100%;
  height: 100%;
  position: fixed;

  z-index: 10000;
  left: 0;
  top: 0;
  background: transparent;
}

.ui-toast {
  background: rgba(0, 0, 0, 0.7);
  border-radius: 0.08rem;
  position: absolute;
  left: 50%;
  top: 50%;

  width: 50%;

  padding: 0.15rem;

  overflow: hidden;

  transform: translate(-50%, -50%);

  -webkit-transform: translate(-50%, -50%);
}
.ui-toast span {
  display: block;
  text-align: center;
  font-size: 0.3rem;
  color: #fff;
  word-break: break-all;
}
</style>
