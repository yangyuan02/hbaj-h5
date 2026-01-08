<template>
    <FrameOutLayout>
        <view class="loading">
            <view class="loading_content">
                <view class="loading_content_logo">
                    <image src="/static/images/cybershpxlogo.png"
                        style="height: 25vw; width: 100vw; margin-bottom: 1vh" alt="logo" />
                </view>
                <!-- <view class="loading_content_text">微信自动登陆信息验证</view> -->
            </view>
            <view class="loading_support">开发者：上海船福信息科技有限公司</view>
        </view>
    </FrameOutLayout>
</template>

<script setup>
import { authApi, userApi } from '@/api'
import { onLoad } from '@dcloudio/uni-app'
import FrameOutLayout from '@/layouts/FrameOutLayout/index.vue'
import useAuthStore from '@/store/auth'
import { getAppid } from '@/config'
import { sleep } from '@/utils'
const authStore = useAuthStore()
const { setAuth, clearAuth, isLogined } = authStore;
import { useRouter } from '@/router'
const router = useRouter()

const refreshToken = async (account_id) => {
    try {
        const { data } = await authApi.refreshToken({
            account_id,
        })
        const { access_token } = data;
        if (access_token) {
            setAuth(data);
        }
    } catch (error) {
        console.error(error, '刷新token失败')
    }
}

const authGate = async () => {
    try {
        console.log('小程序开始启动')
        // if (isLogined) {
        //     // token存在，检查下token是否有效
        //     await userApi.getUserFunctions()
        //     await sleep(1000)
        //     return router.push({ name: 'fleet', reLaunch: true })
        // }
        // 尝试静默登录
        const { code } = await uni.login({ provider: 'weixin' })
        const { data } = await authApi.wxLogin({ code, app_id: getAppid() })
        const { login_type, access_token } = data;
        if (access_token) {
            setAuth(data);
            const userRes = await userApi.getPersonalInfo();
            const { account_list = [] } = userRes.data
            if (account_list?.length > 1) {
                await sleep(300)
                return router.push({ name: 'account', reLaunch: true })
            } else {
                const notRefreshTypes = ['TENANT', 'WECHAT_ACCOUNT'];
                const isRefresh = !notRefreshTypes.includes(login_type);
                if (isRefresh) {
                    const account_id = account_list?.[0].account_id
                    await refreshToken(account_id);
                }
                await sleep(300)
                router.push({ name: 'fleet', reLaunch: true })
                // 登录成功
            }
        }
        // 静默登录失败
        router.push({ name: 'login', reLaunch: true })
        // uni.reLaunch({ url: '/pages/login/index' })
    } catch (error) {
        clearAuth()
        console.log('小程序启动失败', error)
        router.push({ name: 'login', reLaunch: true })
        // uni.reLaunch({ url: '/pages/login/index' })
    }


}
onLoad(async () => {
    await authGate()
})
</script>


<style lang="less" scoped>
.loading {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to bottom, #ecf5ff, #fff);
  position: relative;
  &_content {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    &_logo {
      margin: auto;
      margin-bottom: 20vh;
    }
    &_text {
      text-align: center;
      font-size: 36rpx;
      font-weight: 400;
      color: #333;
    }
  }
  &_support {
    position: absolute;
    bottom: 20rpx;
    left: 0;
    width: 100%;
    text-align: center;
    font-size: 24rpx;
    font-weight: 400;
    color: #666;
  }
}
</style>