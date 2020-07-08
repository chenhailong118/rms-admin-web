import request from '@/utils/request'

export function listAllCate() {
  return request({
    url: '/resourceCategory/all',
    method: 'get'
  })
}

export function createResourceCategory(data) {
  return request({
    url: '/resourceCategory',
    method: 'post',
    data: data
  })
}

export function updateResourceCategory(id, data) {
  return request({
    url: '/resourceCategory/' + id,
    method: 'put',
    params: data
  })
}

export function deleteResourceCategory(id) {
  return request({
    url: '/resourceCategory/' + id,
    method: 'delete'
  })
}
