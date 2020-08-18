import request from '@/utils/request'

export function getDictInfoByName(name){
  return request({
    url: '/superstar/dict/info',
    method: 'get',
    params: {name: name},
  })
}
