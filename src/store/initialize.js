import { defineStore } from 'pinia'
import { userApi, accountApi } from '@/api'
import { ref } from 'vue'


 const useInitializeStore = defineStore(
  'initialize',
  () => {
    const user = ref({});
    const func = ref([]);
    const initializeLoading = ref(false)
    const initializeComplete = ref(false)
    const getaccountPersonal = async () => {
        try {
            const res = await accountApi.getaccountPersonal()
            user.value = res.data || {}
        } catch (error) {
            console.log(error, 'getaccountPersonal 获取用户信息失败')
        }
    }

    const getUserFunctions = async () => {
        try {
            const res = await userApi.getUserFunctions()
            func.value = res.data || []
        } catch (error) {
            console.log(error, 'getUserFunctions 获取用户功能失败')
        }
    }

    const getInitialize = async () => {
        try {
            if (initializeComplete.value) {
                return
            }
            initializeLoading.value = true
            await getaccountPersonal()
            await getUserFunctions()
            initializeComplete.value = true
        } catch (error) {
            console.log(error, 'getInitialize 初始化失败')
        } finally {
            initializeLoading.value = false
            console.log('getInitialize 初始化完成')
        }
    }

    return {
       getInitialize,
       initializeLoading,
       initializeComplete
    }
  }
)

export default useInitializeStore