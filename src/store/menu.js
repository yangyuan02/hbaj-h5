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
                active: true,
            },
            {
                name: '知识库',
                id: 'knowledge',
                icon: 'knowledge',
                path: '/pages/knowledge/index',
                active: false,
            },
            {
                name: 'AI助手',
                id: 'ai',
                icon: 'ai',
                path: '/pages/ai/index',
                active: false,
            },
            {
                name: '任务',
                id: 'task',
                icon: 'task',
                path: '/pages/task/index',
                active: false,
            },
            {
                name: '我的',
                id: 'my',
                icon: 'my',
                path: '/pages/my/index',
                active: false,
            }
        ])

        const setActive = (id) => {
            menu.value.forEach(item => {
                item.active = item.id === id
            })
        }

        return {
            menu,
            setActive,
        }
    }
)

export default useMenuStore