import { getEnvBaseUrl } from '@/config'
import useAuthStore from '@/store/auth'

const http = (url, options = {}) => {
  const baseUrl = getEnvBaseUrl()
  const authStore = useAuthStore()
  const {auth: {access_token}, logout } = authStore

  return new Promise((resolve, reject) => {
    uni.request({
      url: baseUrl + url,
      method: options.method || 'GET',
      data: options.data || {},
      dataType: 'json',
      header: {
        ...(options.header || {}),
        ...(access_token ? { Authorization: `Bearer ${access_token}` } : {}),
      },
      success(res) {
        // HTTP 层成功
        if (res.statusCode >= 200 && res.statusCode < 300) {
          if (res?.data?.code !== 200) {
            uni.showToast({
              icon: 'none',
              title: res?.data?.message || '请求失败',
            })
            reject({...res, errorType: 'httpError'})
            return
          }
          resolve(res.data)
        } else if (res.statusCode === 401) {
          uni.showToast({
            icon: 'none',
            title: '登录过期，请重新登录',
            complete: () => {
              // 需要清理用户信息
              logout()
            }
          })
        } else if (res.statusCode >= 500) {
          uni.showToast({
            icon: 'none',
            title: '服务器错误，请稍后重试',
          })
          reject({...res, errorType: 'httpError'})
        } else {
          reject({...res, errorType: 'httpError'})
        }
      },
      fail(err) {
        debugger
        uni.showToast({
          icon: 'none',
          title: '网络错误，请稍后重试',
        })
        reject(err)
      },
    })
  })
}

export default http
