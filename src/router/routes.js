export const routes = [
  {
    name: 'index',
    path: '/pages/index/index',
  },
  {
    name: 'login',
    path: '/pages/login/index',
  },
  {
    name: 'fleet',
    path: '/pages/fleet/index',
    requiresAuth: true,
    tab: true,
  },
  {
    name: 'knowledge',
    path: '/pages/knowledge/index',
    requiresAuth: true,
    tab: true,
  },
  {
    name: 'ai',
    path: '/pages/ai/index',
    requiresAuth: true,
    tab: true,
  },
  {
    name: 'task',
    path: '/pages/task/index',
    requiresAuth: true,
    tab: true,
  },
  {
    name: 'my',
    path: '/pages/my/index',
    requiresAuth: true,
    tab: true,
  },
  {
    name: 'account',
    path: '/pages/account/index',
    requiresAuth: true,
  },
]

export const routeMap = routes.reduce((map, item) => {
  map[item.name] = item
  return map
}, {})
