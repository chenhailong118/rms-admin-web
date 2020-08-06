'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://localhost:8066"',//API服务器地址
  IMAGE_SERVER: '"http://localhost:8099"', //图片服务器地址
})
