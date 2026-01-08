<template>
    <view>启动</view>
</template>

<script setup>
import { authApi, userApi } from '@/api'
import { onLoad } from '@dcloudio/uni-app'
import useAuthStore from '@/store/auth'
import { getAppid } from '@/config'
const authStore = useAuthStore()
const { isLogined, setAuth } = authStore;
import { useRouter } from '@/router'
const router = useRouter()
const authGate = async () => {
    try {
        console.log('小程序开始启动')
        if (isLogined) {
            // token存在，已经登录情况,直接去首页
            return uni.reLaunch({ url: '/pages/fleet/index' })
        }
        // 尝试静默登录
        console.log('小程序尝试静默登录')
        const { code } = await uni.login({ provider: 'weixin' })
        const { data } = await authApi.wxLogin({ code, app_id: getAppid() })
        const { login_type, access_token } = data;
        if (access_token) {
            setAuth(data);
            return uni.reLaunch({ url: '/pages/fleet/index' })
        }
        // 静默登录失败
        uni.reLaunch({ url: '/pages/login/index' })
    } catch (error) {
        console.log('小程序启动失败', error)
        uni.reLaunch({ url: '/pages/login/index' })
    }


}
onLoad(async () => {
    await authGate()
})
</script>