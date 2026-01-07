<template>
    <FrameOutLayout>
        <view class="login">
            <view class="login__header">
                <image class="login__header-image" src="/static/images/cybershpxlogo.png" />
            </view>
            <view class="login__form">
                <view class="login__form-item">
                    <input class="login__form-input" type="text" placeholder="请输入账号" :maxlength="20" v-model="form.username" />
                </view>
                <view class="login__form-item">
                    <input class="login__form-input" password placeholder="请输入密码" :maxlength="20" v-model="form.password" />
                </view>
                <view class="login__form-actions">
                    <text class="login__form-forgotPassword" @click="forgotPassword">忘记密码？</text>
                </view>
                <view class="login__form-button">
                    <button class="login__form-button-primary" @click="handlePasswordLogin">登录并注册</button>
                </view>
                <view class="login__form-divider">
                    <text>其他登录方式</text>
                </view>
                <view class="login__form-button login__form-button--weixin">
                    <button>微信账号登录</button>
                </view>
            </view>
        </view>
    </FrameOutLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { authApi, userApi } from '@/api'
import FrameOutLayout from '@/layouts/FrameOutLayout/index.vue'
import useAuthStore from '@/store/auth'
import { useRouter } from '@/router'

const loading = ref(false)

const router = useRouter()

const form = ref({
    username: '',
    password: ''
})

const authStore = useAuthStore()
const { setAuth } = authStore;


const refreshToken = async (account_id) => {
  try {
    const { data } = await authApi.refreshToken({
      account_id,
    })
    setAuth(data);
  } catch (error) {
    console.error(error, '刷新token失败')
  }
}

const handlePasswordLogin = async () => {
    try {
        if (!form.value.username || !form.value.password) {
            uni.showToast({
                title: '请输入账号或密码',
                icon: 'none',
                duration: 2000
            })
            return
        }
        loading.value = true;
        const { data } = await authApi.login(form.value);
        const { login_type } = data;
        setAuth(data);
        const userRes = await userApi.getPersonalInfo();
        const { account_list = [] } = userRes.data
        if (account_list?.length > 1) {
            router.push({ name: 'account' })
        } else {
            const notRefreshTypes = ['TENANT', 'WECHAT_ACCOUNT'];
            const isRefresh = !notRefreshTypes.includes(login_type);
            if (isRefresh) {
                const account_id = account_list?.[0].account_id
                await refreshToken(account_id);
            }
            router.push({ name: 'fleet' })
            // 登录成功
        }
    } catch (error) {
        console.error(error, '登录失败')
    } finally {
        loading.value = false;
    }
}

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
                height: 88rpx;
                border-radius: 20rpx;
                font-size: 32rpx;
                font-weight: 500;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 32rpx;
                background: linear-gradient(135deg, #165dff, #4080ff);
                color: #ffffff;
                box-shadow: 0 12rpx 28rpx rgba(22, 93, 255, 0.35);
            }

            &--weixin {
                button {
                    background: #f6fffa;
                    color: #07c160;
                    border: 2rpx solid rgba(7, 193, 96, 0.3);
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
