<template>
  <view class="layout">
    <!-- 内容区域 -->
    <view class="layout__container">
      <slot :initializeLoading="initializeLoading"/>
    </view>
    <!-- 底部 -->
    <Menu />
  </view>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app'
import { storeToRefs } from 'pinia'
import Menu from '@/components/Menu/index.vue'
import useAuthStore from '@/store/auth'
import useInitializeStore from '@/store/initialize'
import { useRouter } from '@/router'
const router = useRouter()

const authStore = useAuthStore()
const { isLogined } = authStore;

const initializeStore = useInitializeStore()
const { getInitialize } = initializeStore
const { initializeLoading } = storeToRefs(initializeStore)



onLoad(async() => {
  if (!isLogined) {
    return router.push({ name: 'login', replace: true })
  }
  debugger;
  await getInitialize()
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
