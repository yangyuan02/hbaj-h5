<!-- layouts/FrameInLayout.vue -->
<template>
  <view class="layout-container">
    <slot />
  </view>
</template>
<script setup>
  import { onLoad } from '@dcloudio/uni-app'
  import useAuthStore from '@/store/auth'
  import { useRouter } from '@/router'
  const router = useRouter()

  const authStore = useAuthStore()
  const { isLogined } = authStore;
  onLoad(() => {
    if (!isLogined) {
      router.push({name: 'login'})
    }
  })
</script>

<style scoped lang="less">
.layout-container {
  height: 100vh;
}
</style>
