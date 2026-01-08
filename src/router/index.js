import { buildUrl, getCurrentPageCount } from './helpers'
import { routeMap } from './routes'
import useAuthStore from '@/store/auth'

let navigating = false

export const useRouter = () => {
    /**
     * 统一解析跳转参数
     */
    const resolveTo = (to) => {
        if (typeof to === 'string') {
            return { path: to }
        }

        if (to.name) {
            const route = routeMap[to.name]
            if (!route) {
                throw new Error(`[useRouter] Unknown route name: ${to.name}`)
            }
            return {
                ...route,
                ...to,
                path: route.path,
            }
        }

        return to
    }

    /**
     * push —— 对齐 vue-router
     */
    const push = (to) => {
        if (navigating) return
        navigating = true

        const {
            path,
            query = {},
            replace = false,
            tab = false,
            reLaunch = false, 
            requiresAuth = false,
        } = resolveTo(to)

        const authStore = useAuthStore()
        const { isLogined } = authStore

        // 登录校验
        if (requiresAuth && !isLogined) {
            navigating = false
            return push({
                name: 'login',
                reLaunch: true, 
            })
        }

        const url = buildUrl(path, query)

        /**
         * reLaunch 优先级最高
         */
        if (reLaunch) {
            uni.reLaunch({
                url,
                complete: () => (navigating = false),
                fail: (err) => {
                    console.error(err, 'reLaunch 失败')
                    navigating = false
                }
            })
            return
        }

        /**
         * tabBar 页面
         */
        if (tab) {
            uni.switchTab({
                url: path,
                complete: () => (navigating = false),
                fail: (err) => {
                    console.error(err, 'switchTab 跳转失败')
                    navigating = false
                }
            })
            return
        }

        /**
         * 页面栈保护
         */
        if (!replace && getCurrentPageCount() >= 9) {
            uni.redirectTo({
                url,
                complete: () => (navigating = false),
                fail: (err) => {
                    console.error(err, 'redirectTo 跳转失败')
                    navigating = false
                }
            })
            return
        }

        const api = replace ? uni.redirectTo : uni.navigateTo

        api({
            url,
            complete: () => (navigating = false),
            fail: (err) => {
                console.error(err, '跳转失败')
                navigating = false
            }
        })
    }


    /**
     * replace（语义和 vue-router 一致）
     */
    const replace = (to) => {
        push({
            ...(typeof to === 'string' ? { path: to } : to),
            replace: true,
        })
    }

    /**
     * 返回
     */
    const back = (delta = 1) => {
        uni.navigateBack({ delta })
    }

    return {
        push,
        replace,
        back,
    }
}
