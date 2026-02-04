<template>
  <FrameInLayout routerName="account">
    <view class="account">
      <!-- 页面头部 -->
      <view class="account__header">
        <view class="account__header-icon">
          <text class="iconfont icon-qiye"></text>
        </view>
        <text class="account__header-title">选择企业</text>
        <text class="account__header-subtitle">请选择要登录的企业账号</text>
      </view>

      <!-- 企业列表 -->
      <view class="account__list">
        <view 
          v-for="(item, index) in enterpriseList" 
          :key="item.id" 
          class="account__card"
          :class="{ 'account__card--recent': index === 0 }"
          @click="handleSelectEnterprise(item)"
        >
          <!-- 卡片左侧装饰 -->
          <view class="account__card-decorator"></view>
          
          <!-- 卡片内容 -->
          <view class="account__card-content">
            <!-- 卡片头部 -->
            <view class="account__card-header">
              <view class="account__card-avatar">
                <text>{{ item.tenant_name_cn?.charAt(0) || 'E' }}</text>
              </view>
              <view class="account__card-title">
                <text class="account__card-company">{{ item.tenant_name_cn }}</text>
                <view v-if="index === 0" class="account__card-badge">
                  <text class="iconfont icon-shijian"></text>
                  <text>最近登录</text>
                </view>
              </view>
            </view>

            <!-- 用户信息 -->
            <view class="account__card-info">
              <view class="account__card-row">
                <text class="iconfont icon-yonghu account__card-icon"></text>
                <text class="account__card-label">账号</text>
                <text class="account__card-value">{{ item.principal_name }}</text>
              </view>
              <view class="account__card-row">
                <text class="iconfont icon-mingpian account__card-icon"></text>
                <text class="account__card-label">姓名</text>
                <text class="account__card-value">{{ item.full_name }}</text>
              </view>
              <view class="account__card-row">
                <text class="iconfont icon-shenfen account__card-icon"></text>
                <text class="account__card-label">身份</text>
                <text class="account__card-value">{{ item.identity_name }}</text>
              </view>
            </view>

            <!-- 进入箭头 -->
            <view class="account__card-arrow">
              <text class="iconfont icon-arrow-right"></text>
            </view>
          </view>
        </view>
      </view>

      <!-- 底部提示 -->
      <view class="account__footer">
        <text>如需添加新企业，请联系管理员</text>
      </view>
    </view>
  </FrameInLayout>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import FrameInLayout from '@/layouts/FrameInLayout/index.vue'
import { userApi, authApi } from '@/api'
import useAuthStore from '@/store/auth'
import { useRouter } from '@/router'

const router = useRouter()
const authStore = useAuthStore()
const { setAuth } = authStore

// 企业列表数据
const enterpriseList = ref([])

// 选择企业登录
const handleSelectEnterprise = async (item) => {
  try {
    uni.showLoading({ title: '登录中...' })
    const { data } = await authApi.refreshToken({
      account_id: item.account_id,
    })
    const { access_token } = data
    if (access_token) {
      setAuth(data)
      router.push({ name: 'fleet', reLaunch: true })
    }
  } catch (error) {
    uni.showToast({ title: '登录失败，请重试', icon: 'none' })
  } finally {
    uni.hideLoading()
  }
}

const getEnterpriseList = async () => {
  try {
    uni.showLoading({ title: '加载中...' })
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
  background: linear-gradient(180deg, #ecf5ff 0%, #f5f7fa 30%);
  padding: 0 32rpx 60rpx;
  display: flex;
  flex-direction: column;

  // 页面头部
  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 60rpx 0 48rpx;

    &-icon {
      width: 120rpx;
      height: 120rpx;
      border-radius: 30rpx;
      background: linear-gradient(135deg, #165dff, #4080ff);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 32rpx;
      box-shadow: 0 16rpx 40rpx rgba(22, 93, 255, 0.25);

      .iconfont {
        font-size: 56rpx;
        color: #fff;
      }
    }

    &-title {
      font-size: 40rpx;
      font-weight: 600;
      color: #1d2129;
      margin-bottom: 12rpx;
    }

    &-subtitle {
      font-size: 28rpx;
      color: #86909c;
    }
  }

  // 企业列表
  &__list {
    display: flex;
    flex-direction: column;
    gap: 24rpx;
    flex: 1;
  }

  // 企业卡片
  &__card {
    background: #fff;
    border-radius: 24rpx;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.06);
    overflow: hidden;
    display: flex;
    transition: all 0.2s ease;

    &:active {
      transform: scale(0.98);
      box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.08);
    }

    // 最近登录卡片样式
    &--recent {
      box-shadow: 0 8rpx 32rpx rgba(22, 93, 255, 0.15);

      .account__card-decorator {
        background: linear-gradient(180deg, #165dff, #4080ff);
      }
    }

    // 左侧装饰条
    &-decorator {
      width: 8rpx;
      background: linear-gradient(180deg, #c9cdd4, #e5e6eb);
      flex-shrink: 0;
    }

    // 卡片内容区
    &-content {
      flex: 1;
      padding: 32rpx;
      display: flex;
      flex-direction: column;
      gap: 24rpx;
      position: relative;
    }

    // 卡片头部
    &-header {
      display: flex;
      align-items: center;
      gap: 20rpx;
    }

    // 企业头像
    &-avatar {
      width: 80rpx;
      height: 80rpx;
      border-radius: 20rpx;
      background: linear-gradient(135deg, #e8f3ff, #d4e8ff);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;

      text {
        font-size: 36rpx;
        font-weight: 600;
        color: #165dff;
      }
    }

    // 卡片标题区
    &-title {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 8rpx;
    }

    // 企业名称
    &-company {
      font-size: 32rpx;
      font-weight: 600;
      color: #1d2129;
      line-height: 1.3;
    }

    // 最近登录标识
    &-badge {
      display: inline-flex;
      align-items: center;
      gap: 6rpx;
      padding: 4rpx 12rpx;
      border-radius: 8rpx;
      background: rgba(22, 93, 255, 0.08);
      align-self: flex-start;

      .iconfont {
        font-size: 20rpx;
        color: #165dff;
      }

      text {
        font-size: 20rpx;
        color: #165dff;
      }
    }

    // 信息区域
    &-info {
      display: flex;
      flex-direction: column;
      gap: 16rpx;
      padding: 20rpx 0;
      border-top: 1rpx solid #f2f3f5;
    }

    // 信息行
    &-row {
      display: flex;
      align-items: center;
      font-size: 26rpx;
    }

    // 图标
    &-icon {
      font-size: 28rpx;
      color: #86909c;
      margin-right: 12rpx;
      width: 32rpx;
      text-align: center;
    }

    // 标签
    &-label {
      color: #86909c;
      width: 80rpx;
    }

    // 值
    &-value {
      color: #4e5969;
      flex: 1;
    }

    // 进入箭头
    &-arrow {
      position: absolute;
      right: 32rpx;
      top: 50%;
      transform: translateY(-50%);
      width: 48rpx;
      height: 48rpx;
      border-radius: 50%;
      background: #f7f8fa;
      display: flex;
      align-items: center;
      justify-content: center;

      .iconfont {
        font-size: 24rpx;
        color: #86909c;
      }
    }
  }

  // 底部提示
  &__footer {
    text-align: center;
    padding: 48rpx 0 20rpx;

    text {
      font-size: 24rpx;
      color: #c9cdd4;
    }
  }
}
</style>
