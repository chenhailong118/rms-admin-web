import request from '@/utils/request'

export function fetchList(parentId, params) {
  params.parentId = parentId
  return request({
    url: '/menu',
    method: 'get',
    params: params
  })
}

export function deleteMenu(id) {
  return request({
    url: '/menu/' + id,
    method: 'delete'
  })
}

export function createMenu(data) {
  return request({
    url: '/menu',
    method: 'post',
    data: data
  })
}

export function getMenuAll(params) {
  return request({
    url: '/menu/all',
    method: 'get',
    params: params
  })
}

export function update(id, params) {
  return request({
    url: '/menu/' + id,
    method: 'put',
    params: params
  })
}

export function fetchTreeList() {
  return request({
    url: '/menu/tree',
    method: 'get'
  })
}

