import request from '@/utils/request'

export function getLogs(params) {
  return request({
    url: '/superstar/log',
    method: 'get',
    params: params
  })
}

export function getLogById(id) {
  return request({
    url: '/superstar/log/' + id,
    method: 'get',
  })
}
