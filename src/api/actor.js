import request from '@/utils/request'

export function createActor(data){
  return request({
    url: '/superstar/actor',
    method: 'post',
    data: data,
  })
}

export function deleteActor(id){
  return request({
    url: '/superstar/actor/' + id,
    method: 'delete',
  })
}

export function updateActor(id, params) {
  return request({
    url: '/superstar/actor/' + id,
    method: 'put',
    data: params
  })
}

export function getActors(params){
  return request({
    url: '/superstar/actor',
    method: 'get',
    params: params,
  })
}

export function getResources(params, id){
  return request({
    url: '/superstar/actor/resources/' + id,
    method: 'get',
    params: params,
  })
}

