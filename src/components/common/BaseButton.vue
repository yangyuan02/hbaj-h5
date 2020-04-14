<template>
  <button class="ui-button" :class="className" :disabled="disabled" :type="type" @click="handleClick">
    <base-icon v-if="icon && !isLoading" :type="icon" :size="16" className="mRight10"></base-icon>
    <base-icon v-if="isLoading" type="loading" :size="16" className="mRight10"></base-icon>
    <span>{{isLoading ? '加载中...' : text}}</span>
  </button>
</template>

<script>
import BaseIcon from './BaseIcon';
export default {
  props: {
    text: {
      // 按钮文字
      type: String,
      default: ''
    },
    icon: {
      // 按钮图标类型
      type: String,
      default: ''
    },
    type: {
      // 按钮类型
      type: String,
      default: ''
    },
    disabled: {
      // 是否禁用
      type: Boolean,
      default: false
    },
    className: {
      // 外部class类
      type: String,
      default: ''
    },
    isLoading: {
      // 是否加载状态
      type: Boolean,
      default: false
    },
    onClick: {} // 点击按钮触发的回调
  },
  components: {
    BaseIcon
  },
  methods: {
    handleClick(e) {
      if (this.isLoading) {
        return false;
      }
      if (this.disabled) {
        return false;
      }
      if (this.onClick && typeof this.onClick === 'function') {
        this.onClick();
      }
    }
  }
};
</script>

<style lang="less">
@disabled-color: #dadada;
.borde-background-color(@brColor, @bgColor, @color) {
  border-color: @brColor;
  background-color: @bgColor;
  color: @color;
}
.ui-button {
  font-size: 14px;
  cursor: pointer;
  background: rgba(69, 151, 199, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 0.86rem;
  &:disabled {
    cursor: not-allowed !important;
    color: @disabled-color !important;
    background: @disabled-color !important;
  }
  &:loading {
    cursor: not-allowed !important;
    color: @disabled-color !important;
  }
  // &[type='primary'] {
  //   .borde-background-color(#409eff, #409eff, #fff);
  // }
  // &[type='success'] {
  //   .borde-background-color(#67c23a, #67c23a, #fff);
  // }
  // &[type='warning'] {
  //   .borde-background-color(#e6a23c, #e6a23c, #fff);
  // }
  span {
    color: #fff;
    font-size: 0.3rem;
  }
}
</style>

