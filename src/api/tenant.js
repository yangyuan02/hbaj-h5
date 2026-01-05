import http from '@/utils/http'

function getTenantSeries() {
  return http('/tenant/series', {
    method: 'GET',
  })
}

function getWord(params) {
  return http('/sys/word', {
    method: 'GET',
    data: params,
  })
}

function getDocument(params) {
  return http('/tenant/document/info', {
    method: 'GET',
    data: params,
  })
}

function getTenantDocNode(params) {
  return http('/tenant/document/node', {
    method: 'GET',
    data: params,
  })
}

export default {
  getTenantSeries,
  getWord,
  getDocument,
  getTenantDocNode
}
