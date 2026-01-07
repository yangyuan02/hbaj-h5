export const routes = [
  {
    name: 'login',
    path: '/pages/Login/index',
  },
  {
    name: 'home',
    path: '/pages/Home/index',
  },
  {
    name: 'account',
    path: '/pages/Account/index',
  },
]

export const routeMap = routes.reduce((map, item) => {
  map[item.name] = item
  return map
}, {})
