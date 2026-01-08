<template>
  <TabLayout v-slot="{ initializeLoading }">
    <text>123</text>
    <text>{{ initializeLoading }}</text>
  </TabLayout>
</template>

<script setup>
import TabLayout from '@/layouts/TabLayout/index.vue'

</script>

<style scoped lang="less">

</style>
