import request from '@/utils/request'

//获取资源列表
export function getResources(params){
  return request({
    url: '/superstar/resource',
    method: 'get',
    params: params,
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
    url: '/superstar/resource/dir',
    method: 'get',
    params: params,
  })
}
