<template>
  <view class="home">
    <!-- Header Area - 蓝色渐变背景区域 -->
    <view class="home__header-area">
      <!-- 顶部栏 -->
      <view class="home__topbar">
        <view class="home__topbar-left">
          <view class="home__logo">
            <!-- Ship 图标占位 -->
            <view class="home__logo-icon"></view>
          </view>
          <view class="home__brand">
            <text class="home__brand-name">CyberShipX</text>
            <text class="home__brand-desc">智能船舶管理平台</text>
          </view>
        </view>
        <view class="home__topbar-right">
          <view class="home__topbar-btn" @click="handleSync">
            <!-- RefreshCw 图标占位 -->
            <view class="home__icon home__icon--white"></view>
          </view>
          <view class="home__topbar-btn home__topbar-btn--badge" @click="handleNotify">
            <!-- Bell 图标占位 -->
            <view class="home__icon home__icon--white"></view>
            <view class="home__badge">
              <text>2</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 搜索框 -->
      <view class="home__search" @click="handleSearch">
        <!-- Search 图标占位 -->
        <view class="home__icon home__icon--gray"></view>
        <text class="home__search-text">搜索船舶、用户、证书...</text>
        <!-- ScanLine 图标占位 -->
        <view class="home__icon home__icon--gray"></view>
      </view>

      <!-- 用户欢迎卡片 -->
      <view class="home__welcome-card" @click="handleUserCard">
        <view class="home__welcome-avatar">
          <image v-if="userInfo.avatar" :src="userInfo.avatar" mode="aspectFill" />
          <text v-else>{{ userInfo.name?.charAt(0) || 'U' }}</text>
        </view>
        <view class="home__welcome-info">
          <view class="home__welcome-row">
            <text class="home__welcome-name">{{ userInfo.name }}</text>
            <view class="home__welcome-tag">
              <text>{{ userInfo.role }}</text>
            </view>
          </view>
          <text class="home__welcome-company">{{ userInfo.company }}</text>
          <text class="home__welcome-time">上次登录: {{ userInfo.lastLoginTime }}</text>
        </view>
        <!-- ChevronRight 图标占位 -->
        <view class="home__icon home__icon--white-light"></view>
      </view>
    </view>

    <!-- Main Content -->
    <view class="home__content">
      <!-- Stats Cards -->
      <view class="home__stats">
        <view 
          v-for="item in statsList" 
          :key="item.key" 
          class="home__stat-card"
          @click="handleStatClick(item)"
        >
          <view class="home__stat-indicator" :style="{ background: item.indicatorColor }"></view>
          <text class="home__stat-value">{{ item.value }}</text>
          <text class="home__stat-label">{{ item.label }}</text>
          <view v-if="item.trend" class="home__stat-trend" :style="{ background: item.trendBg, color: item.trendColor }">
            <text>{{ item.trend }}</text>
          </view>
        </view>
      </view>

      <!-- Feature Grid -->
      <view class="home__card">
        <view class="home__card-header">
          <text class="home__card-title">功能模块</text>
          <view class="home__card-more" @click="handleMoreModules">
            <text>更多</text>
            <!-- ChevronRight 图标占位 -->
            <view class="home__icon home__icon--small home__icon--gray"></view>
          </view>
        </view>
        
        <!-- 8个功能模块 -->
        <view class="home__features">
          <view 
            v-for="item in modulesList" 
            :key="item.key" 
            class="home__feature-item"
            @click="handleModuleClick(item)"
          >
            <view class="home__feature-icon" :style="{ background: item.bgColor }">
              <!-- 图标占位 -->
              <view class="home__feature-icon-inner" :style="{ background: item.iconColor }"></view>
            </view>
            <text class="home__feature-label">{{ item.name }}</text>
          </view>
        </view>

        <!-- 证书管理单独一行 -->
        <view class="home__feature-last">
          <view class="home__feature-item" @click="handleModuleClick(certificateModule)">
            <view class="home__feature-icon" :style="{ background: certificateModule.bgColor }">
              <view class="home__feature-icon-inner" :style="{ background: certificateModule.iconColor }"></view>
            </view>
            <text class="home__feature-label">{{ certificateModule.name }}</text>
          </view>
        </view>
      </view>

      <!-- Quick Actions -->
      <view class="home__card">
        <view class="home__card-header">
          <text class="home__card-title">快捷入口</text>
        </view>
        <view class="home__quick-actions">
          <view 
            v-for="item in quickActions" 
            :key="item.key" 
            class="home__quick-item"
            @click="handleQuickAction(item)"
          >
            <view class="home__quick-icon" :style="{ background: item.bgColor }">
              <view class="home__feature-icon-inner" :style="{ background: item.iconColor }"></view>
            </view>
            <text class="home__quick-label">{{ item.label }}</text>
            <text class="home__quick-desc">{{ item.desc }}</text>
          </view>
        </view>
      </view>

      <!-- Notifications -->
      <view class="home__card">
        <view class="home__card-header">
          <text class="home__card-title">系统通知</text>
          <view class="home__card-more" @click="handleAllNotifications">
            <text>全部</text>
            <view class="home__icon home__icon--small home__icon--gray"></view>
          </view>
        </view>
        <view class="home__notifications">
          <view 
            v-for="item in notifications" 
            :key="item.id" 
            class="home__notification"
            @click="handleNotificationClick(item)"
          >
            <view class="home__notification-dot" :class="'home__notification-dot--' + item.type"></view>
            <view class="home__notification-body">
              <text class="home__notification-title">{{ item.title }}</text>
              <text class="home__notification-desc">{{ item.desc }}</text>
            </view>
            <text class="home__notification-time">{{ item.time }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

// 用户信息
const userInfo = reactive({
  name: '阳园',
  role: '企业管理员',
  company: '上海船福信息科技有限公司',
  avatar: '',
  lastLoginTime: '2026-02-02 00:41:30'
})

// 统计数据
const statsList = ref([
  { key: 'shipType', value: 9, label: '船型数量', trend: '+2', indicatorColor: '#3b82f6', trendBg: '#dbeafe', trendColor: '#3b82f6' },
  { key: 'ship', value: 10, label: '船舶数量', trend: '+1', indicatorColor: '#10b981', trendBg: '#d1fae5', trendColor: '#10b981' },
  { key: 'user', value: 16, label: '用户数量', trend: '+3', indicatorColor: '#f59e0b', trendBg: '#fef3c7', trendColor: '#f59e0b' }
])

// 功能模块列表（前8个）
const modulesList = ref([
  { key: 'userResource', name: '用户资源', bgColor: '#dbeafe', iconColor: '#3b82f6' },
  { key: 'shipManage', name: '船舶管理', bgColor: '#e0f2fe', iconColor: '#0ea5e9' },
  { key: 'shipTypeManage', name: '船型管理', bgColor: '#ffedd5', iconColor: '#f97316' },
  { key: 'accountManage', name: '账号管理', bgColor: '#d1fae5', iconColor: '#10b981' },
  { key: 'roleManage', name: '角色管理', bgColor: '#ede9fe', iconColor: '#8b5cf6' },
  { key: 'deviceManage', name: '设备管理', bgColor: '#ccfbf1', iconColor: '#14b8a6' },
  { key: 'pmsManage', name: 'PMS管理', bgColor: '#cffafe', iconColor: '#06b6d4' },
  { key: 'dataManage', name: '资料管理', bgColor: '#fef9c3', iconColor: '#eab308' }
])

// 证书管理
const certificateModule = reactive({
  key: 'certificateManage',
  name: '证书管理',
  bgColor: '#ffe4e6',
  iconColor: '#f43f5e'
})

// 快捷入口
const quickActions = ref([
  { key: 'shipList', label: '船舶列表', desc: '查看所有船舶', bgColor: '#e0f2fe', iconColor: '#0ea5e9' },
  { key: 'certificate', label: '证书到期', desc: '3个即将到期', bgColor: '#fef9c3', iconColor: '#eab308' },
  { key: 'todo', label: '待办任务', desc: '5个待处理', bgColor: '#ede9fe', iconColor: '#8b5cf6' }
])

// 系统通知
const notifications = ref([
  { id: 1, title: '船舶证书即将到期', desc: '东海号船舶登记证书将于7天后到期', time: '2小时前', type: 'warning' },
  { id: 2, title: '新用户已添加', desc: '张三已加入船员管理系统', time: '5小时前', type: 'info' }
])

// 事件处理
const handleSync = () => {
  uni.showLoading({ title: '同步中...' })
  setTimeout(() => {
    uni.hideLoading()
    uni.showToast({ title: '同步成功', icon: 'success' })
  }, 1000)
}

const handleNotify = () => {
  uni.showToast({ title: '通知功能开发中', icon: 'none' })
}

const handleSearch = () => {
  uni.showToast({ title: '搜索功能开发中', icon: 'none' })
}

const handleUserCard = () => {
  uni.navigateTo({ url: '/pages/my/index' })
}

const handleStatClick = (item) => {
  uni.showToast({ title: `查看${item.label}`, icon: 'none' })
}

const handleMoreModules = () => {
  uni.showToast({ title: '更多功能开发中', icon: 'none' })
}

const handleModuleClick = (item) => {
  uni.showToast({ title: `进入${item.name}`, icon: 'none' })
}

const handleQuickAction = (item) => {
  uni.showToast({ title: `进入${item.label}`, icon: 'none' })
}

const handleAllNotifications = () => {
  uni.showToast({ title: '查看全部通知', icon: 'none' })
}

const handleNotificationClick = (item) => {
  uni.showToast({ title: item.title, icon: 'none' })
}

onLoad(() => {
  // 加载数据
})
</script>

<style scoped lang="less">
.home {
  min-height: 100vh;
  background: #f1f5f9;

  // 通用图标占位
  &__icon {
    width: 40rpx;
    height: 40rpx;
    border-radius: 8rpx;

    &--white {
      background: rgba(255, 255, 255, 0.9);
    }

    &--white-light {
      background: rgba(255, 255, 255, 0.5);
    }

    &--gray {
      background: #9ca3af;
    }

    &--small {
      width: 28rpx;
      height: 28rpx;
    }
  }

  // Header 蓝色区域
  &__header-area {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    padding: 24rpx 32rpx 48rpx;
    border-radius: 0 0 48rpx 48rpx;
  }

  // 顶部栏
  &__topbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32rpx;

    &-left {
      display: flex;
      align-items: center;
      gap: 24rpx;
    }

    &-right {
      display: flex;
      align-items: center;
      gap: 16rpx;
    }

    &-btn {
      width: 72rpx;
      height: 72rpx;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      &--badge {
        position: relative;
      }
    }
  }

  // Logo
  &__logo {
    width: 88rpx;
    height: 88rpx;
    border-radius: 24rpx;
    background: rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;

    &-icon {
      width: 48rpx;
      height: 48rpx;
      background: #fff;
      border-radius: 12rpx;
    }
  }

  // 品牌名
  &__brand {
    display: flex;
    flex-direction: column;
    gap: 4rpx;

    &-name {
      font-size: 36rpx;
      font-weight: 700;
      color: #fff;
    }

    &-desc {
      font-size: 24rpx;
      color: rgba(255, 255, 255, 0.8);
    }
  }

  // 角标
  &__badge {
    position: absolute;
    top: 4rpx;
    right: 4rpx;
    min-width: 36rpx;
    height: 36rpx;
    border-radius: 18rpx;
    background: #ef4444;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 8rpx;

    text {
      font-size: 22rpx;
      color: #fff;
      font-weight: 600;
    }
  }

  // 搜索框
  &__search {
    display: flex;
    align-items: center;
    gap: 20rpx;
    height: 88rpx;
    background: #fff;
    border-radius: 44rpx;
    padding: 0 32rpx;
    margin-bottom: 32rpx;
    box-shadow: 0 4rpx 24rpx rgba(0, 0, 0, 0.08);

    &-text {
      flex: 1;
      font-size: 28rpx;
      color: #9ca3af;
    }
  }

  // 欢迎卡片
  &__welcome-card {
    display: flex;
    align-items: center;
    gap: 24rpx;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    border-radius: 24rpx;
    padding: 28rpx;
    border: 2rpx solid rgba(255, 255, 255, 0.2);
  }

  &__welcome-avatar {
    width: 96rpx;
    height: 96rpx;
    border-radius: 50%;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    overflow: hidden;
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);

    image {
      width: 100%;
      height: 100%;
    }

    text {
      font-size: 40rpx;
      font-weight: 600;
      color: #3b82f6;
    }
  }

  &__welcome-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8rpx;
  }

  &__welcome-row {
    display: flex;
    align-items: center;
    gap: 16rpx;
  }

  &__welcome-name {
    font-size: 32rpx;
    font-weight: 600;
    color: #fff;
  }

  &__welcome-tag {
    padding: 4rpx 16rpx;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 8rpx;

    text {
      font-size: 22rpx;
      color: #fff;
    }
  }

  &__welcome-company {
    font-size: 26rpx;
    color: rgba(255, 255, 255, 0.9);
  }

  &__welcome-time {
    font-size: 22rpx;
    color: rgba(255, 255, 255, 0.7);
  }

  // 主内容区
  &__content {
    padding: 32rpx;
    margin-top: -24rpx;
  }

  // 统计卡片
  &__stats {
    display: flex;
    gap: 20rpx;
    margin-bottom: 32rpx;
  }

  &__stat-card {
    flex: 1;
    background: #fff;
    border-radius: 24rpx;
    padding: 28rpx 24rpx;
    position: relative;
    overflow: hidden;
    box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.04);

    &:active {
      transform: scale(0.98);
    }
  }

  &__stat-indicator {
    position: absolute;
    top: 0;
    left: 0;
    width: 8rpx;
    height: 100%;
  }

  &__stat-value {
    font-size: 52rpx;
    font-weight: 700;
    color: #1e293b;
    display: block;
    margin-bottom: 8rpx;
  }

  &__stat-label {
    font-size: 24rpx;
    color: #64748b;
    display: block;
    margin-bottom: 16rpx;
  }

  &__stat-trend {
    display: inline-flex;
    align-items: center;
    padding: 4rpx 12rpx;
    border-radius: 8rpx;

    text {
      font-size: 22rpx;
      font-weight: 500;
    }
  }

  // 通用卡片
  &__card {
    background: #fff;
    border-radius: 24rpx;
    padding: 32rpx;
    margin-bottom: 24rpx;
    box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.04);

    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 28rpx;
    }

    &-title {
      font-size: 32rpx;
      font-weight: 600;
      color: #1e293b;
    }

    &-more {
      display: flex;
      align-items: center;
      gap: 4rpx;

      text {
        font-size: 26rpx;
        color: #64748b;
      }
    }
  }

  // 功能模块网格
  &__features {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 32rpx 16rpx;
  }

  &__feature-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16rpx;

    &:active {
      opacity: 0.7;
    }
  }

  &__feature-icon {
    width: 96rpx;
    height: 96rpx;
    border-radius: 24rpx;
    display: flex;
    align-items: center;
    justify-content: center;

    &-inner {
      width: 44rpx;
      height: 44rpx;
      border-radius: 12rpx;
    }
  }

  &__feature-label {
    font-size: 24rpx;
    color: #475569;
    text-align: center;
  }

  &__feature-last {
    margin-top: 32rpx;
    padding-top: 32rpx;
    border-top: 2rpx solid #f1f5f9;
    display: flex;
    justify-content: flex-start;
  }

  // 快捷入口
  &__quick-actions {
    display: flex;
    gap: 20rpx;
  }

  &__quick-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16rpx;
    padding: 28rpx 16rpx;
    background: #f8fafc;
    border-radius: 20rpx;

    &:active {
      background: #f1f5f9;
    }
  }

  &__quick-icon {
    width: 88rpx;
    height: 88rpx;
    border-radius: 22rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__quick-label {
    font-size: 26rpx;
    font-weight: 500;
    color: #1e293b;
  }

  &__quick-desc {
    font-size: 22rpx;
    color: #94a3b8;
  }

  // 通知列表
  &__notifications {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  &__notification {
    display: flex;
    align-items: flex-start;
    gap: 20rpx;
    padding: 24rpx 0;
    border-bottom: 2rpx solid #f1f5f9;

    &:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    &:first-child {
      padding-top: 0;
    }

    &:active {
      opacity: 0.7;
    }
  }

  &__notification-dot {
    width: 16rpx;
    height: 16rpx;
    border-radius: 50%;
    margin-top: 12rpx;
    flex-shrink: 0;

    &--warning {
      background: #f59e0b;
    }

    &--info {
      background: #3b82f6;
    }

    &--success {
      background: #10b981;
    }

    &--error {
      background: #ef4444;
    }
  }

  &__notification-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8rpx;
  }

  &__notification-title {
    font-size: 28rpx;
    font-weight: 500;
    color: #1e293b;
  }

  &__notification-desc {
    font-size: 24rpx;
    color: #64748b;
    line-height: 1.5;
  }

  &__notification-time {
    font-size: 22rpx;
    color: #94a3b8;
    flex-shrink: 0;
  }
}
</style>
