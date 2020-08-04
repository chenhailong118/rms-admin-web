import request from '@/utils/request'

export function listAllCate() {
  return request({
    url: '/auth/resourceCategory/all',
    method: 'get'
  })
}

export function createResourceCategory(data) {
  return request({
    url: '/auth/resourceCategory',
    method: 'post',
    data: data
  })
}

export function updateResourceCategory(id, data) {
  return request({
    url: '/auth/resourceCategory/' + id,
    method: 'put',
    params: data
  })
}

export function deleteResourceCategory(id) {
  return request({
    url: '/auth/resourceCategory/' + id,
    method: 'delete'
  })
}
