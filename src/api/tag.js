import request from '@/utils/request'

export function getTags(params) {
  return request({
    url: '/superstar/tag',
    method: 'get',
    params: params
  })
}

export function deleteTag(id) {
  return request({
    url: '/superstar/tag/' + id,
    method: 'delete'
  })
}

export function updateTag(id, params) {
  return request({
    url: '/superstar/tag/' + id,
    method: 'put',
    params: params
  })
}


export function createTag(data) {
  return request({
    url: '/superstar/tag',
    method: 'post',
    data: data
  })
}

export function getTagAll(params) {
  return request({
    url: '/superstar/tag/all',
    method: 'get',
    params: params
  })
}

export function update(id, params) {
  return request({
    url: '/superstar/tag/' + id,
    method: 'put',
    params: params
  })
}

export function fetchTreeList() {
  return request({
    url: '/superstar/tag/tree',
    method: 'get'
  })
}

export function listTagByResourceId(resourceId) {
  return request({
    url: '/superstar/tag/' + resourceId,
    method: 'get'
  })
}

