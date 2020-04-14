<template>
  <div class="ui-input-item pLeftRight30" :class="{'ui-input-border':isBorder}">
    <div class="input-box">
      <div class="lable">
        <div class="icon" v-if="isIcon">
          <slot name="icon"></slot>
        </div>
        <span v-if="isLable">{{label}}</span>
      </div>
      <div class="input pLeft30">
        <input :type="type" name="" :id="id" :value="value" @input="inputAction($event)" ref="input" v-bind="$attrs" class="placeholder" @click="clickAction" @blur="blurAction" :disabled="disabled">
      </div>
      <slot name="code"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isIcon: {
      type: Boolean,
      default: false
    },
    isLable: {
      type: Boolean,
      default: false
    },
    isBorder: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'text'
    },
    id: {
      type: String,
      default: ''
    },
    onClick: {},
    onBlur: {}
  },
  methods: {
    clickAction() {
      if (this.onClick && typeof this.onClick == 'function') {
        this.onClick();
      }
    },
    blurAction() {
      if (this.onBlur && typeof this.onBlur == 'function') {
        this.onBlur();
      }
    },
    inputAction(e) {
      this.$emit('input', e.target.value);
    }
  }
};
</script>

<style lang="less">
.ui-input-item {
  width: 100%;
  height: 1rem;
  display: flex;
  align-items: center;
  &.ui-input-border {
    border-bottom: 0.01rem solid #e5e5e5;
  }
  .input-box {
    display: flex;
    height: 100%;
    width: 100%;
    .lable {
      display: flex;
      align-items: center;
      span {
        font-size: 0.32rem;
        color: #404040;
      }
    }
    .input {
      display: flex;
      align-items: center;
      flex: 1;
      input {
        width: 100%;
      }
    }
  }
}
</style>


