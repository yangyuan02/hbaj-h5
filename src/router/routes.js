export const routes = [
  {
    name: 'login',
    path: '/pages/login/index',
  },
  {
    name: 'fleet',
    path: '/pages/fleet/index',
    requiresAuth: true,
  },
  {
    name: 'knowledge',
    path: '/pages/knowledge/index',
    requiresAuth: true,
  },
  {
    name: 'ai',
    path: '/pages/ai/index',
    requiresAuth: true,
  },
  {
    name: 'task',
    path: '/pages/task/index',
    requiresAuth: true,
  },
  {
    name: 'my',
    path: '/pages/my/index',
    requiresAuth: true,
  },
  {
    name: 'account',
    path: '/pages/Account/index',
    requiresAuth: true,
  },
]

export const routeMap = routes.reduce((map, item) => {
  map[item.name] = item
  return map
}, {})
