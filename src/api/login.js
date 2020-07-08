import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo() {
  return request({
    url: '/user/info',
    method: 'get',
  })
}

export function getUrls() {
  return request({
    url: '/user/urls',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function fetchList(params) {
  return request({
    url: '/user',
    method: 'get',
    params: params
  })
}

export function createAdmin(data) {
  return request({
    url: '/user',
    method: 'post',
    data: data
  })
}

export function update(id, params) {
  return request({
    url: '/user/' + id,
    method: 'put',
    params: params
  })
}

export function deleteAdmin(id) {
  return request({
    url: '/user/' + id,
    method: 'delete'
  })
}

export function getRoleByAdmin(id) {
  return request({
    url: '/role/' + id,
    method: 'get'
  })
}

export function allocRole(data) {
  return request({
    url: '/user/role/update',
    method: 'post',
    data: data
  })
}
