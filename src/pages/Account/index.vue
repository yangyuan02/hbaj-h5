<template>
  <FrameOutLayout>
    <view class="account">
      <!-- 企业列表 -->
      <view class="account__list">
        <view 
          v-for="(item, index) in enterpriseList" 
          :key="item.id"
          class="account__list-item"
          @click="handleSelectEnterprise(item)"
        >
          <!-- 企业信息卡片 -->
          <view class="account__card">
            <!-- 卡片头部 -->
            <view class="account__card-header">
              <text class="account__card-company">{{ item.companyName }}</text>
              <view v-if="item.isRecent" class="account__card-recent">
                <text>最近登录</text>
              </view>
            </view>

            <!-- 用户信息 -->
            <view class="account__card-info">
              <view class="account__card-row">
                <text class="account__card-label">账号：</text>
                <text class="account__card-value">{{ item.account }}</text>
              </view>
              <view class="account__card-row">
                <text class="account__card-label">姓名：</text>
                <text class="account__card-value">{{ item.name }}</text>
              </view>
              <view class="account__card-row">
                <text class="account__card-label">身份：</text>
                <text class="account__card-value">{{ item.role }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </FrameOutLayout>
</template>

<script setup>
import { ref, reactive } from 'vue'
import FrameOutLayout from '@/layouts/FrameOutLayout/index.vue'

// 企业列表数据
const enterpriseList = reactive([
  {
    id: 1,
    account: 'admin@example.com',
    name: '张三',
    role: '超级管理员',
    companyName: '示例科技有限公司',
    isRecent: true
  },
  {
    id: 2,
    account: 'manager@test.com',
    name: '李四',
    role: '企业管理员',
    companyName: '测试制造企业',
    isRecent: false
  },
  {
    id: 3,
    account: 'user@demo.com',
    name: '王五',
    role: '普通员工',
    companyName: '演示贸易公司',
    isRecent: false
  },
  
])

// 选择企业登录
const handleSelectEnterprise = (item) => {
  uni.showLoading({
    title: '登录中...'
  })

  // 模拟登录请求
  setTimeout(() => {
    uni.hideLoading()
    uni.showToast({
      title: `已登录${item.companyName}`,
      icon: 'success'
    })

    // TODO: 实际登录逻辑，跳转到首页
    setTimeout(() => {
      uni.switchTab({
        url: '/pages/index/index'
      })
    }, 1500)
  }, 1000)
}
</script>

<style scoped lang="less">
.account {
  min-height: 100vh;
  background-color: #f5f7fa;
  padding: 20rpx;

  // 企业列表
  &__list {
    display: flex;
    flex-direction: column;
    gap: 20rpx;
  }

  // 列表项
  &__list-item {
    background-color: #fff;
    border-radius: 20rpx;
    box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
    overflow: hidden;
    
    &:active {
      opacity: 0.9;
      transform: scale(0.99);
    }
  }

  // 信息卡片
  &__card {
    padding: 30rpx;
  }

  // 卡片头部
  &__card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20rpx;
  }

  // 企业名称
  &__card-company {
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
  }

  // 最近登录标识
  &__card-recent {
    padding: 6rpx 16rpx;
    border-radius: 16rpx;
    font-size: 20rpx;
    background-color: #e3f2fd;
    color: #1976d2;
  }

  // 信息区域
  &__card-info {
    display: flex;
    flex-direction: column;
    gap: 12rpx;
  }

  // 信息行
  &__card-row {
    display: flex;
    align-items: center;
    font-size: 28rpx;
  }

  // 标签
  &__card-label {
    color: #999;
    width: 100rpx;
  }

  // 值
  &__card-value {
    color: #333;
    flex: 1;
  }
}
</style>
