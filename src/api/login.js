import request from '@/utils/request'

//刷新TOKEN
export function refreshToken(){
  return request({
    url: '/auth/refreshtoken',
    method: 'get',
  })
}

export function login(loginForm) {
  let fromData = new FormData()
  fromData.append('username', loginForm.username);
  fromData.append('password', loginForm.password);
  fromData.append('imageCode', loginForm.imageCode);
  return request({
    url: '/auth/form',
    method: 'post',
    data: fromData,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'deviceId': loginForm.deviceId
    }
  })
}

export function loginSms(loginParams) {
  return request({
    url: '/auth/mobile',
    method: 'post',
    params: loginParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'deviceId': loginParams.deviceId
    }
  })
}

export function getInfo() {
  return request({
    url: '/auth/info',
    method: 'get',
  })
}

export function sendSmsCode(params) {
  return request({
    url: '/auth/code/sms/' + params.deviceId,
    method: 'get',
    params: params,
  })
}

export function getUrls() {
  return request({
    url: '/auth/user/urls',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/auth/logout',
    method: 'post'
  })
}

export function fetchList(params) {
  return request({
    url: '/auth/user',
    method: 'get',
    params: params
  })
}

export function createAdmin(data) {
  return request({
    url: '/auth/user',
    method: 'post',
    data: data,
    // headers: {'Content-Type': 'application/json'}
  })
}

export function update(id, params) {
  return request({
    url: '/auth/user/' + id,
    method: 'put',
    data: params
  })
}

export function deleteAdmin(id) {
  return request({
    url: '/auth/user/' + id,
    method: 'delete'
  })
}

export function getRoleByAdmin(id) {
  return request({
    url: '/auth/role/' + id,
    method: 'get'
  })
}

export function allocRole(data) {
  return request({
    url: '/auth/user/role/update',
    method: 'post',
    data: data
  })
}
