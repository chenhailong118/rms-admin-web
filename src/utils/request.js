  import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'
window.isReresh = false;//用于判断是否刷新，不能少

// 创建axios实例
const service = axios.create({
  baseURL: process.env.API_GATEWAY_SERVER, // api的base_url
  timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  console.log("请求URL：" + config.url);
  console.log(config.url.indexOf('/auth/refreshtoken'));
  if(config.url.indexOf('/auth/refreshtoken') == -1){
    /**
     * 判断如果10分钟以内token超时，则刷新token
     * @type {any}
     */
    let token = store.getters.token;
    let expireTime = store.getters.expireTime;
    let currentTime = Math.round(new Date() / 1000);
    let expireIn = expireTime - currentTime;
    console.log("expireTime: " + expireTime);
    console.log("currentTime: " + currentTime);
    console.log("expireIn: " + expireIn);
    if (token && expireIn <= 60*25){
      console.log("RefreshToken.....");
      if(!window.isReresh){
        window.isReresh = true;
        store.dispatch('RefreshToken').then(() => {
        }).catch(() => {
        })
      }
      window.isReresh = false;
    }
  }
  if (store.getters.token) {
    config.headers['Authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * code为非200是抛错 可结合自己业务进行修改
  */
    const res = response.data
    if (res !== null && res.code !== 200) {
      Message({
        message: res.message,
        type: 'error',
        duration: 3 * 1000
      })

      // 401:未登录;
      if (res.code === 401) {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
