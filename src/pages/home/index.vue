<template>
  <view class="home">
    <!-- 顶部导航区域 -->
    <view class="home__header">
      <view class="home__header-left">
        <view class="home__logo">
          <!-- 图标用颜色占位 -->
          <view class="home__logo-icon"></view>
        </view>
        <view class="home__title">
          <text class="home__title-main">CyberShipX</text>
          <text class="home__title-sub">智能船舶管理平台</text>
        </view>
      </view>
      <view class="home__header-right">
        <view class="home__header-btn" @click="handleSync">
          <!-- 同步图标用颜色占位 -->
          <view class="home__icon-placeholder home__icon-placeholder--sync"></view>
        </view>
        <view class="home__header-btn home__header-btn--notify" @click="handleNotify">
          <!-- 通知图标用颜色占位 -->
          <view class="home__icon-placeholder home__icon-placeholder--bell"></view>
          <view v-if="notifyCount > 0" class="home__notify-badge">
            <text>{{ notifyCount > 99 ? '99+' : notifyCount }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 搜索框 -->
    <view class="home__search" @click="handleSearch">
      <!-- 搜索图标用颜色占位 -->
      <view class="home__icon-placeholder home__icon-placeholder--search"></view>
      <text class="home__search-placeholder">搜索船舶、用户、证书...</text>
      <!-- 扫码图标用颜色占位 -->
      <view class="home__icon-placeholder home__icon-placeholder--scan"></view>
    </view>

    <!-- 用户信息卡片 -->
    <view class="home__user-card" @click="handleUserCard">
      <view class="home__user-avatar">
        <image v-if="userInfo.avatar" :src="userInfo.avatar" mode="aspectFill" />
        <text v-else>{{ userInfo.name?.charAt(0) || 'U' }}</text>
      </view>
      <view class="home__user-info">
        <view class="home__user-name-row">
          <text class="home__user-name">{{ userInfo.name }}</text>
          <view class="home__user-role">
            <text>{{ userInfo.role }}</text>
          </view>
        </view>
        <text class="home__user-company">{{ userInfo.company }}</text>
        <view class="home__user-login">
          <view class="home__user-status"></view>
          <text>上次登录: {{ userInfo.lastLoginTime }}</text>
        </view>
      </view>
      <view class="home__user-arrow">
        <view class="home__icon-placeholder home__icon-placeholder--arrow"></view>
      </view>
    </view>

    <!-- 统计卡片 -->
    <view class="home__stats">
      <view 
        v-for="item in statsList" 
        :key="item.key" 
        class="home__stats-card"
        :style="{ background: item.bgColor }"
        @click="handleStatClick(item)"
      >
        <text class="home__stats-number">{{ item.value }}</text>
        <text class="home__stats-label">{{ item.label }}</text>
        <view class="home__stats-change" :style="{ color: item.changeColor }">
          <text>{{ item.change > 0 ? '+' : '' }}{{ item.change }}</text>
        </view>
      </view>
    </view>

    <!-- 功能模块 -->
    <view class="home__modules">
      <view class="home__modules-header">
        <text class="home__modules-title">功能模块</text>
        <view class="home__modules-more" @click="handleMoreModules">
          <text>更多</text>
          <view class="home__icon-placeholder home__icon-placeholder--arrow-small"></view>
        </view>
      </view>
      <view class="home__modules-grid">
        <view 
          v-for="item in modulesList" 
          :key="item.key" 
          class="home__module-item"
          @click="handleModuleClick(item)"
        >
          <view class="home__module-icon" :style="{ background: item.bgColor }">
            <!-- 图标用颜色占位 -->
            <view class="home__module-icon-placeholder" :style="{ background: item.iconColor }"></view>
          </view>
          <text class="home__module-name">{{ item.name }}</text>
        </view>
      </view>

      <!-- 证书管理单独一行 -->
      <view class="home__module-single">
        <view class="home__module-item" @click="handleModuleClick(certificateModule)">
          <view class="home__module-icon" :style="{ background: certificateModule.bgColor }">
            <view class="home__module-icon-placeholder" :style="{ background: certificateModule.iconColor }"></view>
          </view>
          <text class="home__module-name">{{ certificateModule.name }}</text>
        </view>
      </view>
    </view>

    <!-- 快捷入口 -->
    <view class="home__quick">
      <view class="home__section-header">
        <text class="home__section-title">快捷入口</text>
      </view>
      <view class="home__quick-list">
        <view 
          v-for="item in quickActions" 
          :key="item.key" 
          class="home__quick-item"
          @click="handleQuickAction(item)"
        >
          <view class="home__quick-icon" :style="{ background: item.bgColor }">
            <view class="home__module-icon-placeholder" :style="{ background: item.iconColor }"></view>
          </view>
          <view class="home__quick-content">
            <text class="home__quick-label">{{ item.label }}</text>
            <text class="home__quick-desc">{{ item.desc }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 系统通知 -->
    <view class="home__notifications">
      <view class="home__section-header">
        <text class="home__section-title">系统通知</text>
        <view class="home__section-more" @click="handleAllNotifications">
          <text>全部</text>
          <view class="home__icon-placeholder home__icon-placeholder--arrow-small"></view>
        </view>
      </view>
      <view class="home__notification-list">
        <view 
          v-for="item in notifications" 
          :key="item.id" 
          class="home__notification-item"
          @click="handleNotificationClick(item)"
        >
          <view class="home__notification-dot" :class="'home__notification-dot--' + item.type"></view>
          <view class="home__notification-content">
            <text class="home__notification-title">{{ item.title }}</text>
            <text class="home__notification-desc">{{ item.desc }}</text>
          </view>
          <text class="home__notification-time">{{ item.time }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

// 通知数量
const notifyCount = ref(2)

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
  {
    key: 'shipType',
    label: '船型数量',
    value: 9,
    change: 2,
    bgColor: 'linear-gradient(135deg, #e8f4ff 0%, #d6ebff 100%)',
    changeColor: '#165dff'
  },
  {
    key: 'ship',
    label: '船舶数量',
    value: 10,
    change: 1,
    bgColor: 'linear-gradient(135deg, #e8fff0 0%, #d4f7e2 100%)',
    changeColor: '#00b42a'
  },
  {
    key: 'user',
    label: '用户数量',
    value: 16,
    change: 3,
    bgColor: 'linear-gradient(135deg, #fff7e8 0%, #ffeccc 100%)',
    changeColor: '#ff7d00'
  }
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

// 证书管理（单独一个）
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

// 同步数据
const handleSync = () => {
  uni.showLoading({ title: '同步中...' })
  setTimeout(() => {
    uni.hideLoading()
    uni.showToast({ title: '同步成功', icon: 'success' })
  }, 1000)
}

// 通知
const handleNotify = () => {
  uni.navigateTo({ url: '/pages/notification/index' })
}

// 搜索
const handleSearch = () => {
  uni.showToast({ title: '搜索功能开发中', icon: 'none' })
}

// 用户卡片点击
const handleUserCard = () => {
  uni.navigateTo({ url: '/pages/my/index' })
}

// 统计卡片点击
const handleStatClick = (item) => {
  uni.showToast({ title: `查看${item.label}`, icon: 'none' })
}

// 更多模块
const handleMoreModules = () => {
  uni.showToast({ title: '更多功能开发中', icon: 'none' })
}

// 模块点击
const handleModuleClick = (item) => {
  uni.showToast({ title: `进入${item.name}`, icon: 'none' })
}

// 快捷入口点击
const handleQuickAction = (item) => {
  uni.showToast({ title: `进入${item.label}`, icon: 'none' })
}

// 全部通知
const handleAllNotifications = () => {
  uni.navigateTo({ url: '/pages/notification/index' })
}

// 通知项点击
const handleNotificationClick = (item) => {
  uni.showToast({ title: item.title, icon: 'none' })
}

onLoad(() => {
  // 可以在这里加载用户数据和统计数据
})
</script>

<style scoped lang="less">
.home {
  min-height: 100vh;
  background: linear-gradient(180deg, #ecf5ff 0%, #f5f7fa 25%);
  padding: 0 32rpx 40rpx;

  // 图标占位通用样式
  &__icon-placeholder {
    border-radius: 8rpx;

    &--sync {
      width: 36rpx;
      height: 36rpx;
      background: #86909c;
    }

    &--bell {
      width: 36rpx;
      height: 36rpx;
      background: #86909c;
    }

    &--search {
      width: 36rpx;
      height: 36rpx;
      background: #c9cdd4;
      border-radius: 50%;
    }

    &--scan {
      width: 36rpx;
      height: 36rpx;
      background: #c9cdd4;
      margin-left: auto;
    }

    &--arrow {
      width: 24rpx;
      height: 24rpx;
      background: rgba(255, 255, 255, 0.6);
    }

    &--arrow-small {
      width: 20rpx;
      height: 20rpx;
      background: #86909c;
    }
  }

  &__logo-icon {
    width: 44rpx;
    height: 44rpx;
    background: #fff;
    border-radius: 10rpx;
  }

  &__module-icon-placeholder {
    width: 44rpx;
    height: 44rpx;
    border-radius: 12rpx;
  }

  // 顶部导航
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24rpx 0 32rpx;

    &-left {
      display: flex;
      align-items: center;
      gap: 20rpx;
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
      background: rgba(255, 255, 255, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
  }

  // Logo
  &__logo {
    width: 80rpx;
    height: 80rpx;
    border-radius: 20rpx;
    background: linear-gradient(135deg, #165dff, #4080ff);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8rpx 24rpx rgba(22, 93, 255, 0.25);
  }

  // 标题
  &__title {
    display: flex;
    flex-direction: column;
    gap: 4rpx;

    &-main {
      font-size: 36rpx;
      font-weight: 700;
      color: #1d2129;
    }

    &-sub {
      font-size: 22rpx;
      color: #86909c;
    }
  }

  // 通知角标
  &__notify-badge {
    position: absolute;
    top: 8rpx;
    right: 8rpx;
    min-width: 32rpx;
    height: 32rpx;
    border-radius: 16rpx;
    background: #f53f3f;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 8rpx;

    text {
      font-size: 20rpx;
      color: #fff;
      font-weight: 500;
    }
  }

  // 搜索框
  &__search {
    display: flex;
    align-items: center;
    gap: 16rpx;
    height: 88rpx;
    background: #fff;
    border-radius: 44rpx;
    padding: 0 32rpx;
    margin-bottom: 32rpx;
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.04);

    &-placeholder {
      flex: 1;
      font-size: 28rpx;
      color: #c9cdd4;
    }
  }

  // 用户卡片
  &__user-card {
    display: flex;
    align-items: center;
    gap: 24rpx;
    background: linear-gradient(135deg, #165dff, #4080ff);
    border-radius: 24rpx;
    padding: 32rpx;
    margin-bottom: 32rpx;
    box-shadow: 0 12rpx 32rpx rgba(22, 93, 255, 0.25);
  }

  &__user-avatar {
    width: 96rpx;
    height: 96rpx;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    overflow: hidden;

    image {
      width: 100%;
      height: 100%;
    }

    text {
      font-size: 40rpx;
      font-weight: 600;
      color: #fff;
    }
  }

  &__user-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8rpx;
  }

  &__user-name-row {
    display: flex;
    align-items: center;
    gap: 16rpx;
  }

  &__user-name {
    font-size: 34rpx;
    font-weight: 600;
    color: #fff;
  }

  &__user-role {
    padding: 4rpx 16rpx;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 8rpx;

    text {
      font-size: 22rpx;
      color: #fff;
    }
  }

  &__user-company {
    font-size: 26rpx;
    color: rgba(255, 255, 255, 0.85);
  }

  &__user-login {
    display: flex;
    align-items: center;
    gap: 8rpx;

    text {
      font-size: 22rpx;
      color: rgba(255, 255, 255, 0.7);
    }
  }

  &__user-status {
    width: 12rpx;
    height: 12rpx;
    border-radius: 50%;
    background: #00b42a;
  }

  // 统计卡片
  &__stats {
    display: flex;
    gap: 20rpx;
    margin-bottom: 32rpx;
  }

  &__stats-card {
    flex: 1;
    border-radius: 20rpx;
    padding: 24rpx 20rpx;
    display: flex;
    flex-direction: column;
    gap: 8rpx;
    position: relative;
    overflow: hidden;

    &:active {
      transform: scale(0.98);
    }
  }

  &__stats-number {
    font-size: 48rpx;
    font-weight: 700;
    color: #1d2129;
  }

  &__stats-label {
    font-size: 24rpx;
    color: #86909c;
  }

  &__stats-change {
    position: absolute;
    bottom: 24rpx;
    left: 20rpx;
    font-size: 22rpx;
    font-weight: 500;
  }

  // 功能模块
  &__modules {
    background: #fff;
    border-radius: 24rpx;
    padding: 32rpx;
    margin-bottom: 32rpx;
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.04);

    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 32rpx;
    }

    &-title {
      font-size: 32rpx;
      font-weight: 600;
      color: #1d2129;
    }

    &-more {
      display: flex;
      align-items: center;
      gap: 4rpx;

      text {
        font-size: 26rpx;
        color: #86909c;
      }
    }

    &-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 32rpx 0;
    }
  }

  &__module-single {
    display: flex;
    justify-content: flex-start;
    margin-top: 32rpx;
    padding-left: 25rpx;
  }

  &__module-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16rpx;

    &:active {
      opacity: 0.8;
    }
  }

  &__module-icon {
    width: 100rpx;
    height: 100rpx;
    border-radius: 24rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__module-name {
    font-size: 24rpx;
    color: #4e5969;
  }

  // 通用区块头部
  &__section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24rpx;
  }

  &__section-title {
    font-size: 32rpx;
    font-weight: 600;
    color: #1d2129;
  }

  &__section-more {
    display: flex;
    align-items: center;
    gap: 4rpx;

    text {
      font-size: 26rpx;
      color: #86909c;
    }
  }

  // 快捷入口
  &__quick {
    background: #fff;
    border-radius: 24rpx;
    padding: 32rpx;
    margin-bottom: 32rpx;
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.04);

    &-list {
      display: flex;
      gap: 24rpx;
    }

    &-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16rpx;
      padding: 24rpx 16rpx;
      background: #f7f8fa;
      border-radius: 16rpx;

      &:active {
        opacity: 0.8;
      }
    }

    &-icon {
      width: 80rpx;
      height: 80rpx;
      border-radius: 20rpx;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4rpx;
    }

    &-label {
      font-size: 26rpx;
      font-weight: 500;
      color: #1d2129;
    }

    &-desc {
      font-size: 22rpx;
      color: #86909c;
    }
  }

  // 系统通知
  &__notifications {
    background: #fff;
    border-radius: 24rpx;
    padding: 32rpx;
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.04);

    &-list {
      display: flex;
      flex-direction: column;
    }
  }

  &__notification-item {
    display: flex;
    align-items: flex-start;
    gap: 20rpx;
    padding: 24rpx 0;
    border-bottom: 1rpx solid #f2f3f5;

    &:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    &:first-child {
      padding-top: 0;
    }

    &:active {
      opacity: 0.8;
    }
  }

  &__notification-dot {
    width: 16rpx;
    height: 16rpx;
    border-radius: 50%;
    margin-top: 10rpx;
    flex-shrink: 0;

    &--warning {
      background: #ff7d00;
    }

    &--info {
      background: #165dff;
    }

    &--success {
      background: #00b42a;
    }

    &--error {
      background: #f53f3f;
    }
  }

  &__notification-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8rpx;
  }

  &__notification-title {
    font-size: 28rpx;
    font-weight: 500;
    color: #1d2129;
  }

  &__notification-desc {
    font-size: 24rpx;
    color: #86909c;
    line-height: 1.4;
  }

  &__notification-time {
    font-size: 22rpx;
    color: #c9cdd4;
    flex-shrink: 0;
  }
}
</style>
