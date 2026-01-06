<template>
    <FrameOutLayout>
        <view class="login__container">
            <view class="login__container__header">
                <image src="/static/images/cybershpxlogo.png" style="height: 25vw; width: 100vw;"></image>
            </view>
            <view class="login__container__form">
                <view class="login__container__form--item">
                    <input class="input" type="text" placeholder="请输入账号" :maxlength="20" />
                </view>
                <view class="login__container__form--item">
                    <input class="input" password placeholder="请输入密码" :maxlength="20" />
                </view>
                <view class="login__container__form--actions">
                    <text class="login__container__form--forgotPassword" @click="forgotPassword">忘记密码？</text>
                </view>
                <view class="login__container__form--button">
                    <button>登录并注册</button>
                </view>
                <view class="login__container__form--text">
                    <text>或</text>
                </view>
                <view class="login__container__form--button weixin">
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
    &__container {
        height: 100%;
        display: flex;
        flex-direction: column;
        background: linear-gradient(to bottom, #ecf5ff, #fff);

        &__header {
            margin-top: 5vh;

            image {
                height: 25vw;
                width: 100vw;
                vertical-align: middle;
                font-size: 0;
            }
        }

        &__form {
            padding: 0 8vw;
            margin-top: 10vh;

            &--item {
                position: relative;
                background: rgba(255, 255, 255, 0.9);
                border-radius: 20rpx;
                display: flex;
                align-items: center;
                padding: 0 30rpx;
                height: 80rpx;
                margin-bottom: 40rpx;

                input {
                    flex: 1;
                    font-size: 28rpx;
                    color: #333;
                }
            }

            &--actions {
                display: flex;
                justify-content: flex-end;
                margin-bottom: 60rpx;
                font-size: 24rpx;
                color: #333;
            }

            &--button {
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

                &.weixin {
                    button {
                        background: #fff;
                        color: #000;
                        box-shadow: 1px 5px 15px rgba(0, 0, 0, 0.05);
                    }
                }
            }

            &--text {
                font-size: 24rpx;
                color: rgba(194, 194, 194, 1);
                text-align: center;
                margin: 40rpx 0;
            }
        }
    }
}
</style>
