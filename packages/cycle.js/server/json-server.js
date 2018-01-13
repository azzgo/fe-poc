/* eslint-disable */
let jsonServer = require('json-server')
let server = jsonServer.create()
let path = require('path')
let router = jsonServer.router(path.join(__dirname, 'db.json'))
let middlewares = jsonServer.defaults()
server.use(middlewares)

server.use(jsonServer.bodyParser)

let token = '_' + Math.random().toString(36).substr(2, 20)

function isAuthorized(req) {
  const authorization_token = 'Bearer ' + token
  if ( req.path === '/auth' || req.headers.authorization === authorization_token) {
    return true
  }
  return false
}

server.all('/auth', function(req, res) {
  return res.json({
    token: token
  })
})

server.use(function (req, res, next) {
  if (isAuthorized(req)) { // add your authorization logic here
    next() // continue to JSON Server router
  } else {
    res.sendStatus(401)
  }
})

server.use(router)

server.listen(3000, function () {
  console.log('JSON Server is running: http://127.0.0.1:3000')
})
