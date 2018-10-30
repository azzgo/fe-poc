const path = require('path')

module.exports = {
  isProd: process.env.NODE_ENV === 'prod',
  host: '0.0.0.0',
  port: 8089,
}
