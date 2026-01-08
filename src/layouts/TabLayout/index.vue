<template>
  <view class="layout">
    <!-- 内容区域 -->
    <view class="layout__container">
      <slot />
    </view>
    <!-- 底部 -->
    <Menu />
  </view>
</template>

<script setup>
  import { onLoad } from '@dcloudio/uni-app'
  import Menu from '@/components/Menu/index.vue'
  import useAuthStore from '@/store/auth'
  import { useRouter } from '@/router'
  const router = useRouter()

  const authStore = useAuthStore()
  const { isLogined } = authStore;
  onLoad(() => {
    if (!isLogined) {
      router.push({name: 'login', replace: true})
    }
  })
</script>

<style scoped lang="less">
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  &__container {
    flex: 1;
    overflow-y: scroll;
  }
}
</style>
