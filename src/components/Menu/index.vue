<template>
  <view class="menu">
    <view v-for="item in menu" :key="item.id" class="menu-item">
      <view class="menu-item-icon">
        <text class="iconfont icon-bianji1"></text>
        <!-- <image :src="require('@/assets/images/menu/' + item.icon + '.png')" /> -->
      </view>
      <view class="menu-item-name">{{ item.name }}</view>
    </view>
  </view>
</template>
<script setup>
  import useMenuStore from '@/store/menu'
  import { useRouter } from '@/router'
  const router = useRouter()

  const menuStore = useMenuStore()
  const { menu } = menuStore;

</script>

<style scoped lang="less">

</style>
