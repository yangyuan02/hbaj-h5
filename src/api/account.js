import http from '@/utils/http'

function getaccountPersonal() {
  return http('/account/personal', {
    method: 'GET',
  })
}

export default {
    getaccountPersonal
}