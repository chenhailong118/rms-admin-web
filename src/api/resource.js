import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/resource',
    method: 'get',
    params: params
  })
}

export function createResource(data) {
  return request({
    url: '/resource',
    method: 'post',
    data: data
  })
}

export function updateResource(id, params) {
  return request({
    url: '/resource/' + id,
    method: 'put',
    params: params
  })
}

export function deleteResource(id) {
  return request({
    url: '/resource/' + id,
    method: 'delete'
  })
}

export function fetchAllResourceList() {
  return request({
    url: '/resource/all',
    method: 'get'
  })
}
