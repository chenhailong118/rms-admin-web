import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/role',
    method: 'get',
    params: params
  })
}

export function createRole(data) {
  return request({
    url: '/role',
    method: 'post',
    data: data
  })
}

export function update(id, params) {
  return request({
    url: '/role/' + id,
    method: 'put',
    params: params
  })
}

export function deleteRole(id) {
  return request({
    url:'/role/' + id,
    method:'delete',
  })
}

export function fetchAllRoleList() {
  return request({
    url: '/role/all',
    method: 'get'
  })
}

export function listMenuByRole(roleId) {
  return request({
    url: '/menu/'+roleId,
    method: 'get'
  })
}

export function listResourceByRole(roleId) {
  return request({
    url: '/resource/'+roleId,
    method: 'get'
  })
}

export function allocMenu(data) {
  return request({
    url: '/role/allocMenu',
    method: 'post',
    data:data
  })
}

export function allocResource(data) {
  return request({
    url: '/role/allocResource',
    method: 'post',
    data:data
  })
}
