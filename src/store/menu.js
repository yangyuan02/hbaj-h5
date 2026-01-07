import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const useMenuStore = defineStore(
    'menu',
    () => {
        const menu = ref([
            {
                name: '船队',
                id: 'fleet',
                icon: 'fleet',
                path: '/pages/fleet/index',
            },
            {
                name: '知识库',
                id: 'knowledge',
                icon: 'knowledge',
                path: '/pages/knowledge/index',
            },
            {
                name: 'AI助手',
                id: 'ai',
                icon: 'ai',
                path: '/pages/ai/index',
            },
            {
                name: '任务',
                id: 'task',
                icon: 'task',
                path: '/pages/task/index',
            },
            {
                name: '我的',
                id: 'my',
                icon: 'my',
                path: '/pages/my/index',
            }
        ])
        return {
            menu
        }
    },
    {
        persist: true,
    },
)

export default useMenuStore