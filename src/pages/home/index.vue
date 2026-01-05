<template>
  <DefaultLayout>
    <template #header>
      <text>首页</text>
    </template>

    <view>
      页面内容
    </view>

    <template #footer>
      <text>底部信息</text>
    </template>
  </DefaultLayout>
</template>

<script setup>
  import { onMounted } from 'vue';
  import {userApi} from '@/api'
import DefaultLayout from '@/layouts/DefaultLayout/index.vue'

onMounted(async () => {
  const res = await userApi.getPersonalInfo()
})
</script>
