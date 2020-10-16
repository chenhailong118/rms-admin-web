'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_GATEWAY_SERVER: '"http://localhost:8066"',//API网关地址
  STATIC_SERVER: '"http://localhost:8099"', //静态资源服务器地址
})
