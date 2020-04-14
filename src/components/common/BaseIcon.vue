<template>
  <i class="ui-icon iconfont" :class="['icon-' + type, className]" :style="{'color': color, 'fontSize': size + 'px'}"></i>
</template>
<script>
export default {
  props: {
    type: {
      // 图标类型
      type: String,
      required: true
    },
    size: {
      // 图标大小
      type: Number,
      default: 14
    },
    color: {
      // 图标颜色
      type: String,
      default: '#000000'
    },
    className: {
      // 外部class
      type: String,
      default: ''
    }
  }
};
</script>
<style lang="less" scoped>
</style>


