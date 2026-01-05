import http from '@/utils/http'

function login(data) {
  return http('/auth/login', {
    method: 'POST',
    data,
  })
}

function wxLogin(data) {
  return http('/auth/wxlogin', {
    method: 'POST',
    data,
  })
}

function refreshToken(data) {
  return http('/auth/token/refresh', {
    method: 'POST',
    data,
  })
}

export default {
    login,
    wxLogin,
    refreshToken
}
