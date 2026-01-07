export function buildUrl(path, query = {}) {
  const queryStr = Object.keys(query)
    .map(key => `${key}=${encodeURIComponent(query[key])}`)
    .join('&')

  return queryStr ? `${path}?${queryStr}` : path
}

export function getCurrentPageCount() {
  return getCurrentPages().length
}
