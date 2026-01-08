<template>
  <FrameInLayout>
    <view class="account">
      <!-- 企业列表 -->
      <view class="account__list">
        <view v-for="(item, index) in enterpriseList" :key="item.id" class="account__list-item"
          @click="handleSelectEnterprise(item)">
          <!-- 卡片头部 -->
          <view class="account__card-header">
            <text class="account__card-company">{{ item.tenant_name_cn }}</text>
            <view v-if="index === 0" class="account__card-recent">
              <text>最近登录</text>
            </view>
          </view>

          <!-- 用户信息 -->
          <view class="account__card-info">
            <view class="account__card-row">
              <text class="account__card-label">账号：</text>
              <text class="account__card-value">{{ item.principal_name }}</text>
            </view>
            <view class="account__card-row">
              <text class="account__card-label">姓名：</text>
              <text class="account__card-value">{{ item.full_name }}</text>
            </view>
            <view class="account__card-row">
              <text class="account__card-label">身份：</text>
              <text class="account__card-value">{{ item.identity_name }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </FrameInLayout>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref, reactive } from 'vue'
import FrameInLayout from '@/layouts/FrameInLayout/index.vue'
import { userApi, authApi } from '@/api'
import useAuthStore from '@/store/auth'
import { useRouter } from '@/router'
const router = useRouter()
const authStore = useAuthStore()
const { setAuth } = authStore;
// 企业列表数据
const enterpriseList = ref([])

// 选择企业登录
const handleSelectEnterprise = async (item) => {
  const { data } = await authApi.refreshToken({
    account_id: item.account_id,
  })
  const { access_token } = data;
  if (access_token) {
    setAuth(data);
    router.push({ name: 'fleet', reLaunch: true })
  }
}
const getEnterpriseList = async () => {
  try {
    uni.showLoading({
      title: '加载中...'
    })
    const res = await userApi.getPersonalInfo()
    const { account_list = [] } = res.data
    enterpriseList.value = account_list.sort(
      (a, b) => new Date(b.last_login_time).getTime() - new Date(a.last_login_time).getTime(),
    )
  } catch (error) {
    console.log(error, '获取企业列表失败')
  } finally {
    uni.hideLoading()
  }
}

onLoad(async () => {
  await getEnterpriseList()
})
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
    padding: 30rpx;

    &:active {
      opacity: 0.9;
      transform: scale(0.99);
    }
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
