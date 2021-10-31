'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const PORT = 8081

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  VUE_APP_BASE_URL: `"http://localhost:${PORT}/"`
})
