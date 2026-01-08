<!-- layouts/FrameInLayout.vue -->
<template>
  <view class="layout-container">
    <slot :initializeLoading="initializeLoading"/>
  </view>
</template>
<script setup>
import { onLoad } from '@dcloudio/uni-app'
import useAuthStore from '@/store/auth'
import { storeToRefs } from 'pinia'
import useInitializeStore from '@/store/initialize'
import { useRouter } from '@/router'

const props = defineProps({
  routerName: {
    type: String,
    required: false
  }
})

const initializeStore = useInitializeStore()
const { initializeLoading } = storeToRefs(initializeStore)
const { getInitialize } = initializeStore

const authStore = useAuthStore()
const { isLogined } = authStore;

const router = useRouter()


onLoad(async () => {
  if (!isLogined) {
    return router.push({ name: 'login', replace: true })
  }
  const shouldInitialize = props?.routerName !== 'account'
  // 非 account 页面需要初始化
  if (shouldInitialize) {
    await getInitialize()
  }
})
</script>

<style scoped lang="less">
.layout-container {
  height: 100vh;
}
</style>
