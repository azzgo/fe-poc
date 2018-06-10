const path = require('path')

module.exports = {
  root: path.resolve(__dirname, '..'),
  dist: path.resolve(__dirname, '../dist'),
  isProd: process.env.NODE_ENV === 'prod',
  host: '0.0.0.0',
  port: 8089,
}
