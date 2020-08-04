import request from '@/utils/request'

export function fetchList(parentId, params) {
  params.parentId = parentId
  return request({
    url: '/auth/menu',
    method: 'get',
    params: params
  })
}

export function deleteMenu(id) {
  return request({
    url: '/auth/menu/' + id,
    method: 'delete'
  })
}

export function createMenu(data) {
  return request({
    url: '/auth/menu',
    method: 'post',
    data: data
  })
}

export function getMenuAll(params) {
  return request({
    url: '/auth/menu/all',
    method: 'get',
    params: params
  })
}

export function update(id, params) {
  return request({
    url: '/auth/menu/' + id,
    method: 'put',
    params: params
  })
}

export function fetchTreeList() {
  return request({
    url: '/auth/menu/tree',
    method: 'get'
  })
}

