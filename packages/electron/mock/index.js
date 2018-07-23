
// var mockServer = require('node-mock-server')
var mockServer = require('./node-mock-server')
var path = require('path')

const defaultOptions = {
  'restPath': path.join(__dirname, '/rest'),
  'uiPath': '/',
  'title': 'Api mock server',
  'version': 1,
  'urlBase': 'http://localhost:3001',
  'urlPath': '/rest/v1',
  'port': 3001,
  'contentType': 'application/json',
  'accessControlExposeHeaders': 'X-Total-Count',
  'accessControlAllowOrigin': '*',
  'accessControlAllowMethods': 'GET, POST, PUT, OPTIONS, DELETE, PATCH, HEAD',
  'accessControlAllowHeaders': 'origin, x-requested-with, content-type',
  'accessControlAllowCredentials': 'true',
  'headers': {},
  'open': true,
  'dirName': __dirname
}

function startServer (options) {
  const _optioins = Object.assign(defaultOptions, options || {})
  return mockServer(_optioins)
}

startServer()

// module.exports = startServer
