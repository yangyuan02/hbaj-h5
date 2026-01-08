<template>
  <TabLayout>
    <view class="fleet">
      <!-- Banner区域 -->
      <view class="fleet__banner">
        <image class="fleet__banner-image" src="/static/images/dclogo.png" mode="aspectFill" />
        <view class="fleet__banner-overlay">
          <text class="fleet__banner-title">船舶资源管理</text>
          <text class="fleet__banner-subtitle">专业的船舶信息管理平台</text>
        </view>
      </view>

      <!-- 船舶列表区域 -->
      <view class="fleet__list">
        <view 
          v-for="(ship, index) in shipList" 
          :key="ship.id" 
          class="fleet__list-item"
        >
          <!-- 船舶图片 -->
          <view class="fleet__list-item-image">
            <image :src="ship.image" mode="aspectFill" />
          </view>
          <!-- 船舶信息 -->
          <view class="fleet__list-item-info">
            <text class="fleet__list-item-name">{{ ship.name }}</text>
            <text class="fleet__list-item-english">{{ ship.englishName }}</text>
          </view>
        </view>
      </view>
    </view>
  </TabLayout>
</template>

<script setup>
import TabLayout from '@/layouts/TabLayout/index.vue'
import { ref, reactive } from 'vue'

// 船舶列表模拟数据
const shipList = reactive([
  {
    id: 1,
    name: '中远海运银河',
    englishName: 'COSCO SHIPPING MILKY WAY',
    image: 'https://images.unsplash.com/photo-1522273500616-d1082ae9c519?w=400&h=200&fit=crop'
  },
  {
    id: 2,
    name: '东方海外香港',
    englishName: 'OOCL HONG KONG',
    image: 'https://images.unsplash.com/photo-1579783902688-9a57c3591a47?w=400&h=200&fit=crop'
  },
  {
    id: 3,
    name: '马士基航运',
    englishName: 'MAERSK LINE',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=200&fit=crop'
  },
  {
    id: 4,
    name: '地中海航运',
    englishName: 'MSC SHIPPING',
    image: 'https://images.unsplash.com/photo-1501419903042-73ac3cc91286?w=400&h=200&fit=crop'
  },
  {
    id: 5,
    name: '长荣海运',
    englishName: 'EVERGREEN MARINE',
    image: 'https://images.unsplash.com/photo-1587437279072-173670120779?w=400&h=200&fit=crop'
  },
  {
    id: 6,
    name: '阳明海运',
    englishName: 'YANG MING MARINE',
    image: 'https://images.unsplash.com/photo-1549318412-7a41ce96d708?w=400&h=200&fit=crop'
  }
])
</script>

<style scoped lang="less">
.fleet {
  min-height: calc(100vh - 100rpx);
  background-color: #f5f7fa;

  // Banner区域
  &__banner {
    position: relative;
    height: 300rpx;
    overflow: hidden;

    &-image {
      width: 100%;
      height: 100%;
    }

    &-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.3);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 40rpx;
    }

    &-title {
      font-size: 48rpx;
      font-weight: bold;
      color: #ffffff;
      margin-bottom: 20rpx;
    }

    &-subtitle {
      font-size: 28rpx;
      color: #ffffff;
      opacity: 0.9;
    }
  }

  // 船舶列表
  &__list {
    padding: 20rpx;
    display: flex;
    flex-direction: column;
    gap: 20rpx;
  }

  // 列表项
  &__list-item {
    background-color: #ffffff;
    border-radius: 20rpx;
    overflow: hidden;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    padding: 20rpx;

    &-image {
      width: 180rpx;
      height: 120rpx;
      border-radius: 12rpx;
      overflow: hidden;
      margin-right: 24rpx;

      image {
        width: 100%;
        height: 100%;
      }
    }

    &-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 8rpx;
    }

    &-name {
      font-size: 32rpx;
      font-weight: bold;
      color: #333333;
    }

    &-english {
      font-size: 24rpx;
      color: #999999;
      font-family: Arial, sans-serif;
    }
  }
}
</style>
