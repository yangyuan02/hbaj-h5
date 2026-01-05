import http from '@/utils/http'

function getPersonalInfo() {
  return http('/user/personal', {
    method: 'GET',
  })
}

function getUserFunctions() {
  return http('/user/function', {
    method: 'GET',
  })
}

function getUserShips() {
  return http('/user/ship', {
    method: 'GET',
  })
}

export default {
    getPersonalInfo,
    getUserFunctions,
    getUserShips
}
