import request from '@/utils/request'

//获取资源列表
export function getResources(params){
  return request({
    url: '/superstar/resource',
    method: 'get',
    params: params,
  })
}

//获取演员列表
export function getActors(resourceId){
  return request({
    url: '/superstar/resource/actors/' + resourceId,
    method: 'get',
  })
}

export function updateResource(id, params) {
  return request({
    url: '/superstar/resource/' + id,
    method: 'put',
    data: params
  })
}

export function createResource(data){
  return request({
    url: '/superstar/resource',
    method: 'post',
    data: data,
  })
}

export function deleteResource(id){
  return request({
    url: '/superstar/resource/' + id,
    method: 'delete',
  })
}


export function getImages(params){
  return request({
    url: '/superstar/resource/image',
    method: 'get',
    params: params,
  })
}

export function getGifs(params){
  return request({
    url: '/superstar/resource/gif',
    method: 'get',
    params: params,
  })
}

export function allocTag(data) {
  return request({
    url: '/superstar/resource/allocTag',
    method: 'post',
    data:data
  })
}

export function openLocalDir(params) {
  return request({
    url: '/superstar/resource/opendir',
    method: 'get',
    params: params,
  })
}
