<template>
  <DefaultLayout>
    <view>
      页面内容
    </view>
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
