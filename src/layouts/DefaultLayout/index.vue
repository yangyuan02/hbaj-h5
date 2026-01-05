<template>
  <view class="layout">
    <!-- 顶部 -->
    <view class="layout__header">
      <slot name="header">
        <text class="title">默认标题</text>
      </slot>
    </view>

    <!-- 内容区 -->
    <view class="layout__content">
      <slot />
    </view>

    <!-- 底部 -->
    <view class="layout__footer">
      <slot name="footer" />
    </view>
  </view>
</template>

<style scoped lang="less">
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  &__header {
    height: 88rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__content {
    flex: 1;
    overflow: auto;
  }
  &__footer {
    height: 100rpx;
  }
}
</style>
