import { login, logout, getInfo, refreshToken } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import {Message} from "element-ui";

const user = {
  state: {
    token: getToken(),
    expireTime: '',
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_EXPIRE_TIME: (state, expireTime) => {
      state.expireTime = expireTime
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {

    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        const loginFrom = {username: username, password: userInfo.password, imageCode: userInfo.imageCode, validateCodeToken: userInfo.validateCodeToken}
        login(loginFrom).then(response => {
          const data = response.data;
          const tokenStr = data.tokenPrefix + data.token;
          console.log("expireTime" + data.expireTime);
          setToken(tokenStr);
          commit('SET_TOKEN', tokenStr);
          commit('SET_EXPIRE_TIME', data.expireTime);
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    //TOKEN刷新
    RefreshToken({ commit, state }) {
      return new Promise((resolve, reject) => {
        refreshToken().then(response => {
          if(response.data.token != null){
            const data = response.data
            const tokenStr = data.tokenPrefix + data.token
            const expireTime = data.expireTime;
            console.log("refreshToken" + tokenStr);
            console.log("refreshexpireTime" + expireTime);
            setToken(tokenStr)
            commit('SET_TOKEN', tokenStr)
            commit('SET_EXPIRE_TIME', expireTime)
          }
        }).catch(error => {})
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const data = response.data
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.username)
          commit('SET_AVATAR', data.icon)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
