<template>
  <div>
    <div class="ui-mask" @click="cancelActionsheetTime" :class="{'active': visibility}"></div>
    <div class="ui-sex" :class="{'active': visibility}">
      <p @click="checkedActionsheetTime(0)">1至6年</p>
      <p @click="checkedActionsheetTime(1)">6年以上</p>
      <p @click="cancelActionsheetTime">取消</p>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  props: {
    visibility: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    cancelActionsheetTime() {
      this.$emit('toggleActionsheetTime', false);
    },
    checkedActionsheetTime(val) {
      this.$emit('toggleActionsheetTime', false);
      this.$emit('checkedActionsheetTime', val);
    }
  }
};
</script>

<style lang="less">
.ui-mask {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.7);
  display: none;
  z-index: 100;
}
.ui-mask.active {
  display: block;
}
.ui-mask-visibility {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: -100;
  visibility: hidden;
}
.ui-sex {
  width: 100%;
  height: 3rem;
  background: #fff;
  position: fixed;
  z-index: 999;
  left: 0;
  bottom: 0;
  transform: translateY(100%);
  transition: all 0.5s cubic-bezier(0.4, 0.01, 0.165, 0.99);
  text-align: center;
  &.active {
    transform: translateY(0);
  }
  p {
    line-height: 1rem;
    font-size: 0.36rem;
    color: #000;
    &:first-child {
      border-bottom: 0.01rem solid #ddd;
    }
  }
}
</style>
