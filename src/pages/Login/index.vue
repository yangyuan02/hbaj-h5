<template>
    <FrameOutLayout>
        <view class="login">
            <view class="login__header">
                <image class="login__header-image" src="/static/images/cybershpxlogo.png" />
            </view>
            <view class="login__form">
                <view class="login__form-item">
                    <input class="login__form-input" type="text" placeholder="请输入账号" :maxlength="20" />
                </view>
                <view class="login__form-item">
                    <input class="login__form-input" password placeholder="请输入密码" :maxlength="20" />
                </view>
                <view class="login__form-actions">
                    <text class="login__form-forgotPassword" @click="forgotPassword">忘记密码？</text>
                </view>
                <view class="login__form-button">
                    <button class="login__form-button-primary">登录并注册</button>
                </view>
                <view class="login__form-divider">
                    <text>或</text>
                </view>
                <view class="login__form-button login__form-button--weixin">
                    <button>微信账号登录</button>
                </view>
            </view>
        </view>
    </FrameOutLayout>
</template>

<script setup>
import { ref } from 'vue'
import { userApi } from '@/api'
import FrameOutLayout from '@/layouts/FrameOutLayout/index.vue'

const title = ref('登录')

const forgotPassword = () => {
    uni.showToast({
        title: '请联系客服重置密码',
        icon: 'none',
        duration: 2000
    })
}
</script>

<style scoped lang="less">
.login {
    height: 100%;
    display: flex;
    flex-direction: column;
    background: linear-gradient(to bottom, #ecf5ff, #fff);

    &__header {
        margin-top: 5vh;

        &-image {
            height: 25vw;
            width: 100vw;
            vertical-align: middle;
            font-size: 0;
        }
    }

    &__form {
        padding: 0 8vw;
        margin-top: 10vh;

        &-item {
            position: relative;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 20rpx;
            display: flex;
            align-items: center;
            padding: 0 30rpx;
            height: 80rpx;
            margin-bottom: 40rpx;
        }

        &-input {
            flex: 1;
            font-size: 28rpx;
            color: #333;
        }

        &-actions {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 60rpx;
            font-size: 24rpx;
            color: #333;
        }

        &-forgotPassword {
            color: #006aff;
        }

        &-button {
            button {
                height: 80rpx;
                background: #006aff;
                border-radius: 20rpx;
                border: none;
                font-size: 32rpx;
                color: #ffffff;
                font-weight: 500;
                box-shadow: 0px 5px 11px rgba(63, 133, 251, 0.3);
            }

            &--weixin {
                button {
                    background: #07c160;
                    color: #ffffff;
                    box-shadow: 0px 5px 11px rgba(7, 193, 96, 0.3);
                }
            }
        }

        &-divider {
            font-size: 24rpx;
            color: rgba(194, 194, 194, 1);
            text-align: center;
            margin: 40rpx 0;
        }
    }
}
</style>
