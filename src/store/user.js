import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    const pToken = ref('')

    const setToken = (data) => {
      token.value = data
    }

    const setPtoken = (data) => {
      pToken.value = data
    }

    const isLogined = computed(() => {
      return !!token.value
    })

    return {
      setToken,
      setPtoken,
      isLogined,
      token,
      pToken
    }
  },
  {
    persist: true,
  },
)
