import { getEnvBaseUrl } from '@/config'
import useUserStore from '@/store/user'

const http = (url, options = {}) => {
  const baseUrl = getEnvBaseUrl()
  const userStore = useUserStore()
  const token = userStore.token

  return new Promise((resolve, reject) => {
    uni.request({
      url: baseUrl + url,
      method: options.method || 'GET',
      data: options.data || {},
      dataType: 'json',
      header: {
        ...(options.header || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      success(res) {
        // HTTP 层成功
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data)
        } else {
          reject(res)
        }
      },
      fail(err) {
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
