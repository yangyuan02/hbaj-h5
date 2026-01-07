import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

 const useAuthStore = defineStore(
  'auth',
  () => {
    const auth = ref({
      access_token: '',
      login_type: '',
    })

    const setAuth = (data) => {
      auth.value = data
    }

    const logout = () => {
      auth.value = {
        access_token: '',
        login_type: '',
      }
      uni.removeStorageSync('auth')
    }

    const isLogined = computed(() => {
      return !!auth.value.access_token
    })

    return {
      setAuth,
      isLogined,
      auth,
      logout,
    }
  },
  {
    persist: true,
  },
)

export default useAuthStore